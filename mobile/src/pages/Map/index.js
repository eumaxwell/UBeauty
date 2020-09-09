import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location'
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";
import logoImg from "../../../assets/logo.png";

export default function Map() {
  const navigation = useNavigation();
  const [makers, setMakers] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [filters, setFilters] = useState([""]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadMyInitialPosition();
    loadMakers();
  }, []);

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

  function setModalFilters() {
    loadMakers()
  }

  async function loadMakers() {
    console.log("loadMakers")

    if (currentRegion) {
      try {
        console.log("currentRegion", currentRegion, "filtros", filters)
        const { latitude, longitude } = currentRegion
        await api.get('/search', {
          params: {
            latitude,
            longitude,
            filters
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
        <Image source={logoImg} style={{
          width: 250,
          height: 100
        }} />

        <Button
          style={styles.logginButton}
          onPress={openLogin}
          title="Login"
          accessibilityLabel="Login" />
        <Button
          style={styles.logginButton}
          onPress={loadMakers}
          title="Reload" />
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