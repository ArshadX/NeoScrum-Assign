import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feedback from './Feedback';
import Home from './Home';

const HomeStack = createNativeStackNavigator();
const FeedbackStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="TabHomeScreen"
      component={Home}
      options={{
        title: 'Home',
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            color="#000000"
            size={25}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerTitleAlign: 'center',
        headerTintColor: '#000000',
        headerStyle: {backgroundColor: '#d4d4d4'},
      }}
    />
  </HomeStack.Navigator>
);
const FeedbackStackScreen = ({navigation}) => (
  <FeedbackStack.Navigator>
    <FeedbackStack.Screen
      name="TabFeedbackScreen"
      component={Feedback}
      options={{
        title: 'Feedback',
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            color="#000000"
            size={25}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerTitleAlign: 'center',
        headerTintColor: '#000000',
        headerStyle: {backgroundColor: '#d4d4d4'},
      }}
    />
  </FeedbackStack.Navigator>
);
class MainTabScreen extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor="#000000"
        barStyle={{backgroundColor: '#ffff'}}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="home" color="#000000" size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="FeedbackScreen"
          component={FeedbackStackScreen}
          options={{
            tabBarLabel: 'Feedback',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="forum" color="#000000" size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default MainTabScreen;
