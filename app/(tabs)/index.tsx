import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo"; 
import { FontAwesome } from "@expo/vector-icons";
import HomeSlider from "@/components/common/HomeSlider";
import PackageCardGrid from "@/components/common/layouts/PackageCardGrid";
  const tripsPacks = [
  {
    title:'Offers for you',
    data:[{
    id: 1,
    image: 'https://www.trolleytours.com/wp-content/uploads/2016/07/trolley-tours-of-key-west.jpg',
    title: 'Deluxe Key West Tour',
    price: 150000,
    oldPrice: 20000,
    quantity: 50,
    sold: 30,
    rating: 4.5,
    offerLabel: false,
    discount: '12 %off',
    offerLabelPosition:'bottom-left',
    isbookmarked: false,
  },
  {
    id: 2,
    image: 'https://static-01.daraz.lk/p/14c1ab42369dc4597272c0fdd78dc5d1.jpg',
    title: 'iPhone 13 Pro Max',
    price: 1200, 
    quantity: 100,
    sold: 70,
    rating: 4.7,
    isbookmarked: true,
    isfreeShipping: true,
  },
  {
    id: 3,
    image: 'https://static-01.daraz.lk/p/70cdc7682242a6a6ce133b840c347139.jpg',
    title: 'Adidas Running Shoes',
    price: 100, 
    quantity: 200,
    sold: 150,
    rating: 4.3,
    isbookmarked: true,
     isfreeShipping: true, 
  },
  {
    id: 4,
    image: 'https://static-01.daraz.lk/p/c908f046c35b7d5efb750282e29b36ad.jpg',
    title: 'Plain T-Shirt',
    price: 20,
    oldPrice: 30,
    quantity: 500,
    sold: 300,
    rating: 4.1,
   
  },
  {
    id: 5,
    image: 'https://static-01.daraz.lk/p/e2c854addca88f13d6ca095f1130cac7.jpg',
    title: 'Skin Care Kit',
    price: 80,
    oldPrice: 100,
    quantity: 100,
    sold: 60,
    rating: 4.6,
    isbookmarked: true,
  },
  {
    id: 6,
    image: 'https://static-01.daraz.lk/p/bf707f48f2151aa5c01e721bcf4b0ec4.png',
    title: 'Tennis Racket',
    price: 120,
    oldPrice: 150,
    quantity: 80,
    sold: 40,
    rating: 4.2,
    isfreeShipping: true,
    isbookmarked: true,
  },]},
  
  
];

const offerPack =[{
  title:'Recommended for you',
  data:[{
  id: 1,
  image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111339_sp818-mbp13touch-silver-select-202005.png',
  title: 'MacBook Pro',
  price: 1500,
  oldPrice: 1700,
  quantity: 50,
  sold: 30,
  rating: 4.5,

  isbookmarked: false,
},
{
  id: 2,
  image: 'https://static-01.daraz.lk/p/14c1ab42369dc4597272c0fdd78dc5d1.jpg',
  title: 'iPhone 13 Pro Max',
  price: 1200, 
  quantity: 100,
  sold: 70,
  rating: 4.7,
  isbookmarked: true,
  isfreeShipping: true,
},
{
  id: 3,
  image: 'https://static-01.daraz.lk/p/70cdc7682242a6a6ce133b840c347139.jpg',
  title: 'Adidas Running Shoes',
  price: 100,
  oldPrice: 150,
  quantity: 200,
  sold: 150,
  rating: 4.3,
  isbookmarked: true,
   isfreeShipping: true, 
},
{
  id: 4,
  image: 'https://static-01.daraz.lk/p/c908f046c35b7d5efb750282e29b36ad.jpg',
  title: 'Plain T-Shirt',
  price: 20,
  oldPrice: 30,
  quantity: 500,
  sold: 300,
  rating: 4.1,
 
},
{
  id: 5,
  image: 'https://static-01.daraz.lk/p/e2c854addca88f13d6ca095f1130cac7.jpg',
  title: 'Skin Care Kit',
  price: 80,
  oldPrice: 100,
  quantity: 100,
  sold: 60,
  rating: 4.6,
  isbookmarked: true,
},
{
  id: 6,
  image: 'https://static-01.daraz.lk/p/bf707f48f2151aa5c01e721bcf4b0ec4.png',
  title: 'Tennis Racket',
  price: 120,
  oldPrice: 150,
  quantity: 80,
  sold: 40,
  rating: 4.2,
  isfreeShipping: true,
  isbookmarked: true,
},]}
];
export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable onPress={() => navigation.navigate("search")}>
        <TextInput
          style={styles.searchInput}
          editable={false} // Disable typing
          placeholder="Search for products"
        />
        <FontAwesome name="search" size={25} color="#7d7a79" style={styles.searchIcon} />
      </Pressable>
      {tripsPacks &&
        tripsPacks.length > 0 &&
        tripsPacks.map((item, index) => (
          <PackageCardGrid key={index} title={item.title} packages={item.data} />
        ))}
        <HomeSlider />
        {offerPack &&
        offerPack.length > 0 &&
        offerPack.map((item, index) => (
         <PackageCardGrid key={index} title={item.title} packages={item.data} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 0,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
  searchIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    top: "26%",
    right: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});