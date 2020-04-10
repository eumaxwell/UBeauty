import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
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
  const [filters, setFilters] = useState([]);
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

      console.log(coords)
      const { latitude, longitude } = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
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
    const response = await api.get("/search", {
      params: { currentRegion, filters },
    });
    setMakers(response);
  }

  function openMaker(maker) {
    navigation.navigate("Maker", maker.id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerTitle}>Bem-vindo!</Text>
      </View>

      <View style={styles.body}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

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