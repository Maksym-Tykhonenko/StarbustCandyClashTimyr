// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     Image,
//     TouchableOpacity,
//     ImageBackground,
// } from 'react-native';
// import { useSelector } from 'react-redux';
//
// export default function FavoritesScreen({ navigation }) {
//     const favorites = useSelector(state => state.favorites);
//
//     return (
//         <ImageBackground
//             source={require('../assets/img/Group2.png')}
//             style={styles.background}
//             resizeMode="cover"
//         >
//             <ScrollView contentContainerStyle={styles.container}>
//                 <Text style={styles.title}>Favorites</Text>
//
//                 {favorites.length === 0 ? (
//                     <Text style={styles.emptyText}>You have no favorite candies yet 🍬</Text>
//                 ) : (
//                     favorites.map((candy, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             style={styles.card}
//                             onPress={() => navigation.navigate('CandyDetail', { candy })}
//                         >
//                             {candy.image && (
//                                 <Image
//                                     source={typeof candy.image === 'string' ? { uri: candy.image } : candy.image}
//                                     style={styles.image}
//                                 />
//                             )}
//                             <Text style={styles.candyName}>{candy.name}</Text>
//                         </TouchableOpacity>
//                     ))
//                 )}
//                 <View style={{ marginBottom: 120 }} />
//             </ScrollView>
//         </ImageBackground>
//     );
// }
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         backgroundColor: '#1e1e1e'
//     },
//     container: {
//         padding: 16,
//         paddingTop: 60,
//     },
//     title: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: 'white',
//         fontFamily: 'Dancing Script',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     card: {
//         backgroundColor: '#333',
//         borderRadius: 14,
//         padding: 10,
//         marginBottom: 20,
//         overflow: 'hidden',
//     },
//     image: {
//         width: '100%',
//         height: 180,
//         borderRadius: 10,
//         marginBottom: 10,
//     },
//     candyName: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '600',
//         fontFamily: 'Dancing Script',
//         textAlign: 'center',
//     },
//     emptyText: {
//         color: 'white',
//         fontFamily: 'Dancing Script',
//         fontSize: 18,
//         fontStyle: 'italic',
//         textAlign: 'center',
//         marginTop: 50,
//     },
// });

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions, // Import Dimensions for responsive styling
} from 'react-native';
import { useSelector } from 'react-redux';

// Define interfaces for type safety
interface Candy {
    name: string;
    image: string | number; // image can be a URI string or a require'd number
    origin: string; // Add if missing in your actual data structure
    type: string;   // Add if missing
    flavors: string; // Add if missing
}

interface RootState {
    favorites: Candy[];
}

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

export default function FavoritesScreen({ navigation }: { navigation: any }) {
    const favorites = useSelector((state: RootState) => state.favorites);

    return (
        <ImageBackground
            source={require('../assets/img/Group2.png')} // Ensure this path is correct for your background
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Your Sweet Favorites</Text>

                {favorites.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No sweet treasures here yet!
                        </Text>
                        <Image
                            source={require('../assets/img/game/896d323604b66fc8bfa128b4783fd74df985dc53.png')} // A cute empty heart icon
                            style={styles.emptyIcon}
                        />
                        <TouchableOpacity
                            style={styles.browseButton}
                            onPress={() => navigation.navigate('Home')} // Navigate back to the main list
                        >
                            <Text style={styles.browseButtonText}>Discover Candies</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    favorites.map((candy, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() => navigation.navigate('CandyDetail', { candy })}
                        >
                            {candy.image && (
                                <Image
                                    source={typeof candy.image === 'string' ? { uri: candy.image } : candy.image}
                                    style={styles.image}
                                />
                            )}
                            <Text style={styles.candyName}>{candy.name}</Text>
                        </TouchableOpacity>
                    ))
                )}
                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        // The background color from the previous screen can act as a fallback if the image fails to load
        backgroundColor: '#1a1a2e',
    },
    container: {
        flexGrow: 1, // Allows content to grow and enables scrolling
        paddingHorizontal: 20, // Increased horizontal padding
        paddingTop: 60,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#ffc83c', // Golden yellow for a premium look
        fontFamily: 'Dancing Script', // Keep this if you have the custom font
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.4)', // Subtle shadow for depth
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        letterSpacing: 1, // Slight letter spacing for elegance
    },
    card: {
        backgroundColor: 'rgba(46, 46, 74, 0.85)', // Darker Blue/Purple with slight transparency
        borderRadius: 20, // More rounded corners
        padding: 15, // Increased padding
        marginBottom: 25, // More space between cards
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 }, // More pronounced shadow
        shadowOpacity: 0.45,
        shadowRadius: 10,
        elevation: 15,
        borderWidth: 1,
        borderColor: 'rgba(124, 58, 237, 0.3)', // A subtle border using a purple tint
        alignItems: 'center', // Center content within the card
    },
    image: {
        width: '100%',
        height: width * 0.5, // Responsive image height
        borderRadius: 15, // Match card roundedness
        marginBottom: 15, // More space below image
        resizeMode: 'cover',
        borderWidth: 2, // A small border around the image
        borderColor: 'rgba(255, 200, 60, 0.5)', // Gold border for images
    },
    candyName: {
        color: '#f0f0f0', // Off-white for text
        fontSize: 24, // Larger font size
        fontWeight: '700', // Bolder text
        fontFamily: 'Dancing Script',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    emptyContainer: {
        flex: 1, // Occupy available space
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.2, // Dynamic margin from top
        backgroundColor: 'rgba(46, 46, 74, 0.7)', // Semi-transparent background for empty state
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 12,
        marginHorizontal: 10, // Add some horizontal margin
    },
    emptyText: {
        color: '#e0b2ff', // Light purple for empty text
        fontFamily: 'Dancing Script',
        fontSize: 22,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 30, // Better line height
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    emptyIcon: {
        width: 80, // Size for the icon
        height: 80,
        // tintColor: '#ff6b6b', // Red tint for the heart
        marginBottom: 30,
        opacity: 0.8, // Slightly transparent
    },
    browseButton: {
        backgroundColor: '#7c3aed', // Purple button
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    browseButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'Dancing Script', // Apply custom font if available
    },
});
