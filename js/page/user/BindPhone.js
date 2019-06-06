/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MyButton from '../../commonpents/MyButton';
import MyPhone from '../user/MyPhone';
import MyCode from '../user/MyCode';


const BtnColor = Platform.select({
    ios: { color: 'red' },
    android: { backgroundColor: 'red' }
})
type Props = {};
export default class BindPhone extends Component<Props> {

    toRegister = () => {
        const { navigation } = this.props;
        navigation.navigate('Register')

    }
    toPassLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('PassLogin')

    }

    render() {

        return (
            <View style={styles.container}>
                <View>
                    <MyPhone 
                        phoneInputStyle={{marginLeft: 0 }}
                    />
                    <MyCode />
                </View>
                <View>
                    <View style={styles.loginRegBut}>
                        <MyButton
                            title="绑定"
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
    //绑定
    loginRegBut: {
        marginTop: 50,
        alignItems: 'center',
    },
});
