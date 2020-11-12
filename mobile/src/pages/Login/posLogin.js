import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./posLoginStyles";
import { Button, TextInput } from 'react-native-paper';
import { NavigationHelpersContext, useNavigation, useNavigationBuilder } from "@react-navigation/native";
import api from "../../services/api";



export default function posLogin() {
    const [user, setUser] = useState("Max");
    const [password, setPassword] = useState("123");
    const navigation = useNavigation();

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/Hairdresser.gif')} style={styles.backgroundImage} />
            </View>
            <View style={styles.body}>
                <Text>Sincronize sua conta com Instagram</Text>
                <Text>Assim seus clientes verão suas fotos mais atualizadas</Text>
            </View>
            <View style={styles.footer}>
                <Button style={styles.button} mode="contained" onPress={handleLogin}>
                    Sincronizar
            </Button>
            </View>
        </View>
    );
}
