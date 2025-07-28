import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet, Dimensions } from 'react-native';

// Import your screens (assuming these paths are correct)
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SweetFactsScreen from '../screens/SweetFactsScreen';
import StartScreen from '../screens/StartScreen';

// --- Type Definitions ---
// Define the type for the route object passed to screenOptions and tabBarIcon
interface TabRoute {
    key: string;
    name: string;
    path?: string;
    params?: object;
}

interface TabBarIconProps {
    focused: boolean;
    color: string;
    size: number;
}

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window'); // Get screen width for responsive styling

// --- Helper Function for Tab Icons ---
const getTabIcon = (routeName: string): number => { // Returns a number for `require`'d images
    switch (routeName) {
        case 'Home':
            return require('../assets/img/material-symbols_home-rounded.png');
        case 'StartScreen': // This is for the game screen
            return require('../assets/img/icon-park-solid_game.png');
        case 'SweetFactsScreen': // Corresponds to 'MyCollectionScreen' in original, but using SweetFactsScreen component
            return require('../assets/img/material-symbols_book.png');
        case 'SettingsScreen':
            return require('../assets/img/iconamoon_settings-fill.png');
        default:
            // Fallback icon, ensure it exists
            return require('../assets/img/material-symbols_book.png');
    }
};

// --- Main Tab Navigator Component ---
const MainTabNavigator = (): React.JSX.Element => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Hide header for all tab screens
                tabBarLabel: '', // Hide default text label
                tabBarStyle: styles.tabBarStyle, // Apply the main tab bar style
                tabBarIcon: ({ focused }: TabBarIconProps) => (
                    <View
                        style={[
                            styles.iconContainer,
                            focused && styles.focusedIconContainer, // Apply focused background style
                        ]}
                    >
                        <Image
                            source={getTabIcon(route.name)}
                            style={[
                                styles.icon,
                                focused ? styles.focusedIcon : styles.unfocusedIcon, // Apply focused/unfocused tint color
                            ]}
                            resizeMode="contain"
                        />
                    </View>
                ),
            })}
        >
            {/* Define your Tab Screens */}
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="SweetFactsScreen" component={SweetFactsScreen} />
            <Tab.Screen name="StartScreen" component={StartScreen} />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
            {/* If you have a separate MyCollectionScreen, add it here */}
            {/* <Tab.Screen name="MyCollectionScreen" component={MyCollectionScreen} /> */}
        </Tab.Navigator>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 25, // Slightly higher from the bottom
        left: '10%', // 5% from left
        marginLeft: '5%',
        // right: width * 0.05, // 5% from right
        width: '90%', // 90% width of the screen
        height: 75, // Slightly taller for better icon visibility
        backgroundColor: 'rgba(46, 46, 74, 0.95)', // Semi-transparent dark blue/purple
        borderRadius: 40, // More rounded, pill-like shape
        shadowColor: '#000', // Stronger shadow for depth
        shadowOffset: {
            width: 0,
            height: 12, // More vertical shadow
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24, // Higher elevation for Android shadow
        paddingVertical: 10, // Add vertical padding
        alignItems: 'center', // Center items vertically within the bar
        justifyContent: 'space-around', // Distribute icons evenly
    },
    iconContainer: {
        flex: 1, // Allow container to expand
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8, // Padding around the icon
        marginTop: 20,
        borderRadius: 20, // Rounded background for the icon
        transitionProperty: 'background-color', // Enable transition for background
        transitionDuration: '0.3s', // Smooth transition
    },
    focusedIconContainer: {
        backgroundColor: 'rgba(124, 58, 237, 0.3)', // Semi-transparent purple background when focused
        transform: [{ scale: 1.1 }], // Slightly scale up the focused icon container
        shadowColor: '#7c3aed', // Add a subtle glow
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
    },
    icon: {
        width: 30, // Slightly larger icons
        height: 30,
        transitionProperty: 'tint-color', // Enable transition for tint color
        transitionDuration: '0.3s', // Smooth transition
    },
    focusedIcon: {
        tintColor: '#e0b2ff', // Light purple tint for focused icon
    },
    unfocusedIcon: {
        tintColor: '#b0b0c4', // Muted white tint for unfocused icon
    },
});

export default MainTabNavigator;
