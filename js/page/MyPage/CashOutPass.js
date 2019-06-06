import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import PasswordInput from '../../commonpents/passwordInput';
import MyCode from '../user/MyCode';
import MyButton from '../../commonpents/MyButton';

export default class CashOutPass extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <Text style={styles.titleTxt}>已绑定手机号:</Text>
                    <Text style={styles.phoneTxt}>181*****235</Text>
                </View>
                <MyCode />
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <Text style={styles.titleTxt}>提现密码(6位数字)</Text>
                    <PasswordInput
                        style={{ marginTop: 20 }}
                        maxLength={6}
                        onChange={(value) => { console.log(value) }}
                    />
                </View>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <Text style={styles.titleTxt}>重复提现密码</Text>
                    <PasswordInput
                        style={{ marginTop: 20 }}
                        maxLength={6}
                        onChange={(value) => { console.log(value) }}
                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <MyButton
                        onPress={this.toSubmit}
                        btnStyle={styles.btnStyle}
                        title={'设置提现密码'}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleTxt: {
        fontSize: 20
    },

    phoneTxt: {
        fontSize: 16
    },
    //按钮
    btnStyle: {
        backgroundColor: 'red',
        height: 40,
        width: 140,
        marginTop: 20,
    },
})