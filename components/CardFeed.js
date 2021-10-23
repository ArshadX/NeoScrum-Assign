import React from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {Avatar, Title, Text, Card} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';

const CardFeed = ({title, image, onSubmit, getemail}) => {
  const [postFeed, setfeedback] = React.useState({feedback: ''});
  console.log(image);
  return (
    <View style={styles.flatList}>
      <Card style={styles.cardDesign}>
        <View style={styles.userInfo}>
          <View>
            <Avatar.Image
              source={require('../assets/profile_icon.png')}
              size={100}
              style={{backgroundColor: 'grey', opacity: 0.7}}
            />
          </View>
          <View>
            <Title style={styles.title}>{title}</Title>
          </View>
        </View>
        <Card.Content>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={'Type Something in Text Area.'}
            placeholderTextColor={'#9E9E9E'}
            numberOfLines={10}
            multiline={true}
            maxLength={300}
            textBreakStrategy="balanced"
            onEndEditing={e => setfeedback({feedback: e.nativeEvent.text})}
          />
          <Text style={{flexDirection: 'row'}}>Max 100 Characters</Text>
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSubmit(postFeed.feedback, getemail)}>
            <Text style={styles.textSign}>Submit Feedback</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  cardAction: {
    flexDirection: 'row-reverse',
    paddingBottom: 10,
    marginBottom: 5,
    marginLeft: 5,
    paddingRight: 3,
  },
  textSign: {
    fontSize: 18,
    fontWeight: '100',
    color: '#fff',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  TextInputStyleClass: {
    textAlign: 'left',
    height: 150,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    width: 350,
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: '#fdfff5',
    paddingBottom: 10,
  },
  button: {
    alignItems: 'stretch',
    marginTop: 20,
    backgroundColor: '#5b92e5',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 7,
    paddingTop: 7,
    elevation: 5,
    borderRadius: 7,
  },
});
const mapStateToProps = (state, props) => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(CardFeed);
