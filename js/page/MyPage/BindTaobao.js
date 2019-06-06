import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import { ImgCom } from '../commponpents/commponpents'
import MyPhone from '../user/MyPhone';
import MyButton from '../../commonpents/MyButton';
import DataStore from '../../expand/dao/DataStore';
import fetchAjax from '../../../fetch/fetch';
import DeviceStorage from '../../expand/dao/DeviceStorage'

export default class BindTaobao extends Component<Props> {
    constructor(Props) {
        super(Props);
        this.state = {
            //淘宝会员名
            tbAccount: '',
            //淘气值
            tbValue: '',
            //图片base64
            dataBase: '',
            //图片file地址
            avatarSource: ''
        }
        //本地数据
        //this.dataStore = new DataStore();
        //图片远程地址
        this.addrUrl = '';
    }
    getDataBase(avatarSource, dataBase) {
        //上传到服务器
        DataStore.getAuthToken((error, token) => {
            DataStore.uploadImage('/my/photo/upload', { path: avatarSource.uri }, { 'authToken': token }).then(result => {
                if (result.code === 'ok') {
                    this.addrUrl = result.addrUrl;
                }
            }).catch(err => {
                //请求失败
                console.log(err)
            })
        })

        //设置页面展示
        this.setState({
            avatarSource,
            dataBase
        });
    }

    //淘宝会员名文本改变事件
    accountChannge = (text) => {
        this.setState({
            tbAccount: text
        })
    }

    //淘气值文本改变事件
    valueChannge = (text) => {
        this.setState({
            tbValue: text
        })
    }

    //绑定淘宝事件
    toBind = () => {
        DataStore.getAuthToken((error, result) => {
            let uid = DataStore.getUid(result);
            DataStore.fetchData('/my/account/bind/tb',{
                uid: uid,account: this.state.tbAccount,tqvalue: this.state.tbValue,img1: this.addrUrl
            },{
                'Content-Type': 'application/json','authToken':result
            }).then((data) => {
                console.log(data)
            }).catch((err) => {
                
            });
            // fetchAjax({
            //     url: '/my/account/bind/tb',
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8',
            //         'authToken':result,
            //         'clienType':'wx'
            //     },
            //     data: {
            //         uid: uid,
            //         account: this.state.tbAccount,
            //         tqvalue: this.state.tbValue,
            //         img1: this.addrUrl
            //     }
            // }).then((result) => {
            //     console.log(result)
            // }).catch((err) => {

            // });
        })
    }

    render() {
        return (
            <ScrollView style={styles.contain}>
                <View style={styles.containView}>
                    <Text>绑定淘宝之后,请使用该淘宝号做任务,否则将无法通过任务审核</Text>
                    <Text>请确保淘宝为本人实名,否则将影响任务返款</Text>
                    <MyPhone
                        title={'淘宝会员名'}
                        placehold={'请输入淘宝会员名,非淘宝昵称'}
                        phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                        containView={{ marginLeft: 0 }}
                        onChangeText={(text) => this.accountChannge(text)}
                    />
                    <Text style={{ color: 'red' }}>如何找到会员名</Text>

                    <MyPhone
                        title={'淘气值'}
                        placehold={'请输入淘气值'}
                        phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                        containView={{ marginLeft: 0 }}
                        onChangeText={(text) => this.valueChannge(text)}
                    />
                    <Text style={{ color: 'red' }}>如何找到淘气值</Text>

                    <Text style={styles.titleTxt}>上传【支付宝个人信息】截图</Text>

                    <ImgCom
                        viewStyle={{ backgroundColor: '#f3f3f3' }}
                        title={'请按示例截图上传购物平台评价截图'}
                        avatarSource={this.state.avatarSource}
                        dataBase={this.state.dataBase}
                        onPress={(avatarSource, dataBase) => { this.getDataBase(avatarSource, dataBase) }}
                    />

                    <View style={styles.btnView}>
                        <MyButton
                            onPress={this.toBind}
                            btnStyle={styles.btnStyle}
                            title={'绑定淘宝'}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        backgroundColor: '#f3f3f3'
    },
    containView: {
        flex: 1,
        padding: 20,
    },
    //标题txt
    titleTxt: {
        marginTop: 20,
        color: 'black',
        fontSize: 24,
    },
    //按钮view
    btnView: {
        marginTop: 20,
        alignItems: 'center'
    },
    //按钮
    btnStyle: {
        backgroundColor: 'red',
        height: 40,
        width: 140
    },
})