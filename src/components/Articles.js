import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableHighlight,
    RefreshControl
 } from 'react-native';

import RNShakeEvent from 'react-native-shake-event';
import Speech from 'react-native-speech';
import moment from 'moment';

import Hurriyet from '../middleware/hurriyet';
import Loading from './Loading';
import { defaults } from '../constants';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Articles extends Component {

    constructor(){
        super();

        this.hurriyet = new Hurriyet();
        this.state = {
            isArticlesLoading: true,
            refreshing: false,
            previousShakeAction: defaults.actions.shake.init,
            nowPlaying: false
        };

        this.handleShake = this.handleShake.bind(this);
    }

    componentWillMount(){
        const self = this;
        this.hurriyet.getArticlesList(10).then((data) => {
            self.setState({
                articles: data,
                isArticlesLoading: false,
            });
        });

        RNShakeEvent.addEventListener('shake', this.handleShake);
    }

    componentWillUnmount() {
        RNShakeEvent.removeEventListener('shake');
    }

    renderRow(rowData){
        let imageUrl = 'http://placehold.it/50x50';
        if(rowData.Files[0] != undefined){
            imageUrl = rowData.Files[0].FileUrl;
        }

        return (
            <TouchableHighlight style={ styles.row }>
                <View>
                    <Image style={styles.thumb} source={{uri: imageUrl}}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.date}>{ moment(rowData.CreatedDate).format('h:mm') }</Text>
                        <Text style={styles.title}>{ rowData.Title }</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    handleRefresh(){
        const self = this;
        this.setState({
            isArticlesLoading: false,
            refreshing: true
        })
        this.hurriyet.getArticlesList(10).then((data) => {
            self.setState({
                articles: data,
                isArticlesLoading: false,
                refreshing: false
            });
        });
    }

    handleShake(){
        switch (this.state.previousShakeAction) {
            case defaults.actions.shake.init:
                Speech.speak({
                    text: 'Haberleri okumaya başlamam için, lütfen telefonunuzu bir kere daha sallayınız',
                    voice: 'tr-TR'
                })
                this.setState({
                    previousShakeAction: defaults.actions.shake.readyToListen
                });
                break;

            case defaults.actions.shake.readyToListen:
                this.setState({
                    nowPlaying: true,
                    previousShakeAction: defaults.actions.shake.playing
                });
                Speech.speak({
                    text: 'Şimdi okumaya başlıyorum. Sonlandırmak için, yine telefonunuzu sallamanız yeterlidir. Bir sonraki habere geçmek için, ekranın herhangi bir yerine dokunabilirsiniz.',
                    voice: 'tr-TR'
                })
                break;
            case defaults.actions.shake.playing:
                this.setState({
                    nowPlaying: false,
                    previousShakeAction: defaults.actions.shake.init
                });
                Speech.speak({
                    text: 'Haberleri dinlediniz.',
                    voice: 'tr-TR'
                })
                break;
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {!this.state.nowPlaying ?
                    <View hide={this.state.nowPlaying}>
                    {this.state.isArticlesLoading ? <Loading /> : 
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
                                    title={'Yükleniyor'}/>
                            }
                        />
                    }
                </View> :
                <View hide={!this.state.nowPlaying}>
                    <Text>Playing!</Text>
                </View>
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
      margin: 8,
      flex: 1,
      flexDirection: 'column',
  },
  row: {
    backgroundColor: '#fff',
    padding: 8,
    borderColor: '#dbdbdb',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    borderRadius: 4,
    flex: 1,
    minHeight: 80,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 4
  },
  textContainer: {
    marginLeft: 70,
    marginTop: -70,
    minHeight: 64,
    padding: 4,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
      fontWeight: "700",
  },
  date: {
      fontSize: 9,
      marginBottom: 5,
      color: 'gray',
      textAlign: 'right',
  }
});

export default Articles;