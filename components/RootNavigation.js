import React, {Component} from 'react';

import {NavigationContainer, ServerContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import DrawerContent from '../screens/DrawerContent';

import MainTabScreen from '../screens/MainTabScreen';
import {connect} from 'react-redux';
import RootStackScreen from '../screens/RootScreen';

class RootNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        {this.props.userData.islogging == true ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen
              name="HomeDrawer"
              component={MainTabScreen}
              options={{
                headerShown: false,
              }}
            />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);
