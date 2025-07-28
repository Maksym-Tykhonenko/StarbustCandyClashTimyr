// import React, {useEffect} from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {updateBestScore} from '../redux/slices/bestScoreSlice';
//
// export default function ResultScreen({ route, navigation }) {
//     const { score } = route.params;
//
//
//
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         dispatch(updateBestScore(score));
//     }, []);
//
//
//     return (
//         <ImageBackground
//             source={require('../assets/img/Group2.png')} // 🔄 путь к PNG-фону
//             style={styles.background}
//             resizeMode="cover"
//         >
//             <View style={styles.container}>
//                 <Text style={styles.title}>Game Over</Text>
//                 <Text style={styles.scoreLabel}>Your Score:</Text>
//                 <Text style={styles.scoreValue}>{score}</Text>
//
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.replace('Game')} // 🔁 начать новую игру
//                 >
//                     <Text style={styles.buttonText}>Try Again</Text>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity
//                     style={[styles.button, styles.secondaryButton]}
//                     onPress={() => navigation.pop(2)}
//                 >
//                     <Text style={styles.buttonText}>Back to Menu</Text>
//                 </TouchableOpacity>
//             </View>
//         </ImageBackground>
//     );
// }
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#141519',
//         padding: 24,
//     },
//     container: {
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 36,
//         fontWeight: 'bold',
//         color: '#fff',
//         fontFamily: 'Dancing Script',
//         marginBottom: 20,
//     },
//     scoreLabel: {
//         fontSize: 20,
//         color: '#fff',
//         fontFamily: 'Dancing Script',
//     },
//     scoreValue: {
//         fontSize: 48,
//         fontWeight: 'bold',
//         fontFamily: 'Dancing Script',
//         color: '#7A32F4',
//         marginBottom: 40,
//     },
//     button: {
//         backgroundColor: '#7A32F4',
//         paddingVertical: 16,
//         paddingHorizontal: 60,
//         borderRadius: 20,
//         marginBottom: 20,
//     },
//     secondaryButton: {
//         backgroundColor: '#FF3B30',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontFamily: 'Dancing Script',
//         fontWeight: 'bold',
//     },
// });

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateBestScore } from '../redux/slices/bestScoreSlice'; // Ensure this path is correct

// Define interfaces for type safety
interface ResultScreenRouteParams {
    score: number;
}

interface ResultScreenProps {
    route: {
        params: ResultScreenRouteParams;
    };
    navigation: any; // Use a more specific navigation type if you have one defined
}

interface BestScoreState {
    bestScore: number;
}

interface RootState {
    bestScore: BestScoreState;
}

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

export default function ResultScreen({ route, navigation }: ResultScreenProps): React.JSX.Element {
    const { score } = route.params;
    const dispatch = useDispatch();
    const currentBestScore = useSelector((state: RootState) => state.bestScore.bestScore);

    useEffect(() => {
        // Only dispatch if the current score is greater than the best score from Redux
        if (score > currentBestScore) {
            dispatch(updateBestScore(score));
        }
    }, [score, currentBestScore, dispatch]); // Add dependencies for useEffect

    return (
        <ImageBackground
            source={require('../assets/img/Group2.png')} // 🖼️ Path to your background PNG
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.contentBox}>
                <Text style={styles.title}>Game Over!</Text>
                <Text style={styles.scoreLabel}>Your Final Score:</Text>
                <Text style={styles.scoreValue}>{score}</Text>

                {score > currentBestScore && ( // Conditionally show new best score message
                    <Text style={styles.newBestScoreText}>
                        🎉 New Best Score! 🎉
                    </Text>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace('CandyGameScreen')} // 🔄 Start a new game
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => navigation.popToTop()} // Go back to the very first screen (StartScreen/Home)
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Back to Main Menu</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a2e', // Deep Space Blue fallback
        padding: 24,
    },
    contentBox: {
        backgroundColor: 'rgba(46, 46, 74, 0.85)', // Semi-transparent dark blue/purple
        borderRadius: 25, // More rounded corners
        paddingVertical: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        width: width * 0.85, // Responsive width
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 20,
        borderWidth: 2,
        borderColor: '#7c3aed', // Purple border
    },
    title: {
        fontSize: width * 0.1, // Responsive font size
        fontWeight: 'bold',
        color: '#ff6b6b', // Coral Red for "Game Over"
        fontFamily: 'Dancing Script',
        marginBottom: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    },
    scoreLabel: {
        fontSize: 22,
        color: '#e0b2ff', // Light purple for label
        fontFamily: 'Dancing Script',
        marginBottom: 10,
    },
    scoreValue: {
        fontSize: 60, // Much larger score value
        fontWeight: 'bold',
        fontFamily: 'Dancing Script',
        color: '#ffdd00', // Bright gold for the score
        marginBottom: 30, // Increased margin
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 8,
    },
    newBestScoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#c2f97c', // Bright green for new best score
        fontFamily: 'Dancing Script',
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    button: {
        backgroundColor: '#7c3aed', // Primary purple button
        paddingVertical: 18, // More vertical padding
        paddingHorizontal: 70, // More horizontal padding
        borderRadius: 30, // Highly rounded
        marginBottom: 15, // Space between buttons
        shadowColor: '#7c3aed', // Matching glow shadow
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)', // Subtle white border
    },
    secondaryButton: {
        backgroundColor: '#ff6b6b', // Secondary coral red button
        shadowColor: '#ff6b6b', // Matching glow for secondary button
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonText: {
        color: '#fff',
        fontSize: 22, // Larger button text
        fontFamily: 'Dancing Script',
        fontWeight: 'bold',
        textTransform: 'uppercase', // Uppercase for emphasis
        letterSpacing: 1,
    },
});