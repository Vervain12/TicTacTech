import { StyleSheet, Text, View, TextInput, TouchableOpacity, ButtonProps, Button, Image} from 'react-native';
import { useSymbolPicker } from '../context/symbolcontext';
import { useUserAuth } from '../context/authcontext';

const Profile = ({navigation}) =>  {
    const { xSymbol, oSymbol, pickXSymbol, pickOSymbol} = useSymbolPicker();
    const { user, logout } = useUserAuth();

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
        </View>
    );
}

const styles = StyleSheet.create ({

});

export default Profile;