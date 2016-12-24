import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

class Loading extends Component {
    render(){
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={true} overlayColor={"white"} color={"black"} />
            </View>
        )
    }
}

export default Loading;