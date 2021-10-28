import React, {Component} from 'react';
import axios from 'axios';
import CardFeed from '../components/CardFeed';
import {
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Feedback: [],
      Email: '',
      visible: false,
      message: '',
      query: '',
      tempdata: [],
      inputText: '',
      isloading: false,
    };
  }
  hideModal = () => this.setState({visible: false});
  //search bar
  contains = ({name, email}, query) => {
    if (name.includes(query) || email.includes(query)) {
      return true;
    }
    return false;
  };
  handleSearch = text => {
    const formattedQuery = text;
    const data = this.state.tempdata.filter(user =>
      this.contains(user, formattedQuery),
    );
    this.setState({Feedback: data, query: text});
  };
  handleDel = text => {
    const formattedQuery = text;
    const data = this.state.tempdata.filter(user => {
      const {email} = user;
      if (email.includes(formattedQuery)) {
        return false;
      }
      return true;
    });
    this.setState({Feedback: data, query: text});
  };
  renderHeader = () => (
    <View style={styles.searchbar}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={this.handleSearch}
        placeholder="Search"
        style={{
          width: 300,
          backgroundColor: '#fff',
        }}
        textStyle={{color: '#000000'}}
        placeholderTextColor="#808080"
      />
    </View>
  );
  //search bar end
  handleSubmit = (getfeedback, getemail) => {
    this.setState({Email: getemail, isloading: true});

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
        this.setState({message: users, isloading: false});
        this.setState({visible: true});
        this.handleDel(getemail);
      })
      .catch(error => {
        const errorMsg = error.message;
        console.log(errorMsg);
        this.setState({isloading: false});
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
        this.setState({...this.state, Feedback: users, tempdata: users});
      })
      .catch(error => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  }
  componentWillUnmount() {
    this.setState({
      Feedback: [],
      Email: '',
      message: '',
      query: '',
      tempdata: [],
      inputText: '',
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
              onDismiss={setTimeout(this.hideModal, 4000)}
              contentContainerStyle={styles.containerStyle}>
              <Text>Submit Successfully</Text>
            </Modal>
            <Modal
              visible={this.state.isloading}
              contentContainerStyle={styles.containerStyle}>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text>loading...</Text>
            </Modal>
          </Portal>

          <FlatList
            data={this.state.Feedback}
            ListHeaderComponent={this.renderHeader}
            stickyHeaderIndices={[0]}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            initialNumToRender={5}
            progressViewOffset={10}
            stickyHeaderHiddenOnScroll={true}
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
  searchbar: {
    backgroundColor: '#fff',
    padding: 7,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
  },
});
const mapStateToProps = (state, props) => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(Feedback);
