import React, { useState } from 'react';
import { View, Image,Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { useCountdown } from 'react-native-countdown-circle-timer';
import { COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';

const size = 220; // Set the size to 3 times the desired diameter

export default function App() {
  const navigation = useNavigation();
  const [duration, setDuration] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const strokeWidth = 15;
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime
  } = useCountdown({ key, isPlaying, duration, colors: 'url(#your-unique-id)', size });
  const handlePlay = () => {
    setIsPlaying(true);
    setKey((prevKey) => prevKey + 1);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1);
  };
 

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <SafeAreaView style={{ position: 'absolute', backgroundColor: COLORS.background, flex: 1, width: '100%', height: '100%'}}>
        <View style={{ marginVertical: 20, padding:20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'left', alignItems: 'absolute', paddingLeft:-5,paddingBottom:10,}}><TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-circle" size={55} color={COLORS.white} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Device Calibration</Text>
      </View>
  



      <View style={[styles.container3, { overflow: 'visible' }]}>
        <View style={{ width: size, height: size, marginTop:-80,position: 'relative', overflow: 'visible'  }}>
          <Svg width={size} height={size}>
            <Defs>
              <LinearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
                <Stop offset="5%" stopColor="#A50102" />
                <Stop offset="95%" stopColor="#A00102" />
              </LinearGradient>
            </Defs>
            <Path
              d={path}
              fill="none"
              stroke="#171725"
              strokeWidth={strokeWidth}
            />
            {elapsedTime !== duration && (
              <Path
                d={path}
                fill="none"
                stroke={stroke}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                strokeDasharray={pathLength}
                strokeDashoffset={strokeDashoffset}
              />
            )}
          </Svg>
          <View style={styles.time}>
            <Text style={{  ...FONTS.h3, color: COLORS.white, }}>{formatTime(remainingTime)}</Text>
            <View style={styles.control}>

              {isPlaying && (
                <TouchableOpacity onPress={handleStop} className="">
                  <Ionicons name="stop-circle" size={55} color={COLORS.white} />
                </TouchableOpacity>
              )}

              {!isPlaying && (
                <TouchableOpacity onPress={handlePause} className="">
                  <Ionicons name="pause-circle" size={55} color={COLORS.white} />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={handlePlay} className="">
                <Ionicons name="play-circle" size={55} color={COLORS.white} />
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    container2: {
      justifyContent: 'center',
      alignItems: 'center',
     // paddingTop: Constants.statusBarHeight,
      backgroundColor: COLORS.containerbox,
      borderRadius: 20, 
      padding: 20,
      marginVertical: 10,
      height: 120,
      //flex:1,
    },
    container3: {
   //   flex:2,
      justifyContent: 'center',
      alignItems: 'center',
     // paddingTop: Constants.statusBarHeight,
      backgroundColor: COLORS.containerbox,
      borderRadius: 20, 
    //  padding: 20,
      height: '89%',
      marginVertical: 10,
    },
    time: {
    
      display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    marginTop:80,
    },
  timerContainer: {
    borderWidth: 4,
    borderColor: 'black',
    width: 280,
    height: 280,
    borderRadius: 280 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  headerImage:{
   // position: "absolute",
   // top: -35,
   // right: 45,
    width: "50%",
    height: "50%",
  },
  headerText: {
    ...FONTS.h6,
    marginTop: 15,
    color: COLORS.white,
    paddingLeft: 50,
  },
  timer: {
    fontSize: 50,
    color: 'black',
  },
  control:{
    marginTop: 100,
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  
propertiesText: {
  marginTop: -50,
  fontSize: 15,
  paddingRight:20,
  color: COLORS.white,
},
propertiesArea: {
  marginRight: 40,
  flexDirection: "row",
 // justifyContent: "flex-start",
 justifyContent: "center",
  alignItems:"center",
  width:400,
},
level: {
  marginRight: 10,
  marginLeft: 10,
  justifyContent:"space-between",
  alignItems:"center"
},
musclegroupText: {
  fontSize: 14,
  color: "#fff",
},
  
  });