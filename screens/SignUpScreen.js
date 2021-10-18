import React, {Component} from 'react';
//Image Picker
import ImagePicker from 'react-native-image-crop-picker';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {throwStatement} from '@babel/types';
let errormsg_email = '';
let errormsg_pass = '';
let errormsgcfm = '';

class SignUpScreen extends Component {
  state = {
    photo: null,
    fullName: '',
    email: '',
    password: '',
    confPass: '',
    isValidName: true,
    isValidconfPass: true,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
  };
  //Profile Picture
  uploadImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image.path) {
        this.setState({photo: image});
      }
    });
  };
  //Validation
  onNameChange = val => {
    val = val.trim();
    const re = /^([A-Za-z ]{3,})\w$/g;
    this.setState({isValidName: re.test(val)});
    if (this.state.isValidName) {
      this.setState({fullName: val});
    }
  };
  onEmailChange = val => {
    val = val.trim();
    this.setState({isValidEmail: false});
    if (val !== '') {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.setState({isValidEmail: re.test(val)});
      if (this.state.isValidEmail) {
        this.setState({email: val});
      } else {
        errormsg_email = 'Invalid';
      }
    } else {
      this.setState({isValidEmail: true});
    }
  };
  onPasswordChange = val => {
    val = val.trim();
    if (val !== '') {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

      if (re.test(val)) {
        this.setState({password: val, isValidPassword: true});
      } else {
        this.setState({isValidPassword: false});
        errormsg_pass = 'Password must be Alphanumeric and includes [!@#$%^&*]';
      }
    } else {
      this.setState({isValidPassword: true});
    }
  };
  //compare password
  comparepass = val => {
    if (val === this.state.confPass) {
      this.setState({isValidconfPass: true});
    } else {
      this.setState({isValidconfPass: false});
    }
  };
  //end
  onCfmPassChange = val => {
    val = val.trim();
    if (val !== '') {
      this.setState({confPass: val});
      if (val === this.state.password) {
        this.setState({isValidconfPass: true});
      } else {
        this.setState({isValidconfPass: false});
        errormsgcfm = 'Does not match!';
      }
    } else {
      this.setState({isValidconfPass: true});
    }
  };
  SignUphandle = e => {
    e.preventDefault();
    if (this.state.email === '' && this.state.password === '') {
      this.setState({isValidEmail: false, isValidPassword: false});
      errormsg_email = 'Can not be blank!';
      errormsg_pass = 'Can not be blank!';
    }
  };
  render() {
    const {photo} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#e14e51" barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Create Account</Text>
        </View>
        <View style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {photo ? (
                <Image source={{uri: photo.path}} style={styles.profilePhoto} />
              ) : (
                <Image
                  source={require('../assets/profile_icon.png')}
                  style={styles.profilePhoto_before}
                />
              )}
            </View>
            <Text style={styles.text_footer}>Full Name</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Ex. John..."
                style={styles.textInput}
                onChangeText={val => this.onNameChange(val)}
                autoCapitalize="none"
              />
            </View>
            <Text style={styles.errorMsg}>
              {this.state.isValidName ? null : 'Invalid'}
            </Text>
            <Text style={styles.text_footer}>Email</Text>
            <View
              style={
                this.state.isValidEmail ? styles.action : styles.actionError
              }>
              <TextInput
                placeholder="Your Email Id..."
                style={styles.textInput}
                onChangeText={val => this.onEmailChange(val)}
                autoCapitalize="none"
              />
            </View>
            <Text style={styles.errorMsg}>
              {this.state.isValidEmail ? null : errormsg_email}
            </Text>
            <Text style={styles.text_footer}>Password</Text>
            <View
              style={
                this.state.isValidPassword ? styles.action : styles.actionError
              }>
              <TextInput
                placeholder="Password..."
                style={styles.textInput}
                onChangeText={val => this.onPasswordChange(val)}
                onEndEditing={e => {
                  this.comparepass(e.nativeEvent.text);
                }}
                autoCapitalize="none"
              />
            </View>
            <Text style={styles.errorMsg}>
              {this.state.isValidPassword ? null : errormsg_pass}
            </Text>
            <Text style={styles.text_footer}>Confirm Password</Text>
            <View
              style={
                this.state.isValidconfPass ? styles.action : styles.actionError
              }>
              <TextInput
                placeholder="password"
                style={styles.textInput}
                onChangeText={val => this.onCfmPassChange(val)}
                autoCapitalize="none"
              />
            </View>
            <Text style={styles.errorMsg}>
              {this.state.isValidconfPass ? null : errormsgcfm}
            </Text>
            <View style={styles.button}>
              <Button
                onPress={this.uploadImage}
                title="Photo"
                color="#DD0004"
                accessibilityLabel="Open gallery"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={e => this.SignUphandle(e)}
                title="Sign Up"
                color="#DD0004"
                accessibilityLabel="you will be logged in"
                style={styles.signIn}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Text>
                Already on NeoScrum ?{' '}
                <Text
                  style={{color: 'blue'}}
                  onPress={() => this.props.navigation.navigate('SignIn')}>
                  Sign in
                </Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DD0004',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginBottom: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    marginBottom: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 7,
    marginTop: 7,
  },
  button: {
    alignItems: 'stretch',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhoto: {
    borderColor: '#DD0004',
    borderWidth: 2,
    borderRadius: 60,
    width: 120,
    height: 120,
  },
  profilePhoto_before: {
    borderColor: '#808080',
    borderWidth: 2,
    borderRadius: 60,
    width: 120,
    height: 120,
    opacity: 0.6,
  },
});
export default SignUpScreen;
