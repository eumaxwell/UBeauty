import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location'
import { useNavigation } from "@react-navigation/native";
// import { Feather, Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";
import logoImg from "../../../assets/logo.png";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Dimensions } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

export default function Map() {
  const navigation = useNavigation();
  const [makers, setMakers] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    loadMyInitialPosition();
    loadMakers();
    getFiltersFromServer();
  }, []);

  async function reload() {
    //loadMyInitialPosition();
    loadMakers();
    //getFiltersFromServer();
  }

  async function getFiltersFromServer() {
    await api.get('/filters').then(response => {
      setFilters(response.data)
    }).catch(() => {
      console.log("erro ao carregar filtros")
    })
  };

  async function loadMyInitialPosition() {
    const { granted } = await requestPermissionsAsync();
    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      //console.log(coords)
      const { latitude, longitude } = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    }
  }

  function onRegionChange(region) {
    setCurrentRegion({ region })
  }

  function onSelectedItemsChange(selectedItems) {
    console.log("onSelectedItemsChange", selectedItems)
    setSelectedFilters(selectedItems);
    console.log(selectedFilters)
  }

  async function loadMakers() {
    console.log("loadMakers")

    if (currentRegion) {
      try {
        console.log("currentRegion", currentRegion, "filtros", selectedFilters)

        let arrayFilters = [];
        if (selectedFilters.length != 0) {
          selectedFilters.map(idFilter => {
            filters.map((category) => {
              category.map(item => {
                if (item.id === idFilter) {
                  arrayFilters.push(item.name)
                }
              })
            })
          })
        }


        const { latitude, longitude } = currentRegion
        await api.get('/search', {
          params: {
            latitude,
            longitude,
            filters: arrayFilters
          }
        }).then(response => {
          setMakers(response.data)
        });
      } catch (error) {
        console.log("error", error)
      }

    }
    else {
      console.log("currentRegion null")
    }
    console.log("makers", makers)
  }

  function openLogin() {
    navigation.navigate("LoginPage");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.headerSearch}>
          <Ionicons
            style={{ padding: 16 }}
            name='md-arrow-back'
            size={30}
            onPress={() => navigation.navigate("TestePage")}
          />
          <SectionedMultiSelect
            single={false}
            showRemoveAll
            items={filters}
            uniqueKey="id"
            subKey="children"
            selectText="Buscar"
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedFilters}
            styles={{ selectToggle: { width: Dimensions.get('window').width / 2, padding: 16 } }}
          />
          {/* <Button
            style={styles.logginButton}
            onPress={reload}
            title="Buscar"
          /> */}
          <Ionicons
            style={{ padding: 16 }}
            name='ios-search'
            size={30}
            onPress={reload}
          />
          <Ionicons
            style={{ padding: 16 }}
            name='md-person'
            size={30}
            onPress={openLogin}
          />
        </View>

      </View>


      <View style={styles.body}>


        <MapView style={styles.bodyMap}
          initialRegion={currentRegion}
        >
          {
            makers.map(marker => (
              <Marker
                key={marker._id}
                coordinate={{
                  longitude: marker.location.coordinates[0],
                  latitude: marker.location.coordinates[1],
                }} marker
              >
                <Callout onPress={() => {
                  navigation.navigate('MakerPage', { maker: marker })
                }}>
                  <View style={styles.callout}>
                    <Text style={styles.devName}>{marker.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))
          }
        </MapView>
      </View>
    </View>
  );
}

/*




        <MapView
          region={currentRegion}
          onRegionChange={onRegionChange}
          style={styles.bodyMap}
        >
        </MapView>

{makers.map((maker) => (
            <Marker
              key={maker._id}
              coordinate={{
                longitude: maker.location.coordinates[0],
                latitude: maker.location.coordinates[1],
              }}
            >
              <Image
                style={styles.bodyAvatar}
                source={{ uri: maker.avatar_url }}
              />
              <Callout onPress={() => openMaker(maker)}>
                <View style={styles.bodyCallout}>
                  <Text style={styles.bodyMakerName}>{maker.name}</Text>
                  <Text style={styles.bodyMakerBio}>{maker.bio}</Text>
                  <Text style={styles.bodyMakerPrice}>{maker.price}</Text>
                </View>
              </Callout>
            </Marker>
          ))}

 */

/*
<TouchableOpacity
style={styles.modalButton}
onPress={() => setModalVisible(true)}
>
<Feather name="arrow-left" size={28} color="#E02041" />
</TouchableOpacity>

<Modal isVisible={modalVisible} style={styles.modal}>
<Text>I am the modal content!</Text>
<TouchableOpacity
  style={styles.button}
  onPress={() => setModalVisible(false)}
>
  <Feather name="arrow-left" size={28} color="#E02041" />
  <Text style={styles.buttonText}>Search</Text>
</TouchableOpacity>
</Modal>*/