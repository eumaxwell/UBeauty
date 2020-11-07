import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    teste: {
        backgroundColor: 'blue',
        height: 200
    }
})

export default function PrimaryButton(props) {
    return (
        <TouchableOpacity style={styles.teste}>
            <Text>{props.children}</Text>
        </TouchableOpacity>
    )
}
