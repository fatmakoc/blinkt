import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight
 } from 'react-native';
 import RNShakeEvent from 'react-native-shake-event';

import Hurriyet from '../middleware/hurriyet';
import Loading from './Loading';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Articles extends Component {

    constructor(){
        super();

        this.hurriyet = new Hurriyet();
        this.state = {
            isArticlesLoading: true,
        };
    }

    componentWillMount(){
        const self = this;
        this.hurriyet.getArticlesList(10).then((data) => {
            self.setState({
                articles: data,
                isArticlesLoading: false,
            });
        });

        RNShakeEvent.addEventListener('shake', () => {
            console.log('Device shake!');
        });
    }

    componentWillUnmount() {
        RNShakeEvent.removeEventListener('shake');
    }

    renderRow(rowData){
        return (
            <TouchableHighlight style={ styles.row }>
                <Text>{ rowData.Title }</Text>
            </TouchableHighlight>
        )
    }

    showMessage(){
        
    }

    render(){
        return (
            <View style={styles.container}>
            {this.state.isArticlesLoading ? <Loading /> : 
                <ListView
                    style={styles.listView}
                    dataSource={ds.cloneWithRows(this.state.articles)}
                    renderRow={this.renderRow}
                />
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: 30
  },
  listView: {
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderColor: '#dbdbdb',
      borderWidth: StyleSheet.hairlineWidth
  },
  row: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default Articles;