import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image } from 'react-native';

//Create a new variable named OriginalData
let originalData = []

const App = () => {
    const [mydata, setMydata] = useState([]);

    useEffect(() => {
        // Add fetch() - Exercise 1A
        const myurl = "https://onlinecardappwebservice-anqr.onrender.com/allcards";

        fetch(myurl)
            .then((response) => response.json())
            .then((myJson) => {
                setMydata(myJson);
                originalData = myJson;
            });
    }, []); //

    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.card_name.toLowerCase().includes(text.toLowerCase())
            );
            setMydata(myFilteredData);
        } else {
            setMydata(originalData);
        }
    };


    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{ fontSize: 16 }}>
                    {item.card_name}
                </Text>

                <Image
                    source={{ uri: item.card_pic }}
                    style={{ width: 80, height: 110 }}
                    resizeMode="contain"
                />

            </View>
        );
    };


    return (
        <View>
            <StatusBar />
            <Text>Search:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={(text) => { FilterData(text); }}
            />
            <FlatList data={mydata} renderItem={renderItem} />
        </View>
    );
};

export default App;
