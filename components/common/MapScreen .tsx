import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";

// Reusable MapScreen component accepting props
const MapScreen = ({ pathCoordinates }) => {
  const startLocation = pathCoordinates[0]; // First point as start
  const endLocation = pathCoordinates[pathCoordinates.length - 1]; // Last point as end

  // Dummy data for titles, descriptions, and images
  const locationsData = [
    {
      title: "Start Point",
      description: "Your journey begins here!",
      photo: "https://via.placeholder.com/100.png?text=Start", // Placeholder image
    },
    {
      title: "Stop 1: City Center",
      description: "Visit the vibrant city center for shopping and dining.",
      photo: "https://via.placeholder.com/100.png?text=Stop+1",
    },
    {
      title: "Stop 2: Park View",
      description: "Relax at the beautiful park with scenic views.",
      photo: "https://via.placeholder.com/100.png?text=Stop+2",
    },
    {
      title: "Stop 3: River Bank",
      description: "Enjoy the calm river and take great photos.",
      photo: "https://via.placeholder.com/100.png?text=Stop+3",
    },
    {
      title: "End Point",
      description: "The journey ends here. Thanks for visiting!",
      photo: "https://via.placeholder.com/100.png?text=End",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Address</Text>
      <Text style={styles.address}>Oisterwijk, Netherlands</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: startLocation.latitude,
          longitude: startLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Start Marker */}
        <Marker coordinate={startLocation} pinColor="purple">
          <Callout>
            <View style={styles.calloutContainer}>
              <Image source={{ uri: locationsData[0].photo }} style={styles.image} />
              <Text style={styles.title}>{locationsData[0].title}</Text>
              <Text style={styles.description}>{locationsData[0].description}</Text>
            </View>
          </Callout>
        </Marker>

        {/* Stop Markers with Custom Callouts */}
        {pathCoordinates.slice(1, -1).map((stop, index) => (
          <Marker key={index} coordinate={stop} pinColor="orange">
            <Callout>
              <View style={styles.calloutContainer}>
                <Image source={{ uri: locationsData[index + 1].photo }} style={styles.image} />
                <Text style={styles.title}>{locationsData[index + 1].title}</Text>
                <Text style={styles.description}>{locationsData[index + 1].description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* Path using Polyline */}
        <Polyline coordinates={pathCoordinates} strokeColor="#7B61FF" strokeWidth={4} />

        {/* End Marker */}
        <Marker coordinate={endLocation} pinColor="red">
          <Callout>
            <View style={styles.calloutContainer}>
              <Image source={{ uri: locationsData[locationsData.length - 1].photo }} style={styles.image} />
              <Text style={styles.title}>{locationsData[locationsData.length - 1].title}</Text>
              <Text style={styles.description}>{locationsData[locationsData.length - 1].description}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#F9FAFB" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  address: { fontSize: 14, color: "#555", marginBottom: 10 },
  map: { width: "100%", height: 400, borderRadius: 12 },
  calloutContainer: { alignItems: "center", width: 200, padding: 10 },
  image: { width: 100, height: 100, marginBottom: 5, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 3, color: "#333" },
  description: { fontSize: 12, color: "#555", textAlign: "center" },
});

export default MapScreen;
