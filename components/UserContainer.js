import React, {Component, useEffect} from 'react';

import {connect} from 'react-redux';
import {fetchUsers} from '../redux';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';

function UsersContainer({userData, fetchUsers}) {
  useEffect(() => {
    fetchUsers();
  }, []);
  return userData.isloading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : userData.error ? (
    <Text style={{fontSize: 100}}>{userData.error}</Text>
  ) : (
    <View style={styles.container}>
      <ScrollView></ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66ddaa',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
