import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,

} from 'react-native';
import MyPass from '../user/MyPass';
import MyCode from '../user/MyCode';
import MyPhone from '../user/MyPhone';
import MyButton from '../../commonpents/MyButton';

export default class PhoneSet extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            securePassEntry: true,
            passUrl: require('../../../image/2.png'),
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

    render() {
        return (
            <View>
                <MyPass
                    title={'验证登陆密码'}
                    placehold={'输入登陆密码'}
                    secureTextEntry={this.state.securePassEntry}
                    click={this.clickEye}
                    src={this.state.passUrl}
                />
                <MyPhone 
                    title={'新手机号'}
                    phoneInputStyle={{marginBottom: 10, marginLeft: 0 }}
                    placehold={'输入新手机号'}
                />
                <MyCode/>
                <View style={{alignItems: 'center'}}>
                    <MyButton
                        onPress={this.toSubmit}
                        btnStyle={styles.btnStyle}
                        title={'修改手机号'}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //按钮
    btnStyle: {
        backgroundColor: 'red',
        height: 40,
        width: 140,
        marginTop: 20,
    },
})