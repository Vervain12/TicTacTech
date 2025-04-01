import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSymbolPicker } from '../context/symbolcontext';
import { useUserAuth } from '../context/authcontext';
import { getScore } from '../services/game-score-services';
import { useEffect, useState } from 'react';

const Profile = ({ navigation }) => {
    const { xSymbol, oSymbol, pickXSymbol, pickOSymbol } = useSymbolPicker();
    const { user, logout } = useUserAuth();
    const [oscore, setOScore] = useState(0);
    const [ties, setTies] = useState(0);
    const [xscore, setXScore] = useState(0);

    useEffect(() => {
        const handleGetScores = async () => {
            try {
                const [oscore, ties, xscore] = await getScore(user.uid);
                setOScore(oscore.score);
                setTies(ties.score);
                setXScore(xscore.score);
            } catch (e) {
                console.error("Error:" + e);
            }
        };
        handleGetScores();
    }, []);

    const handleSignOut = async () => {
        alert("Signing out.");
        logout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Sign In / Sign Up' }],
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>X Score: {xscore} </Text>
                <Text style={styles.scoreText}>O Score: {oscore}</Text>
                <Text style={styles.scoreText}>Ties: {ties}</Text>
            </View>
            
            <View style={styles.symbolContainer}>
                <TouchableOpacity onPress={pickXSymbol} style={styles.symbolBox}>
                    <Text style={styles.symbolText}>{xSymbol}</Text>
                    <Text style={styles.label}>Player 1 (X)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickOSymbol} style={styles.symbolBox}>
                    <Text style={styles.symbolText}>{oSymbol}</Text>
                    <Text style={styles.label}>Player 2 (O)</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    scoreContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    symbolContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    symbolBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    symbolText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    label: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    signOutButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    signOutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Profile;
