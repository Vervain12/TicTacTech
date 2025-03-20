import { StyleSheet, Text, View, TextInput, TouchableOpacity, ButtonProps, Button, Image} from 'react-native';
import { useState, useEffect, createContext } from "react";
import { Link, useRouter } from 'expo-router';
import { useSymbolPicker } from '../context/symbolcontext';

export default function Profile() {
    const { xSymbol, oSymbol, pickXSymbol, pickOSymbol} = useSymbolPicker();

    return (
        <View>
            <View>
                <View>
                    <TouchableOpacity
                        onPress={() => pickXSymbol()}>
                            <Text>Choose X</Text>
                    </TouchableOpacity>    
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => pickOSymbol()}>
                            <Text>Choose O</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({

});