import * as React from 'react';
import { View, useWindowDimensions, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import GraphTab from './GraphTab';
import MuscleGroup from './MuscleGroup';
import { COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.background }}>
    <MuscleGroup />
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.background }}>
    <GraphTab />
  </View>
);

const DataMonitor = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Muscle Map' },
    { key: 'second', title: 'Graph' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
    {...props}
    activeColor={'white'}
    inactiveColor={'white'}
    style={{
      backgroundColor: COLORS.background,
      borderRadius: 10,
      height: 50,
      marginTop: -0,
    }}
    indicatorStyle={{
      backgroundColor: 'red', // Set the indicator color (underline) to red
      borderRadius: 10,
    }}
  
  />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{ paddingTop: 35, flexDirection: "row", paddingLeft:15,}}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={55} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={{ ...FONTS.h6, marginLeft: 60, fontWeight: "500", marginTop: 20, color: COLORS.white }}>
          Data Monitoring
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DataMonitor;
