import React from 'react';
import {View, Image} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

function LogoTitle() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -40,
        backgroundColor: '#66ddaa',
      }}>
      <Image
        style={{width: 150, height: 30}}
        source={require('../assets/logo.png')}
      />
    </View>
  );
}

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerStyle: {backgroundColor: '#66ddaa'},
        headerShadowVisible: false,
      }}
    />
    <RootStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
