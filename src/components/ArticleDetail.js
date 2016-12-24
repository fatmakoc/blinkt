import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
 } from 'react-native';

import { Container, Header, Title, Card, CardItem, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';

import Hurriyet from '../middleware/hurriyet';
import Loading from './Loading';

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
            self.setState({
                article: data,
                isArticleLoading: false,
            });
        });
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
                            <Text>
                                <HTMLView
                                    stylesheet={styles.articleContent} value={this.state.article.Text}/>
                            </Text>
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