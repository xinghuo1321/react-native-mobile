import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity,Image, TextInput ,View} from 'react-native';
import propTypes from 'prop-types'


function Place (props){
    if(props.off){
        return <Text style={{color: '#a2a2a2'}}>{props.placeholder}</Text>
    }else{
        return null
    }
}

export default class ImgInput extends Component {
    static propTypes = {
        inpBox: propTypes.object,
        imgStyle: propTypes.object,//图片样式
        inpStyle: propTypes.object,//文字样式
        onChange: propTypes.func,//input改变调用此函数，
        onPress: propTypes.func,
        off: propTypes.bool,
        placeholder: propTypes.string,
        img: propTypes.number //图片，必传
    }
    render (){
        return (
            <TouchableOpacity style={[styles.inpBox,this.props.inpBox]}
            onPress={this.props.onPress}
            activeOpacity={1}>
                <Image source={this.props.img} style={[styles.img, this.props.imgStyle]}></Image>
                <Place off={this.props.off} placeholder={this.props.placeholder} ></Place>
                <TextInput 
                style={[styles.inp, this.props.inpStyle]} 
                onChangeText={(text)=>{this.props.onChange(text)}}
                editable={!this.props.off}
                placeholder={this.props.placeholder}></TextInput>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    inpBox: {
        flexDirection: 'row',
        padding: 8,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 15,
        
    },
    img: {
        width: 20,
        height: 20,
        marginRight: 10,
        marginLeft: 10
    },
    inp: {
        flex: 3,
        padding: 0,
        backgroundColor: '#fff',
        borderRadius: 15
    }
})