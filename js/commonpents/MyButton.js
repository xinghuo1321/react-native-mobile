
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity ,Image} from 'react-native';
import propTypes from 'prop-types'
 
//判断是否传了img的值，如果没有则为空
function ImgBtn (props){
    if(props.img){
        return <Image source={props.img} style={{ width: 50,height: 50,borderRadius: 25}}></Image>
    }else{
        return null
    }
}

export default class MyButton extends Component {
    static propTypes = {
        btnStyle: propTypes.object,//按钮样式
        txtStyle: propTypes.object,//文字样式
        img: propTypes.number, //button左图片
        onPress: propTypes.func.isRequired,//点击事件，必传
        title: propTypes.string.isRequired, //文字，必传
        activeOpacity: propTypes.number
    }

    render (){
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.btnStyle,this.props.btnStyle]} activeOpacity={this.props.activeOpacity?this.props.activeOpacity:1}>
                <ImgBtn img={this.props.img}></ImgBtn>
                <Text style={[styles.txtStyle, this.props.txtStyle]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create ({
    btnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    txtStyle: {
        color: 'white',
        fontSize: 18,

    }
})