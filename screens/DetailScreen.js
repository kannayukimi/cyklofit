import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import Button from '../components/Button'
import { Ionicons } from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { cyclistTrainingData } from '../constants/data';
import { COLORS, FONTS, SIZES, images, icons } from "../constants";
import data from "../constants/training.json";

const image_v_1 = require("../assets/images/training1.jpg");
const image_v_2 = require("../assets/images/training2.jpg");
const image_v_3 = require("../assets/images/training3.jpg");

const DetailScreen = ({ route, navigation }) => {
  const training = data.trainings.filter(
    (element) => element.id == route.params.id
  )[0];
  const getImage = (id) => {
    if (id == 1) return image_v_1;
    if (id == 2) return image_v_2;
    if (id == 3) return image_v_3;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
    <View style={[styles.headerSection, StyleSheet.absoluteFillObject, { backgroundColor: "rgba(0, 0, 0, 1)" }]}>
      
        <ImageBackground source={getImage(training.id)}    style={{...styles.trainingImage}}/>
      </View>
      <SafeAreaView style={{...styles.topSection, flexDirection:"row",paddingTop: 25 }}>
        <TouchableOpacity style={styles.backButton}
          onPress={()=> navigation.goBack()}

        >
          <Ionicons name="arrow-back-circle" size={55} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Training Detail</Text>
      </SafeAreaView>
      <View style={styles.listSection}>
        
        <View style={styles.headSection}>
          <View style={styles.topTextArea}>
            <Text style={styles.makemodelText}>
              {training.make} 
            </Text>
          </View>
        </View>

        <Text style={styles.descriptionText}>{training.description}</Text>
        <Text style={styles.propertiesText}>Muscle Activation Level</Text>

        <View style={styles.propertiesArea}>
          <View style={styles.level}>
            <Text style={styles.musclegroupText}>
              Quads:
              <Text style={styles.valueText}>
                {" "}
                {training.musclegroups.quads}
              </Text>
            </Text>
          </View>
         
          <View style={styles.level}>
            <Text style={styles.musclegroupText}>
              Hamstrings:
              <Text style={styles.valueText}>
                {" "}
                {training.musclegroups.hamstrings}
              </Text>
            </Text>
          </View>
          <View style={styles.level}>
          <Text style={styles.musclegroupText}>
              Glutes:
              <Text style={styles.valueText}>
                {" "}
                {training.musclegroups.glutes}
              </Text>
            </Text>
          </View>
        </View>
        <View style={[styles.propertiesArea ]}>
     
        <View style={styles.level}>
          <View style={{backgroundColor:"#20202B",  opacity: 1, borderRadius: 70/2, width: 70, height: 70, justifyContent: 'center', alignItems: 'center'}}>
  <Image
          source={require("../assets/images/quads-high.png")}
       
          style={{width:70, height: 70, borderRadius: 70/2}}
          />
</View>
          </View>
          <View style={styles.level}>
          <View style={{backgroundColor:"#20202B",  opacity: 1, borderRadius: 70/2, width: 70, height: 70, justifyContent: 'center', alignItems: 'center'}}>
  <Image
    source={require("../assets/images/hams-med.png")}
    style={{width:70, height: 70, borderRadius: 70/2}}
  />
</View>
          </View>
          <View style={styles.level}>
          <View style={{backgroundColor:"#20202B", opacity: 1, borderRadius: 70/2, width: 70, height: 70, justifyContent: 'center', alignItems: 'center'}}>
  <Image
          source={require("../assets/images/glutes-high.png")}
          style={{width:70, height: 70, borderRadius: 70/2}}
  />
</View>
          </View>
          </View>

        <TouchableOpacity style={styles.startButton}>
        <Button
                            title="Start"
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 48,
                            }}
                            onPress={() =>
                                navigation.navigate('DataMonitor')
                            }
                        />
        </TouchableOpacity>
      
      </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    //paddingRight: 35,
    //paddingLeft: 35,
  },
  titleSection: {
    flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginTop:30,
      marginHorizontal:30,
      height: 80,
  },
  topSection:{
    marginTop: 10,
    paddingTop: 20,
    flexDirection: "column",
  },
  listSection: {
    marginTop: 185,
     backgroundColor:COLORS.background,
     padding:25,
    justifyContent:'space-between',
  },
  headerSection: {
    height: 200,
    width:"100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
  },
  
  menuIconStyle: {
    width: 25,
  },
  
  headerText: {
    ...FONTS.h6,
    marginLeft: 70,
    fontWeight: "500",
    marginTop:20,
    color: COLORS.white,
  },
  faceIconStyle: {
    width: 30,
  },
  imageSection: {
    width: "100%",
    height: 250,
   // resizeMode: 'contain', // Make sure the image covers the entire container
   justifyContent: 'center',
   alignItems: 'center',
 //  overflow: 'visible', // Allow overflow in width
 flex:1,
  },
  trainingImage: {
    height: '120%', 
    width: '100%',  // Set width to 100%
   // resizeMode: 'contain', // Make sure the image covers the entire container
    justifyContent: 'center',
    alignItems: 'center',
  //  overflow: 'visible', // Allow overflow in width
  flex:1,
  },
  backButton: {
   paddingLeft: 15,
   // marginTop: 10,
  },
  headSection: {},
  topTextArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  makemodelText: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.white,
  },
  price: {
    fontWeight: "400",
  },
  amount: {
    fontWeight: "bold",
  },
  typetranText: {
    marginTop: 1,
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 12,
  },
  descriptionText: {
    marginTop: 10,
    ...FONTS.body3,
    letterSpacing: 0.1,
    lineHeight: 22,
    color: COLORS.white,
  },
  propertiesText: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "500",
    color: COLORS.white,
  },
  propertiesArea: {
    marginTop: 20,
    flexDirection: "row",
  justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 20,
  },
  level: {
    marginRight: 30,
  },
  musclegroupText: {
    fontSize: 12,
    color: "#696969",
  },
  valueText: {
    fontSize: 12,
    color: "#E3E7EC",
  },
  startButton: {
    marginTop: 50,
  },
});
