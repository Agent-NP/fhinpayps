 import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import Offline from '../screen/Offlne';
import Blank from '../screen/Blank';
import Welcome from '../screen/Welcome';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ title: 'Welcome', headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home', headerShown: false }}
                />
                <Stack.Screen
                    name="Offline"
                    component={Offline}
                    options={{ title: 'Offline', headerShown: false }}
                />
                <Stack.Screen
                    name="Blank"
                    component={Blank}
                    options={{ title: 'Blank', headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;