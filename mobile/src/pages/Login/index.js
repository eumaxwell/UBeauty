import React, { useState } from "react";
import { View, TextInput, Text, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location'
import api from "../../services/api";
import styles from "./styles";
import logoImg from "../../../assets/logo.png";

export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState("Max");
  const [password, setPassword] = useState("123");

  async function handleLogin() {
    try {
      const response = await api.post("sessions", { user, password });

      if (response) {
        navigation.navigate("Detail", user);
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
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerTitle}>Bem-vindo!</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.bodyInput}
          placeholder="Usuario"
          placeholderTextColor="#9a73ef"
          returnKeyType="go"
          autoCorrect={false}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="Senha"
          placeholderTextColor="#9a73ef"
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
        />
        <Button
          onPress={handleLogin}
          title="Entrar"
        />
      </View>

      <View >

        <TextInput
          style={styles.bodyInput}
          placeholder="Usuario"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          onPress={handleNewUser}
          title="Criar Novo Usuario"
        />

      </View>

    </View>
  );
}
