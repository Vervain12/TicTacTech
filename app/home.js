import { StyleSheet, Text, View, TextInput, TouchableOpacity, ButtonProps, Button } from 'react-native';
import { useState, useEffect } from "react";
import { SymbolProvider } from '../context/symbolcontext';

const Home = ({ navigation }) => {

    return(
        <View style={styles.screen_layout}>
            <View style={styles.screen_setup}>
                <View style={styles.button1_box}>
                    <View style={styles.button1_vis}>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Play')}>
                            <Text style={styles.button1_txt}>
                                Play
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.button2_box}>
                    <View style={styles.button2_vis}>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.button2_txt}>
                                Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen_layout: {
        position: 'absolute',
        flexShrink: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 0
    },

    screen_setup: {
        position: 'absolute',
        flexShrink: 0,
        height: 932,
        width: 430,
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: 'flex',
        alignItems: 'flex-start',
        rowGap: 0
    },

    button1_box: {
        position: 'absolute',
        flexShrink: 0,
        top: '21%',
        height: 50,
        left: '20%',
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 0
    },

    button1_vis: {
        position: "absolute",
        flexShrink: 0,
        top: 2,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 115, 255, 1)",
        borderRadius: 21
    },

    button1_txt: {
        flexShrink: 0,
        top: '7.5%',
        right: 0,
        bottom: 0,
        left: 0,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Inter',
        fontSize: 30,
        fontWeight: 400
    },

    button2_box: {
        position: 'absolute',
        flexShrink: 0,
        top: '30%',
        height: 50,
        left: '20%',
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 0 
    },

    button2_vis: {
        position: "absolute",
        flexShrink: 0,
        top: 2,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 115, 255, 1)",
        borderRadius: 21
    },

    button2_txt: {
        flexShrink: 0,
        top: '9%',
        right: 0,
        bottom: 0,
        left: 0,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Inter',
        fontSize: 30,
        fontWeight: 400
    }
});

export default Home;