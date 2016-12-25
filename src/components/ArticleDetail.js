import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    ListView,
    Text,
    Image
} from 'react-native';

import { Container, Header, Title, Card, CardItem, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import striptags from 'striptags';

import Hurriyet from '../middleware/hurriyet';
import Loading from './Loading';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class ArticleDetail extends Component {
     
    constructor(){
        super();
            
        this.hurriyet = new Hurriyet();
        this.state = {
            isArticleLoading: true
        };
    }

    componentWillMount(){
        const self = this;
        this.hurriyet.getSingleArticle(this.props.articleId).then((data) => {
            let parts = self.parseArticle(data.Text);
            this.setState({
                article: data,
                textParts: parts,
                selectedParts: parts,
                isArticleLoading: false,
            });
        });

        this.renderRow = this.renderRow.bind(this);
    }

    parseArticle(text){
        const Entities = require('html-entities').AllHtmlEntities;
        entities = new Entities();
        let data = entities.decode(striptags(text)).replace(/<iframe.*>/g, '').split('\n');
        return data.map((part) => {
            return { isSelected: false, text: part}
        });
    }

    renderRow(rowData, sectionID, rowID){
        return (
            <Text style={{
                    paddingTop: 12,
                    backgroundColor: (rowData.isSelected) ? '#d9edf7' : '#fff',
                    padding: 5
            }} onLongPress={()=> {

              rowData.isSelected = !rowData.isSelected;
              let dataClone = this.state.textParts;
              dataClone[rowID] = rowData;
              
              let selectedIndexes = [];
              dataClone.forEach(function(el, i){
                if(el.isSelected) {
                    selectedIndexes.push(i);
                }
              });
              
              this.setState({
                  textParts: dataClone,
                  selectedParts: selectedIndexes
              })

              this.hurriyet.setTextParts(this.state.article.Id, this.state.selectedParts).then((data) => {
              }).catch((err) => console.log(err));

            }}>{rowData.text}</Text>
        )
    }

    render(){
        let imageUrl = 'http://placehold.it/300x200';
        if(this.state.article != undefined && this.state.article.Files[0] != undefined){
            imageUrl = this.state.article.Files[0].FileUrl;
        }
        return (
            <Container> 
            <Header>
                <Button transparent onPress={() => {this.props.navigator.pop()}}>
                    <Icon name='ios-arrow-back' />
                </Button>
                <Title>blinkt</Title>
            </Header>
            <Content style={styles.content}>
            {this.state.isArticleLoading ? <Loading /> :
            <Card style={{ flex: 0 }}>
                    <CardItem>
                        <Text style={styles.title}>
                            {this.state.article.Title}
                        </Text>
                        <Text note style={styles.date}>
                            <Icon style={styles.dateIcon} name='ios-clock-outline' />
                            {` ${moment(this.state.article.CreatedDate).format('DD/MM/YYYY - HH:MM')}`}
                        </Text>
                    </CardItem>

                    <CardItem cardBody> 
                        <Image style={{ resizeMode: 'cover', marginBottom: 10 }} source={{uri: imageUrl}} /> 
                        <ListView
                            dataSource={ds.cloneWithRows(this.state.textParts)}
                            renderRow={this.renderRow} />
                    </CardItem>
            </Card>
            }
            </Content>
        </Container>
        )
    }
 }

const styles = {
    content: {
        padding: 10,
        backgroundColor: '#dedede'
    },
    title: {
        fontWeight: "700"
    },
    date: {
        fontSize: 12,
        paddingTop: 4
    },
    dateIcon: {
        fontSize: 12,
        paddingRight: 6,
        marginRight: 6
    }
}

 export default ArticleDetail;