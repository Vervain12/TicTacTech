import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { useUserAuth } from '../context/authcontext';
import { addUser } from '../services/game-score-services';

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
            //alert("Account Created" + newUser.uid);
            setUser(newUser);
            addUser(newUser.uid);
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
                    <View style={styles.button1_box}>
                        <View style={styles.button1_vis}>
                            <TouchableOpacity onPress={handleSignIn}>
                                <Text style={styles.button1_txt}>
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.button2_box}>
                        <View style={styles.button2_vis}>
                            <TouchableOpacity onPress={handleSignUpVisibility}>
                                <Text style={styles.button2_txt}>
                                    Go to Sign up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                :
                <View>
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
                    </View>
                    <View style={styles.button1_box}>
                        <View style={styles.button1_vis}>
                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={styles.button1_txt}>
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.button2_box}>
                        <View style={styles.button2_vis}>
                            <TouchableOpacity onPress={handleSignUpVisibility}>
                                <Text style={styles.button2_txt}>
                                    Go to Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>    
                }
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
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      top: '175%',
      width:'auto',
      borderRadius: 10
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
    button1_box: {
        position: 'absolute',
        flexShrink: 0,
        top: '300%',
        height: 50,
        left: '22.5%',
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
        top: '375%',
        height: 50,
        left: '22.5%',
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

export default SignIn;