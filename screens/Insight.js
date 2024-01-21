import { StyleSheet, Switch, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import React from 'react';
import Body from "react-native-body-highlighter";
import { COLORS, FONTS, SIZES, images, icons } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import { Circle, G } from 'react-native-svg';
import moment from 'moment';
const Insight = ({ navigation }) => {
  const [data, setData] = useState([[], [], [], [], [], []]);
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData1 = [...data[0], Math.random() * 100];
      const newData2 = [...data[1], Math.random() * 100];
      const newData3 = [...data[2], Math.random() * 100];
      const newData4 = [...data[3], Math.random() * 100];
      const newData5 = [...data[4], Math.random() * 100];
      const newData6 = [...data[5], Math.random() * 100];      
      const newLabels = [...xAxisLabels, moment().format('HH:mm:ss')];

      setData([
        newData1.slice(-10),
        newData2.slice(-10),
        newData3.slice(-10),
        newData4.slice(-10),
        newData5.slice(-10),
        newData6.slice(-10),
      ]);
      setXAxisLabels(newLabels.slice(-10));
      setCount((prevCount) => prevCount + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [data, xAxisLabels]);

  const colors = ['#07E092', '#FD5B71', '#936DFF'];

  const contentInset = { top: 20, bottom: 20 };
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
    setTimer(0);
    setIsTimerRunning(false);
    setData([[], [], [], [], [], []]);
    setXAxisLabels([]);
  };
  return (

    <View style={styles.container}>
       <View>
      {/* <TouchableOpacity style={{ ...styles.backButton, marginTop: 20, marginLeft:-20, }} onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back-circle" size={55} color={COLORS.white} />
</TouchableOpacity>*/}

      <View style={styles.container1}>
      
        <YAxis
          data={data[0]}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={6}  // <-- Change this line
  formatLabel={(value) => `${value.toFixed(2)}`}
        />
        <LineChart
          style={styles.chart}
          data={[
            {
              data: data[0],
              svg: { stroke: colors[0] },
            },
            {
              data: data[1],
              svg: { stroke: colors[1] },
            },
            {
              data: data[2],
              svg: { stroke: colors[2] },
            },
          ]}
          contentInset={contentInset}
          yMin={0}
          yMax={100}
          numberOfTicks={10}
        >
        <View style={[{ flexDirection: "row",width: '80%',marginLeft:-30,  }]}>

<View style={styles.level}>
  <Text style={styles.musclegroupText}>
  <Ionicons name="square" size={12} color={"#07E092"} />
    <Text style={styles.valueText}>
    {" "} Quads
    </Text>
  </Text>
</View>
<View style={styles.level}>
  <Text style={styles.musclegroupText}>
  <Ionicons name="square" size={12} color={"#FD5B71"} />
    <Text style={styles.valueText}>
    {" "} Hamstrings
    </Text>
  </Text>

</View>
<View style={styles.level}>
  <Text style={styles.musclegroupText}>
  <Ionicons name="square" size={12} color={"#936DFF"} />
    <Text style={styles.valueText}>
    {" "} Glutes
    </Text>
  </Text>

</View>
</View>
          <Grid
            svg={{
              stroke: 'white',
              strokeWidth: 0.25,
              opacity: 0.5,
            }}
          />
          {/* Additional customization with Decorator if needed */}
        </LineChart>
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
    <>
      <Ionicons name="pause-circle" size={55} color={COLORS.white} />
      <Text style={[styles.labelText, {paddingLeft: 10}]}>Pause</Text>
    </>
  ) : (
    <>
      <Ionicons name="play-circle" size={55} color={COLORS.gray} />
      <Text style={[styles.labelText, {paddingLeft: 10}]}>Start</Text>
    </>
  )}
</TouchableOpacity>
    <TouchableOpacity onPress={handleReset} className="">
      <Ionicons name="refresh-circle" size={55} color={COLORS.primary} />
      <Text style={[styles.labelText, {paddingLeft: 10}]}>Reset</Text>
    </TouchableOpacity>

    </View>
  </View>
    </View>
  )
}
const styles = StyleSheet.create({

  container1: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop:0,
    backgroundColor: COLORS.containerbox,
    borderRadius: 20, 
    width:'100%',
    height:180,
    marginBottom:15,
    padding:20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding:20,
    width:'100%',
  },
  chart: {
   // flex: 1,
    marginLeft: 5,
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
export default Insight