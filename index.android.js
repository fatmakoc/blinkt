import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Articles from './src/components/Articles';

export default class blinkt extends Component {

  render() {
    return (
      <Articles />
    )
  }
}

AppRegistry.registerComponent('blinkt', () => blinkt);
