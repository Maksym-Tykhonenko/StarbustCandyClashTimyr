// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     ImageBackground,
//     FlatList,
//     StyleSheet,
//     Alert,
// } from 'react-native';
//
// const GRID_SIZE = 25;
// const EMPTY_CELLS = Math.floor(GRID_SIZE * 0.1); // 10% пустых — 2 или 3
//
// export default function CandyGameScreen({ navigation }) {
//     const [grid, setGrid] = useState([]);
//     const [revealed, setRevealed] = useState(Array(GRID_SIZE).fill(false));
//     const [score, setScore] = useState(0);
//     const [gameOver, setGameOver] = useState(false);
//
//     useEffect(() => {
//         generateGrid();
//     }, []);
//
//     const generateGrid = () => {
//         let items = Array(GRID_SIZE).fill('candy');
//         let emptyIndices = new Set();
//
//         while (emptyIndices.size < EMPTY_CELLS) {
//             const randIndex = Math.floor(Math.random() * GRID_SIZE);
//             emptyIndices.add(randIndex);
//         }
//
//         emptyIndices.forEach(index => (items[index] = 'empty'));
//         setGrid(items);
//         setRevealed(Array(GRID_SIZE).fill(false));
//         setScore(0);
//         setGameOver(false);
//     };
//
//     const handlePress = index => {
//         if (revealed[index] || gameOver) return;
//
//         const cell = grid[index];
//         const newRevealed = [...revealed];
//         newRevealed[index] = true;
//         setRevealed(newRevealed);
//
//         if (cell === 'empty') {
//             setGameOver(true);
//             navigation.replace('Result', { score });
//         } else {
//             setScore(prev => prev + 100);
//         }
//     };
//
//     const renderItem = ({ index }) => {
//         const isRevealed = revealed[index];
//         const cellType = grid[index];
//
//         return (
//             <TouchableOpacity
//                 style={styles.cell}
//                 onPress={() => handlePress(index)}
//                 disabled={isRevealed || gameOver}
//             >
//                 {isRevealed ? (
//                     cellType === 'candy' ? (
//                         <Image
//                             source={require('../assets/img/game/Imgкопія.png')}
//                             style={styles.candy}
//                             resizeMode="contain"
//                         />
//                     ) : (
//                         <Image
//                             source={require('../assets/img/game/83af8ed0aad17804d06eb0d6f66c4f10d83ce08b.png')}
//                             style={styles.candy}
//                             resizeMode="contain"
//                         />
//                     )
//                 ) : null}
//             </TouchableOpacity>
//         );
//     };
//
//     return (
//         <ImageBackground
//             source={require('../assets/img/Group2.png')}
//             style={styles.background}
//             resizeMode="cover"
//         >
//             <View style={styles.topBar}>
//                 <Text style={styles.score}>Score: {score}</Text>
//             </View>
//
//             <FlatList
//                 data={grid}
//                 extraData={revealed} // 🔁 Обновление при изменении revealed!
//                 renderItem={renderItem}
//                 keyExtractor={(_, index) => index.toString()}
//                 numColumns={5}
//                 contentContainerStyle={styles.grid}
//             />
//         </ImageBackground>
//     );
// }
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         paddingTop: 60,
//         paddingHorizontal: 16,
//         backgroundColor: '#141519',
//     },
//     topBar: {
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     score: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#fff',
//         fontFamily: 'Dancing Script',
//     },
//     grid: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     cell: {
//         width: 60,
//         height: 60,
//         margin: 5,
//         backgroundColor: '#7A32F4',
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     candy: {
//         width: 40,
//         height: 40,
//     },
//     emptyCell: {
//         backgroundColor: 'transparent',
//         borderWidth: 1,
//         borderColor: '#ccc',
//     },
// });


import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    FlatList,
    StyleSheet,
    Alert,
    Dimensions,
} from 'react-native';

// --- Type Definitions ---
type CellType = 'candy' | 'empty';

interface CandyGameScreenProps {
    navigation: any; // Use a more specific navigation type if defined in your project
}

// --- Game Constants ---
const { width } = Dimensions.get('window');
const NUM_COLUMNS = 5;
const GRID_SIZE = 25; // 5x5 grid
const EMPTY_CELLS_COUNT = Math.floor(GRID_SIZE * 0.15); // Let's make it 15% empty for a bit more challenge, or 2-4 empty cells

