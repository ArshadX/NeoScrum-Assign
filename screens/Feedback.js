import React, {Component} from 'react';
import axios from 'axios';
import CardFeed from '../components/CardFeed';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import {connect} from 'react-redux';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Feedback: [],
      Email: '',
      visible: false,
      message: '',
    };
  }
  hideModal = () => this.setState({visible: false});
  handleSubmit = (getfeedback, getemail) => {
    this.setState({Email: getemail});
    console.log(getfeedback);
    console.log(getemail);
    axios
      .post(
        'https://quiet-harbor-07900.herokuapp.com/addFeadback',
        {
          token: this.props.userData.token,
          email: getemail,
          feadback: getfeedback,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.props.userData.token,
          },
        },
      )
      .then(response => {
        const users = response.data;
        this.setState({message: users});
        this.setState({visible: true});
      })
      .catch(error => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  };
  renderItem = ({item}) => {
    return (
      <CardFeed
        title={item.name}
        image={item.profile}
        onSubmit={this.handleSubmit}
        getemail={item.email}
      />
    );
  };
  componentDidMount() {
    axios
      .post(
        'https://quiet-harbor-07900.herokuapp.com/GetAllRecievers',
        {
          token: this.props.userData.token,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.props.userData.token,
          },
        },
      )
      .then(response => {
        const users = response.data;
        this.setState({...this.state, Feedback: users});
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#d4d4d4" />
        <Provider>
          <Portal>
            <Modal
              visible={this.state.visible}
              onDismiss={setTimeout(this.hideModal, 3000)}
              contentContainerStyle={styles.containerStyle}>
              <Text>Submitted Succesfully</Text>
            </Modal>
          </Portal>

          <FlatList
            data={this.state.Feedback}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            initialNumToRender={3}
            progressViewOffset={10}
          />
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4',
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
  notice: {
    color: '#000000',
  },
});
const mapStateToProps = (state, props) => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(Feedback);
