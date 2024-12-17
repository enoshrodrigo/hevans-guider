import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 
import { Package } from "@/constants/types"; 
import { useNavigation } from "expo-router";

const screenWidth = Dimensions.get("window").width;

interface PackageCardProps {
    Package: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ Package }) => {
  const navigation = useNavigation();
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
  const handleBookmarkToggle = () => {
    // Handle bookmark logic here
  
  };

  return (
    <View style={styles.card} >
        {Package.discount && <Text style={styles.discountBadge}>{Package.discount}</Text>}
            {Package.offerLabel && (
              <Text style={[styles.offerLabel, styles[Package.offerLabelPosition || 'bottom-left']]}>
                {Package.offerLabel}
              </Text>
      )}
      <FontAwesome
        name="bookmark"
        size={24}
        color={Package.isBookmarked ? "darkorange" : "lightblue"}
        style={styles.bookmarkIcon}
        onPress={handleBookmarkToggle}
      />
      <Pressable onPress={() => navigation.push( "packegedetails", { passID: Package.id })}>
        <Image source={{ uri: Package.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.PackageTitle}>{Package.title}</Text>
          <View style={styles.ratingContainer}>
          {renderStars(Package.rating)}
            <Text style={styles.ratingText}> {Package.rating} ({Package.sold})</Text>
          </View>
          <Text style={styles.newPrice}>Rs.{Package.price}</Text>
          {Package.oldPrice && <Text style={styles.oldPrice}>Rs.{Package.oldPrice}</Text>}
        </View>
      </Pressable>
      <Pressable style={styles.cartButton}>
        <FontAwesome name="shopping-cart" size={20} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({ 
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
export default PackageCard;
