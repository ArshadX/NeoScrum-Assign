import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Card} from 'react-native-paper';
import {connect} from 'react-redux';

const Cardfeed = ({feedBack, name, date}) => (
  <View style={styles.flatList}>
    <Card style={styles.cardDesign}>
      <Card.Title title="Feedback" titleStyle={styles.title} />
      <Card.Content>
        <Text style={styles.feedback}>{feedBack}</Text>
      </Card.Content>
      <Card.Actions style={styles.userInfo}>
        <Text>{name}</Text>
        <Text>{date}</Text>
      </Card.Actions>
    </Card>
  </View>
);
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderItem = ({item}) => {
    //console.log(item.name);
    return (
      <Cardfeed feedBack={item.feadback} name={item.name} date={item.date} />
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#d4d4d4" />
        <View>
          <FlatList
            data={this.props.userData.feedback}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4',
  },
  flatList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingTop: 7,
    paddingBottom: 7,
  },
  cardDesign: {
    paddingTop: 7,
    borderRadius: 10,
    backgroundColor: '#b0e0e6',
    elevation: 5,
    width: 370,
    height: 250,
  },
  feedback: {
    color: '#000000',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#008080',
    borderBottomWidth: 1,
    borderBottomColor: '#fefefa',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
  },
  userInfo: {
    flexDirection: 'column',
    marginTop: 100,
    marginLeft: 200,
  },
});
const mapStateToProps = (state, props) => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(Home);
