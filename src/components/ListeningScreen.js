import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
 } from 'react-native';

 import { Icon } from 'native-base';

 class ListeningScreen extends Component {
     render(){
         return (
            <TouchableHighlight style={{
                flexDirection: 'row',
                flex: 1
            }} onPress={() => {
                console.log('touched');
            }}>
                <View style={styles.listening}>
                    <Icon style={styles.icon} name='ios-body' />
                </View>
            </TouchableHighlight>
         );
     }
 }

const styles = {
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