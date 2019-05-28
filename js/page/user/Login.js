/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image ,TouchableOpacity} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import MyPhone from '../user/MyPhone';
import MyCode from '../user/MyCode';


const BtnColor = Platform.select({
    ios: { color: 'red' },
    android: { backgroundColor: 'red' }
})
type Props = {};
export default class Login extends Component<Props> {

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

    render() {

        return (
            <View style={styles.container}>
                <View>
                    <MyPhone />
                    <MyCode />
                </View>
                <View>
                    <View style={styles.loginBut}>
                        <View style={styles.loginRegBut}>
                            <MyButton
                                title="登陆/注册"
                                onPress={this.toRegister}
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
