// import React from 'react';
// import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {toggleFavorite} from '../redux/slices/favoritesSlice';
//
// const candies = [
//     {
//         name: 'Ferrero Rocher',
//         image: require('../assets/img/food/0a06f338b918026577268f1e3075cb80ce0d5b8d.png'),
//         origin: 'Italy',
//         type: 'Chocolate',
//         flavors: 'Hazelnut, milk chocolate, wafer',
//     },
//     {
//         name: "Werther's Original",
//         image: require('../assets/img/food/99aca4c8b6f06aaac104d461306f1d85ff9d77b4.png'),
//         origin: 'Germany',
//         type: 'Caramel',
//         flavors: 'Buttery caramel',
//     },
//     {
//         name: 'Haribo Goldbears',
//         image: require('../assets/img/food/eba406bd27b4d80ba39969c52c03df2e410ba024.png'),
//         origin: 'Germany',
//         type: 'Gummy',
//         flavors: 'Fruit mix',
//     },
//     {
//         name: 'Chupa Chups',
//         image: require('../assets/img/food/778b503b88eb8e1b3fa879b048b27da5de6f6965.png'),
//         origin: 'Spain',
//         type: 'Lollipop',
//         flavors: 'Various fruit flavors',
//     },
// ];
//
// export default function App({ navigation }) {
//     const customCandies = useSelector(state => state.myCandies);
//     const favorites = useSelector(state => state.favorites);
//     const dispatch = useDispatch();
//
//     const allCandies = [...customCandies, ...candies];
//
//     const isFavorite = (candy) => {
//         return favorites.some(item => item.name === candy.name);
//     };
//
//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.title}>Home</Text>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FavoritesScreen')}>
//                     <Text style={styles.buttonText}>Favorite flavors</Text>
//                 </TouchableOpacity>
//             </View>
//
//             <Text style={styles.subtitle}>Candy Encyclopedia</Text>
//
//             {allCandies.map((candy, index) => (
//                 <TouchableOpacity
//                     key={index}
//                     style={styles.card}
//                     onPress={() => navigation.navigate('CandyDetail', { candy })}
//                 >
//                     {candy.image && (
//                         <Image
//                             source={typeof candy.image === 'string' ? { uri: candy.image } : candy.image}
//                             style={styles.image}
//                         />
//                     )}
//                     <View style={styles.cardFooter}>
//                         <Text style={styles.candyName}>{candy.name}</Text>
//                         <TouchableOpacity onPress={() => dispatch(toggleFavorite(candy))}>
//                             <Image source={require('../assets/img/subway_exit.png')}/>
//                         </TouchableOpacity>
//                     </View>
//                 </TouchableOpacity>
//             ))}
//
//             <View style={styles.emptyBlock}>
//                 <Text style={styles.emptyText}>There's nothing here</Text>
//                 <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={() => navigation.navigate('AddCandyScreen')}
//                 >
//                     <Text style={styles.addButtonText}>Add candy</Text>
//                 </TouchableOpacity>
//             </View>
//
//             <View style={{ marginBottom: 120 }} />
//         </ScrollView>
//     );
// }
//
//
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#1e1e1e',
//         padding: 16,
//     },
//     emptyBlock: {
//         marginVertical: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     emptyText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     cardFooter: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 12,
//         paddingBottom: 12,
//     },
//     addButton: {
//         backgroundColor: '#7c3aed',
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         borderRadius: 30,
//     },
//     addButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//         paddingTop: 30,
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         fontFamily: 'Dancing Script',
//         color: 'white',
//     },
//     button: {
//         backgroundColor: '#7c3aed',
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//
//         borderRadius: 20,
//     },
//     buttonText: {
//         fontFamily: 'Dancing Script',
//         color: 'white',
//         fontWeight: '600',
//     },
//     subtitle: {
//         color: 'white',
//         fontSize: 18,
//         marginBottom: 12,
//         fontFamily: 'Dancing Script',
//     },
//     card: {
//         marginBottom: 20,
//         backgroundColor: '#2c2c2c',
//         borderRadius: 12,
//         overflow: 'hidden',
//     },
//     image: {
//         width: '95%',
//         marginVertical: 12,
//         alignSelf: 'center',
//         borderRadius: 10,
//         // marginRight: 12,
//         height: 180,
//         resizeMode: 'cover',
//     },
//     candyName: {
//         padding: 12,
//         color: 'white',
//         fontFamily: 'Dancing Script',
//         fontSize: 26,
//         fontWeight: '600',
//     },
// });

