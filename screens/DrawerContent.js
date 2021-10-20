import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Button,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
class DrawerContent extends Component {
  render() {
    return (
      <View style={styles.drawerContent}>
        <DrawerContentScrollView>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View>
                <Avatar.Image
                  source={require('../assets/profile_icon.png')}
                  size={100}
                  style={{backgroundColor: 'grey'}}
                />
              </View>
              <View>
                <Title style={styles.title}>Mo Arshad</Title>
                <Caption style={styles.caption}>Trainee</Caption>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <MaterialIcons name="home" color={color} size={size} />
                )}
                label="Home"
                onPress={() => this.props.navigation.navigate('HomeScreen')}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <MaterialIcons name="forum" color={color} size={size} />
                )}
                label="Feedback"
                onPress={() => {
                  this.props.navigation.navigate('FeedbackScreen');
                }}
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
              this.props.navigation.navigate('SignIn');
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
});

export default DrawerContent;
