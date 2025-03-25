import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { useUserAuth } from '../context/authcontext';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpToggle, setSignUpToggle] = useState(false);
    const { user, setUser, signUp, signIn } = useUserAuth();

    const handleSignUpVisibility = () => {
        setSignUpToggle(!signUpToggle);
    }
   
    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert('Error', 'Please enter both email and password');
            return;
        }
        const newUser = await signUp(email, password);
        if (newUser) {
            alert("Account Created");
            setUser(loggedInUser);
            navigation.navigate('Home');
        }
    }

    const handleSignIn = async (event) => {
        event.preventDefault();
        const loggedInUser = await signIn(email, password);
        if (loggedInUser) {
            setUser(loggedInUser);
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        if(user && navigation.getState().routes[navigation.getState().index].name !== 'Sign In / Sign Up'){
            navigation.navigate('Home');        
        }
    },[user])

    return (
        <View>
            {signUpToggle ?
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Sign In" onPress={handleSignIn} />
               <View>
                    <Button title="Go to Sign Up" onPress={handleSignUpVisibility}/>
               </View>
            </View>
            :
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Sign Up" onPress={handleSignUp} />
                <View>
                    <Button title="Go to Sign In" onPress={handleSignUpVisibility}/>
                </View>
            </View>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    }
});

export default SignIn;