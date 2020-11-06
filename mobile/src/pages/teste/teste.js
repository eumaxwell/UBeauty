import React, { useState, useEffect } from "react";
import { Image, Text, View, FlatList } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function Teste() {

    const [errors, setErrors] = useState({ errors: [] });
    const [carousel, setCarousel] = useState({});

    const [videos, setVideos] = useState([
        {
            id: "WpIAc9by5iU",
            thumbnail: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
            title: "Led Zeppelin - Stairway To Heaven",
            price: 123
        }, {
            id: "sNPnbI1arSE",
            thumbnail: "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
            title: "Eminem - My Name Is",
            price: 123
        }, {
            id: "VOgFZfRVaww",
            thumbnail: "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
            title: "AAAAAAA",
            price: 123
        }
    ]);


    function _renderItem({ item, index }) {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        );
    }


    return (
        <View>
            <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>

            <FlatList
                horizontal
                data={videos}
                renderItem={({ item }) =>

                    <Card>
                        
                        <Card.Title title="Card Title" subtitle="Card Subtitle" />
                        <Card.Content>
                            <Title>{item.title}</Title>
                            <Paragraph>{item.price}</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: item.thumbnail }} />
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </Card.Actions>
                    </Card>
                }
                keyExtractor={(item, index) => index}
            />

        </View>

    );

}
//ref={(c) => { this._carousel = c; }}
/*

            <ScrollView
                horizontal={true}
            >
                {videos.map((item, index) => {
                    <View id={item.id}>
                        <Image style={{ width: 66, height: 58 }} source={{ uri: item.thumbnail }} />
                        <Text>{item.title}</Text>
                    </View>
                })}
            </ScrollView>
*/