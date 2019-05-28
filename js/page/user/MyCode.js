import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MyButton from '../../commonpents/MyButton';

export default class MyCode extends Component {
    render() {
        return (
            <View style={{marginLeft:20,marginTop:20}}>
                <Text style={styles.welcome}>短信验证码</Text>
                <View style={styles.phoneMsg}>
                    <View style={styles.msgInput}>
                        <TextInput style={styles.phoneInput} placeholder="请输入短信验证码" />
                    </View>
                    <View style={styles.msgButton}>

                        <MyButton
                            title="获取验证码"
                            //onPress={this.toRegister}
                            btnStyle={{ backgroundColor: 'red', height: 40 }}
                        />

                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    //文本
    welcome: {
        fontSize: 20,
    },

    //输入框
    phoneInput: {
        borderColor: '#F0F0F0',
        marginTop:20,
        marginLeft: 20,
        marginRight: 20
    },
    //验证码输入和按钮父样式
    phoneMsg: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    //验证码输入框
    msgInput: {
        flex: 2,
    },
    //验证码按钮
    msgButton: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 15
    },
})