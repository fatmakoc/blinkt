import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import { Icon } from 'native-base';
import Tts from 'react-native-tts';

import Hurriyet from '../middleware/hurriyet';
import { defaults } from '../constants';

import striptags from 'striptags';

class ListeningScreen extends Component {

    constructor(){
        super();
        this.state = {
            index: 0,
        }

        this.handleArticleChange = this.handleArticleChange.bind(this);
    }

    componentWillMount(){
        this.hurriyet = new Hurriyet();
        Tts.setDefaultLanguage('tr-TR');
    }

    render(){
        return (
            <TouchableHighlight style={styles.touchable} onPress={this.handleArticleChange}>
                <View style={styles.listening}>
                    <Icon style={styles.icon} name='ios-body' />
                </View>
            </TouchableHighlight>
        );
    }

    handleArticleChange(){
        Tts.stop();
        
        this.setState({
            index: this.state.index + 1
        });

        if(this.state.index >= this.props.articleIds.length){
            Tts.speak('Haberleri dinlediniz. Şimdi telefonunuzu sallayarak okuyucuyu sonlandırabilirsiniz.');
        }

        this.hurriyet.getSingleArticle(this.props.articleIds[this.state.index]).then((data) => {            
            const Entities = require('html-entities').AllHtmlEntities;
            entities = new Entities();
            const text = entities.decode(striptags(data.Text)).replace(/<iframe.*>/g, '');
            Tts.speak(text);
        });
    }
 }

const styles = {
    touchable: {
        flexDirection: 'row',
        flex: 1
    },
    listening: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
        fontSize: 100,
        color: '#404096',
    }
}
 export default ListeningScreen;