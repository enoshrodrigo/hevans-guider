import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { Image } from 'react-native';
import Swiper from 'react-native-swiper';   
import { useNavigation } from "@react-navigation/native";
const screenWidth = Math.round(Dimensions.get('window').width);
export  const mainPageSlide2 = {
    "table": [
      {
        "index": 0,
        "url": "https://www.lebow.drexel.edu/sites/default/files/story/2022-11/time_scarcity_node.jpg"
      },
      {
        "index": 1,
        "url": "https://www.istore.co.za/media/wysiwyg/HomePage/iphone-free-icare-plus.png"
      },
      {
        "index": 2,
        "url": "https://assetscdn1.paytm.com/images/catalog/view_item/661494/1602832062320.png?imwidth=1600&impolicy=hq"
      },
      {
        "index": 3,
        "url": "https://cdn.greatdeals.com.sg/wp-content/uploads/2020/09/04124301/nike-singapore-25-off-promo-code.jpg"
      },
      {
        "index": 4,
        "url": "https://www.maxcomstore.ca/wp-content/uploads/2023/04/Cellphone-1.png"
      }
    ]
  }
export default function HomeSlider() {
  const [mainPageSlide, setMainPageSlide] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
//axiosInstance.post('/api/homepage-slider', { array: [] }) // Adjust the body as needed
//.then(response => {

//switch (response.status) {
  //  case 200:
    //  return response.data;
    //case 400:
     // return   Alert.alert('Invalid request format or missing array in the body.');
    //case 403:
      //  throw new Error('Forbidden - JWT error.');
    //case 500:
      //throw Alert.alert('Internal Server Error - Something went wrong. Please try again later.');
    //default:
      //throw new Error('An unknown error occurred.');
  //}
//})
//.then(data => {
 // setMainPageSlide(data.table);
  //setLoading(false);
//})
//.catch(error => {
 // setError(error.message);
  //setLoading(false);
//});
  }, []);

  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={style.container}>
        <Text style={style.error}>{error}</Text>
      </View>
    );
  }

  return (
    <Swiper showsButtons={false} autoplay={true} autoplayTimeout={2} autoplayDirection={true} style={style.container}>
      {
        mainPageSlide2.table.map((item, index) => (
          <View key={index}>
            <Image source={{ uri: item.url }} style={style.image} />
          </View>
        ))
      }
    </Swiper>
  );
}

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 'auto',
    minHeight: 220,
    maxHeight: 220,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    minHeight: 220,
    maxHeight: 220,
    objectFit: 'contain',
    maxWidth: screenWidth - 8,
    alignSelf: 'center'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
