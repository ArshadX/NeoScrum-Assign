import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Drawer} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.pro,
      Active: this.navigation,
    };
  }
  render() {
    return (
      <View style={styles.drawerContent}>
        <DrawerContentScrollView>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View>
                <Image
                  source={require('../assets/profile_icon.png')}
                  style={styles.image}
                  progressiveRenderingEnabled={true}
                />
              </View>
              <View>
                <Title style={styles.title}>{this.props.N}</Title>

                <Caption style={styles.caption}>Trainee</Caption>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <Drawer.Item
                icon={({color, size}) => (
                  <MaterialIcons name="home" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  this.setState({Active: 'first'});
                  this.props.navigation.navigate('HomeScreen');
                }}
                active={this.state.Active == 'first'}
                activeTintColor="blue"
              />
              <Drawer.Item
                icon={({color, size}) => (
                  <MaterialIcons name="forum" color={color} size={size} />
                )}
                label="Feedback"
                onPress={() => {
                  this.setState({Active: 'second'});
                  this.props.navigation.navigate('FeedbackScreen');
                }}
                active={this.state.Active == 'second'}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              this.props.SignOut();
            }}
          />
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#000000',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  image: {
    width: 110,
    height: 110,
    borderWidth: 2,
    borderRadius: 55,
    backgroundColor: 'grey',
    borderColor: '#000000',
    opacity: 0.7,
  },
});

export default DrawerContent;
