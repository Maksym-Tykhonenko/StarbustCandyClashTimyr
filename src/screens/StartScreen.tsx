// import React from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
// import {useSelector} from 'react-redux';
//
// export default function StartScreen({ navigation }) {
//     const bestScore = useSelector(state => state.bestScore.bestScore);
//     return (
//         <ImageBackground
//             source={require('../assets/img/Group2.png')}
//             style={styles.background}
//             resizeMode="cover"
//         >
//             <Text style={styles.title}>Candy Crush Clash</Text>
//
//             <View style={styles.resultBox}>
//                 <Text style={styles.resultLabel}>Best result</Text>
//                 <Text style={styles.resultValue}>{bestScore}</Text>
//             </View>
//
//             <TouchableOpacity
//                 style={styles.playButton}
//                 onPress={() => navigation.navigate('CandyGameScreen')}
//             >
//                 <Text style={styles.playText}>Play</Text>
//             </TouchableOpacity>
//         </ImageBackground>
//     );
// }
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         padding: 24,
//         justifyContent: 'space-between',
//         backgroundColor: '#141519',
//         paddingBottom: 90,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 38,
//         fontFamily: 'Dancing Script',
//         fontWeight: 'bold',
//         color: '#fff',
//         alignSelf: 'flex-start',
//         marginTop: 40,
//     },
//     resultBox: {
//         backgroundColor: '#2E2E2E',
//         borderRadius: 20,
//         paddingVertical: 20,
//         paddingHorizontal: 40,
//         alignItems: 'center',
//     },
//     resultLabel: {
//         color: '#fff',
//         fontSize: 16,
//         fontFamily: 'Dancing Script',
//         fontWeight: 'bold',
//     },
//     resultValue: {
//         color: '#7A32F4',
//         fontFamily: 'Dancing Script',
//         fontSize: 32,
//         fontWeight: 'bold',
//     },
//     playButton: {
//         backgroundColor: '#7A32F4',
//         borderRadius: 20,
//         paddingVertical: 18,
//         paddingHorizontal: 80,
//         marginBottom: 40,
//     },
//     playText: {
//         color: '#fff',
//         fontFamily: 'Dancing Script',
//         fontWeight: 'bold',
//         fontSize: 28,
//     },
// });

import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

// Define the interface for your Redux state if it's not already global
interface BestScoreState {
    bestScore: number; // Assuming bestScore itself is a number
}

interface RootState {
    bestScore: BestScoreState;
}

// Explicitly type the props for the functional component
interface StartScreenProps {
    navigation: any; // Use a more specific navigation type if you have one defined
}

const { width, height } = Dimensions.get('window'); // Get screen dimensions for responsive styling

export default function StartScreen({ navigation }: StartScreenProps): React.JSX.Element {
    const bestScore = useSelector((state: RootState) => state.bestScore.bestScore);

    return (
        <ImageBackground
            source={require('../assets/img/Group2.png')} // Ensure this path is correct for your background
            style={styles.background}
            resizeMode="cover"
        >
            <Text style={styles.title}>Candy Crush Clash</Text>

            <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>Your Best Score</Text>
                <Text style={styles.resultValue}>{bestScore}</Text>
            </View>

            <TouchableOpacity
                style={styles.playButton}
                onPress={() => navigation.navigate('CandyGameScreen')}
                activeOpacity={0.7} // Add a subtle press effect
            >
                <Text style={styles.playText}>PLAY NOW!</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width, // Ensure background covers full width
        height: height, // Ensure background covers full height
        padding: 24,
        justifyContent: 'space-around', // Distribute space more evenly
        backgroundColor: '#1a1a2e', // Deep Space Blue fallback
        alignItems: 'center',
    },
    title: {
        fontSize: width * 0.1, // Responsive font size
        fontFamily: 'Dancing Script',
        fontWeight: 'bold',
        color: '#ffc83c', // Golden yellow for a striking title
        textShadowColor: 'rgba(0, 0, 0, 0.7)', // Stronger shadow for game title
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 8,
        textAlign: 'center', // Center align the title
        marginTop: height * 0.08, // Dynamic top margin
        letterSpacing: 1.5, // Slightly more letter spacing
    },
    resultBox: {
        backgroundColor: 'rgba(46, 46, 74, 0.7)', // Semi-transparent darker blue/purple
        borderRadius: 25, // More rounded corners
        paddingVertical: 25, // Increased padding
        paddingHorizontal: 50,
        alignItems: 'center',
        borderWidth: 2, // Add a border
        borderColor: '#7c3aed', // Purple border for accent
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
    },
    resultLabel: {
        color: '#e0b2ff', // Light purple for label
        fontSize: 18,
        fontFamily: 'Dancing Script',
        fontWeight: '600',
        marginBottom: 8, // Space between label and value
    },
    resultValue: {
        color: '#ffdd00', // Bright gold for the score value
        fontFamily: 'Dancing Script',
        fontSize: 48, // Much larger font for the score
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    playButton: {
        backgroundColor: '#ff6b6b', // Vibrant Coral Red for the play button
        borderRadius: 30, // Highly rounded button
        paddingVertical: 20,
        paddingHorizontal: 90, // Wider button
        marginBottom: height * 0.05, // Dynamic bottom margin
        shadowColor: '#ff6b6b', // Matching glow shadow for the button
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 20, // Stronger elevation
        borderWidth: 1,
        borderColor: '#ffd1dc', // Light pink border
    },
    playText: {
        color: 'white', // White text for contrast
        fontFamily: 'Dancing Script',
        fontWeight: '900', // Extra bold
        fontSize: 24, // Larger play text
        textTransform: 'uppercase', // Uppercase for emphasis
        letterSpacing: 2, // More letter spacing
    },
});
