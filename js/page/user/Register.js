/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import MyPhone from '../user/MyPhone';
import MyPass from '../user/MyPass';

const BtnColor = Platform.select({
    ios: { color: 'red' },
    android: { backgroundColor: 'red' }
})
type Props = {};
export default class Register extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = {
            securePassEntry: true,
            secureRePassEntry: true,
            passUrl: require('../../../image/2.png'),
            rePassUrl: require('../../../image/2.png'),
        }
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


    render() {

        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.viewMargin}>
                        <Text style={styles.tipsMsg}>你未注册【赚钱高手】</Text>
                        <Text style={styles.tipsMsg}>请输入登陆密码完成注册</Text>
                    </View>
                    <MyPass
                        secureTextEntry={this.state.securePassEntry}
                        click={this.clickEye}
                        src={this.state.passUrl}
                    />
                    <MyPass
                        secureTextEntry={this.state.secureRePassEntry}
                        click={this.clickReEye}
                        src={this.state.rePassUrl}
                        title='重复登陆密码'
                    />
                    <MyPhone
                        title='邀请码（非必填）'
                        placehold='输入邀请码'
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
        marginTop:20,
        marginLeft: 20
    },
    //完成注册
    loginRegBut: {
        alignItems: 'center',
        marginTop:20,
    },
});
