import React, { useState } from "react";
import { View, TextInput, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";
import logoImg from "../../../assets/logo.png";

export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

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

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerTitle}>Bem-vindo!</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.bodyInput}
          placeholder="ID"
          placeholderTextColor="#9a73ef"
          returnKeyType="go"
          autoCorrect={false}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.bodyButton} onPress={handleLogin}>
          <Text style={styles.detailsButtonText}>Ver Mais detalhes</Text>
          <Feather name="arrow-right" size={16} color="#E02041" />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
