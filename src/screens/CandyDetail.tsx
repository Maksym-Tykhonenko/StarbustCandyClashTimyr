// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
//
// export default function CandyDetail({ route, navigation }) {
//     const { candy } = route.params;
//
//     return (
//         <ScrollView style={styles.container}>
//             <Image
//                 source={candy.image}
//                 style={styles.image}
//             />
//
//             <Image source={require('../assets/img/Group2.png')} style={{ position: 'absolute', top: 300, width: 450 }} />
//             <View style={styles.tag}>
//                 <Text style={styles.tagText}>{candy.type}</Text>
//             </View>
//
//             <View style={styles.details}>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Type</Text>
//                     <Text style={styles.value}>{candy.type} candy</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Origin</Text>
//                     <Text style={styles.value}>{candy.origin}</Text>
//                 </View>
//                 <View style={styles.row}>
//                     <Text style={styles.label}>Flavor combinations</Text>
//                     <Text style={styles.value}>{candy.flavors}</Text>
//                 </View>
//             </View>
//
//             <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
//                 <Text style={styles.buttonText}>Back</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#0e0e0e',
//         flex: 1,
//     },
//     image: {
//         width: '100%',
//         height: 450,
//         zIndex: 99,
//         resizeMode: 'cover',
//     },
//     tag: {
//         position: 'absolute',
//         top: 16,
//         left: 16,
//         backgroundColor: '#00000099',
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 8,
//     },
//     tagText: {
//         color: 'white',
//         fontWeight: '500',fontFamily: 'Dancing Script',
//     },
//     details: {
//         padding: 20,
//     },
//     row: {
//         marginBottom: 16,
//     },
//     label: {
//         color: '#aaa',fontFamily: 'Dancing Script',
//         fontSize: 14,
//         marginBottom: 4,
//     },
//     value: {
//         color: 'white',
//         fontSize: 16,fontFamily: 'Dancing Script',
//         fontWeight: '600',
//     },
//     button: {
//         backgroundColor: '#7c3aed',
//         marginHorizontal: 20,
//         marginBottom: 40,
//         paddingVertical: 14,
//         borderRadius: 30,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: 'white',fontFamily: 'Dancing Script',
//         fontWeight: '600',
//         fontSize: 16,
//     },
// });

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

// --- Type Definitions ---
interface Candy {
    name: string;
    image: string | number; // Image can be a URI string or a require'd number
    origin: string;
    type: string;
    flavors: string;
}

interface CandyDetailRouteParams {
    candy: Candy;
}

interface CandyDetailProps {
    route: {
        params: CandyDetailRouteParams;
    };
    navigation: any; // Use a more specific navigation type if you have one defined
}

const { width, height } = Dimensions.get('window'); // Get screen dimensions for responsive styling

// --- Main Component ---
export default function CandyDetail({ route, navigation }: CandyDetailProps): React.JSX.Element {
    const { candy } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={typeof candy.image === 'string' ? { uri: candy.image } : candy.image}
                    style={styles.image}
                    resizeMode="cover"
                />
                {/* Overlay for gradient or textured effect, positioned relative to image */}
                <Image
                    source={require('../assets/img/Group2.png')} // Your background texture/gradient
                    style={styles.imageOverlay}
                    resizeMode="cover"
                />

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/img/weui_arrow-filled.png')} // Your back arrow icon
                        style={styles.backIcon}
                    />
                </TouchableOpacity>

                <View style={styles.nameTag}>
                    <Text style={styles.nameTagText}>{candy.name}</Text>
                </View>

                <View style={styles.typeTag}>
                    <Text style={styles.typeTagText}>{candy.type}</Text>
                </View>
            </View>


            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Candy Type</Text>
                    <Text style={styles.value}>{candy.type} candy</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Origin</Text>
                    <Text style={styles.value}>{candy.origin}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Key Flavors</Text>
                    <Text style={styles.value}>{candy.flavors}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 40 }} />
        </ScrollView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Deep Space Blue for background
    },
    imageContainer: {
        width: '100%',
        height: height * 0.55, // Image takes up 55% of screen height
        position: 'relative',
        marginBottom: 20,
        borderBottomLeftRadius: 30, // Rounded bottom corners for the image container
        borderBottomRightRadius: 30,
        overflow: 'hidden', // Ensures rounded corners clip content
        shadowColor: '#000', // Strong shadow for the image section
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 25,
    },
    image: {
        width: '100%',
        height: '100%', // Image fills its container
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.2, // Subtle overlay to blend with background
        zIndex: 1, // Place it above the main image but below text/buttons
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100, // Ensure it's on top
        backgroundColor: 'rgba(124, 58, 237, 0.4)', // Semi-transparent purple
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#e0b2ff', // Light purple for arrow
    },
    nameTag: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20, // Allow it to span most of the width
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker, more prominent background
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
        zIndex: 50, // Above overlay, below back button
    },
    nameTagText: {
        color: '#ffc83c', // Golden yellow for candy name
        fontFamily: 'Dancing Script',
        fontSize: 34, // Larger font for the main candy name
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'center',
    },
    typeTag: {
        position: 'absolute',
        top: 60, // Adjust position based on back button
        right: 20,
        backgroundColor: 'rgba(124, 58, 237, 0.6)', // Semi-transparent purple for type tag
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 6,
        zIndex: 50,
    },
    typeTagText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Dancing Script',
        fontSize: 18,
    },
    detailsContainer: {
        paddingHorizontal: 25, // More horizontal padding
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#1a1a2e', // Match container background
    },
    detailRow: {
        marginBottom: 20, // More space between detail rows
        backgroundColor: 'rgba(46, 46, 74, 0.7)', // Semi-transparent background for each detail row
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle border
    },
    label: {
        color: '#b0b0c4', // Muted white for labels
        fontFamily: 'Dancing Script',
        fontSize: 18, // Larger label font
        marginBottom: 8,
        fontWeight: '600',
    },
    value: {
        color: '#f0f0f0', // Off-white for values
        fontSize: 20, // Larger value font
        fontFamily: 'Dancing Script',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ff6b6b', // Vibrant Coral Red for the button
        marginHorizontal: 25, // Match container padding
        marginBottom: 40,
        paddingVertical: 16, // More vertical padding
        borderRadius: 30, // Highly rounded
        alignItems: 'center',
        shadowColor: '#ff6b6b', // Matching glow shadow
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 18,
        borderWidth: 1,
        borderColor: '#ffd1dc', // Light pink border
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Dancing Script',
        fontWeight: 'bold',
        fontSize: 22, // Larger button text
        textTransform: 'uppercase', // Uppercase for emphasis
        letterSpacing: 1,
    },
});
