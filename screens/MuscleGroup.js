import { StyleSheet, Switch, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import React from 'react';
import Body from "react-native-body-highlighter";
import { COLORS, FONTS, SIZES, images, icons } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
const MuscleGroup= ({ navigation }) => {
  const [bodyPartSelected, setBodyPartSelected] = useState({
    slug: "biceps",
    intensity: 2,
  });
  const [isBackSideEnabled, setIsBackSideEnabled] = useState(false);
  const [isMale, setIsMale] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const toggleSwitch = () =>
    setIsBackSideEnabled((previousState) => !previousState);

  const toggleGenderSwitch = () => setIsMale((previousState) => !previousState);

  const handleStopwatch = () => {
    setIsTimerRunning((prevValue) => !prevValue);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const handleReset = () => {
    setBodyPartSelected({ slug: "biceps", intensity: 2 });
    setIsBackSideEnabled(false);
    setIsMale(true);
    setTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginLeft:-130, marginTop:5, flexDirection: "row" }}>
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
        <Text style={styles.titleText}>Data Monitoring</Text>
      </SafeAreaView>
      <View style={styles.bodyContainer}>
      <View style={{ marginVertical: 30 }}>
  <CircularProgress 
    value={85}
    inActiveStrokeColor={'#2ecc71'}
    inActiveStrokeOpacity={0.2}
    progressValueColor={'#fff'}
    valueSuffix={'%'}
    textStyle={{ fontSize: 15 }}
    radius={28} // Adjust the radius as needed
    strokeWidth={8} // Adjust the strokeWidth as needed
  />
  <View style={{ marginBottom: 20 }}></View>
  <CircularProgress
    value={52}
    activeStrokeColor={'#f39c12'}
    inActiveStrokeColor={'#f39c12'}
    inActiveStrokeOpacity={0.2}
    progressValueColor={'#fff'}
    valueSuffix={'%'}
    textStyle={{ fontSize: 15 }}
    radius={28} // Adjust the radius as needed
    strokeWidth={8} // Adjust the strokeWidth as needed
  />
  <View style={{ marginBottom: 20 }}></View>
  <CircularProgress
    value={47}
    activeStrokeColor={'#f39c12'}
    inActiveStrokeColor={'#f39c12'}
    inActiveStrokeOpacity={0.2}
    progressValueColor={'#fff'}
    valueSuffix={'%'}
    textStyle={{ fontSize: 15 }}
    radius={28} // Adjust the radius as needed
    strokeWidth={8} // Adjust the strokeWidth as needed
  />
</View>
<Body 
          data={[bodyPartSelected]}
          onBodyPartPress={(e) =>
            setBodyPartSelected({ slug: e.slug, intensity: 2 })
          }
          gender="male"
          side="front"
          scale={0.63}
          
        />
        
        <Body
          data={[bodyPartSelected]}
          onBodyPartPress={(e) =>
            setBodyPartSelected({ slug: e.slug, intensity: 2 })
          }
          gender="male"
          side="back"
          scale={0.63}
        />
         <View style={{ marginVertical: 30 }}>
      <CircularProgress
  value={79}
  inActiveStrokeColor={'#2ecc71'}
  inActiveStrokeOpacity={0.2}
  progressValueColor={'#fff'}
  valueSuffix={'%'}
  textStyle={{ fontSize: 15 }}
  radius={28} // Adjust the radius as needed
  strokeWidth={8} // Adjust the strokeWidth as needed
/><View style={{ marginBottom: 20 }}></View>
<CircularProgress
  value={68}
  activeStrokeColor={'#f39c12'}
  inActiveStrokeColor={'#f39c12'}
  inActiveStrokeOpacity={0.2}
  progressValueColor={'#fff'}
  valueSuffix={'%'}
  textStyle={{ fontSize: 15 }}
  radius={28} // Adjust the radius as needed
  strokeWidth={8} // Adjust the strokeWidth as needed
/><View style={{ marginBottom: 20 }}></View>
<CircularProgress
  value={47}
  activeStrokeColor={'#f39c12'}
  inActiveStrokeColor={'#f39c12'}
  inActiveStrokeOpacity={0.2}
  progressValueColor={'#fff'}
  valueSuffix={'%'}
  textStyle={{ fontSize: 15 }}
  radius={28} // Adjust the radius as needed
  strokeWidth={8} // Adjust the strokeWidth as needed
/></View>
      </View>
      
     <View style={[styles.propertiesArea, { alignItems: "center" }]}>
          <View style={styles.level}>
            <Text style={[styles.labelText, { marginLeft:20 }]}>
             Front
            </Text>
          </View>
          <View style={styles.level}>
          <Text style={[styles.labelText, { marginRight:16 }]}>
             Back
            </Text>
          </View>
        </View>

      <View style={styles.muscleIndex}>
      <Text style={styles.labelText}>Muscle Fatigue Index</Text>
      <View style={styles.propertiesArea}>
          <View style={styles.level}>
            <Text style={styles.musclegroupText}>
              L-Q:
              <Text style={styles.valueText}>
                {" "} data%
              </Text>
            </Text>
            <Text style={styles.musclegroupText}>
              L-H:
              <Text style={styles.valueText}>
                {" "} data%
              </Text>
            </Text>
            <Text style={styles.musclegroupText}>
              L-G: 
              <Text style={styles.valueText}>
                {" "} data%
              </Text>
            </Text>
          </View>
          <View style={styles.level}>
            <Text style={styles.musclegroupText}>
             R-Q:
              <Text style={styles.valueText}>
                {" "} data%
              </Text>
            </Text>
            <Text style={styles.musclegroupText}>
             R-H:
              <Text style={styles.valueText}>
                {" "} data%
              </Text>
            </Text>
            <Text style={styles.musclegroupText}>
             R-G:
              <Text style={styles.valueText}>
                {" "} data%
              </Text>
            </Text>
          </View>
        </View>
  </View>
  <View style={styles.timerContainer}>
    <Text style={styles.labelText}>Total Time</Text>
    <Text style={styles.timerText}>{formatTime(timer)}</Text>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
    <TouchableOpacity onPress={handleStopwatch} className="">
      {isTimerRunning ? (
        <Ionicons name="pause-circle" size={55} color={COLORS.white} />
      ) : (
        <Ionicons name="play-circle" size={55} color={COLORS.gray} />
      )}<Text style={[styles.labelText, {paddingLeft: 10}]}>Rest</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleReset} className="">
      <Ionicons name="refresh-circle" size={55} color={COLORS.primary} />
      <Text style={[styles.labelText, {paddingLeft: 10}]}>Reset</Text>
    </TouchableOpacity>

    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding:20,
  },
  bodyContainer: {
    flexDirection: "row",
    flex:2,
    marginBottom:-50,
    justifyContent: 'center',
    alignItems: 'center',

  width:'80%',
    height: '40%',
    marginVertical: 5,
  },
  switchContainer: {
    flexDirection: "row",
    gap: 30,
  },
  switch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
