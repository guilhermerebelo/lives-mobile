import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Axios from 'axios';

// const LIVE = [
//     {
//         id: 1,
//         title: 'a',
//         link: 'b'
//     },
//     {
//         id: 2,
//         title: 'a',
//         link: 'b'
//     },
//     {
//         id: 3,
//         title: 'a',
//         link: 'b'
//     },
//     {
//         id: 4,
//         title: 'a',
//         link: 'b'
//     },
//     {
//         id: 5,
//         title: 'a',
//         link: 'b'
//     },
//     {
//         id: 6,
//         title: 'a',
//         link: 'b'
//     }
// ]

export default function Home() {
    const [dados, setDados] = useState('teste');

    async function get() {
        Alert.alert('rewre');
        let template = await Axios.get('https://www.letras.mus.br/blog/lives-da-semana/#livesdasemana')
        // Alert.prompt(template.toString());
        // Alert.alert(template.toString());
        console.log(template);
        // console.log(typeof template.toJson());
        // console.log(rep.status)
        // setDados(rep.status);
    }

    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lives</Text>
            </View>

            <Button
                title='carregar'
                onPress={() => get()}
            />

            <View style={styles.container}>
                <Text>{dados}</Text>
            </View>

            {/* {dados.map((item, index) => 
                <View key={index.id} style={styles.container}>
                    <Text>{item.title}</Text>
                    <Text>{item.link}</Text>
                </View>
            )} */}
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        paddingTop: 30, 
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30
    },
    container: {
        height: 60,
        alignItems: 'center'
    }
});
  