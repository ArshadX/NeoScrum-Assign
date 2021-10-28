import React, {Component} from 'react';
//Image Picker
import ImagePicker from 'react-native-image-crop-picker';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {connect} from 'react-redux';

import {
  registerUser,
  SignInComplete,
  SignupComplete,
} from '../redux/user/userActions';

import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';
let errormsg_email = '';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
      photo: '',
      fullName: '',
      email: '',
      imageUri: '',
      imageType: '',
      imageName: '',
      isValidName: true,
      secureTextEntry: true,
      isValidEmail: true,
      //  isSigning: this.props.userData.isSignup,
      // visible: this.props.userData.isloading,
      password: '',
    };
  }

  componentWillUnmount() {
    this.setState({password: ''});
  }

  //Profile Picture
  uploadImagefile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image.path) {
        this.setState({
          ...this.state,
          photo: image.path,
          imageType: image.mime,
          imageName: 'profilephoto.jpeg',
        });
      }
    });
  };
  uploadImageCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image.path) {
        this.setState({
          ...this.state,
          photo: image.path,
          imageType: image.mime,
          imageName: 'profilephoto.jpeg',
        });
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
  SignUphandle = e => {
    e.preventDefault();
    if (this.state.email === '') {
      this.setState({isValidEmail: false, isValidPassword: false});
      errormsg_email = 'Can not be blank!';
      errormsg_pass = 'Can not be blank!';
    } else {
      let formData = new FormData();
      formData.append('name', this.state.fullName);
      formData.append('email', this.state.email);
      // console.log("line 110",JSON.stringify(this.state.image.assets))
      formData.append('profileImage', {
        uri: this.state.photo,
        type: this.state.imageType,
        name: this.state.imageName,
      });
      this.props.registerUser(formData);
      console.log('login', typeof formData);
      this.setState({password: this.props.userData.pswd});
      if (this.props.userData.isSignup) {
        this.props.navigation.navigate('SignIn');
      }
    }
  };
  render() {
    const {photo} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor="#66ddaa"
          barStyle="dark-content"
          translucent={false}
        />
        <Provider>
          <View style={styles.header}>
            <Text style={styles.text_header}>Create Account</Text>
          </View>

          <View style={styles.footer}>
            <Portal>
              <Modal
                visible={this.props.userData.isloading}
                contentContainerStyle={styles.containerStyle}>
                <ActivityIndicator
                  style={{justifyContent: 'space-around', color: '#000000'}}
                />
                <Text style={styles.textSign}>loading...</Text>
              </Modal>
              <Modal
                visible={this.props.userData.isSignup}
                onDismiss={() => this.props.SignupComplete()}
                contentContainerStyle={styles.containerStyle}>
                <Text style={styles.textSign}>
                  Your password : {this.props.userData.pswd}
                </Text>
              </Modal>
            </Portal>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flexDirection: 'row-reverse'}}>
                {photo ? (
                  <Image source={{uri: photo}} style={styles.profilePhoto} />
                ) : (
                  <Image
                    source={require('../assets/profile_icon.png')}
                    style={styles.profilePhoto_before}
                  />
                )}
              </View>
              <Text style={styles.text_footer}>Full Name</Text>
              <View
                style={
                  this.state.isValidName ? styles.action : styles.actionError
                }>
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
              <View style={styles.flexbutton}>
                <Button
                  onPress={this.uploadImagefile}
                  title="Gallery"
                  color="#00a86b"
                  accessibilityLabel="Open gallery"
                />
                <Button
                  onPress={this.uploadImageCamera}
                  title="Camera"
                  color="#3eb489"
                  accessibilityLabel="Open Camera"
                />
              </View>

              <View style={styles.button}>
                <Button
                  onPress={e => this.SignUphandle(e)}
                  title="Sign Up"
                  color="#00a86b"
                  accessibilityLabel="you will be logged in"
                  style={styles.signIn}
                />
              </View>
              <View style={{marginTop: 25}}>
                <Text style={styles.textSign}>
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
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66ddaa',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
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
    fontSize: 15,
    color: '#808080',
  },
  profilePhoto: {
    borderColor: '#00a86b',
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
  flexbutton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  containerStyle: {
    backgroundColor: '#fff',
    padding: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerUser: data => dispatch(registerUser(data)),
    SignupComplete: () => dispatch(SignupComplete()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
