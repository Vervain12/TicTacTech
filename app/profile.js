import { StyleSheet, Text, View, TextInput, TouchableOpacity, ButtonProps, Button, Image} from 'react-native';
import { useSymbolPicker } from '../context/symbolcontext';
import { useUserAuth } from '../context/authcontext';
import { getScore } from '../services/game-score-services';
import { useEffect, useState } from 'react';

const Profile = ({navigation}) =>  {
    const { xSymbol, oSymbol, pickXSymbol, pickOSymbol} = useSymbolPicker();
    const { user, logout } = useUserAuth();
    const [oscore, setOScore] = useState(0);
    const [ties, setTies] = useState(0);
    const [xscore, setXScore] = useState(0);

    useEffect(() => {
        const handleGetScores = async () => {
            try {
                const [oscore, ties, xscore] = await getScore(user.uid);
                setOScore(oscore.score || 0);
                setTies(ties.score || 0);
                setXScore(xscore.score || 0);
            }
            catch (e){
                console.error("Error:" + e);
            }
        }

        handleGetScores();
    },[])

    const handleSignOut = async => {
        alert("Signing out.")
        logout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Sign In / Sign Up' }]
        });
    }

    return (
        <View>
            <View>
                <View>
                    <Text>X Score: {xscore} </Text>
                    <Text>O Score: {oscore}</Text>
                    <Text>Ties: {ties}</Text>
                </View>
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
            <View>
                <TouchableOpacity
                    onPress={() => handleSignOut()}>
                        <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({

});

export default Profile;