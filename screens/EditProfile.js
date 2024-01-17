import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Input from '../components/Input';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { images, FONTS, COLORS, SIZES } from '../constants';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
  const SECTIONS = [
    {
      items: [
        { id: 'bug',  label: 'Privacy Policy', type: 'link' },
        { id: 'contact', label: 'Contact Us', type: 'link' },
        { id: 'settings', label: 'Settings', type: 'link' },
      ],
    },
  ];
const EditProfile = ({ navigation }) => {
    const [form, setForm] = useState({
        language: 'English',
        darkMode: true,
        wifi: false,
      });
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [age, setAge] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      useEffect(() => {
        const fetchUserData = async () => {
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
                    setPassword(currentUser.password);
                    console.log("First Name:", currentUser.firstName);
                    console.log("Last Name:", currentUser.lastName);
                    console.log("Age:", currentUser.age);
                    console.log("Email:", currentUser.email);
                    console.log("Password:", currentUser.password);
                  }
                }
              }
            });
          } catch (error) {
            console.error("Fetch User Data Error:", error);
          }
        };
    
        fetchUserData();
      }, []); // Empty dependency array to run only once after the initial render
    
      
      const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Logout successful
            console.log('Logout successful');
          })
          .catch((error) => {
            // Handle logout error
            console.error('Logout error:', error);
          });
      };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={{ ...styles.backButton, marginTop: 0, marginLeft:0, }} onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back-circle" size={55} color={COLORS.white} />
</TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
                    <View
                        style={{
                            width: 100,
                            height: 80,
                            backgroundColor: COLORS.secondaryWhite,
                            borderRadius: 50,
                            marginVertical: 18,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AntDesign name="user" size={64} color={COLORS.white} />
                      
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 22 }}>
                        <Input
                            id="firstName"
                            placeholderTextColor={COLORS.gray}
                            placeholder={firstName}
                        />
                        <Input
                            id="lastName"
                            placeholderTextColor={COLORS.gray}
                            placeholder={lastName}
                        />
                         <Input
            id="email"
            placeholder={email}
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
          />
         
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
                       
                    </View>
                </View>
        </ScrollView>
                
             
           
        </SafeAreaView>
    )
}

export default EditProfile
  
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 24,
      backgroundColor: COLORS.background,
      height:'100%',
      flex:1,
    },
    section: {
     
    },
    sectionBody: {
     // borderTopWidth: 1,
    //  borderBottomWidth: 1,
      borderColor: '#e3e3e3',
      backgroundColor: COLORS.background,
      padding: 20,
    },
    header: {
      paddingLeft: 24,
      paddingRight: 24,
      marginBottom: 12,
    },
    title: {
        ...FONTS.h5,
      color: COLORS.white,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: COLORS.white,
    },
    profile: {
      padding: 16,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: COLORS.background,
     
    },
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 9999,
    },
    profileName: {
      marginTop: 12,
      ...FONTS.h6,
      fontWeight: '600',
      color: COLORS.white,
    },
    profileEmail: {
      marginTop: 6,
      ...FONTS.body2,
      fontWeight: '200',
      color: '#848484',
    },
    profileAction: {
      marginTop: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.background,
      borderRadius: 12,
    },
    profileActionText: {
      marginRight: 8,
      fontSize: 15,
      fontWeight: '600',
      color: '#fff',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
     // paddingRight: 24,
      height: 50,
    },
    rowWrapper: {
     // paddingLeft: 24,
      backgroundColor: COLORS.background,
      borderTopWidth: 1*0.5,
      borderColor: COLORS.gray,
    },
    rowIcon: {
     // marginRight: 12,
    },
    rowLabel: {
      fontSize: 17,
      fontWeight: '500',
      color: COLORS.white,
    },
    rowValue: {
      fontSize: 17,
      color: '#616161',
      marginRight: 4,
    },
    rowSpacer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
  });