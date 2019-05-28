import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from 'react-native';
import MyPhone from '../user/MyPhone'

export default class RefundsInfo extends Component<Props> {

    toBankList = () => {

    }

    render() {
        return (
            <View style={styles.contain}>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>请绑定对应姓名的返款信息,保证身份与银行信息相符,保障返款安全</Text>
                </View>
                <MyPhone
                    title={'姓名'}
                    placehold={'请输入真实姓名'}
                    phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                />
                <TouchableOpacity onPress={this.toBankList} activeOpacity={1}>
                    <MyPhone
                        title={'开户行'}
                        placehold={'点击选择开户行'}
                        phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                    />
                </TouchableOpacity>
                <MyPhone
                    title={'银行账号'}
                    placehold={'请输入银行账号'}
                    phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                />
                <MyPhone
                    title={'身份证'}
                    placehold={'请输入身份证号码'}
                    phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                />
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
        marginHorizontal:20,
        marginVertical:10
    },
    //标题
    titleTxt: {
        fontSize:16
    },
})