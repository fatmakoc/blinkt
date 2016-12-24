import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import Articles from './src/components/Articles';
import ArticleDetail from './src/components/ArticleDetail';

export default class blinkt extends Component {

  render() {
    return (
      <Navigator
          initialRoute={{ title: 'blinkt', index: 0 }}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FadeAndroid;
          }}
        />
    )
  }

  renderScene(route, navigator){
    const id = route.id;
    if(id === 'ArticleDetail'){
      return <ArticleDetail navigator={navigator} articleId={route.articleId}/>
    }
    
    return (<Articles navigator={navigator}/>);
  }
}

const styles = {
  navbar: {
    flex: 1,
  }
};

AppRegistry.registerComponent('blinkt', () => blinkt);
