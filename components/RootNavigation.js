import React, {Component} from 'react';

import {NavigationContainer, ServerContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import DrawerContent from '../screens/DrawerContent';

import MainTabScreen from '../screens/MainTabScreen';
import {connect} from 'react-redux';
import RootStackScreen from '../screens/RootScreen';
import {Logout} from '../redux/user/userActions';

class RootNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout = () => {
    this.props.Logout();
    console.log(this.props.userData.profile);
  };
  render() {
    return (
      <NavigationContainer>
        {this.props.userData.islogging == true ? (
          <Drawer.Navigator
            drawerContent={props => (
              <DrawerContent
                {...props}
                SignOut={this.logout}
                N={this.props.userData.name}
                pro={this.props.userData.profile}
              />
            )}>
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
    Logout: data => dispatch(Logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);
