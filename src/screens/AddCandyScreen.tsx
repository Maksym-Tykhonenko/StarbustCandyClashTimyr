import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert, // Added for better user feedback
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addCandy } from '../redux/slices/myCandiesSlice'; // Ensure this path is correct
import { launchImageLibrary } from 'react-native-image-picker'; // Ensure react-native-image-picker is installed

// --- Type Definitions ---
interface CandyData {
    name: string;
    origin: string;
    place: string;
    price: string; // Keeping as string for TextInput, convert to number if needed for storage
    review: string;
    type: string;
    rating: number;
    image: string | null; // URI of the image
}

interface AddCandyScreenProps {
    navigation: any; // Use a more specific navigation type if you have one defined
}

const candyTypes: string[] = [
    'Chocolate', 'Gummy', 'Hard Candy', 'Marshmallow',
    'Licorice', 'Caramel', 'Lollipop', 'Fudge', 'Nougat', 'Taffy',
];

// --- Main Component ---
export default function AddCandyScreen({ navigation }: AddCandyScreenProps): React.JSX.Element {
    const dispatch = useDispatch();

    // State variables with explicit types
    const [name, setName] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [review, setReview] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleImagePick = (): void => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.8, maxWidth: 800, maxHeight: 600 }, // Added maxWidth/maxHeight
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
                    Alert.alert('Image Error', 'Could not pick image. Please try again.');
                } else if (response.assets && response.assets.length > 0) {
                    const uri = response.assets[0].uri;
                    if (uri) {
                        setImageUri(uri);
                    }
                }
            }
        );
    };

    const handleSubmit = (): void => {
        // Basic validation
        if (!name || !origin || !type || rating === 0 || !imageUri) {
            Alert.alert('Missing Info', 'Please fill in all required fields (Name, Origin, Type, Rating, and Image).');
            return;
        }

        const newCandy: CandyData = {
            name,
            origin,
            place,
            price,
            review,
            type,
            rating,
            image: imageUri,
        };

        dispatch(addCandy(newCandy));
        Alert.alert('Success!', `${name} has been added to your collection! 🎉`);
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Add New Candy</Text>

            {/* Image Picker */}
            <View style={styles.imagePickerContainer}>
                <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerButton} activeOpacity={0.7}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={styles.imagePickerText}>Tap to Select Candy Photo</Text>
                            <Text style={styles.addIcon}>+</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Text Fields */}
            <View style={styles.formSection}>
                <TextInput
                    placeholder="Candy Name (e.g., Gummy Bear)"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#999"
                />
                <TextInput
                    placeholder="Origin (e.g., Germany)"
                    style={styles.input}
                    value={origin}
                    onChangeText={setOrigin}
                    placeholderTextColor="#999"
                />
                <TextInput
                    placeholder="Place of Purchase (e.g., Local Supermarket)"
                    style={styles.input}
                    value={place}
                    onChangeText={setPlace}
                    placeholderTextColor="#999"
                />
                <TextInput
                    placeholder="Price (e.g., $2.50)"
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />
                <TextInput
                    placeholder="Your Review / Notes (e.g., Chewy and fruity!)"
                    style={[styles.input, styles.textArea]}
                    value={review}
                    onChangeText={setReview}
                    multiline
                    numberOfLines={4} // Increased visible lines
                    placeholderTextColor="#999"
                />
            </View>

            {/* Candy Type Selector */}
            <View style={styles.formSection}>
                <Text style={styles.label}>Candy Type</Text>
                <View style={styles.typeContainer}>
                    {candyTypes.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[styles.typeButton, type === item && styles.typeSelected]}
                            onPress={() => setType(item)}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.typeText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Rating */}
            <View style={styles.formSection}>
                <Text style={styles.label}>Your Rating</Text>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <TouchableOpacity key={i} onPress={() => setRating(i)} activeOpacity={0.7}>
                            <Text style={[styles.star, i <= rating && styles.starActive]}>
                                🌟
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.7}>
                <Text style={styles.submitButtonText}>Add Candy to Collection</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 40 }} />
        </ScrollView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Deep Space Blue
    },
    contentContainer: {
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Dancing Script',
        color: '#ffc83c', // Golden yellow
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    imagePickerContainer: {
        marginBottom: 30,
        backgroundColor: 'rgba(46, 46, 74, 0.7)', // Semi-transparent background
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePickerButton: {
        width: '100%',
        height: 200, // Fixed height for image area
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#7c3aed', // Purple border
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensure image respects border radius
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(60, 60, 90, 0.8)', // Slightly lighter placeholder
    },
    imagePickerText: {
        color: '#e0b2ff', // Light purple
        fontFamily: 'Dancing Script',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    addIcon: {
        fontSize: 40,
        color: '#e0b2ff',
        fontWeight: 'bold',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    formSection: {
        marginBottom: 30,
        backgroundColor: 'rgba(46, 46, 74, 0.7)', // Consistent section background
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 12,
    },
    input: {
        backgroundColor: '#2c2c2c',
        borderRadius: 12,
        paddingVertical: 14, // Increased padding
        paddingHorizontal: 15,
        color: '#f0f0f0', // Off-white text
        marginBottom: 15, // More space between inputs
        fontSize: 18, // Larger font size
        fontFamily: 'Dancing Script',
        borderWidth: 1,
        borderColor: 'rgba(124, 58, 237, 0.3)', // Subtle purple border
    },
    textArea: {
        height: 120, // Increased height for review area
        textAlignVertical: 'top', // Align text to top on Android
    },
    label: {
        color: '#e0b2ff', // Light purple for labels
        fontFamily: 'Dancing Script',
        fontSize: 20,
        marginBottom: 12,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10, // Modern way to define spacing between items
        justifyContent: 'center', // Center align buttons if they don't fill a row
    },
    typeButton: {
        backgroundColor: '#2c2c2c',
        paddingHorizontal: 16, // More padding
        paddingVertical: 10, // More padding
        borderRadius: 25, // More rounded
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'transparent', // Default transparent border
    },
    typeSelected: {
        backgroundColor: '#7c3aed', // Vibrant purple when selected
        borderColor: '#ffc83c', // Golden border when selected
        shadowColor: '#7c3aed',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
    },
    typeText: {
        color: 'white',
        fontFamily: 'Dancing Script',
        fontSize: 18, // Larger text
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center stars
        marginBottom: 20,
        paddingVertical: 10,
    },
    star: {
        fontSize: 40, // Much larger stars
        fontFamily: 'Dancing Script',
        color: '#555', // Faded color for unselected stars
        marginHorizontal: 8, // More space between stars
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    starActive: {
        color: '#ffdd00', // Bright gold for active stars
        textShadowColor: '#ffdd00', // Gold glow for active stars
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    submitButton: {
        backgroundColor: '#ff6b6b', // Vibrant Coral Red
        paddingVertical: 18, // More vertical padding
        borderRadius: 30, // Highly rounded
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#ff6b6b', // Matching glow shadow
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 20,
        borderWidth: 1,
        borderColor: '#ffd1dc', // Light pink border
    },
    submitButtonText: {
        color: 'white',
        fontSize: 22, // Larger text
        fontFamily: 'Dancing Script',
        fontWeight: 'bold',
        textTransform: 'uppercase', // Uppercase for emphasis
        letterSpacing: 1,
    },
});
