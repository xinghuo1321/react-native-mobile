/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import MyButton from '../../commonpents/MyButton';
import MyPhone from '../user/MyPhone';
import MyPass from '../user/MyPass';
import MyCode from '../user/MyCode';
import DataStore from '../../expand/dao/DataStore';
import { Frame } from '../commponpents/commponpents';
import fetchAjax from '../../../fetch/fetch';


const BtnColor = Platform.select({
    ios: { color: 'red' },
    android: { backgroundColor: 'red' }
})
type Props = {};
export default class ForgetPass extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = {
            btnTxt: '',
            phone: '',
            vcode: '',
            password: '',
            confirmPassword: '',
            securePassEntry: true,
            secureRePassEntry: true,
            passUrl: require('../../../image/2.png'),
            rePassUrl: require('../../../image/2.png'),
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

    clickReEye = () => {
        this.setState({
            secureRePassEntry: !this.state.secureRePassEntry
        })
        if (this.state.secureRePassEntry) {
            this.setState({
                rePassUrl: require('../../../image/_2.png'),
            })
        } else {
            this.setState({
                rePassUrl: require('../../../image/2.png'),
            })
        }
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
                phone: this.state.phone,
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

    //改变输入框的值
    changePhone = (text) => {
        this.setState({
            phone: text
        })
    }
    //验证码输入框
    changeVcode = (text) => {
        this.setState({
            vcode: text
        })
    }
    changePassword = (text) => {
        this.setState({
            password: text
        })
    }
    changeConfirmPassword = (text) => {
        this.setState({
            confirmPassword: text
        })
    }

    toSubmit = () => {
        fetchAjax({
            url: '/m/reset/pwd',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                phone: this.state.phone,
                vcode: this.state.vcode,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            }
        }).then(result => {
            if (result.status === 200) {
                if (result.josn.meta.success) {
                    DataStore.saveDataKey('authToken', result.josn.data);
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
        })
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
                        onChangeText={(text) => this.changePhone(text)}
                    />
                    <MyCode
                        onPress={this.getCode}
                        btnTxt={this.state.btnTxt.toString()}
                        onChangeText={(text) => this.changeVcode(text)}
                    />
                    <MyPass
                        secureTextEntry={this.state.securePassEntry}
                        click={this.clickEye}
                        src={this.state.passUrl}
                        onChangeText={(text) => this.changePassword(text)}
                    />
                    <MyPass
                        secureTextEntry={this.state.secureRePassEntry}
                        click={this.clickReEye}
                        src={this.state.rePassUrl}
                        title='重复登陆密码'
                        onChangeText={(text) => this.changeConfirmPassword(text)}
                    />
                </View>
                <View>
                    <View style={styles.loginRegBut}>

                        <MyButton
                            title="登陆"
                            onPress={this.toSubmit}
                            btnStyle={{ backgroundColor: 'red', height: 40, width: 200 }}
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
    //登陆
    loginRegBut: {
        alignItems: 'center',
        marginTop: 20,

    },
});
