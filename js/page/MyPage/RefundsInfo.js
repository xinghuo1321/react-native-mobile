import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    TextInput
} from 'react-native';
import { Frame } from '../commponpents/commponpents'
import MyPhone from '../user/MyPhone'
import MyButton from '../../commonpents/MyButton'
import DataStore from '../../expand/dao/DataStore';

export default class RefundsInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            frameVisible: false,
            copyVisible: false,
            bankName: '',
            realName: '',
            bankAccount: '',
            identity: ''
        }
        this.tubmitCom = false;
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('ChangeUI', (dic) => {
            //接收到详情页发送的通知，刷新首页的数据，改变按钮颜色和文字，刷新UI
            this.setState({
                bankName: dic.bankName,
            });
        });

        DataStore.getAuthToken((error, token) => {
            let uid = DataStore.getUid(token);
            DataStore.fetchDataGet('/my/bank-info/user/' + uid, '',
                {
                    'Content-Type': 'application/json',
                    'authToken': token
                }
            ).then((result) => {
                this.setState({
                    bankName: result.bankName,
                    realName: result.realName,
                    bankAccount: result.bankAccount,
                    identity: result.identity,
                })
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        })

    }

    //关闭弹框
    closeFrame = () => {
        this.setState({
            frameVisible: !this.state.frameVisible
        })
        //如果提交成功，返回上一个页面
        if (this.tubmitCom) {
            this.props.navigation.goBack();
        }
    }

    componentWillUnmount() {
        //销毁监听
        this.listener.remove();
    }

    //改变真实姓名
    changeRealName = (text) => {
        this.setState({
            realName: text
        })
    }

    //改变银行账号
    changeBankAccount = (text) => {
        this.setState({
            bankAccount: text
        })
    }

    //改变身份证
    changeIdentity = (text) => {
        this.setState({
            identity: text
        })
    }

    //选择银行
    toBankList = () => {
        const { navigation } = this.props;
        navigation.navigate('BankList');
        // navigation.navigate('CityListDemo');
    }

    //提交返款信息
    toSubmit = () => {
        DataStore.getAuthToken((error, token) => {
            let uid = DataStore.getUid(token);
            DataStore.fetchData('/my/bank-info/verify',
                {
                    uid: uid,
                    realName: this.state.realName,
                    bankName: this.state.bankName,
                    bankAccount: this.state.bankAccount,
                    identity: this.state.identity
                },
                {
                    'Content-Type': 'application/json',
                    'authToken': token
                }
            ).then((result) => {
                console.log(result);
                //认证失败
                if (result.status === 409) {
                    this.setState({
                        frameVisible: !this.state.frameVisible
                    })
                }
                //成功
                if (result.status === 200) {
                    this.tubmitCom = true;
                }
            }).catch((err) => {
                console.log(err);
            });
        })

    }

    render() {
        return (
            <View style={styles.contain}>
                <Frame
                    frameVisible={this.state.frameVisible}
                    closeFrame={this.closeFrame}
                    msgBtn={'知道了'}
                    msg={'认证失败'}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>请绑定对应姓名的返款信息,保证身份与银行信息相符,保障返款安全</Text>
                </View>
                <MyPhone
                    title={'姓名'}
                    placehold={'请输入真实姓名'}
                    phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                    onChangeText={(text) => this.changeRealName(text)}
                    value={this.state.realName}
                />
                <TouchableOpacity onPress={this.toBankList} activeOpacity={1}>
                    <View style={styles.containView}>
                        <Text style={styles.welcome}>{'开户行'}</Text>
                        <TextInput
                            style={[styles.phoneInput, this.props.phoneInputStyle]}
                            value={this.state.bankName || ''}
                            editable={false} placeholder={'点击选择开户行'} />
                    </View>
                </TouchableOpacity>
                <MyPhone
                    title={'银行账号'}
                    placehold={'请输入银行账号'}
                    phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                    onChangeText={(text) => this.changeBankAccount(text)}
                    value={this.state.bankAccount}
                />
                <MyPhone
                    title={'身份证'}
                    placehold={'请输入身份证号码'}
                    phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                    onChangeText={(text) => this.changeIdentity(text)}
                    value={this.state.identity}
                />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <MyButton
                        title="提交"
                        onPress={this.toSubmit}
                        btnStyle={{ backgroundColor: 'red', height: 40, width: 200 }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    //标题
    titleView: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    //标题
    titleTxt: {
        fontSize: 16
    },

    //文本
    welcome: {
        fontSize: 20,
    },

    containView: {
        marginLeft: 20,
        marginTop: 20
    },
    //输入框
    phoneInput: {
        borderColor: '#F0F0F0',
        marginTop: 20,
        marginRight: 20,
        paddingLeft: 20,
        backgroundColor: 'white',
        marginBottom: 10,
    },
})