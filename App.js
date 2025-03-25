import { SymbolProvider, useSymbolPicker } from "./context/symbolcontext";
import { UserProvider } from "./context/authcontext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Game from "./app/game";
import Profile from "./app/profile";
import Home from "./app/home";
import Play from "./app/play";
import SignIn from "./app/signIn";

const App = () => {
    const Stack = createStackNavigator();
    
    return(
        <UserProvider>
            <SymbolProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Sign In / Sign Up" component={SignIn}/>
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="Game" component={Game}/>
                        <Stack.Screen name="Profile" component={Profile}/>
                        <Stack.Screen name="Play" component={Play}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SymbolProvider>
        </UserProvider>
    )
}

export default App;