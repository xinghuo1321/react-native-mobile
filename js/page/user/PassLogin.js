/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MyButton from '../../commonpents/MyButton'
import MyPhone from '../user/MyPhone';
import MyPass from '../user/MyPass';

const BtnColor = Platform.select({
    ios: { color: 'red' },
    android: { backgroundColor: 'red' }
})
type Props = {};
export default class PassLogin extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            securePassEntry: true,
            passUrl: require('../../../image/2.png'),
        }
    }

    toForgetPass = () => {
        const { navigation } = this.props;
        navigation.navigate('ForgetPass')

    }
    toBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    clickEye = () => {
        this.setState({
            securePassEntry: !this.state.securePassEntry,
        })
        if (this.state.securePassEntry) {
            this.setState({
                passUrl: require('../../../image/_2.png'),
            })
        } else {
            this.setState({
                passUrl: require('../../../image/2.png'),
            })
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View>
                    <MyPhone />
                    <MyPass
                        secureTextEntry={this.state.securePassEntry}
                        click={this.clickEye}
                        src={this.state.passUrl}
                    />
                    <View style={styles.viewMargin}>
                        <TouchableOpacity style={styles.forgetBut} onPress={this.toForgetPass}>
                            <Text style={styles.forgetTxt}>忘记密码</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View>
                        <View style={styles.loginRegBut}>
                            <MyButton
                                title="登陆"
                                //onPress={this.toRegister}
                                btnStyle={{ backgroundColor: 'red', height: 40, width: 200 }}
                            />
                        </View>
                        <View style={styles.passLoginBut}>

                            <MyButton
                                title="验证码登陆/注册"
                                onPress={this.toBack}
                                btnStyle={{ backgroundColor: 'white', height: 40, width: 200, borderWidth: 1, borderColor: 'red' }}
                                txtStyle={{ color: 'red' }}
                            />
                        </View>
                    </View>
                    <View style={styles.threeLogin}>
                        <Text style={styles.welcome}>第三方登陆</Text>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../../../image/14.png')}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    //文字
    welcome: {
        fontSize: 20,
        margin: 10,
    },
    //验证码登陆/注册 样式
    passLoginBut: {
        marginTop: 20,
        alignItems: 'center',
    },
    //登陆按钮
    loginRegBut: {
        marginTop: 40,
        alignItems: 'center',
    },
    //第三方登陆样式
    threeLogin: {
        alignItems: 'center',
        marginTop: 30
    },
    //view之间间距
    viewMargin: {
        marginTop: 15
    },
    //忘记密码view
    forgetBut: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    //忘记密码文本样式
    forgetTxt: {
        color: 'red',
        marginRight: 30,
        fontSize: 20
    }
});
