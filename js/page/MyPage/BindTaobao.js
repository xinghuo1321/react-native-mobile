import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import MyPhone from '../user/MyPhone';
import MyButton from '../../commonpents/MyButton';

export default class BindTaobao extends Component<Props> {
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
                    />
                    <Text style={{ color: 'red' }}>如何找到会员名</Text>

                    <MyPhone
                        title={'淘气值'}
                        placehold={'请输入淘气值'}
                        phoneInputStyle={{ backgroundColor: 'white', marginBottom: 10, marginLeft: 0 }}
                        containView={{ marginLeft: 0 }}
                    />
                    <Text style={{ color: 'red' }}>如何找到淘气值</Text>

                    <Text style={styles.titleTxt}>上传【支付宝个人信息】截图</Text>

                    <View style={styles.btnView}>
                        <MyButton
                            onPress={this.toSubmit}
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