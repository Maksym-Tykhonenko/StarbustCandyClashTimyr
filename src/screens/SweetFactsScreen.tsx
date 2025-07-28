import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// --- Type Definitions ---
interface FactCard {
  id: string;
  title: string;
  image: number; // For local require() images, it's a number
  content: string;
}

interface PhraseCard {
  quote: string;
  title: string;
}

interface SweetFactsScreenProps {
  navigation: any; // Use a more specific navigation type if you have one defined
}

// --- Data for Cards and Phrases ---
const factCards: FactCard[] = [
  {
    id: '1',
    title: 'Where did marmalade come from?',
    image: require('../assets/img/food/1b954404747ff298a40d21bfd1da882caec3235e.png'),
    content:
        'Marmalade is a sweet that has its roots in ancient Greek cuisine, where fruit and honey were used to create various sweet dishes. However, modern marmalade as we know it came to Europe in the 19th century. At that time, confectioners began experimenting with various fruit purees and gelatin, resulting in the first commercially available marmalades. Since then, this dessert has become popular in many countries, and today we can enjoy a variety of flavors, from classic citrus to exotic combinations such as mango and chili.',
  },
  {
    id: '2',
    title: 'Why do people in Japan love unusual flavors of gum?',
    image: require('../assets/img/food/857f65f9ba2aa80b5682b20c55c197ad49d788a5.png'),
    content:
        'Japan is known for its culinary innovations and willingness to experiment with flavors, especially in confectionery. This trend extends to gum, where you can find unique flavors like "Cola," "Grape," "Yogurt," and even "Curry" or "Octopus." This is driven by a culture that values novelty and sensory experiences. Japanese consumers are open to trying new things, and manufacturers respond by creating diverse and sometimes bizarre flavor profiles. These unusual gum flavors often become popular due to their novelty and the unique experience they offer, reflecting Japan\'s dynamic food scene.',
  },
  {
    id: '3',
    title: 'Unusual Flavor Combinations',
    image: require('../assets/img/food/22088b2af22b2cd06578bd88bd5ada8cd4a3a95c.png'),
    content:
        'Vanilla Coca-Cola: In 2007, Coca-Cola released a limited edition drink with vanilla flavor, which became a hit among fans of unusual tastes. This experiment demonstrated how a classic beverage could take on a completely new flavor that appealed to many.\n' +
        '\n' +
        'Chocolate-flavored Chips: In Japan, you can find chips that combine sweet chocolate with a salty snack. This unusual combination sparks interest and surprise, as the mix of sweet and salty is a popular trend in Japanese cuisine. Such chips often become a topic of discussion among tourists and locals alike.\n' +
        '\n' +
        'Salted Caramel: This flavor has gained popularity in recent years and represents a combination of sweet caramel with added sea salt. Many confectioners experiment with this combination, creating unique desserts and sweets that delight with their balance of flavors. Salted caramel can be found in chocolates, ice creams, and even baked goods.\n' +
        '\n' +
        'These stories and facts about brands and sweets from different countries help readers better understand the diversity and richness of the world of sweets, as well as inspire new culinary experiments!',
  },
  {
    id: '4',
    title: 'Global Candy Brands',
    image: require('../assets/img/food/011282cc5467ce4ce9a913da2a62ab5b519e3742.png'),
    content:
        'Nestle: Founded in 1866 in Switzerland, Nestlé started with dairy products and baby food. In 1904, it acquired a Swiss chocolate factory, marking its entry into the chocolate world. Nestlé is known for products like "Kit Kat," "Nesquik," and "Toll House Cookies." The brand actively focuses on innovation and expanding its range, including vegan and gluten-free options.\n' +
        '\n' +
        'Mars, Incorporated: Established in 1911, Mars originally produced confectionery and pet food. Its most famous product, the "Mars" chocolate bar, was introduced in 1932. Since then, the company has expanded its offerings, adding popular brands like "Snickers," "M&M\'s," and "Twix." Mars is also involved in social initiatives and sustainability efforts.\n' +
        '\n' +
        'Ferrero: The Italian company Ferrero was founded in 1946 in Piedmont. It is known for its unique sweets such as "Ferrero Rocher," "Nutella," and "Kinder Surprise." For example, Ferrero Rocher has become a symbol of luxury and sophistication due to its golden packaging and high-quality ingredients. Ferrero actively invests in environmental initiatives and improving working conditions in its factories.',
  },
  {
    id: '5',
    title: 'Iconic Desserts Worldwide',
    image: require('../assets/img/food/854d9076c4256cee3c73748ae04754cbd4b9ebaa.png'),
    content:
        'Pavlova: This dessert, named after Russian ballerina Anna Pavlova, is popular in Australia and New Zealand. Pavlova consists of a light meringue with a crispy crust and a soft, airy filling, usually topped with fresh fruits and whipped cream. This dessert has become a symbol of Australian and New Zealand cuisine and is served at holidays and family celebrations.\n' +
        '\n' +
        'Gulab Jamun: This Indian sweet is made from milk powder, fried in oil, and then soaked in a sweet syrup flavored with cardamom and rose water. Gulab Jamun is one of the most popular desserts in India and is often served at weddings and festivals. Its delicate taste and aroma make it a favorite treat both in India and abroad.\n' +
        '\n' +
        'Baklava: This sweet dessert, made of layers of phyllo dough, nuts, and honey, has its roots in the Ottoman Empire. Baklava is popular in the Middle Eastern countries, Greece, and the Balkans. Each region has its unique recipes and variations, making this sweet treat universal and beloved in many cultures.',
  },
];

