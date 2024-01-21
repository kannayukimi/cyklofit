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
import { COLORS, FONTS } from "../constants";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const image_v_1 = require("../assets/images/training1.jpg");
const image_v_2 = require("../assets/images/training2.jpg");
const image_v_3 = require("../assets/images/training3.jpg");

import data from "../constants/training.json";

const Explore = ({ navigation }) => {
  const [trainings, setTrainings] = useState(data.trainings);
  const [filteredTrainings, setFilteredTrainings] = useState(data.trainings);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userEmail = user.email;
            console.log("User Email:", userEmail);

            const usersSnapshot = await get(ref(getDatabase(), "users"));
            const usersData = usersSnapshot.val();
            console.log("Users Data:", usersData);

            if (usersData) {
              const currentUser = Object.values(usersData).find(
                (userData) => userData.email === userEmail
              );

              if (currentUser) {
                setFirstName(currentUser.firstName);
                setLastName(currentUser.lastName);
                setAge(currentUser.age);
                setEmail(currentUser.email);
                console.log("First Name:", currentUser.firstName);
                console.log("Last Name:", currentUser.lastName);
                console.log("Age:", currentUser.age);
                console.log("Email:", currentUser.email);
              }
            }
          }
        });

        const trainingSnapshot = await get(ref(getDatabase(), "trainings"));
        const trainingData = trainingSnapshot.val();

        if (trainingData) {
          setTrainings(trainingData);
          setFilteredTrainings(trainingData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImage = (id) => {
    if (id === 1) return image_v_1;
    if (id === 2) return image_v_2;
    if (id === 3) return image_v_3;
  };

  const searchTrainings = (keyword) => {
    const lowercasedKeyword = keyword.toLowerCase();
    const results = trainings.filter((training) => {
      return training.make.toLowerCase().includes(lowercasedKeyword);
    });

    setFilteredTrainings(results);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <ImageBackground
            source={require("../assets/images/mainimage.jpg")}
            style={{ width: wp(100), height: hp(60) }}
          />
        </View>
        <SafeAreaView style={{}}>
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
          <View style={styles.titleSection}>
          <Text style={styles.title}>
            Hello{" "}
            <Text style={styles.firstName}>{firstName || "Guest"}</Text>, {"\n"}
            Have you trained today?
            </Text>
          </View>
        </SafeAreaView>
        <View style={styles.listSection}>
          <Text style={styles.headText}>Cyclist Training List</Text>

          <ScrollView style={[styles.elementPallet]}>
            {filteredTrainings.map((training) => {
              return (
                <TouchableOpacity
                  style={styles.element}
                  key={training.id}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("DetailScreen", { id: training.id })
                  }
                >
                  <ImageBackground
                    source={getImage(training.id)}
                    resizeMode="cover"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 14,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: "rgba(0, 0, 0, 0.25)", // Adjust opacity as needed
                      }}
                    />
                  </ImageBackground>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 6,
                    }}
                  >
                    <View style={styles.infoArea}>
                      <Text style={[styles.infoTitle]}>{training.make}</Text>
                      <Text style={styles.infoDetail}>
                        <Text style={styles.infoSub}>
                          {training.subtitle}{" "}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default Explore;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  headerSection: {
    height: 105,
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
    height: 80,
  },
  title: {
    ...FONTS.h5,
    color: COLORS.black,
  },
  listSection: {
    marginTop: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: COLORS.background,
    padding: 25,
    justifyContent: "space-between",
    height: '120%',
  },
  headText: {
    ...FONTS.h6,
    marginBottom: 10,
    color: COLORS.white,
  },
  elementPallet: {
    marginTop: 15,
    paddingLeft: 0,
    paddingRight: 0,
    height: 480,
  },
  element: {
    height: 150,
    width: "100%",
    marginBottom: 20,
  },
  infoArea: {
    width: "100%",
    marginTop: 10,
  },
  infoTitle: {
    ...FONTS.h6,
    textAlign: "left",
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
  infoSub: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: "600",

  },
  backButton: {
    marginTop: -70,
    paddingLeft:15,
  },
});
