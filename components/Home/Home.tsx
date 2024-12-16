import * as React from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Product {
  image: string;
  title: string;
  price: number;
  sold: number;
  quantity: number;
  rating: number;
  oldPrice?: number;
  isBookmarked?: boolean;
  isFreeShipping?: boolean;
  offerLabel?: string;
  discount?: string;
  offerLabelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

}

interface Home {
  title: string;
  products: Product[];
}

const screenWidth = Dimensions.get("window").width;

const Home: React.FC<Home> = ({ title, products }) => {
  const navigation = useNavigation();

  const handleViewAllReviews = (productId: number) => { 
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={14}
          color={i <= rating ? "#FABF00" : "#ccc"} // Gold for filled stars, gray for empty stars
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {products.map((item, index) => (
          <View style={styles.card} key={index}>
            {item.discount && <Text style={styles.discountBadge}>{item.discount}</Text>}
            {item.offerLabel && (
              <Text style={[styles.offerLabel, styles[item.offerLabelPosition || 'bottom-left']]}>
                {item.offerLabel}
              </Text>
            )}
            <FontAwesome
              name="bookmark"
              size={24}
              color={item.isBookmarked ? "darkorange" : "lightblue"}
              style={styles.bookmarkIcon}
              onPress={() => { /* Handle bookmark toggle */ }}
            />
            <Pressable onPress={() => handleViewAllReviews(index)}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.detailsContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  {renderStars(item.rating)}
                  <Text style={styles.ratingText}> {item.rating} ({item.sold})</Text>
                </View>
                <Text style={styles.newPrice}>Rs.{item.price}</Text>
                {item.oldPrice && <Text style={styles.oldPrice}>Rs.{item.oldPrice}</Text>}
              </View>
            </Pressable>
            <Pressable style={styles.cartButton}>
              <FontAwesome name="shopping-cart" size={20} color="white" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    paddingBottom: 4,
    paddingTop: 4,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 5,
    alignSelf: "flex-start",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  card: {
    position: 'relative',
    marginBottom: 12,
    width: screenWidth / 2.22,
    maxWidth: screenWidth / 2.22,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: '#F0F0E7',
    overflow: 'hidden',
    height: 270,
    maxHeight: 270,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'orange',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    zIndex: 1,
  },
  offerLabel: {
    position: 'absolute',
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    zIndex: 1,
  },
  'top-left': {
    top: 8,
    left: 8,
  },
  'top-right': {
    top: 8,
    right: 8,
  },
  'bottom-left': {
    bottom: 8,
    left: 8,
  },
  'bottom-right': {
    bottom: 8,
    right: 8,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  detailsContainer: {
    padding: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  newPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FC8B02',
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  cartButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8DC2F7',
    borderRadius: 0,
    borderTopLeftRadius: 12,
    padding: 10,
    zIndex: 1,
  },
});

export default Home;
