import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Appearance, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'; 

const EventDetailsScreen = () => {
  const route = useRoute();
  const { passID } = route.params as { passID: any };
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  const prices = [
    { type: 'Earlybird', price: '500', points: ['Limited Time Offer', '', '', '', ''], soldOut: false },
    { type: 'General', price: '1000', points: ['Point 1', 'Point 2', '', '', ''], soldOut: true },
    { type: 'VIP', price: '5000', points: ['Point 1', 'Point 2', 'Point 3', '', ''], soldOut: false },
    { type: 'VVIP', price: '6001', points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', ''], soldOut: true },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Image source={{ uri: 'https://www.itsholidaysltd.com/_next/image?url=%2Fimages%2Fblog%2Fwhat-is-the-difference-between-tour-and-travel.jpg&w=3840&q=100' }} style={styles.mainImage} />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerCategory}>{/* {event.category} */}Wonder, Asia</Text>
          <Text style={styles.headerTitle}>{/* {event.title} */}Permium With Us</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.date}>{/* {event.date} */}2024-09-25</Text>
          <Text style={styles.price}>{/* {event.price} */}2,000,900</Text>
        </View>
        <Text style={styles.description}>{/* {event.description} */}Intents Festival is one of the largest and most advanced dance festivals in the Netherlands, offering an unforgettable experience with the best DJs.</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.address}>{/* {event.address} */}Oisterwijk, Netherlands</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 51.5744,/* event.location.lat */
              longitude:  5.1935,/* event.location.lng */
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: 51.5744, longitude: 5.1935 }} />
          </MapView>
        </View>
        <Text style={styles.swipeText}>Swipe to view the Prices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.priceScrollContainer}>
          {prices.map((price, index) => (
            <View key={index} style={styles.ticketContainer}>
              <View style={styles.notch} />
              <View style={styles.ticketContent}>
                <Text style={styles.priceType}>{price.type}</Text>
                <Text style={styles.priceValue}>{price.price} / Person</Text>
                {price.points.map((point, idx) => (
                  point ? (
                    <View key={idx} style={styles.pointRow}>
                      <Ionicons name="ellipse" size={10} style={styles.iconStyle} />
                      <Text style={styles.pricePoint}>{point}</Text>
                    </View>
                  ) : null
                ))}
                <View style={styles.buttonContainer}>
                  {price.soldOut ? (
                    <Image source={{ uri: 'https://grab-tickets.com/frontend/images/sold-out.png' }} style={styles.soldOutImage} />
                  ) : (
                    <TouchableOpacity style={styles.button} onPress={() => alert('Ticket Purchased!')}>
                      <Text style={styles.buttonText}>Get Ticket</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.notch} />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',

  },
  headerContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 250,
  },
  headerOverlay: {
   // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerCategory: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#f56',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  addressContainer: {
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  swipeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  priceScrollContainer: {
    paddingBottom: 20,
  },
  ticketContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  notch: {
    width: 10,
    height: '100%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  ticketContent: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 10,
    width: 180,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 300,
  },
  priceType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  priceValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pricePoint: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  soldOutImage: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconStyle: {
    color: '#333',
  },
};

const darkStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#1c1c1c',
  },
  headerOverlay: {
    ...commonStyles.headerOverlay,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  label: {
    ...commonStyles.label,
    color: '#fff',
  },
  date: {
    ...commonStyles.date,
    color: '#ccc',
  },
  description: {
    ...commonStyles.description,
    color: '#ddd',
  },
  address: {
    ...commonStyles.address,
    color: '#ddd',
  },
  ticketContent: {
    ...commonStyles.ticketContent,
    backgroundColor: '#333',
    borderColor: '#ffd700',
  },
  priceType: {
    ...commonStyles.priceType,
    color: '#fff',
  },
  priceValue: {
    ...commonStyles.priceValue,
    color: '#fff',
  },
  pricePoint: {
    ...commonStyles.pricePoint,
    color: '#fff',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#ffd700',
  },
  buttonText: {
    ...commonStyles.buttonText,
    color: '#333',
  },
  iconStyle: {
    ...commonStyles.iconStyle,
    color: '#ffd700',
  },
});

const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#fff',
  },
  headerOverlay: {
    ...commonStyles.headerOverlay,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  label: {
    ...commonStyles.label,
    color: '#333',
  },
  date: {
    ...commonStyles.date,
    color: '#666',
  },
  description: {
    ...commonStyles.description,
    color: '#333',
  },
  address: {
    ...commonStyles.address,
    color: '#333',
  },
  ticketContent: {
    ...commonStyles.ticketContent,
    backgroundColor: '#f0f0f0',
    borderColor: '#333',
     borderWidth: 1.5,
  },
  priceType: {
    ...commonStyles.priceType,
    color: '#333',
  },
  priceValue: {
    ...commonStyles.priceValue,
    color: '#333',
  },
  pricePoint: {
    ...commonStyles.pricePoint,
    color: '#333',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#333',
  },
  buttonText: {
    ...commonStyles.buttonText,
    color: '#fff',
  },
  iconStyle: {
    ...commonStyles.iconStyle,
    color: '#333',
  },
});

export default EventDetailsScreen;