titleText: { 
    ...FONTS.h6, 
    textAlign: "left",
    color: COLORS.white,
    marginTop:20,
    marginLeft:70,
},
description: { 
    ...FONTS.h6, 
    textAlign: "left",
    color: COLORS.white,
},
btn: {
    width: SIZES.width - 44
},
bottomContainer: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12
},
topview:{
  marginHorizontal:35,
  flex:1,
  justifyContent:"space-between",
},
welcomemessage:{
  color:COLORS.white,
  fontSize:35,
  ...FONTS.h5, 
},
timerContainer: {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
     // paddingTop: Constants.statusBarHeight,
     backgroundColor: COLORS.containerbox,
     borderRadius: 20, 
   //  padding: 20,
   width:'100%',
   height:180,
},
muscleIndex: {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
     // paddingTop: Constants.statusBarHeight,
     backgroundColor: COLORS.containerbox,
     borderRadius: 20, 
   //  padding: 20,
   width:'100%',
   height:120,
},
timerText: {
  ...FONTS.h4,
  color: COLORS.white,
  marginBottom: 10,
},
labelText: {
  ...FONTS.body4,
  color: COLORS.gray,
  marginBottom: 10,
  alignItems: "center",
  justifyContent: "center",
},
startButton: {
  backgroundColor: COLORS.primary,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},
startButtonText: {
  ...FONTS.body3,
  color: COLORS.white,
},

welcomecontainer:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center"
},
propertiesText: {
  marginTop: 20,
  fontSize: 21,
  fontWeight: "500",
  color: COLORS.white,
},
propertiesArea: {
  marginTop: 0,
  flexDirection: "row",
 // justifyContent: "flex-start",
  justifyContent:"space-between",
  alignItems:"center",
  width:"65%",
},
level: {
  marginRight: 25,
  marginLeft: 25,
  justifyContent:"space-between",
  alignItems:"center"
},
musclegroupText: {
  fontSize: 14,
  color: "#fff",
},
valueText: {
  fontSize: 12,
  color: "#E3E7EC",
},
});
export default MuscleGroup;