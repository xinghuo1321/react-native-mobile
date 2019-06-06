/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import MyButton from '../../commonpents/MyButton'
import MyPhone from '../user/MyPhone';
import MyPass from '../user/MyPass';
import DataStore from '../../expand/dao/DataStore';
import { Frame } from '../commponpents/commponpents';
import fetchAjax from '../../../fetch/fetch';

const BtnColor = Platform.select({
    ios: { color: 'red' },
    android: { backgroundColor: 'red' }
})
type Props = {};
export default class PassLogin extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            phoneText: '',
            passTxt: '',
            securePassEntry: true,
            passUrl: require('../../../image/2.png'),
            frameVisible: false,
            msg: ''
        }
        // this.dataStore = new DataStore();
    }

    closeFrame = () => {
        this.setState({
            frameVisible: !this.state.frameVisible
        })
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

    phoneChangeTxt = (text) => {
        this.setState({
            phoneText: text
        })
    }
    phoneChangePass = (text) => {
        this.setState({
            passTxt: text
        })
    }

    toLogin = () => {

        fetchAjax({
            url: '/m/app/auth/v1',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                username: this.state.phoneText,
                password: this.state.passTxt,
            }
        }).then((result) => {
            if (result.status === 200) {
                if (result.josn.meta.success) {
                    DataStore.setAuthToken(result.josn.data);
                    // this.props.navigation.goBack();
                    let resetActiom = StackActions.reset({
                        index: 0,//默认打开actions中的第几个页面
                        actions: [//actions是页面集合
                            //NavigationActions.navigate({ routeName: 'One' }),
                            NavigationActions.navigate({
                                routeName: 'Bottom',
                                //子页面
                                action: NavigationActions.navigate({
                                    routeName: 'MyIndex'
                                })
                            }),
                        ]
                    })
                    this.props.navigation.dispatch(resetActiom)
                }
            } else if (result.status === 409) {

                this.setState({
                    msg: result.josn.message,
                    frameVisible: true
                })

            } else {
                this.setState({
                    msg: result.josn.meta.message,
                    frameVisible: true
                })
            }

        }).catch((err) => {

        });
    }

    render() {

        return (
            <View style={styles.container}>
                <Frame
                    frameVisible={this.state.frameVisible}
                    closeFrame={this.closeFrame}
                    msgBtn={'知道了'}
                    msg={this.state.msg}
                />
                <View>
                    <MyPhone
                        phoneInputStyle={{ marginLeft: 0 }}
                        onChangeText={(text) => this.phoneChangeTxt(text)}
                    />
                    <MyPass
                        secureTextEntry={this.state.securePassEntry}
                        click={this.clickEye}
                        src={this.state.passUrl}
                        onChangeText={(text) => this.phoneChangePass(text)}
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
                                onPress={this.toLogin}
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