import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoritesSlice'; // Assuming this is a Redux slice for favorites

// Define interfaces for better type safety
interface Candy {
    name: string;
    image: string | number; // image can be a URI string or a require'd number
    origin: string;
    type: string;
    flavors: string;
}

interface RootState {
    myCandies: Candy[];
    favorites: Candy[];
}

const initialCandies: Candy[] = [
    {
        name: 'Ferrero Rocher',
        image: require('../assets/img/food/0a06f338b918026577268f1e3075cb80ce0d5b8d.png'),
        origin: 'Italy',
        type: 'Chocolate',
        flavors: 'Hazelnut, milk chocolate, wafer',
    },
    {
        name: "Werther's Original",
        image: require('../assets/img/food/99aca4c8b6f06aaac104d461306f1d85ff9d77b4.png'),
        origin: 'Germany',
        type: 'Caramel',
        flavors: 'Buttery caramel',
    },
    {
        name: 'Haribo Goldbears',
        image: require('../assets/img/food/eba406bd27b4d80ba39969c52c03df2e410ba024.png'),
        origin: 'Germany',
        type: 'Gummy',
        flavors: 'Fruit mix',
    },
    {
        name: 'Chupa Chups',
        image: require('../assets/img/food/778b503b88eb8e1b3fa879b048b27da5de6f6965.png'),
        origin: 'Spain',
        type: 'Lollipop',
        flavors: 'Various fruit flavors',
    },
];

const { width } = Dimensions.get('window');

export default function App({ navigation }: { navigation: any }) {
    const customCandies = useSelector((state: RootState) => state.myCandies);
    const favorites = useSelector((state: RootState) => state.favorites);
    const dispatch = useDispatch();

    const allCandies = [...customCandies, ...initialCandies];

    // This function is no longer needed since we are directly using `favorites.some` in the `toggleFavorite` action
    // const isFavorite = (candy: Candy): boolean => {
    //     return favorites.some(item => item.name === candy.name);
    // };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sweet Delights</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FavoritesScreen')}>
                    <Text style={styles.buttonText}>My Favorites</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Explore Our Candy Collection</Text>

            {allCandies.length > 0 ? (
                allCandies.map((candy, index) => (
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
                        <View style={styles.cardFooter}>
                            <Text style={styles.candyName}>{candy.name}</Text>
                            <TouchableOpacity onPress={() => dispatch(toggleFavorite(candy))}>
                                {/* You might want to change this to a proper heart icon or star icon */}
                                <Image
                                    source={
                                        favorites.some(item => item.name === candy.name) ?
                                            require('../assets/img/subway_exit.png')
                                            : require('../assets/img/subway_exit.png') // Assuming you have an outlined heart icon
                                    }
                                    style={styles.favoriteIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={styles.emptyBlock}>
                    <Text style={styles.emptyText}>No candies added yet!</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddCandyScreen')}
                    >
                        <Text style={styles.addButtonText}>Add Your First Candy</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={{ marginBottom: 120 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Deep Space Blue
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Dancing Script', // Keep the custom font if available
        color: '#e0b2ff', // Light Purple
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    button: {
        backgroundColor: '#ff6b6b', // Coral Red
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        fontFamily: 'Dancing Script',
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    subtitle: {
        color: '#c2f97c', // Bright Green
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'Dancing Script',
        textAlign: 'center',
        letterSpacing: 0.8,
    },
    card: {
        marginBottom: 25,
        backgroundColor: '#2e2e4a', // Darker Blue/Purple
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 12,
        borderWidth: 1,
        borderColor: '#4a4a6b', // Slightly lighter border
    },
    image: {
        width: '100%',
        height: width * 0.55, // Responsive image height based on screen width
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'cover',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#3a3a5e', // Even darker for footer
    },
    candyName: {
        color: '#f0f0f0', // Off-white
        fontFamily: 'Dancing Script',
        fontSize: 28,
        fontWeight: '700',
        flexShrink: 1, // Allows text to shrink if too long
    },
    favoriteIcon: {
        width: 30,
        height: 30,
        // tintColor: '#ffdd00', // Gold color for favorites
    },
    emptyBlock: {
        marginVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#2e2e4a',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    emptyText: {
        color: '#f0f0f0',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 28,
    },
    addButton: {
        backgroundColor: '#7c3aed', // Purple
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});
