// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
//
// export default function SweetDetailScreen({ route, navigation }) {
//     const { title, image, content } = route.params;
//
//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                    <Image  source={require('../assets/img/weui_arrow-filled.png')} />
//                 </TouchableOpacity>
//
//             </View>
//             <Image source={image} style={styles.image} />
//             <Text style={styles.title}>{title}</Text>
//             <Text style={styles.content}>{content}</Text>
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: { backgroundColor: '#111' },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 16,
//         alignItems: 'center',
//         paddingTop: 50,
//         backgroundColor: '#111',
//     },
//     image: { width: '100%', height: 250, resizeMode: 'cover' },
//     title: {
//         color: '#fff',
//         fontSize: 22,
//         fontWeight: 'bold',
//         padding: 16,
//         fontFamily: 'Dancing Script',
//         paddingBottom: 0,
//     },
//     content: {
//         color: '#ddd',
//         fontSize: 16,
//         fontFamily: 'Dancing Script',
//         paddingHorizontal: 16,
//         paddingTop: 10,
//         paddingBottom: 30,
//     },
// });

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

// Define the interface for the route parameters
interface SweetDetailRouteParams {
    title: string;
    image: string | number; // Image can be a URI string or a require'd number
    content: string;
}

// Explicitly type the props for the functional component
interface SweetDetailScreenProps {
    route: {
        params: SweetDetailRouteParams;
    };
    navigation: any; // Use a more specific navigation type if you have one defined in your project
}

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

export default function SweetDetailScreen({ route, navigation }: SweetDetailScreenProps): React.JSX.Element {
    const { title, image, content } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image
                        source={require('../assets/img/weui_arrow-filled.png')} // Your arrow icon
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                {/* Optional: Add a screen title in the header if desired */}
                {/* <Text style={styles.headerTitle}>{title}</Text> */}
            </View>

            <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>

            <View style={{ marginBottom: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Deep Space Blue background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Align back button to the start
        paddingHorizontal: 20, // More horizontal padding
        paddingTop: 50,
        paddingBottom: 15, // Add some bottom padding to the header
        backgroundColor: '#1a1a2e', // Match container background
        borderBottomWidth: StyleSheet.hairlineWidth, // Subtle line at the bottom of header
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    backButton: {
        padding: 8, // Make the touchable area larger
        borderRadius: 20,
        backgroundColor: 'rgba(124, 58, 237, 0.2)', // Semi-transparent purple background
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#e0b2ff', // Light purple tint for the arrow
    },
    // headerTitle: { // Optional: Style for a title in the header
    //     color: '#f0f0f0',
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     fontFamily: 'Dancing Script',
    //     marginLeft: 20,
    // },
    image: {
        width: '100%',
        height: width * 0.65, // Responsive image height (e.g., 65% of screen width)
        resizeMode: 'cover',
        borderBottomLeftRadius: 25, // Rounded bottom corners for the image
        borderBottomRightRadius: 25,
        marginBottom: 20, // Space below the image
        shadowColor: '#000', // Image shadow for depth
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 15,
    },
    contentContainer: {
        paddingHorizontal: 20, // Consistent horizontal padding for content
    },
    title: {
        color: '#ffc83c', // Golden yellow for the candy title
        fontSize: 30, // Larger title
        fontWeight: 'bold',
        fontFamily: 'Dancing Script',
        marginBottom: 10, // Space below title
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    content: {
        color: '#f0f0f0', // Off-white for content text
        fontSize: 18, // Slightly larger content font
        fontFamily: 'Dancing Script',
        lineHeight: 28, // Improved line height for readability
        textAlign: 'justify', // Justify text for a clean block
    },
});
