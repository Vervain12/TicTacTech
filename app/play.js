import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function GameSelect({ navigation }) {

    /*Versus AI*/
    const handleSingle = () => {
        navigation.navigate('Game', { aiOn: true });
    }

    /*Two Player*/
    const handleTwo = () => {
        navigation.navigate('Game', { aiOn: false });
    }

    return(
        <View>
            <TouchableOpacity
                onPress={handleSingle}>
                    <Text>Single Player</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleTwo}>
                    <Text>Two Player</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

});