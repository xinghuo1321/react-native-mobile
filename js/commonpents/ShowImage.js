
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Modal ,TouchableHighlight,Dimensions} from 'react-native';
import propTypes from 'prop-types'

//点击方法图片的组件

export default class ShowImage extends Component {
    static propTypes = {
        src: propTypes.string.isRequired //展示的图片
       
    }
    constructor(props){
        super (props)
        
        this.state={
            ModalOff: false
        }
    }
    setModakOff (ModalOff){
        this.setState({ModalOff})
    }
    render() {
        return (
            <TouchableOpacity style={styles.box} onPress={() => { this.setModakOff(!this.state.ModalOff)}}>
                <ImageBackground style={styles.bgImg} source={{uri:this.props.src}}>
                <View style={styles.bgColor}>
                    <Text style={styles.fontColor}>示例截图</Text>
                    <Text style={styles.fontColor}>点击放大</Text>
                    <Image source={require('../../image/16.png')} style={{ width: 20, height: 20, }}></Image> 
                </View>
                </ImageBackground>
                <Modal visible={this.state.ModalOff}
                transparent={true}
                onRequestClose={() => {
                    this.setModakOff(!this.state.ModalOff)
                  }}
                >
                <TouchableHighlight style={{width: win.width,height: win.height,backgroundColor:'rgba(0,0,0,.5)'}} onPress={() => { this.setModakOff(!this.state.ModalOff)}}>
                    <Image source={{uri:this.props.src}} style={{width: '100%',height: '100%'}} resizeMode='contain'/>
                </TouchableHighlight>
                    
                </Modal>
            </TouchableOpacity>
        )
    }
}
const win = Dimensions.get('window');

const styles = StyleSheet.create({
    box: {
        position: 'relative',
        width: 100,
        height: 100,
        padding: 8,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 2,//虚线部分
        borderStyle: 'dotted',
        backgroundColor: '#fff'
    },
    bgImg: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        

    },
    bgColor: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    fontColor: {
        color: '#fff',
        fontSize: 13
    },
    test: {
        
    }
})