import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Gallery from "react-native-image-gallery";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";

export default function Maker({ makerId }) {
  const navigation = useNavigation();
  const [maker, setMaker] = useState();
  const [action, setAction] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    loadMakerInformation();
  }, []);

  async function loadMakerInformation() {
    const response = await api.get("/detail", makemakerId);
    setMaker(response);
  }

  function sendWhatsapp() {
    const message = `Hello ${maker.name}, I'd like see you are available about ${date} to meet you`;
    Linking.openURL(`whatsapp://send?phone=${maker.whatsapp}?t=${message}`);
  }

  function renderAction() {
    if (action === "Gallery") {
      <FlatList
        data={maker.services}
        style={styles.servicesList}
        keyExtractor={(service) => String(service.name)}
        showsVerticalScrollIndicator={false}
        /*onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}*/
        renderItem={({ item: service }) => (
          <View style={styles.service}>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <Text style={styles.servicePrice}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.value)}
            </Text>
          </View>
        )}
      />;
    } else if (action === "Services") {
      <Gallery
        style={{ flex: 1, backgroundColor: "black" }}
        images={[
          {
            source: require("../../../assets/logo.png"),
            dimensions: { width: 150, height: 150 },
          },
          { source: { uri: "http://i.imgur.com/XP2BE7q.jpg" } },
          { source: { uri: "http://i.imgur.com/5nltiUd.jpg" } },
          { source: { uri: "http://i.imgur.com/6vOahbP.jpg" } },
          { source: { uri: "http://i.imgur.com/kj5VXtG.jpg" } },
        ]}
      />;
    } else if (action === "Calendar") {
      <View>
        <Text>
          Calendar to render
          https://github.com/BugiDev/react-native-calendar-strip
        </Text>
      </View>;
    } else if (action === "Contact") {
      <View>
        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
          <Text style={styles.actionText}>Whatsapp</Text>
        </TouchableOpacity>
      </View>;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerAvatar} source={{ uri: maker.avatar_url }} />
        <Text style={styles.headerTitle}>{maker.name}</Text>
        <Text style={styles.headerDescription}>{maker.description}</Text>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setAction("Gallery")}
        >
          <Feather name="arrow-left" size={28} color="#E02041" />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setAction("Services")}
        >
          <Feather name="arrow-left" size={28} color="#E02041" />
          <Text style={styles.buttonText}>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setAction("Calendar")}
        >
          <Feather name="arrow-left" size={28} color="#E02041" />
          <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => (date ? setAction("Contact") : setAction("Calendar"))}
        >
          <Feather name="arrow-left" size={28} color="#E02041" />
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>{renderAction()}</View>
    </View>
  );
}
