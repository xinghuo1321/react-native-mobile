import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Modal, View, Dimensions } from 'react-native';
import propTypes from 'prop-types'


function btnRight(props){
    if(props.onOkText){
       return <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={() => { props.onOk() }}
        style={styles.btnRight}>
            <Text style={{color:'red',fontSize: 18}}>{props.onOkText}</Text>
        </TouchableOpacity>
    }else{
        return null
    }
    
}
export default class MyModal extends Component {

    static propTypes = {
        hidden: propTypes.bool.isRequired, //modal是否显示
        title: propTypes.string.isRequired, //modal标题
        btnLeft: propTypes.string.isRequired, //左按钮文字
        onOkText: propTypes.string, //右按钮文字
        close: propTypes.func.isRequired, //关闭函数
        onOk: propTypes.func //确定函数
    }
    render() {
        return (
            <Modal
                visible={this.props.hidden}
                transparent={true}
                onRequestClose={() => {
                    this.props.close()
                }}
            >
                <TouchableOpacity onPress={() => {
                    this.props.close()
                }}
                activeOpacity={0.5} 
                style={{ width: win.width, height: win.height, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.box}>
                        <View style={styles.title}>
                            <Text style={{fontSize: 18,fontWeight: '200'}}>{this.props.title}</Text>
                        </View>
                        <View style={styles.btnbox}>
                            <TouchableOpacity 
                            activeOpacity={0.5} 
                            onPress={() => { this.props.close() }}
                            style={styles.btnLeft}>
                                <Text style={this.props.onOkText?{color:'#888888',fontSize: 18}:{color: 'red',fontSize:18}}>{this.props.btnLeft}</Text>
                            </TouchableOpacity>
                            {btnRight(this.props)}
                        </View>
                    </View>

                </TouchableOpacity>
            </Modal>
        )
    }
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    box: {
        width: win.width-20,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    title: {
        flex: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnbox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e9e9e9'

    },
    btnRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    test: {
        
    }
})