import React, {Component} from 'react';

import {connect} from 'react-redux';
import {login} from '../redux/user/userActions';

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
  ActivityIndicator,
} from 'react-native';

//Import Icon
import Feather from 'react-native-vector-icons/Feather';
import {color} from 'react-native-reanimated';
import {Modal, Portal, Provider} from 'react-native-paper';

const myIcon = <Feather name="user" size={30} color="#000000" />;
const myIcon2 = <Feather name="lock" size={30} color="#000000" />;
let errormsg_email = null;
let errormsg_pass = null;
/**
 * @ */

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSecuretextEntry: true,
      isValidEmail: true,
      isValidPassword: true,
    };
  }
  onInputChange = val => {
    val = val.trim();
    this.setState({isValidEmail: false});
    if (val !== '') {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.setState({isValidEmail: re.test(val)});
      if (this.state.isValidEmail) {
        this.setState({email: val});
        console.log(this.state.email);
      } else {
        errormsg_email = 'Invalid';
      }
    } else {
      this.setState({isValidEmail: true});
    }
  };
  onPasswordChange = val => {
    val = val.trim();
    this.setState({isValidPassword: false});
    if (val !== '') {
      const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/;
      this.setState({isValidPassword: re.test(val)});
      if (this.state.isValidPassword) {
        this.setState({password: val});
      } else {
        errormsg_pass = 'Password must be Alphanumeric and includes [!@#$%^&*]';
      }
    } else {
      this.setState({isValidPassword: true});
    }
  };
  updateSecureTextEntry = () => {
    let val = this.state.isSecuretextEntry;
    this.setState({isSecuretextEntry: !val});
  };
  login_handle = e => {
    e.preventDefault();
    if (this.state.email === '' && this.state.password === '') {
      this.setState({isValidEmail: false, isValidPassword: false});
      errormsg_email = 'Can not be blank!';
      errormsg_pass = 'Can not be blank!';
    } else {
      this.props.login({
        email: this.state.email,
        password: this.state.password,
      });
      console.log(this.props.userData);
    }
  };
  /**
   * @author Arshad
   * @description redering and validating the input with regexp and returning JSX
   */
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor="#66ddaa"
          barStyle="dark-content"
          translucent={false}
        />
        <Provider>
          <Portal>
            <Modal
              visible={this.props.userData.isloading}
              contentContainerStyle={styles.containerStyle}>
              <ActivityIndicator
                style={{justifyContent: 'space-around', color: '#000000'}}
              />
              <Text>loading...</Text>
            </Modal>
          </Portal>
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View
              style={
                this.state.isValidEmail ? styles.action : styles.actionError
              }>
              {myIcon}
              <TextInput
                placeholder="Your Email Id..."
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.onInputChange(val)}
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
              {myIcon2}
              <TextInput
                placeholder="Ex: John@1234"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={this.state.isSecuretextEntry ? true : false}
                onChangeText={val => this.onPasswordChange(val)}
              />
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => this.updateSecureTextEntry()}>
                {this.state.isSecuretextEntry ? (
                  <Feather name="eye-off" size={20} color="#000000" />
                ) : (
                  <Feather name="eye" size={20} color="#000000" />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.errorMsg}>
              {this.state.isValidPassword ? null : errormsg_pass}
            </Text>
            <Text style={{color: 'red'}}>{this.props.userData.error}</Text>
            <View style={styles.button}>
              <Button
                onPress={e => this.login_handle(e)}
                title="Sign In"
                color="#00a86b"
                accessibilityLabel="you will be logged in"
                style={styles.signIn}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => this.props.navigation.navigate('SignUp')}
                title="Create Account"
                color="#3eb489"
                accessibilityLabel="Go to Create Account"
                style={styles.signIn}
              />
            </View>
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
    flex: 6,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#000000',
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
    login: data => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
