import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ListView,
    RefreshControl
 } from 'react-native';

import RNShakeEvent from 'react-native-shake-event';
import Speech from 'react-native-speech';
import CleanText from 'clean-text-js';

import Hurriyet from '../middleware/hurriyet';
import Loading from './Loading';
import ListeningScreen from './ListeningScreen';
import ArticleItem from './ArticleItem';
import { defaults } from '../constants';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Articles extends Component {

    constructor(){
        super();

        this.hurriyet = new Hurriyet();
        this.state = {
            onArticlesLoading: true,
            refreshing: false,
            shakeAction: defaults.actions.shake.init,
            onListeningScreen: false
        };

        this.handleShake = this.handleShake.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount(){
        const self = this;
        this.hurriyet.getArticlesList(10).then((data) => {
            self.setState({
                articles: data,
                onArticlesLoading: false,
            });
        });

        RNShakeEvent.addEventListener('shake', this.handleShake);
    }

    componentWillUnmount() {
        RNShakeEvent.removeEventListener('shake');
    }

    renderRow(rowData){
        return (
            <ArticleItem navigator={this.props.navigator} article={rowData}/>
        )
    }

    handleRefresh(){
        this.setState({
            onArticlesLoading: false,
            refreshing: true
        })
        this.hurriyet.getArticlesList(10).then((data) => {
            this.setState({
                articles: data,
                onArticlesLoading: false,
                refreshing: false
            });
        });
    }

    handleShake(){
        switch (this.state.shakeAction) {
            case defaults.actions.shake.init:
                Speech.speak({
                    text: 'Merhaba, ilk haberi okumam için ekranın herhangi bir yerine dokunun.',
                    voice: 'tr-TR'
                }).then(() => {
                    this.setState({
                       shakeAction: defaults.actions.shake.readyToListen,
                       onListeningScreen: true
                    });
                });
                break;

            default:
                Speech.stop();
                break;
            
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {!this.state.onListeningScreen ?
                    <View hide={this.state.onListeningScreen}>
                    {this.state.onArticlesLoading ? <Loading /> : 
                        <ListView
                            style={styles.listView}
                            dataSource={ds.cloneWithRows(this.state.articles)}
                            renderRow={this.renderRow}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.handleRefresh.bind(this)}
                                    title={'Yükleniyor...'}/>
                            }
                        />
                    }
                </View> :
                <ListeningScreen hide={!this.state.onListeningScreen} />
                }
            </View>
        );
    }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dedede',
  },
  listView: {
      padding: 8,
      paddingTop: 65,
      flex: 1,
      flexDirection: 'column',
  }
};

export default Articles;