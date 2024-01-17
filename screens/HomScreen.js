import React, { useState, useEffect } from "react";
import {
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, FONTS, SIZES} from "../constants";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Button from '../components/Buttonsm'
import { LinearGradient } from 'expo';
const image_v_1 = require("../assets/images/m-1.png");
const image_v_2 = require("../assets/images/m-2.png");
import data from "../constants/mode.json";


const ModeElement = ({ mode, navigation, image }) => {
  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity
      style={[
        styles.element,
        mode.id === 1 ? styles.elementId1 : styles.elementId2,
      ]}
      activeOpacity={0.8}
      onPress={() =>
        navigateToScreen(mode.id === 1 ? 'CalibrationScreen' : 'Explore')
      }
    >
      <View style={styles.imageArea}>
        <Image
          source={image}
          resizeMode="contain"
          style={[
            styles.modeImage,
            mode.id === 1 ? styles.modeImageId1 : styles.modeImageId2,
          ]}
        />
      </View>
      <View
  style={[
    styles.modeContainer, mode.id === 1 ? styles.modeContainerId1 : styles.modeContainerId2,
    {
      position: 'absolute',
      bottom: mode.id === 1 ? 12 : 60,
      // additional properties here
    },
  ]}
>
        <View style={[styles.infoArea, mode.id === 1 ? styles.infoAreaId1 : styles.infoAreaId2]}>
          <Text style={[styles.infoTitle, mode.id === 1 ? styles.infoTitleId1 : styles.infoTitleId2]}>{mode.make}</Text>
        
        <Button
          style={[styles.startButton, mode.id === 1 ? styles.startButtonId1 : styles.startButtonId2,{
      // additional properties here
    }]}
          title="Start"
          onPress={() =>
            navigateToScreen(
              mode.id === 1 ? 'CalibrationScreen' : 'Explore'
            )
          }
        /></View>
      </View>
    </TouchableOpacity>
  );
};

const HomScreen = ({ navigation }) => {
  const [modes, setModes] = useState(data.modes);
  const [filteredModes, setFilteredModes] = useState(data.modes);

  const searchModes = (keyword) => {
    const lowercasedKeyword = keyword.toLowerCase();
    const results = modes.filter((mode) => {
      return mode.make.toLowerCase().includes(lowercasedKeyword);
    });

    setFilteredModes(results);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <SafeAreaView style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-circle"
              size={55}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Mode Selection</Text>
        </SafeAreaView>
        <View style={styles.listSection}>
        <View>
        <Image
          source={require("../assets/images/header.png")}
          resizeMode="contain"
          style={styles.headerImage}
        /></View>
        <View>
        <Text style={styles.headerText}>Select Mode:</Text>
        </View>
        
          <View style={[styles.elementPallet]}>
            {filteredModes.map((mode) => {
              const image = mode.id === 1 ? image_v_1 : image_v_2;
              return (
                <ModeElement
                  key={mode.id}
                  mode={mode}
                  navigation={navigation}
                  image={image}
                />
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  startButton:{
    width: '90%',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  startButtonId1:{
    width: '90%',
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
 
  headerSection: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstName: {
    color: COLORS.primary,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 30,
    height: 50,
  },
 modeContainerId1: {
  //  justifyContent: "space-between",
    alignItems: "center",
   // marginTop: 30,
   // marginHorizontal: 30,
    width: '70%',
  },
  modeContainerId2: {
    //  justifyContent: "space-between",
      alignItems: "center",
     marginLeft: 95,
     // marginHorizontal: 30,
      width: '70%',
    },
  title: {
    ...FONTS.h5,
    color: COLORS.black,
  },
  listSection: {
    marginTop: 5,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "space-between",
    height:'20%',
  },
  titleText: {
    marginTop:55,
    paddingLeft: 70,
    ...FONTS.h6,
    color: COLORS.white,
  },
  headerText: {
    marginTop:20,
    ...FONTS.h6,
    color: COLORS.white,
  },
  elementPallet: {
    marginTop: 25,
    paddingLeft: 0,
    paddingRight: 0,
    height: 480,
  },
  element: {
    height: 150,
    width: "100%",
    marginBottom: 50,
    backgroundColor: COLORS. darkgray,
    borderRadius: 10,
  },
  elementId1: {
    height: 150,
    width: "100%",
    marginBottom: 50,
    backgroundColor: COLORS. black,
    borderRadius: 10,
  },
  infoAreaId1: {
    width: "80%",
    marginTop: 0,
    marginBottom: 15,
    paddingLeft: 20,
  },
  infoAreaId2: {
    width: "80%",
    marginBottom: -30,
    paddingLeft: 20,
  },
  infoTitle: {
    ...FONTS.body2,
    textAlign: "left",
    color: COLORS.white,
     padding:5,
    marginBottom: 15,
  },
  infoTitleId2: {
    ...FONTS.body2,
    textAlign: "right",
    color: COLORS.white,
     padding:5,
    marginBottom: 15,
  },
  infoDetail: {
    position: "absolute",
    bottom: 0,
    fontSize: 10,
    color: "#696969",
    fontWeight: "bold",
    padding:5,
  },
  imageArea: {
    flex: 1,
  },
  modeImageId1: {
    position: "absolute",
    top: -35,
    left: 45,
    width: "140%",
    height: "140%",
  },
  modeImageId2: {
    position: "absolute",
    top: -35,
    right: 45,
    width: "140%",
    height: "140%",
  },
  headerImage: {
    bottom:15,
    width: "100%",
    height: "100%",
  },
  infoSub: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: "600",

  },
  backButton: {
    marginTop: 40,
  },
});
