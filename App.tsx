import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import DashboardScreen from './src/DashboardScreen';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown:false}} 
        />
        <Stack.Screen options={{headerShown:false}}  name="Signup" component={SignupScreen} />
        <Stack.Screen  options={{headerShown:false}} name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
