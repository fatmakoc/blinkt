import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
 } from 'react-native';

import { Container, Header, Title, Card, CardItem, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import moment from 'moment';

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
                            <Text>{this.state.article.Title}</Text>
                            <Text note>April 15, 2016</Text>
                        </CardItem>

                        <CardItem cardBody> 
                            <Image style={{ resizeMode: 'cover' }} source={{uri: this.state.article.Files[0].FileUrl}} /> 
                            <Text>
                                {this.state.article.Text}
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
         padding: 10
     }
 }

 export default ArticleDetail;