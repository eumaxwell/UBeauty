import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from "react-native";
import { useNavigation, useNavigationBuilder } from "@react-navigation/native";
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location'
import api from "../../services/api";
import styles from "./styles";
import logoImg from "../../../assets/logo.png";
import PrimaryButton from "../../components/PrimaryButton"
import { Button, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';


export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState("Max");
  const [password, setPassword] = useState("123");

  async function handleLogin() {
    try {
      const response = await api.get("login", { params: user, password });

      //console.log("handleLogin", response.data)
      console.log("handleLogin - Buscando dados do usuário")

      if (response.data) {
        const maker = response.data
        navigation.navigate("ProfilePage", maker);
      } else {
        alert("Usuario ou senha incorreto");
      }
    } catch (error) {
      alert("Falha ao logar");
    }
  }

  async function handleNewUser() {
    console.log(user, password)
    const response = await api.post("login", { user, password });
    console.log(response.data)
    if (response.data) {
      //const maker = response.data

      //navigation.navigate("ProfilePage", maker);
    }
    else {
      alert("Usuario já existe");
    }
  }

  return (
    <View style={styles.container}>

      <StatusBar style="dark" translucent={true} />
      <Image source={require('../../../assets/Hairdresser.gif')} style={styles.backgroundImage} />

      <View style={styles.header}>
        {/* <Image source={logoImg} style={{ width: '100%', height: 150 }} /> */}
      </View>

      <View style={styles.body}>

        <View style={styles.bodyAuth}>
          <Text>
            Espaço para colocar o login com Google, Facebook
          </Text>
        </View>

        <View style={styles.bodyLogin}>
          <View style={styles.bodyLoginInputs}>
            <TextInput
              label="Email"
              value={user}
              type="outlined"
              onChangeText={text => setUser(text)}
            />
            <TextInput
              label="Senha"
              value={password}
              type="outlined"
              onChangeText={text => setPassword(text)}
            />
          </View>

          <View style={styles.bodyLoginButtons}>


            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate("PosLogin")}>
              Login
            </Button>

            <Button style={styles.button} mode="outlined" onPress={handleNewUser}>
              Criar Novo Usuario
            </Button>
          </View>

        </View>


        {/* <Text>
          {user}
        </Text>
        <Text>
          {password}
        </Text> */}

      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={{ padding: 24 }} onPress={() => navigation.navigate("MapPage")}>
          <Text style={{ fontSize: 16, opacity: 0.6 }}>Pular</Text>
        </TouchableOpacity>
      </View>

    </View >

  );
}

/* <Button style={styles.button} mode="contained" onPress={handleLogin}>
              Login
            </Button> */