// --- Main Component ---
export default function CandyGameScreen({ navigation }: CandyGameScreenProps): React.JSX.Element {
    const [grid, setGrid] = useState<CellType[]>([]);
    const [revealed, setRevealed] = useState<boolean[]>(Array(GRID_SIZE).fill(false));
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null); // To highlight the last clicked cell

    useEffect(() => {
        generateGrid();
    }, []); // Run once on component mount

    const generateGrid = (): void => {
        let items: CellType[] = Array(GRID_SIZE).fill('candy');
        let emptyIndices = new Set<number>();

        // Ensure we have unique random indices for empty cells
        while (emptyIndices.size < EMPTY_CELLS_COUNT) {
            const randIndex = Math.floor(Math.random() * GRID_SIZE);
            emptyIndices.add(randIndex);
        }

        emptyIndices.forEach(index => (items[index] = 'empty'));

        // Shuffle the array to randomize candy and empty cell positions
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]]; // Swap elements
        }

        setGrid(items);
        setRevealed(Array(GRID_SIZE).fill(false));
        setScore(0);
        setGameOver(false);
        setLastClickedIndex(null);
    };

    const handlePress = (index: number): void => {
        if (revealed[index] || gameOver) {
            return; // Do nothing if already revealed or game is over
        }

        const cell = grid[index];
        const newRevealed = [...revealed];
        newRevealed[index] = true;
        setRevealed(newRevealed);
        setLastClickedIndex(index); // Set last clicked index

        if (cell === 'empty') {
            setGameOver(true);
            // Optionally, show a short delay or animation here before navigating
            setTimeout(() => {
                navigation.replace('Result', { score });
            }, 800); // Small delay to show the empty cell before transition
        } else {
            setScore(prev => prev + 100);
        }
    };

    const renderItem = ({ index }: { item: CellType; index: number }) => {
        const isRevealed = revealed[index];
        const cellType = grid[index];
        const isLastClicked = lastClickedIndex === index;

        return (
            <TouchableOpacity
                style={[
                    styles.cell,
                    isRevealed && styles.revealedCell, // Apply revealed style
                    isLastClicked && styles.lastClickedCell, // Apply last clicked style
                    cellType === 'empty' && isRevealed && styles.emptyRevealedCell, // Specific style for revealed empty cell
                ]}
                onPress={() => handlePress(index)}
                disabled={isRevealed || gameOver}
            >
                {isRevealed ? (
                    cellType === 'candy' ? (
                        <Image
                            source={require('../assets/img/game/Imgкопія.png')} // Candy image
                            style={styles.candyImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            source={require('../assets/img/game/83af8ed0aad17804d06eb0d6f66c4f10d83ce08b.png')} // Empty cell/bomb image
                            style={styles.emptyImage}
                            resizeMode="contain"
                        />
                    )
                ) : (
                    <Text style={styles.hiddenCellText}>?</Text> // Placeholder for unrevealed cells
                )}
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            source={require('../assets/img/Group2.png')} // Background image
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.topBar}>
                <Text style={styles.scoreText}>SCORE: {score}</Text>
                {gameOver && (
                    <Text style={styles.gameOverText}>Game Over!</Text>
                )}
            </View>

            <FlatList
                data={grid}
                extraData={revealed} // Force re-render when 'revealed' changes
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                numColumns={NUM_COLUMNS}
                contentContainerStyle={styles.gridContainer}
            />
            {/* You could add a 'Restart' button here if gameOver is true, instead of immediate navigation */}
        </ImageBackground>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#1a1a2e', // Deep Space Blue fallback
    },
    topBar: {
        marginBottom: 25,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    scoreText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffc83c', // Golden yellow for score
        fontFamily: 'Dancing Script',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    gameOverText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ff6b6b', // Coral Red for game over
        fontFamily: 'Dancing Script',
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    gridContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40, // Ensure space at the bottom for scrolling if needed
    },
    cell: {
        width: width / NUM_COLUMNS - 15, // Responsive cell size
        height: width / NUM_COLUMNS - 15,
        margin: 7, // Adjust margin for spacing
        backgroundColor: '#7c3aed', // Purple for unrevealed cells
        borderRadius: 15, // More rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Add shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.2)', // Subtle white border
    },
    revealedCell: {
        backgroundColor: 'rgba(46, 46, 74, 0.8)', // Darker, slightly transparent when revealed
        borderColor: '#c2f97c', // Bright green border when revealed
        shadowOpacity: 0.1, // Less shadow when revealed
        shadowRadius: 2,
    },
    lastClickedCell: {
        borderWidth: 3, // Thicker border for last clicked
        borderColor: '#ffdd00', // Gold border for last clicked
    },
    emptyRevealedCell: {
        backgroundColor: 'rgba(255, 107, 107, 0.8)', // Red transparent background for revealed empty cell
        borderColor: '#ff3b30', // Red border
        shadowColor: '#ff3b30',
        shadowOpacity: 0.7,
        shadowRadius: 10,
    },
    candyImage: {
        width: '70%', // Make candy image larger within cell
        height: '70%',
        tintColor: '#f0f0f0', // Optional: tint candy image
    },
    emptyImage: {
        width: '70%',
        height: '70%',
        tintColor: '#f0f0f0', // Optional: tint empty image
    },
    hiddenCellText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.6)', // Faded white question mark
        fontFamily: 'Dancing Script',
    },
});
