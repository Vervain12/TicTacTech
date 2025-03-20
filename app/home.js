import { StyleSheet, Text, View, TextInput, TouchableOpacity, ButtonProps, Button } from 'react-native';
import { useState, useEffect } from "react";
import { Link, useRouter} from 'expo-router';
import { SymbolProvider } from '../context/symbolcontext';

const Home = ({ navigation }) => {
    const router = useRouter();

    return(
        <View>
            <View>
                <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}>
                    <Text>
                        Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate('Play')}>
                    <Text>
                        Play
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Home;