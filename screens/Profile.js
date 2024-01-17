import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Input from '../components/Input';
import Button from '../components/Button';
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
        { id: '1',  label: 'Privacy Policy', type: 'link' },
        { id: '2', label: 'Contact Us', type: 'link' },
        { id: '3', label: 'Settings', type: 'link' },
      ],
    },
  ];
const Profile = ({ navigation }) => {
    const [form, setForm] = useState({
        language: 'English',
        darkMode: true,
        wifi: false,
      });
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [age, setAge] = useState("");
      const [email, setEmail] = useState("");
    
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
                    console.log("First Name:", currentUser.firstName);
                    console.log("Last Name:", currentUser.lastName);
                    console.log("Age:", currentUser.age);
                    console.log("Email:", currentUser.email);
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
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>
  
          <View style={styles.profile}>
         {/* 
<Image alt="" source={{uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
              }} style={styles.profileAvatar}
            />
*/}
  
  <Text style={styles.profileName}>{firstName} {lastName}</Text>
  <Text style={styles.profileEmail}>{email}</Text>
  
            <TouchableOpacity
              onPress={() =>
                                navigation.navigate('EditProfile')
                            }>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>
  
                <FeatherIcon color="#fff" name="edit" size={16} />
              </View>
            </TouchableOpacity>
          </View>
  
          {SECTIONS.map(({ header, items }) => (
            <View style={styles.section} key={header}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{header}</Text>
              </View>
              <View style={styles.sectionBody}>
                {items.map(({ id, label, icon, type, value }, index) => {
                  return (
                    <View
                   //   key={id}
                      style={[
                        styles.rowWrapper,
                        index === 0 && { borderTopWidth: 0 },
                      ]}>
                      <TouchableOpacity
                        onPress={() => {
                          // handle onPress
                        }}>
                        <View style={styles.row}>
                          <FeatherIcon
                            color="#616161"
                            name={icon}
                            style={styles.rowIcon}
                            size={22}
                          />
  
                          <Text style={styles.rowLabel}>{label}</Text>
  
                          <View style={styles.rowSpacer} />
  
                          {type === 'select' && (
                            <Text style={styles.rowValue}>{form[id]}</Text>
                          )}
  
                          {type === 'toggle' && (
                            <Switch
                              onChange={val => setForm({ ...form, [id]: val })}
                              value={form[id]}
                            />
                          )}
  
                          {(type === 'select' || type === 'link') && (
                            <FeatherIcon
                              color="#ababab"
                              name="chevron-right"
                              size={22}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
          <View style={{ flex: 1, alignItems: 'center' }}>
                

                    <View style={{ width: '100%', paddingHorizontal: 22, marginTop:100, }}>
                  
                        <Button
                            title="Logout"
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 48,
                            }}
                            onPress={() =>{
    handleLogout();
    navigation.navigate('Onboarding');
  }}
                        />
                       
                    </View>
                </View>
        </ScrollView>
                
             
           
        </SafeAreaView>
    )
}

export default Profile
  
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 24,
      backgroundColor: COLORS.background,
      height: '100%',
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