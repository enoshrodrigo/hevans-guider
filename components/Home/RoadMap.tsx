import React from "react";
import { ScrollView, StyleSheet, View, Text, Dimensions, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

// Sample trips data
const trips = [
  { id: 1, name: "Day 01- Sri Lanka Airport", image: "https://media1.giphy.com/media/qH15RNEtCR9FAyR8iu/giphy.gif?cid=6c09b952659mfxdkgcbk6okmzj7wgr6z0hvhiixsddrb0v6j&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s",visited: true },
  { id: 2, name: "Day 02- Hotel Paradise Negombo", image: "https://static.vecteezy.com/system/resources/thumbnails/025/325/335/small_2x/atlantis-the-palm-is-a-luxury-hotel-resort-located-at-the-jumeirah-palm-in-the-united-arab-emirates-generative-ai-free-png.png", visited: true },
  { id: 3, name: "Day 03- Sigiriya", image: "https://cdni.iconscout.com/illustration/premium/thumb/sri-lanka-sigiriya-rock-fortress-illustration-download-in-svg-png-gif-file-formats--sirigaya-tower-beach-world-countries-landmarks-ii-pack-buildings-illustrations-9729299.png", visited: true },
  { id: 4, name: "Day 04- Ambuluwawa Tower", image: "https://summit97.com/images2/tower2.jpg",visited: false },
  { id: 5, name: "Day 05- Pidurutalagala Mountain", image: "https://img.freepik.com/premium-vector/picture-mountain-with-palm-trees-road-with-mountain-background_730620-937475.jpg",visited: false },
  { id: 6, name: "Day 06- Mirissa Beach", image: "https://media-cdn.tripadvisor.com/media/photo-s/19/d8/01/24/mirissa-is-a-small-town.jpg", visited: false },
  { id: 7, name: "Day 07- Galle Fort", image: "https://ceylontoday.lk/wp-content/uploads/2023/11/11-19.jpg" , visited: false},
  { id: 8, name: "Day 08- Nelum Kuluna", image: "https://sigiriyafortress.com/wp-content/uploads/2022/09/colombo-lotus-tower-ticket-prices-colombo-lotus-tower-opening-hours.jpg-2-1.jpg" ,visited: false},
  { id: 9, name: "Get Your Reward", image: "https://media1.giphy.com/media/5v1YDmi2hSHwwulHXc/giphy.gif?cid=6c09b952yrtx47sy5tw2j2lnv6hg5kbhixguqh23rnfnlw2q&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s", visited: false },
  { id: 10, name: "Final Day - AirPort Katunayaka", image: "https://cdn-icons-png.flaticon.com/512/10521/10521430.png",  visited: false }, 
];

export default function RoadMap() {
  const roadHeight = trips.length * 180 + 100; // Calculate road length dynamically based on trips

  // Generate the road path dynamically based on the number of trips
  let pathD = `M${width / 2} 85`;

  for (let i = 1; i <= trips.length; i++) {
    const curveX = width / 2  * (i % 2 === 0 ? 0.0009 : 2); // Alternate left/right
    const curveY = i * 250; // Increase the Y-axis as we move down

    pathD += ` Q${curveX} ${curveY}, ${width / 2} ${curveY + 100}`; // Generate path segments
  }

  // End of the road path
  pathD += ` Q${width / 2} ${roadHeight - 100}, ${width / 2} ${roadHeight}`;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tourist Trip Roadmap</Text>

      {/* Road Lane with Dotted Middle Line */}
      <View style={styles.svgContainer}>
        <Svg height={roadHeight} width={width}>
          {/* Road Shape */}
          <Path
            d={pathD}
            fill="none"
            stroke="#ff9800"
            strokeWidth="30"
            strokeLinecap="round"
          />

          {/* Dotted Line in the Middle */}
          <Path
            d={pathD}
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeDasharray="10, 10"
            strokeLinecap="round"
          />
        </Svg>

        {/* Roadmap Boxes Centered on the Road */}
        {trips.map((trip, index) => (
          
          <View
            key={trip.id}
            style={[styles.tripBox, { top: index * 180 + 60, left: width / 2 - 90 + (index % 2 === 0 ? 0 : 100) }]} // Centering boxes on the road
          >
            <LinearGradient colors={["transparent", "transparent"]} style={styles.gradientBox}>
              <Image source={{ uri: trip.image }} style={styles.image} />
            

              <Text style={styles.tripText}>{trip.name}</Text>
                </LinearGradient>
       
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7", 
     
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#ff9800",
  },
  svgContainer: {
    position: "relative",
  },
  tripBox: {
    position: "absolute",
    width: 170,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBox: {
  
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 10, 
    borderRadius: 30,  
  },
  tripText: {
    fontSize: 12, 
    textAlign: "center",
    fontFamily: "Avenir",  
    backgroundColor: "#ffffff",
      borderRadius: 20,
    padding: 8,
    fontWeight: "bold",
    color: "#333",
    
  },
});
