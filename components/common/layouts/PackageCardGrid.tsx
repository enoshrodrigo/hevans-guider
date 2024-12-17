import React from "react";
import { StyleSheet, View, Text } from "react-native"; 
import PackageCard from "../boxes/PackageCard";
import { Package } from "@/constants/types";

 
interface TourCardGridProps {
  title: string;
  packages: Package[];
}

const PackageCardGrid: React.FC<TourCardGridProps> = ({ title, packages }) => {
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {packages.map((item, index) => (
          <PackageCard key={index} Package={item} />
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
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default PackageCardGrid;
