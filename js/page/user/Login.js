/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import MyButton from '../../commonpents/MyButton';
import MyPhone from '../user/MyPhone';
import MyCode from '../user/MyCode';
import DataStore from '../../expand/dao/DataStore';
import { Frame } from '../commponpents/commponpents';
import fetchAjax from '../../../fetch/fetch';


const BtnColor = Platform.select({
    ios: { color: 'red' },
    android: { backgroundColor: 'red' }
})
type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            phoneText: '',
            phoneCode: '',
            btnTxt: '',
            frameVisible: false,
            msg: ''
        }
        // this.dataStore = new DataStore();
        //我的首页监听返回
        this.isBack = true;
        //个人信息监听返回
        this.isBackCom = true;
    }

    componentDidMount() {
        let obj = this.props.navigation.state.params;
        if (obj && obj.backPage === 'MyIndex') {
            this.isBackCom = false
        }
        if (obj && obj.backPage === 'MyInfo') {
            this.isBack = false
        }
    }

    // componentWillMount(){
    //     DeviceEventEmitter.emit("LoginBack", {});
    // }

    closeFrame = () => {
        this.setState({
            frameVisible: !this.state.frameVisible
        })
    }

    toRegister = () => {
        const { navigation } = this.props;
        navigation.navigate('Register')

    }
    toPassLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('PassLogin')

    }
    toBindPhone = () => {
        const { navigation } = this.props;
        navigation.navigate('BindPhone')

    }

    //获取验证码
    getCode = () => {
        if (this.state.btnTxt !== '') return;

        fetchAjax({
            url: '/m/sendVcode',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                phone: this.state.phoneText,
                vcode: '6554'
            }
        }).then((data) => {
            if (data.status == 200) {
                if (data.josn.meta.success) {
                    let i = 60;
                    this.setState({
                        btnTxt: i.toString(),
                    });

                    this._timer = setInterval(() => {
                        i--;
                        if (this.state.btnTxt > 0) {
                            this.setState({
                                btnTxt: i.toString(),
                            });
                        } else {
                            this._timer && clearInterval(this._timer);
                            this.setState({
                                btnTxt: '',
                            });
                        }
                    }, 1000);
                }
            } else {
                this.setState({
                    msg: data.message,
                    frameVisible: true
                })
            }

        }).catch((err) => {

        });

    }

    toLogin = () => {

        fetchAjax({
            url: '/m/app/auth/v2',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                phone: this.state.phoneText,
                vcode: this.state.phoneCode,
            }
        }).then((data) => {
            if (data.status === 200) {
                if (data.josn.meta.success) {
                    this.isBack = false;
                    this.isBackCom = false;
                    DataStore.setAuthToken(data.josn.data);
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
            } else if (data.status === 409) {
                if (data.josn.message === '用户未注册') {
                    this.props.navigation.navigate('Register', {
                        phone: this.state.phoneText
                    });
                } else {
                    this.setState({
                        msg: data.josn.message,
                        frameVisible: true
                    })
                }
            } else {
                this.setState({
                    msg: data.josn.meta.message,
                    frameVisible: true
                })
            }
        }).catch((err) => {

        });
    }

    phoneChangeTxt = (text) => {
        this.setState({
            phoneText: text
        })
    }
    phoneChangeCode = (text) => {
        this.setState({
            phoneCode: text
        })
    }

    componentWillUnmount() {
        if (this.isBack) {
            DeviceEventEmitter.emit("LoginBack", {});
        }
        if (this.isBackCom) {
            DeviceEventEmitter.emit("LoginBackCom", {});
        }
        this._timer && clearInterval(this._timer);
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
                    <MyCode
                        onPress={this.getCode}
                        btnTxt={this.state.btnTxt.toString()}
                        onChangeText={(text) => this.phoneChangeCode(text)}
                    />
                </View>
                <View>
                    <View style={styles.loginBut}>
                        <View style={styles.loginRegBut}>
                            <MyButton
                                title="登陆/注册"
                                onPress={this.toLogin}
                                btnStyle={{ backgroundColor: 'red', height: 40, width: 200 }}
                            />
                        </View>
                        <View style={styles.passLoginBut}>
                            <MyButton
                                title="密码登陆"
                                onPress={this.toPassLogin}
                                btnStyle={{ backgroundColor: 'white', height: 40, width: 200, borderWidth: 1, borderColor: 'red' }}
                                txtStyle={{ color: 'red' }}
                            />
                        </View>
                    </View>
                    <View style={styles.threeLogin}>
                        <Text style={styles.welcome}>第三方登陆</Text>
                        <TouchableOpacity onPress={this.toBindPhone}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../../image/14.png')}
                            />
                        </TouchableOpacity>
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
    //文本
    welcome: {
        fontSize: 20,
        margin: 10,
    },
    //密码登陆
    passLoginBut: {
        marginTop: 20,
        alignItems: 'center',
    },
    //登陆/注册
    loginRegBut: {
        marginTop: 50,
        alignItems: 'center',
    },
    //第三方登陆
    threeLogin: {
        alignItems: 'center',
        marginTop: 30
    }
});
