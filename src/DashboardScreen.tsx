import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const dashboardIcon = require('./Assets/Menu1.png');
const profileIcon = require('./Assets/profile.png.png');
const settingsIcon = require('./Assets/Menu2.png');
const notificationsIcon = require('./Assets/4.png');
const moreIcon = require('./Assets/5.png');

const DashboardComponent: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard Screen</Text>
  </View>
);


const SettingsScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);

const NotificationsScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Notifications Screen</Text>
  </View>
);

const MoreScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>More Screen</Text>
  </View>
);

const createTabOptions = (
  icon: any,
  label: string,
  size: number = 25,
  tintFocused: string = 'blue',
  tintUnfocused: string = 'gray'
) => ({
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <Image
      source={icon}
      style={{
        width: size,
        height: size,
        tintColor: focused ? tintFocused : tintUnfocused,
        marginTop: 10
      }}
    />
  ),
  headerShown: false,
  tabBarLabel: '',
});

const DashboardScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardComponent}
        options={createTabOptions(dashboardIcon, 'Dashboard')}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={createTabOptions(settingsIcon, 'Settings')}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={createTabOptions(profileIcon, 'Profile', 30)}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={createTabOptions(notificationsIcon, 'Notifications')}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={createTabOptions(moreIcon, 'More', 25, 'blue', 'gray')}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
