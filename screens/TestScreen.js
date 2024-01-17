import { View, Text, Image, StyleSheet, Button,TouchableOpacity, ScrollView, TextInput, Screen, FlatList } from "react-native";
import { signOut } from "firebase/compat/auth";
import { auth } from "../utils/firebaseHelper";
import React, { useEffect, useState, useRef }from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES, images, icons } from "../constants";
import { cyclistTrainingData } from '../constants/data';
const Home = ({ navigation }) => {

  const handleLogout = async () => {
   try{await signOut(auth);
  } catch (error) {
    console.error(error)
  }}
  return (
      <View
        style={{backgroundColor: COLORS.background, padding:20,
        }}
      >
        <Button
                            title="Save"
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 48,
                            }}
                            onPress={() =>
                                navigation.navigate('BottomTabNavigation')
                            }
                        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
              <Text style={styles.title}>Hello, Welcome</Text>
              
        </View>
       
          <TouchableOpacity
            onPress={handleLogout}
            className=""
          >
           <Text style={styles.title}>Logout</Text>
          </TouchableOpacity>

        
      
       <ScrollView style={{
        marginVertical: 18
      }}>
         <Text style={{
           fontSize: 16,
           fontFamily: "medium",
           color: COLORS.white,
           marginBottom: 8
         }}>Cyclist Training List</Text>

         <FlatList
           data={cyclistTrainingData}
           keyExtractor={(item) => item.id}
           renderItem={({item})=>(
            <TouchableOpacity 
            onPress={() =>navigation.navigate("Welcome")}
            style={{
              height: 150, width: "100%",marginBottom:20,
             }}>
              <Image
                source={item.image}
                resizeMode='cover'
                style={{
                  height: "100%", width: "100%", borderRadius: 14
                }}/>
              <View style={{
                position: "absolute",
                bottom: 12,
                left: 6 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: SIZES.width - ( 16 * 2 + 6 * 2 ) }}>
                  <View>
                  <Text style={{
                  fontSize: 12,
                  fontFamily: "medium",
                  color: COLORS.white
                }}>{item.name}</Text>
                <Text style={{
                  fontSize: 12,
                  fontFamily: 'regular',
                  color: COLORS.white
                }}>{item.distance} km away</Text>
                  </View>
                 
                </View>
              </View>
            </TouchableOpacity>
           )}
         />
      </ScrollView> 
  

      </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex:1,
    justifyContent:'center',
    alignItems: "center",
  },
  title: {
    ...FONTS.h4, 
    textAlign: "center",
    color: COLORS.white,
    fontWeight: '500',
    paddingTop: 30,
    textAlign: 'center',
    maxWidth: '70%'
  },
  background: { 
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171725",
    paddingHorizontal: 20,
},
logo: {
    height: SIZES.width * .8,
    width:  SIZES.width * .8
},
btn: {
    width: SIZES.width - 44,
},
bottomContainer: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12
},
container: {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#dedad2",
},

dataContainer: {
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#198fc2",
  width: "90%",
  borderWidth: 1,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  padding: 10,
},

logo: {
  width: 110,
  height: 110,
  marginBottom: 15,
},
titleText: {
  color: "#99EAF3",
  fontWeight: "400",
  fontSize: 24,
  marginBottom: 15,
},
dataText: {
  color: "white",
  fontWeight: "400",
},
buttonContainer: {
  width: "80%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
  paddingHorizontal: 50,
},
button: {
  backgroundColor: "#198fc2",
  padding: 15,
  borderRadius: 10,
  alignItems: "center",
},
buttonOutline: {
  backgroundColor: "#198fc2",
  marginTop: 5,
  borderColor: "#BBBBBB",
  borderWidth: 2,
},
buttonText: {
  color: "white",
  fontWeight: "500",
  fontSize: 16,
},
buttonOutlineText: {
  color: "#DDDDDD",
  fontWeight: "700",
  fontSize: 18,
},
});
export default Home