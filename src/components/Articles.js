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
import Tts from 'react-native-tts';

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
            onListeningScreen: false,
            refreshing: false,
            shakeAction: defaults.actions.shake.init,
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleShake = this.handleShake.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount(){        
        this.hurriyet.getArticlesList(10).then((data) => {
            this.setState({
                articles: data,
                onArticlesLoading: false,
            });
        });

        Tts.setDefaultLanguage('tr-TR');
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
                Tts.speak('Merhaba, ilk haberi okumam için ekranın herhangi bir yerine dokunun. Okuyucuyu sonlandırmak için, telefonunuzu sallamanız yeterlidir.')
                this.setState({
                    shakeAction: defaults.actions.shake.readyToListen,
                    onListeningScreen: true
                });
               
                break;

            default:
                Tts.stop();
                Tts.speak('Okuyucu sonlandırıldı.');
                this.setState({
                    shakeAction: defaults.actions.shake.init,
                    onListeningScreen: false
                });
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
                <ListeningScreen hide={!this.state.onListeningScreen} articleIds={this.state.articles.map((article) => { return article.Id; })} />
                }
            </View>
        );
    }
}

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: '#dedede',
    flex: 1,
    justifyContent: 'center',
  },
  listView: {
      flex: 1,
      flexDirection: 'column',
      padding: 8,
      paddingTop: 65,
  }
};

export default Articles;