/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';

//Api fetching
import {Provider} from 'react-redux';
import store from './redux/store';
import {StyleSheet} from 'react-native';
import RootNavigation from './components/RootNavigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
    };
  }
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
