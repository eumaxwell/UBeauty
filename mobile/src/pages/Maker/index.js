import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Linking, FlatList } from "react-native";
import Gallery from "react-native-image-gallery";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";
import CalendarStrip from 'react-native-calendar-strip';

export default function Maker(params, { chosedMaker }) {

  const [maker, setMaker] = useState({ name: "" });
  const [action, setAction] = useState();
  const [screen, setScreen] = useState();

  const [date, setDate] = useState();

  useEffect(() => {
    setMaker(params.route.params.maker)
    //console.log("TELA MAKER ", paramMaker)
  }, []);
  /*
    async function loadMakerInformation() {
      await api.get('/maker', {
        params: {
          user: nome,
        }
      }).then(response => {
        setMaker(response.data)
      });
    }
  */
  function sendWhatsapp() {
    const message = `Hello ${maker.name}, I'd like see you are available about ${date} to meet you`;
    Linking.openURL(`whatsapp://send?phone=${maker.whatsapp}?t=${message}`);
  }

  useEffect(() => {
    if (action === "Gallery") {
      setScreen(
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
        />
      );
    } else if (action === "Services") {

      let arrayImagens = []
      maker.services.map(e => arrayImagens.push({ source: { uri: e.url } }));

      setScreen(
        <Gallery
          style={{ backgroundColor: "white" }}
          images={arrayImagens}
        /*
        [
        {
          source: require("../../../assets/logo.png"),
          dimensions: { width: 150, height: 150 },
        },
        { source: { uri: "http://i.imgur.com/XP2BE7q.jpg" } },
        { source: { uri: "http://i.imgur.com/5nltiUd.jpg" } },
        { source: { uri: "http://i.imgur.com/6vOahbP.jpg" } },
        { source: { uri: "http://i.imgur.com/kj5VXtG.jpg" } },
      ]}
    */
        >
          <Text> 'AAAAAA' </Text>
        </Gallery>
      );
    } else if (action === "Calendar") {
      function onDateSelected(date) {
        console.log(date)
      }
      setScreen(
        <View>
          <Text>
            Calendar to render
            https://github.com/BugiDev/react-native-calendar-strip
        </Text>

          <CalendarStrip
            scrollable
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
            style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
            calendarHeaderStyle={{ color: 'white' }}
            calendarColor={'#3343CE'}
            dateNumberStyle={{ color: 'white' }}
            dateNameStyle={{ color: 'white' }}
            iconContainer={{ flex: 0.1 }}
            /*customDatesStyles={this.state.customDatesStyles}
            markedDates={this.state.markedDates}
            datesBlacklist={this.datesBlacklistFunc}*/
            onDateSelected={onDateSelected}
            useIsoWeekday={false}
          >
            {/** criar uma lista de texto com os horarios agendados  */}
          </CalendarStrip>

        </View>
      );
    } else if (action === "Contact") {
      setScreen(
        <View>
          <Button
            style={styles.logginButton}
            onPress={sendWhatsapp}
            title="Whatsapp" />
          <Button
            style={styles.logginButton}
            onPress={sendWhatsapp}
            title="Instagram" />
        </View>
      );
    }
  }, [action]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerAvatar} source={{ uri: maker.avatarUrl }} />
        <Text style={styles.headerTitle}>{maker.name}</Text>
        <Text style={styles.headerDescription}>{maker.bio}</Text>
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

      <View style={styles.body}>
        {screen}
      </View>
    </View>
  );
}
