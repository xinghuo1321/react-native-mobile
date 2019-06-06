import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class MyPhone extends Component {

    render() {
        return (
            <View style={[styles.containView, this.props.containView]}>
                <Text style={styles.welcome}>{this.props.title || '手机号'}</Text>
                <TextInput style={[styles.phoneInput, this.props.phoneInputStyle]} value={this.props.value || ''} placeholder={this.props.placehold || '请输入手机号'} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    //文本
    welcome: {
        fontSize: 20,
    },

    containView: {
        marginLeft: 20,
        marginTop: 20
    },
    //输入框
    phoneInput: {
        borderColor: '#F0F0F0',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 20
    },

})