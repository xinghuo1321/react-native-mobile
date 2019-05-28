import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

export default class MyPass extends Component {

    render() {
        return (
            <View style={styles.viewMargin}>
                <Text style={styles.welcome}>{this.props.title || '登陆密码（8-20位数字+字母）'}</Text>
                <View style={styles.phoneMsg}>
                    <View style={styles.msgInput}>
                        <TextInput style={styles.passInput} secureTextEntry={this.props.secureTextEntry} placeholder={this.props.placehold || '输入密码'} />
                    </View>
                    <TouchableOpacity style={styles.msgButton} onPress={this.props.click}>
                        <Image
                            style={{ width: 40, height: 20 }}
                            source={this.props.src}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    //文本
    welcome: {
        fontSize: 20,
        marginTop: 20
    },
    //view之间间距
    viewMargin: {
        marginLeft: 20
    },
    phoneMsg: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    //密码框
    msgInput: {
        flex: 2,
    },
    //输入框
    passInput: {
        borderColor: '#F0F0F0',
        marginTop:20,
        marginLeft: 20,
        marginRight: 20
    },
    //眼睛按钮
    msgButton: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 15
    },
})