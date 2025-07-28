// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     Switch,
//     TouchableOpacity,
//     ImageBackground,
//     StyleSheet,
//     Linking,
//     Alert
// } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { clear } from '../redux/slices/myCandiesSlice';
// import { resetBestScore } from '../redux/slices/bestScoreSlice';
//
// export default function SettingsScreen({ navigation }) {
//     const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//     const dispatch = useDispatch();
//
//
//     const handleClear = () => {
//         dispatch(clear());
//         dispatch(resetBestScore());
//         Alert.alert('Success', 'Candy history and best score have been cleared.');
//     };
//
//     return (
//         <ImageBackground
//             source={require('../assets/img/Group2.png')}
//             style={styles.background}
//             resizeMode="cover"
//         >
//             <Text style={styles.header}>Settings</Text>
//
//             <TouchableOpacity
//                 style={styles.option}
//                 onPress={() =>
//                     Linking.openURL('https://www.termsfeed.com/live/e9074aa3-be4c-44dd-bad0-201d961cabe9')
//                 }
//             >
//                 <Text style={styles.optionText}>Privacy policy</Text>
//             </TouchableOpacity>
//
//             <TouchableOpacity
//                 style={styles.option}
//                 onPress={() => navigation.navigate('AboutDeveloperScreen')}
//             >
//                 <Text style={styles.optionText}>About Developer</Text>
//             </TouchableOpacity>
//
//             <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
//                 <Text style={styles.clearButtonText}>History clearing</Text>
//             </TouchableOpacity>
//         </ImageBackground>
//     );
// }
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         backgroundColor: '#141519',
//         padding: 20,
//         justifyContent: 'flex-start',
//     },
//     header: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         fontFamily: 'Dancing Script',
//         color: '#fff',
//         marginBottom: 20,
//         textAlign: 'center',
//         marginTop: 20,
//     },
//     option: {
//         backgroundColor: '#2E2E2E',
//         borderRadius: 12,
//         padding: 15,
//         marginBottom: 15,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     optionText: {
//         color: '#fff',
//         fontFamily: 'Dancing Script',
//         fontSize: 22,
//     },
//     clearButton: {
//         backgroundColor: '#FF3B30',
//         borderRadius: 16,
//         padding: 16,
//         marginBottom: 105,
//         alignItems: 'center',
//         marginTop: 'auto',
//     },
//     clearButtonText: {
//         color: '#fff',
//         fontFamily: 'Dancing Script',
//         fontWeight: 'bold',
//         fontSize: 18,
//     },
// });

import React, { useState } from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Linking,
    Alert,
    Platform // Import Platform for OS-specific styling
} from 'react-native';
import { useDispatch } from 'react-redux';
import { clear } from '../redux/slices/myCandiesSlice'; // Assuming correct path
import { resetBestScore } from '../redux/slices/bestScoreSlice'; // Assuming correct path

// Explicitly type the props for the functional component
interface SettingsScreenProps {
    navigation: any; // Use a more specific navigation type if you have one defined
}

export default function SettingsScreen({ navigation }: SettingsScreenProps): React.JSX.Element {
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true); // Explicitly type useState
    const dispatch = useDispatch();

    const handleClearHistory = (): void => { // Type the function and its return
        Alert.alert(
            'Confirm Clear',
            'Are you sure you want to clear all candy history and reset your best score? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Clear All',
                    onPress: () => {
                        dispatch(clear());
                        dispatch(resetBestScore());
                        Alert.alert('Success', 'Candy history and best score have been cleared! 🗑️');
                    },
                    style: 'destructive', // Make the clear option stand out as destructive
                },
            ],
            { cancelable: false }
        );
    };

    const toggleNotifications = (): void => {
        setNotificationsEnabled(previousState => !previousState);
        // Here you would typically integrate with a notification service
        // e.g., send an action to a Redux slice or an API call to update user preferences
        Alert.alert(
            'Notifications',
            notificationsEnabled ? 'Notifications disabled.' : 'Notifications enabled.'
        );
    };

    return (
        <ImageBackground
            source={require('../assets/img/Group2.png')} // Ensure this path is correct for your background
            style={styles.background}
            resizeMode="cover"
        >
            <Text style={styles.header}>App Settings</Text>

            <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>General</Text>

                <View style={styles.option}>
                    <Text style={styles.optionText}>Enable Notifications</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }} // Default values for track colors
                        thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'} // Gold thumb when enabled
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleNotifications}
                        value={notificationsEnabled}
                        style={Platform.OS === 'ios' ? styles.iosSwitch : null} // Apply specific style for iOS switch
                    />
                </View>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() =>
                        Linking.openURL('https://www.termsfeed.com/live/e9074aa3-be4c-44dd-bad0-201d961cabe9').catch(err =>
                            Alert.alert('Error', "Could not open privacy policy. Please try again later.")
                        )
                    }
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>Privacy Policy</Text>
                    <Text style={styles.arrowIcon}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('AboutDeveloperScreen')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>About the Developer</Text>
                    <Text style={styles.arrowIcon}>›</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Data Management</Text>
                <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory} activeOpacity={0.7}>
                    <Text style={styles.clearButtonText}>Clear Candy History & Score</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Deep Space Blue
        paddingHorizontal: 20, // Increased horizontal padding
        paddingTop: 60, // More top padding
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 34, // Larger header
        fontWeight: 'bold',
        fontFamily: 'Dancing Script',
        color: '#ffc83c', // Golden yellow for header
        marginBottom: 30, // More space below header
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    settingsSection: {
        marginBottom: 30, // Space between sections
        backgroundColor: 'rgba(46, 46, 74, 0.7)', // Semi-transparent section background
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 12,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Dancing Script',
        color: '#e0b2ff', // Light purple for section titles
        marginBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth, // Subtle underline
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 8,
    },
    option: {
        backgroundColor: 'rgba(30, 30, 46, 0.8)', // Slightly darker, more transparent option background
        borderRadius: 12,
        paddingVertical: 18, // More vertical padding
        paddingHorizontal: 15,
        marginBottom: 12, // Space between options
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000', // Subtle shadow for options
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
    },
    optionText: {
        color: '#f0f0f0', // Off-white for option text
        fontFamily: 'Dancing Script',
        fontSize: 20, // Larger font size for options
        flex: 1, // Allow text to take up space and wrap
    },
    arrowIcon: {
        fontSize: 24, // Size for the arrow icon
        color: '#e0b2ff', // Light purple for arrow
        fontWeight: 'bold',
        marginLeft: 10, // Space from text
    },
    iosSwitch: { // Specific styling for iOS Switch thumb/track colors if needed
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], // Slightly smaller on iOS
    },
    clearButton: {
        backgroundColor: '#ff6b6b', // Vibrant Coral Red for clear button
        borderRadius: 15,
        paddingVertical: 18,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 20, // Margin from the section title
        shadowColor: '#ff6b6b', // Matching glow shadow
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15,
    },
    clearButtonText: {
        color: 'white',
        fontFamily: 'Dancing Script',
        fontWeight: 'bold',
        fontSize: 22, // Larger text for clear button
        textTransform: 'uppercase', // Uppercase for emphasis
        letterSpacing: 1,
    },
});
