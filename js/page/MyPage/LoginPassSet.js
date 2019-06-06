import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text
} from 'react-native';
import MyPass from '../user/MyPass';
import MyCode from '../user/MyCode';
import MyButton from '../../commonpents/MyButton';

export default class LoginPassSet extends Component<Props> {
    constructor(props){
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
    
    render(){
        return (
            <View>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <Text style={styles.titleTxt}>已绑定手机号:</Text>
                    <Text style={styles.phoneTxt}>181*****235</Text>
                </View>
                <MyCode />
                <MyPass
                    title={'新登陆密码(8-20位字母+数字)'}
                    placehold={'输入登陆密码'}
                    secureTextEntry={this.state.securePassEntry}
                    click={this.clickEye}
                    src={this.state.passUrl}
                />
                <MyPass
                    title={'重复登陆密码'}
                    placehold={'输入登陆密码'}
                    secureTextEntry={this.state.securePassEntry}
                    click={this.clickEye}
                    src={this.state.passUrl}
                />
                <View style={{alignItems: 'center'}}>
                    <MyButton
                        onPress={this.toSubmit}
                        btnStyle={styles.btnStyle}
                        title={'修改登陆密码'}
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