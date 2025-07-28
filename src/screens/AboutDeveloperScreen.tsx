// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
//
// export default function AboutDeveloperScreen() {
//     return (
//         <ScrollView style={styles.container}>
//             <Image
//                 source={require('../assets/img/game/Imgопі2.png')}
//                 style={styles.avatar}
//             />
//
//             <Text style={styles.name}>John Hawk</Text>
//             <Text style={styles.role}>React Native Developer</Text>
//
//             <View style={styles.section}>
//                 <Text style={styles.heading}>About Me</Text>
//                 <Text style={styles.text}>
//                     I'm a passionate React Native developer with over 3 years of experience building beautiful and performant mobile applications.
//                     I enjoy creating smooth user interfaces and writing clean, maintainable code.
//                 </Text>
//             </View>
//
//             <View style={styles.section}>
//                 <Text style={styles.heading}>Skills</Text>
//                 <Text style={styles.text}>• React Native</Text>
//                 <Text style={styles.text}>• Redux / Zustand</Text>
//                 <Text style={styles.text}>• TypeScript / JavaScript</Text>
//                 <Text style={styles.text}>• Firebase / REST APIs</Text>
//                 <Text style={styles.text}>• UI/UX Design</Text>
//             </View>
//
//             <View style={styles.section}>
//                 <Text style={styles.heading}>Contact</Text>
//                 <Text style={styles.text}>📧 john.doe@example.com</Text>
//                 <Text style={styles.text}>💼 github.com/johndoe</Text>
//                 <Text style={styles.text}>🌐 portfolio.dev/johndoe</Text>
//             </View>
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212',
//         padding: 20,
//     },
//     avatar: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         alignSelf: 'center',
//         marginTop: 30,
//         marginBottom: 16,
//     },
//     name: {
//         color: 'white',
//         fontFamily: 'Dancing Script',
//         fontSize: 22,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     role: {
//         color: '#aaa',
//         fontSize: 16,
//         fontFamily: 'Dancing Script',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     section: {
//         marginVertical: 16,
//     },
//     heading: {
//         color: '#7c3aed',
//         fontFamily: 'Dancing Script',
//         fontSize: 28,
//         fontWeight: '600',
//         marginBottom: 8,
//     },
//     text: {
//         color: 'white',
//         fontSize: 22,
//         fontFamily: 'Dancing Script',
//         marginBottom: 4,
//     },
// });

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

// Define an interface for the component's props if it were to receive any,
// but for a static screen like this, it's not strictly necessary.
// We'll define types for internal data if needed.

export default function AboutDeveloperScreen(): React.JSX.Element { // Explicitly type the return
    // Function to handle opening links
    const handleLinkPress = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/img/game/Imgопі2.png')} // Ensure this path is correct
                    style={styles.avatar}
                />
                <Text style={styles.name}>John Hawk</Text>
                <Text style={styles.role}>React Native Developer</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>About Me</Text>
                <Text style={styles.paragraph}>
                    I'm a **passionate React Native developer** with over **3 years of experience**
                    building beautiful and performant mobile applications. I thrive on
                    creating **smooth user interfaces** and writing **clean, maintainable code**
                    that stands the test of time. My goal is to craft engaging digital
                    experiences that users love.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>Core Skills</Text>
                <View style={styles.skillsContainer}>
                    <Text style={styles.skillItem}>• React Native</Text>
                    <Text style={styles.skillItem}>• Redux / Zustand</Text>
                    <Text style={styles.skillItem}>• TypeScript / JavaScript</Text>
                    <Text style={styles.skillItem}>• Firebase / REST APIs</Text>
                    <Text style={styles.skillItem}>• UI/UX Design Principles</Text>
                    <Text style={styles.skillItem}>• Git & Version Control</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>Get in Touch</Text>
                <TouchableOpacity
                    style={styles.contactItem}
                    onPress={() => handleLinkPress('mailto:john.doe@example.com')}
                >
                    <Text style={styles.contactIcon}>📧</Text>
                    <Text style={styles.contactText}>john.doe@example.com</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.contactItem}
                    onPress={() => handleLinkPress('https://github.com/johndoe')}
                >
                    <Text style={styles.contactIcon}>💻</Text>
                    <Text style={styles.contactText}>github.com/johndoe</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.contactItem}
                    onPress={() => handleLinkPress('https://portfolio.dev/johndoe')}
                >
                    <Text style={styles.contactIcon}>🌐</Text>
                    <Text style={styles.contactText}>portfolio.dev/johndoe</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C2E', // Darker, more sophisticated background
        padding: 25, // Increased padding
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30, // More vertical space for header
        backgroundColor: '#2A2A4A', // Slightly lighter background for the header section
        borderRadius: 15,
        marginBottom: 30,
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 10,
    },
    avatar: {
        width: 130, // Slightly larger avatar
        height: 130,
        borderRadius: 65, // Perfect circle
        borderWidth: 3, // A thin border around avatar
        borderColor: '#7c3aed', // Purple border
        marginBottom: 18,
        shadowColor: '#7c3aed', // Glow effect for avatar
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    name: {
        color: '#E0B2FF', // Light purple for name
        fontFamily: 'Dancing Script',
        fontSize: 30, // Larger name
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    role: {
        color: '#B0B0C4', // Muted white for role
        fontSize: 18,
        fontFamily: 'Dancing Script',
        textAlign: 'center',
        marginTop: 5,
        letterSpacing: 0.5,
    },
    section: {
        marginVertical: 20, // More vertical margin between sections
        paddingHorizontal: 15, // Padding inside sections
        paddingVertical: 20,
        backgroundColor: '#2A2A4A', // Consistent section background
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    heading: {
        color: '#FFD700', // Gold color for headings
        fontFamily: 'Dancing Script',
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 15,
        borderBottomWidth: 1, // Underline effect
        borderBottomColor: 'rgba(255, 215, 0, 0.3)', // Semi-transparent gold underline
        paddingBottom: 8,
    },
    paragraph: {
        color: '#F0F0F0', // Off-white for body text
        fontSize: 18,
        fontFamily: 'Dancing Script',
        lineHeight: 28, // Better readability
        textAlign: 'justify', // Justify text for a cleaner look
    },
    skillsContainer: {
        flexDirection: 'column', // Stack skills vertically
    },
    skillItem: {
        color: '#F0F0F0',
        fontSize: 18,
        fontFamily: 'Dancing Script',
        marginBottom: 8,
        paddingLeft: 10, // Indent skills slightly
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(124, 58, 237, 0.2)', // Light purple background for contact items
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    contactIcon: {
        fontSize: 24, // Larger icons
        marginRight: 15, // Space between icon and text
        color: '#FFC0CB', // Pink for icons, just for fun
    },
    contactText: {
        color: '#F0F0F0',
        fontSize: 18,
        fontFamily: 'Dancing Script',
        textDecorationLine: 'underline', // Indicate clickable
        flexShrink: 1, // Allow text to wrap
    },
});
