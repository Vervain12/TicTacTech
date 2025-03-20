import {createContext, useContext, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import React from "react";

const SymbolContext = createContext();

function useSymbolPicker() {
    const context = useContext(SymbolContext)
    return context;
}

function SymbolProvider({ children }) {

    const [xSymbol, setXSymbol] = useState(require('../assets/defaultX.png'));
    const [oSymbol, setOSymbol] = useState(require('../assets/defaultO.png'));

    const pickXSymbol = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });

        if (!result.canceled) {
            setXSymbol({uri: result.assets[0].uri});
          }
    }

    const pickOSymbol = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });

        if (!result.canceled) {
            setOSymbol({uri: result.assets[0].uri});
          }
    }

    return (
        <SymbolContext.Provider value={{
            xSymbol,
            oSymbol,
            pickXSymbol,
            pickOSymbol
        }}>{children}</SymbolContext.Provider>
    )
}

export { useSymbolPicker, SymbolProvider };