const phrases: PhraseCard[] = [
  {
    quote:
        '“Sweetness is not just a flavor, it\'s a story encapsulated in every bite. Let each marmalade tell its own unique tale!”',
    title: 'Master of the Marmalade Tradition',
  },
  {
    quote:
        '“Experiment with flavors like an artist with flowers. In every new combination lies the opportunity to create a masterpiece that will surprise and delight!”',
    title: 'Wizard of Unusual Flavors',
  },
  {
    quote:
        '“Desserts are edible happiness. Share them, savor them, and let them fill your life with joy and sweetness!”',
    title: 'Sweet Country Traveler',
  },
];

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

// --- Main Component ---
export default function SweetFactsScreen({ navigation }: SweetFactsScreenProps): React.JSX.Element {
  return (
      <ImageBackground
          source={require('../assets/img/Group2.png')} // Your background image
          style={styles.background}
          resizeMode="cover" // Changed to cover for better fit
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.screenHeader}>Sweet Facts & History</Text>

          {factCards.map((item) => (
              <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                      navigation.navigate('SweetDetailScreen', {
                        title: item.title,
                        image: item.image, // Pass the image directly for `require`'d assets
                        content: item.content,
                      })
                  }
                  style={styles.cardTouchable}
                  activeOpacity={0.8} // Add subtle press feedback
              >
                <View style={styles.card}>
                  <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
          ))}

          <Text style={styles.sectionHeader}>Inspirational Sweet Quotes</Text>
          {phrases.map((phrase, index) => (
              <View key={index.toString()} style={styles.phraseCard}>
                <Text style={styles.quoteText}>{phrase.quote}</Text>
                <Text style={styles.phraseAuthor}>{phrase.title}</Text>
              </View>
          ))}
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </ImageBackground>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1a1a2e', // Deep Space Blue fallback
  },
  scrollContent: {
    padding: 20, // Increased padding
    paddingVertical: 50,
  },
  screenHeader: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Dancing Script',
    color: '#ffc83c', // Golden yellow
    marginBottom: 30, // More space below header
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  cardTouchable: {
    marginBottom: 25, // More space between cards
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  card: {
    backgroundColor: 'rgba(46, 46, 74, 0.7)', // Semi-transparent dark blue/purple
    borderRadius: 20, // More rounded corners
    overflow: 'hidden', // Ensures rounded corners clip image
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle border
  },
  cardImage: {
    width: '100%',
    height: width * 0.5, // Responsive image height (e.g., 50% of screen width)
    resizeMode: 'cover',
  },
  cardTextContainer: {
    padding: 15, // More padding inside card
  },
  cardTitle: {
    color: '#f0f0f0', // Off-white for card title
    fontSize: 22, // Larger font size
    fontWeight: 'bold',
    fontFamily: 'Dancing Script',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionHeader: {
    color: '#e0b2ff', // Light purple for section titles
    fontSize: 28, // Larger section title
    fontFamily: 'Dancing Script',
    fontWeight: 'bold',
    marginTop: 40, // More space above section header
    marginBottom: 20, // More space below section header
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  phraseCard: {
    backgroundColor: 'rgba(30, 30, 46, 0.8)', // Slightly darker, more transparent phrase card
    padding: 20, // More padding
    borderRadius: 15, // More rounded
    marginBottom: 15, // More space between phrase cards
    shadowColor: '#000', // Add subtle shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)', // Subtle purple border
  },
  quoteText: {
    color: '#b0b0c4', // Muted white for quote
    fontSize: 18, // Larger font size for quote
    fontFamily: 'Dancing Script',
    fontStyle: 'italic', // Italicize quotes
    marginBottom: 10,
    lineHeight: 28, // Improved line height
  },
  phraseAuthor: {
    color: '#ffc83c', // Golden yellow for author/title
    fontFamily: 'Dancing Script',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right', // Align author to the right
    marginTop: 5,
  },
});
