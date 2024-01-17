import * as React from 'react';
import { View, useWindowDimensions, Text} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Insight from './Insight';
import MuscleGroup from './MuscleGroup';
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'grey'}}>
  	<Text>Tab One</Text>
  </View>
);
const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'darkgrey'}} >
  	<Text>Tab Two</Text>
  </View>
);
 
export default function DataMonitor() {
  const layout = useWindowDimensions();
 
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
  ]);
 
  const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  });
 
  const renderTabBar = props => (
  	<TabBar
     	 {...props}
      	activeColor={'white'}
      	inactiveColor={'black'}
          style={{marginTop:25,backgroundColor:'red'}}
  	/>
  );
 
  return (
  	<TabView
      	navigationState={{ index, routes }}
      	renderScene={renderScene}
      	renderTabBar={renderTabBar}
      	onIndexChange={setIndex}
      	initialLayout={{ width: layout.width }}
  	/>
  );
}