import React, { useState,useEffect } from 'react';
import {View, SafeAreaView, Image,StyleSheet,  TouchableOpacity,ActivityIndicator} from 'react-native';
import {
 Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,

} from 'react-native-paper';
import { MaterialCommunityIcons,Entypo,MaterialIcons,AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from '../config';

const ServiceProProfile = () => {

    const [ratingValue, setRatingValue] = useState([]);
     
      const [providerId, setProviderId] = useState("");
      const [provider, setProvider] = useState("");
      const [isLoading, setIsLoading] = useState(true);
      const [averageRating, setAverageRating] = useState(null);
      const [reviews, setReviews] = useState([]);
      const [showReviews, setShowReviews] = useState(false);
      const [upReviews, setUpReviews] = useState(false);
      const [showAllReviews, setShowAllReviews] = useState(false);
      const navigation=useNavigation()
    

      const toggleShowAllReviews = () => {
        setShowReviews(!showReviews);
      };


      useEffect(() => {
        const getProviderId = async () => {
          try {
            const providerId = await AsyncStorage.getItem('providerId');
            if (providerId !== null) {
              return JSON.parse(providerId);
            }
          } catch (error) {
            console.log(error);
          }
          return null;
        };
      
        const fetchData = async () => {
          const providerIdFromStorage = await getProviderId();
          console.log('Hello, I am a provider ID: ', providerIdFromStorage);
      
          if (providerIdFromStorage && providerIdFromStorage !== providerId) {
            try {
              const response = await axios.get(`${config}/provider/${providerIdFromStorage}`);
              setProvider(response.data);
              setProviderId(providerIdFromStorage);
              setIsLoading(false);
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        };
      
        fetchData();
      },[providerId]);



      useEffect(() => {
        axios.get(`${config}/rating/${providerId}`)
          .then((res) => {
            setRatingValue(res.data);
            console.log("raaaaaate", res.data);
      
            const total = res.data.map((el) => el.rate)
              .reduce((acc, curr) => acc += curr, 0);
            const avg = total / res.data.length;
            setAverageRating(Math.round(avg) > 5 ? 5 : Math.round(avg));
          })
          .catch((err) => {
            console.log(err);
          });
      }, [providerId]);
      
      useEffect(() => {
        axios.get(`${config}/reviews/include/${providerId}`)
          .then((res) => {
            console.log(res.data,"res3");
            setReviews(res.data);
          })
          .catch((error) => {
            console.error(error);
          }); 
      }, [upReviews,providerId]);
    

      // const total = ratingValue.map((el) =>(el.rate))
      // .reduce((acc, curr) => acc +=curr, 0);
      // const avg = total /ratingValue.length;
      // setAverageRating(Math.round(avg));
     
      

    if (isLoading) {
        // Render a loading indicator
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        );
      }






  return (
    <ScrollView>
  
     {  console.log(reviews,"hi im reviews")}
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('ProviderSetting')}}>
            <Avatar.Image 
  source={provider.image}
  style={{ width: 80, height: 80, borderRadius: 40 }}
/>
          </TouchableOpacity>
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{provider.username}</Title>
            <Caption style={styles.caption}>{provider.aboutMe}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
        <MaterialCommunityIcons name="map-marker-radius"  color="#777777" size={20}/>
          
          <Text style={{color:"#777777", marginLeft: 20}}>{provider.adresse}</Text>
        </View>
        <View style={styles.row}>
        <Entypo name="phone" color="#777777" size={20} />
       
          <Text style={{color:"#777777", marginLeft: 20}}>{provider.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
            {provider.service === 'Cleaning' && <MaterialIcons name="cleaning-services" size={24} color="black" />}
            {provider.service === 'Plumbig' && <MaterialIcons name="plumbing" size={24} color="black" />}
            {provider.service === 'Repairing' && <MaterialIcons name="home-repair-service" size={24} color="black" />}
            {provider.service === 'Painting' && <MaterialIcons name="format-paint" size={24} color="black" />}
            {provider.service === 'Electrical' && <MaterialIcons name="electrical-services" size={24} color="black" />}
            {provider.service === 'Hairdressing' && <MaterialCommunityIcons name="hair-dryer" size={24} color="black" />}
            {provider.service === 'Security' &&<MaterialIcons name="security" size={24} color="black" />}
            {provider.service === 'Roofing' && <MaterialIcons name="roofing" size={24} color="black" />}
            {provider.service === 'Design' && <MaterialIcons name="design-services" size={24} color="black" />}
            {provider.service === 'Handyman' && <MaterialIcons name="handyman" size={24} color="black" />}
            {provider.service === 'Land scaping' && <MaterialIcons name="landscape" size={24} color="black" />}
            {provider.service === 'Renovation' && <Image source={require('../assets/construction.png')} style={{width: 24, height: 24, marginRight: 10}} />}
            {provider.service === 'Wood man' && <Image source={require('../assets/crosscut.png')}  style={{width: 24, height: 24, marginRight: 10}} />}
            {provider.service === 'Welding' && <Image source={require('../assets/welding.png')}  style={{width: 24, height: 24, marginRight: 10}} />}
            {provider.service === 'Masonry' && <Image source={require('../assets/brickwork.png')}  style={{width: 24, height: 24, marginRight: 10}} />}
            {provider.service === 'Wallpapering' && <Image source={require('../assets/wallpaper.png')}  style={{width: 24, height: 24, marginRight: 10}} />}

         <Text style={{color:"#777777", marginLeft: 20}}>{provider.service}</Text>
        </View>
        <View style={styles.containerr}>
        <Text style={styles.label}>Rating:</Text>
        <View style={styles.rating}>
          <AntDesign name="star" size={24} color={averageRating >= 1 ? '#FFC107' : '#E4E5E9'} />
          <AntDesign name="star" size={24} color={averageRating >= 2 ? '#FFC107' : '#E4E5E9'} />
          <AntDesign name="star" size={24} color={averageRating >= 3 ? '#FFC107' : '#E4E5E9'} />
          <AntDesign name="star" size={24} color={averageRating >= 4 ? '#FFC107' : '#E4E5E9'} />
          <AntDesign name="star" size={24} color={averageRating >= 5 ? '#FFC107' : '#E4E5E9'} />
        </View>
      </View>
      </View>
      <View style={{marginBottom:110}}>
      <View style={styles.infoBoxWrapper}>
      <View style={[styles.infoBox, styles.infoBoxLeft]}>
      <Title style={styles.title}>₹140.50</Title>
      <Caption style={styles.caption}>Wallet</Caption>
      </View>
      <View style={styles.infoBox}>
      <Title style={styles.title}>12</Title>
      <Caption style={styles.caption}>Orders</Caption>
      </View>
      </View>
      </View>
      <View style={styles.notificationIcon}>
      <MaterialIcons name="notifications" size={24} color="#777777" />
      </View>
      <View style={{marginBottom:1 , marginTop:1}}>
      <TouchableOpacity style={styles.uploadButton} >
      <MaterialIcons name="add-a-photo" size={24} color="#777777" />
      <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.imageGrid}>
      <Image
        source={{ uri: 'https://st3.depositphotos.com/1138869/16337/i/600/depositphotos_163378314-stock-photo-painter-man-painting-wall-in.jpg' }}
        style={styles.image}
      />
      <Image
        source={{ uri: 'https://www.gannett-cdn.com/presto/2018/11/29/PPHX/24e723e8-75e1-45e4-a711-9858814d3658-GettyImages-1005956604.jpg' }}
        style={styles.image}
      />
      <Image
        source={{ uri: 'https://previews.123rf.com/images/maradel/maradel1302/maradel130200023/18004652-painters-at-work.jpg' }}
        style={styles.image}
      />
      <Image
        source={{ uri: 'https://ecopainting.ca/wp-content/uploads/2014/12/Woman-painting-in-commercial-job.jpg' }}
        style={styles.image}
      />

     <Image
        source={{ uri: 'https://www.usnews.com/dims4/USNEWS/fc0f668/2147483647/thumbnail/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2Fd3%2Fa4%2Fbe014c824d0994e7d5f3570d4e60%2F200501-paintinghouse-stock.jpg' }}
        style={styles.image}
      />
       <Image
        source={{ uri: 'https://www.mastersroofing.com/wp-content/uploads/2019/10/file-2.jpg' }}
        style={styles.image}
      />
    </View>

    {/* <View style={styles.containerrr}>
      {reviews.map((review, i) => (
        <View key={i} style={styles.review}>
          <Text style={styles.content}>{review.content}</Text>
          <Text style={styles.name}>{review.user.username}</Text>
          <Image style={styles.photo} source={{ uri: "https://th.bing.com/th/id/OIP.pZXdFEuHenvMQcex1XAHAAHaE8?pid=ImgDet&rs=1" }} />
        </View>
      ))}
    </View> */}


     <View style={styles.containerrr}>
      {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review, i) => (
        <View key={i} style={styles.review}>
          <Image style={styles.photo} source={{ uri: "https://th.bing.com/th/id/OIP.pZXdFEuHenvMQcex1XAHAAHaE8?pid=ImgDet&rs=1" }} />
          <View style={styles.info}>

          <Text style={styles.name}>{review.user.username}</Text>
          <Text style={styles.content}>{review.content}</Text>
          </View>
          
        </View>
      ))}
      {reviews.length > 3 && (
        <TouchableOpacity onPress={toggleShowAllReviews}>
          <Text style={styles.showMoreLessButton}>{showAllReviews ? "Show Less" : "Show More"}</Text>
        </TouchableOpacity>
      )}
        <Text style={{fontSize:15, fontWeight:'bold',marginLeft:280}}>{reviews.length} Reviews</Text>
    </View> 
    </SafeAreaView>
    </ScrollView>
  );
};

export default ServiceProProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    marginTop: 70,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoBoxLeft: {
    borderRightColor: '#dddddd',
    borderRightWidth: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    color: '#888888'
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  image: {
    width: '48%',
    height: 150,
    marginBottom: 10,
  },
  notificationIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  containerr: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    
  },
  marginBottom: 20 
  ,
  uploadButton: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 20,
    marginTop:-80, // add marginTop
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 2,
      width: 0
    },
    justifyContent: 'center',
    alignItems: 'center', // this line to center vertically
  },
  uploadButtonText: {
    color: '#777777',
    marginLeft: 10,
    textAlign: 'center', // this line to center horizontally
  },
  containerrr: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  review: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 5,
    marginLeft: 3,
    width:280
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
    marginRight: 5,
    marginTop:10
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  showMoreLessButton: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#007aff",
    textDecorationLine: "underline",
  },
  info:{
    
    paddingHorizontal: 10,
    
  }
});
