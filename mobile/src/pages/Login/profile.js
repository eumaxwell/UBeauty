import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Linking, FlatList, Button, TextInput, Picker/* a correta da erro no expo */ } from "react-native";
//import {Picker} from '@react-native-community/picker'; // erro na lib usando expo

//import Gallery from 'react-native-image-gallery';
import ImageView from 'react-native-image-view';
//https://www.npmjs.com/package/react-native-image-view
//https://github.com/jobtoday/react-native-image-viewing

// or any pure javascript modules available in npm
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
//https://streetsmartdev.com/create-horizontal-list-react-native/
//import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";
import CalendarStrip from 'react-native-calendar-strip';

import userInstagram from "user-instagram";
import Modal from 'react-native-modal';

import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location'
//import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
//import moment from 'moment';
import WheelPicker from '@gregfrench/react-native-wheel-picker'
const WheelPickerItem = Picker.Item;

export default function Profile(params) {

    let [maker, setMaker] = useState({});

    // Filters
    let [filterServices, setFilterServices] = useState([]);
    let [filterPlaces, setFilterPlaces] = useState([]);

    const [action, setAction] = useState("");
    const [screen, setScreen] = useState();

    const [instagramName, setInstagramName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    useEffect(() => {
        maker = params.route.params[0]

        setMaker(maker)
        getFiltersFromServer();
    }, []);

    async function getFiltersFromServer() {
        console.log("getFiltersFromServer")

        await api.get('/filters').then(response => {
            let filtros = response.data;

            for (let index = 0; index < filtros.length; index++) {
                if (filtros[index].id === 0) { // filtros de tipos de serviços
                    setFilterServices(filtros[index].children)
                }
                else if (filtros[index].id === 1) { // filttos de localização de atendimento
                    setFilterPlaces(filtros[index].children)
                }
            }

            console.log('\n\n', filterServices)
            console.log('\n\n', filterPlaces)

        }).catch(erro => console.log(erro))

    };

    async function loadMyPosition() {
        const { granted } = await requestPermissionsAsync();
        if (granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            });

            const { latitude, longitude } = coords;
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            maker.location = location
        }
    }

    async function createMakerByInstagram() {

        if (instagramName) {

            userInstagram(instagramName) // Same as getUserData()
                .then(instagramData => {
                    console.log(instagramData)

                    maker.name = instagramData.fullName
                    maker.bio = instagramData.biography
                    maker.instagram = instagramName
                    maker.avatarUrl = instagramData.profilePicHD

                    let arrayGallery = []

                    instagramData.posts.map(
                        post => {
                            if (!post.isVideo) {
                                arrayGallery.push(
                                    {
                                        imageUrl: post.imageUrl,
                                        title: post.caption,
                                        width: post.dimensions.width,
                                        height: post.dimensions.height,
                                    })
                            }
                        }
                    )

                    maker.gallery = arrayGallery;

                    setMaker(maker)

                })
                .catch(error => console.log(error));
        }

    }

    async function submitMaker() {
        if (whatsapp) {
            maker.whatsapp = whatsapp;
        }

        console.log(maker)
        await api.post('/update_maker', { maker })
    }

    function sendWhatsapp() {
        const message = `Hello ${maker.name}, I'd like see you are available about to meet you`;
        Linking.openURL(`whatsapp://send?phone=${maker.whatsapp}?t=${message}`);
    }


    function openInstagram() {
        Linking.openURL(`instagram://user?username=${maker.instagram}`)
    }

    const [isModalVisible, setModalVisible] = useState(false)
    const [newServiceTitle, setServiceTitle] = useState();
    const [newServiceDescription, setServiceDescription] = useState();
    const [newServicePrice, setServicePrice] = useState();
    const [newServiceCategory, setServiceCategory] = useState();
    const [newServiceUrl, setServiceUrl] = useState();

    function createNewService() {

        maker.services.push({
            title: newServiceTitle,
            description: newServiceDescription,
            price: newServicePrice,
            category: newServiceCategory,
            imageUrl: newServiceUrl
        })

        setModalVisible(false)
        setServiceTitle('')
        setServiceDescription()
        setServicePrice()
        setServiceCategory()
        setServiceUrl()
    }


    function onDateSelected(date) {
        console.log("Selected Date", date)
    }


    const [selectedItem, setSelectedItem] = useState(2);
    const [itemList, setItemList] = useState([]);

    useEffect(() => {

        if (action === "Gallery") {
            setScreen(
                <FlatList
                    horizontal
                    data={maker.gallery}
                    renderItem={({ item }) =>
                        <Card>
                            <Card.Cover source={{ uri: item.imageUrl }} />
                            <Card.Content>
                                <Title>{item.title}</Title>
                            </Card.Content>
                        </Card>
                    }
                    keyExtractor={(item, index) => index}
                />
            );
        } else if (action === "Services") {
            /*
            <ImageView
                    images={maker.gallery}
                    imageIndex={0}
                    backgroundColor={'white'}
                    isVisible={visible}
                    onClose={() => setIsVisible(false)}
                    renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                />


                <Card.Title title="Card Title" subtitle="Card Subtitle" />
                        <Card.Content>
                            <Title>{item.title}</Title>
                            <Paragraph>{item.price}</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: item.thumbnail }} />
            */
            setScreen(

                <View>

                    <FlatList
                        horizontal
                        data={maker.services}
                        renderItem={({ item }) =>

                            <Card>
                                <Card.Content>
                                    <Title>{item.title}</Title>
                                    <Paragraph>{item.price}</Paragraph>
                                    <Paragraph>{item.category}</Paragraph>
                                    <Paragraph>{item.description}</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: item.imageUrl }} />
                                <Button title="Apagar" onPress={() => eraseService(item.title)} />
                            </Card>
                        }
                        keyExtractor={(item, index) => index}
                    />

                    <Button title="cadastrar novo serviço" onPress={() => {
                        setModalVisible(!isModalVisible);
                    }} />

                </View>


            );
        } else if (action === "Calendar") {
            
            setScreen(
                <View>
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
                        onDateSelected={onDateSelected}
                        useIsoWeekday={false}
                    />
                    <WheelPicker style={{ width: 150, height: 180 }}
                        lineColor="#000000" //to set top and bottom line color (Without gradients)
                        lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
                        lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
                        selectedValue={selectedItem}
                        itemStyle={{ color: "black", fontSize: 26 }}
                        onValueChange={(index) => setSelectedItem(index)}>
                        {itemList.map((value, i) => (
                            <WheelPickerItem label={value} value={i} key={i} />
                        ))}
                    </WheelPicker>
                    {


                        //customDatesStyles={this.state.customDatesStyles}
                        //markedDates={this.state.markedDates}
                        //datesBlacklist={this.datesBlacklistFunc}


                    /*<DatePicker
                        showIcon={false}
                        androidMode="spinner"
                        style={{ width: 300 }}
                        date={date}
                        mode="date"
                        placeholder="DD/MM/YYYY"
                        format="DD-MM-YYYY"
                        maxDate={moment().format('DD-MM-YYYY')}
                        confirmBtnText="Chọn"
                        cancelBtnText="Hủy"
                        customStyles={{
                            dateInput: {
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: 'black',
                            },
                        }}
                        onDateChange={(d) => {
                            setState(d);
                        }}
                    />
                    */}
                    {/** criar uma lista de texto com os horarios agendados  
                     * <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onDateSelected}
                    />
                     * 
                     * 
                    */}

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
                        onPress={openInstagram}
                        title="Instagram" />

                </View>
            );
        }

    }, [action]);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showSelectDate, setShowSelectDate] = useState(false);

    function onChangeDate() {

    }

    return (

        <View style={styles.container}>
            <View>
                <View>
                    <Text>{'www.instagram.com/'}</Text>
                    <TextInput
                        style={styles.bodyInput}
                        placeholder="nome_no_instagram"
                        onChangeText={text => setInstagramName(text)}
                        value={instagramName}
                    />
                </View>
                <TextInput
                    style={styles.bodyInput}
                    placeholder="Numero do whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                />
                <Button
                    style={styles.logginButton}
                    onPress={createMakerByInstagram}
                    title="Carregar dados" />
                <Button
                    style={styles.logginButton}
                    onPress={loadMyPosition}
                    title="Redefinir Localização" />
            </View>

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
                    onPress={() => setAction("Contact")}
                >
                    <Feather name="arrow-left" size={28} color="#E02041" />
                    <Text style={styles.buttonText}>Contact</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                {screen}
            </View>

            <Button
                style={styles.logginButton}
                onPress={submitMaker}
                title="Salvar" />


            <View>
                <Modal isVisible={isModalVisible}
                    backdropColor="#B4B3DB"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                >
                    <View style={{ flex: 1 }}>

                        <View style={styles.body}>

                            <TextInput
                                placeholder="Título"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setServiceTitle(text)}
                                value={newServiceTitle}
                            />
                            <Picker
                                style={{ height: 50, width: 100 }}
                                selectedValue={newServiceCategory}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setServiceCategory(itemValue)}
                            >
                                {filterServices.map(category =>
                                    <Picker.Item key={category.id} label={category.name} value={category.name} />)}

                            </Picker>

                            <TextInput
                                placeholder="Descrição"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setServiceDescription(text)}
                                value={newServiceDescription}
                            />
                            <TextInput
                                placeholder="Preço"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setServicePrice(text)}
                                value={newServicePrice}
                            />
                            <Text>{"Selecione uma foto de exibição"}</Text>
                            <FlatList
                                horizontal
                                data={maker.gallery}
                                renderItem={({ item }) =>
                                    <Card onPress={() => setServiceUrl(item.imageUrl)}>
                                        <Card.Cover source={{ uri: item.imageUrl }} />
                                    </Card>
                                }
                                keyExtractor={(item, index) => index}
                            />
                            <Button
                                onPress={createNewService}
                                title="Entrar"
                            />
                        </View>
                        <Button title="Hide modal" onPress={() => {
                            setModalVisible(!isModalVisible);
                        }} />
                    </View>
                </Modal>



            </View>

        </View >

    );
}

/*

<Picker
                                style={{ height: 50, width: 100 }}
                                selectedValue={newServiceCategory}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setServiceCategory(itemValue)}
                            >
                                {filterServices.map(category =>
                                    <Picker.Item key={category} label={category} value={category} />)}

                            </Picker>

{showSelectDate && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
*/
