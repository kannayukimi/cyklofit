import { View, Text, Image, Alert,TouchableOpacity, StyleSheet, ScrollView, Dimensions, StatusBar, FlatList } from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/Input";
import Button from "../components/Button";
import { signIn } from "../utils/actions/authActions";
import { useDispatch} from "react-redux"
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native';
import { NativeModules } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { StatusBarManager } = NativeModules;

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const slides = [
  {
    id: '1',
    image: require('../assets/images/OB1.jpg'),
    title: 'Meet Your Virtual Training Assistant',
  },
  {
    id: '2',
    image: require('../assets/images/OB2.jpg'),
    title: 'Monitor Your Muscle Condition',
  },
  {
    id: '3',
    image: require('../assets/images/OB3.jpg'),
    title: 'Welcome, Lets Train Together',
  },
];

const Slide = ({item}) => {

  return (
    <View style={[styles.container]}>
      <Image
        source={item?.image}
        style={[styles.image ]}
      />
      
        <Text style={styles.title}>{item?.title}</Text>
      
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / windowWidth);
    setCurrentSlideIndex(currentIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 0,
        }}>
      
        {/* Render buttons */}
        <View style={{paddingTop: 0}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View  style={{
            alignItems: 'center', marginVertical:15,
          }}>
            <Button 
                  title="Get Started" 
                  style={styles.btn}
                  onPress={()=>navigation.navigate("Login")}
                  />
                <View style={styles.bottomContainer}>
                     <Text style={{ ...FONTS.body3, color: COLORS.gray }}>
                        Don't have an account?
                     </Text>
                     <TouchableOpacity
                        onPress={()=>navigation.navigate("Signup")}
                     >
                     <Text style={{ ...FONTS.body3, color: COLORS.primary }}>
                       {" "} Signup
                    </Text>
                     </TouchableOpacity>
                  </View>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
         
            </View>
          )}
        </View>
         {/* Indicator container */}
         <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom:40,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 20,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background, }}>

  <FlatList
    ref={ref}
    onMomentumScrollEnd={updateCurrentSlideIndex}
   // contentContainerStyle={{height: windowHeight * 0.75}}
    showsHorizontalScrollIndicator={false}
    horizontal
    data={slides}
    pagingEnabled
    renderItem={({item}) => <Slide item={item} />}
  />
  <Footer />
 </SafeAreaView>  
  
  );
};

const styles = StyleSheet.create({
  container: {
height: windowHeight * 0.75,
 width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    //width: wp(100), height: hp(75)
    overflow:"visible",
  },
  image: {
    width: windowWidth * 1, 
    height: windowHeight * 0.7,
     flex:1,
  },
  title: {
    ...FONTS.h5, 
    textAlign: "center",
    color: COLORS.white,
    fontWeight: '500',
    paddingTop: 20,
    textAlign: 'center',
    maxWidth: '60%'
  },
  background: { 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171725",
},
btn: {
    width: '90%',
},
bottomContainer: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
},
  indicator: {
    height:6,
    width: 8,
    backgroundColor: 'white',
    marginHorizontal: 3,
    borderRadius: 20,
  },

});
export default OnboardingScreen;
