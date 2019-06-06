/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import MyButton from '../../commonpents/MyButton';
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
export default class Register extends Component<Props> {


    constructor(props) {
        super(props);
        let { phone } = this.props.navigation.state.params;
        this.state = {
            securePassEntry: true,
            secureRePassEntry: true,
            passUrl: require('../../../image/2.png'),
            rePassUrl: require('../../../image/2.png'),
            frameVisible: false,
            msg: '',
            passTxt: '',
            passReTxt: '',
            inviteCode: '',
            phone: phone
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

    changePass = (text) => {
        this.setState({
            passTxt: text
        })
    }
    changeRePass = (text) => {
        this.setState({
            passReTxt: text
        })
    }

    changeInviteCode = (text) => {
        this.setState({
            inviteCode: text
        })
    }

    toRegister = () => {
        fetchAjax({
            url: '/m/app/registe',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                phone: this.state.phone,
                password: this.state.passTxt,
                confirmPassword: this.state.passReTxt,
                inviteCode: this.state.inviteCode,
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
                    <View style={styles.viewMargin}>
                        <Text style={styles.tipsMsg}>你未注册【赚钱高手】</Text>
                        <Text style={styles.tipsMsg}>请输入登陆密码完成注册</Text>
                    </View>
                    <MyPass
                        secureTextEntry={this.state.securePassEntry}
                        click={this.clickEye}
                        src={this.state.passUrl}
                        onChangeText={(text) => this.changePass(text)}
                    />
                    <MyPass
                        secureTextEntry={this.state.secureRePassEntry}
                        click={this.clickReEye}
                        src={this.state.rePassUrl}
                        title='重复登陆密码'
                        onChangeText={(text) => this.changeRePass(text)}
                    />
                    <MyPhone
                        title='邀请码（非必填）'
                        placehold='输入邀请码'
                        phoneInputStyle={{ marginLeft: 0 }}
                        onChangeText={(text) => this.changeInviteCode(text)}
                    />
                </View>
                <View>
                    <View style={styles.loginRegBut}>

                        <MyButton
                            title="完成注册"
                            onPress={this.toRegister}
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
    //提示语
    tipsMsg: {
        fontSize: 18,
        color: '#D0D0D0',
    },
    //行
    viewMargin: {
        marginTop: 20,
        marginLeft: 20
    },
    //完成注册
    loginRegBut: {
        alignItems: 'center',
        marginTop: 20,
    },
});
