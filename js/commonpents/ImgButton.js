import MyButton from './MyButton'

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity ,Image} from 'react-native';
import propTypes from 'prop-types'

export default class ImgButton extends Component {

    static propTypes = {
       
        img: propTypes.number.isRequired, //button左图片,必传
        onPress: propTypes.func.isRequired,//点击事件，必传
        title: propTypes.string.isRequired //文字，必传
    }

    render (){
        return (
            <MyButton 
            img={this.props.img} 
            onPress={this.props.onPress}
            title={this.props.title}
            btnStyle={styles.btn}
            txtStyle={styles.txtStyle}
            ></MyButton>

            
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        padding: 10
    },
    txtStyle: {
        color: 'black',
        fontSize: 15,
        marginLeft: 15
    },  
    test: {
        justifyContent: 'space-between'
    }
})