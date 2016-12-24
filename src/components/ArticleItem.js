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

import moment from 'moment';

class ArticleItem extends Component {
    render(){
        let imageUrl = 'http://placehold.it/64x64';
        if(this.props.article.Files[0] != undefined){
            imageUrl = this.props.article.Files[0].FileUrl;
        }
        return (
            <TouchableHighlight style={ styles.row } onPress={() => {this.props.navigator.push({id: 'ArticleDetail', articleId: this.props.article.Id});}}>
                <View>
                    <Image style={styles.thumb} source={{uri: imageUrl}}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{ this.props.article.Title.trim() }</Text>
                        <Text style={styles.summary}>{ this.props.article.Description }</Text>
                        <Text style={styles.date}>{ moment(this.props.article.CreatedDate).format('H:MM') }</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = {
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
        fontWeight: '700',
    },
    date: {
        fontSize: 9,
        marginTop: 8,
        color: 'gray',
        textAlign: 'right',
    },
    summary: {
        fontSize: 10,
        marginTop: 5,
        color: 'gray',
        textAlign: 'justify'
    }
};

export default ArticleItem;