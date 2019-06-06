import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import DataStore from '../../expand/dao/DataStore';

export default class MyInfo extends Component<Props> {


    componentDidMount() {

        this.listener = DeviceEventEmitter.addListener("LoginBackCom", (param) => {
            let resetActiom = StackActions.reset({
                index: 0,//默认打开actions中的第几个页面
                actions: [//actions是页面集合
                    NavigationActions.navigate({ routeName: 'Bottom' }),
                    // NavigationActions.navigate({
                    //     routeName: 'Bottom',
                    // }),
                ]
            })
            this.props.navigation.dispatch(resetActiom)
            DataStore.removeDataKey('Bottom');
        });
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    toRefundsInfo = () => {
        const { navigation } = this.props;
        // navigation.navigate('RefundsInfo');
        navigation.navigate('CashOutAccount');
    }

    loginout = () => {
        const { navigation } = this.props;
        DataStore.removeDataKey('authToken');
        navigation.navigate('Login', { backPage: 'MyInfo' });
    }

    toNext = (nextStr) => {
        const { navigation } = this.props;
        navigation.navigate(nextStr);
    }

    render() {
        return (
            <View style={styles.contain}>
                <TouchableOpacity style={styles.termView} onPress={()=>{this.props.navigation.navigate('Information')}}>
                    <View>
                        <Text style={styles.termTxt}>个人信息</Text>
                        <Text>部分高收益任务需要针对精准人群;</Text>
                        <Text>完善个人信息才可参与</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.termView} onPress={() => { this.toNext('RefundsInfo') }}>
                    <View>
                        <Text style={styles.termTxt}>返款信息</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.termView} onPress={() => { this.toNext('CashOutPass') }}>
                    <View>
                        <Text style={styles.termTxt}>提现密码</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.termView} onPress={() => { this.toNext('PhoneSet') }}>
                    <View>
                        <Text style={styles.termTxt}>手机号</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.termView} onPress={() => { this.toNext('LoginPassSet') }}>
                    <View>
                        <Text style={styles.termTxt}>登陆密码</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.termView} onPress={() => { this.toNext('TaoBao') }}>
                    <View>
                        <Text style={styles.termTxt}>淘宝号</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutView} onPress={this.loginout}>
                    <Text style={styles.logoutTxt}>退出登陆</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {

    },
    //每项行view
    termView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //左右边距
        paddingHorizontal: 20,
        //上下边距
        paddingVertical: 15
    },
    //箭头图片
    ArrowImg: {
        width: 15,
        height: 26
    },
    //每项的txt
    termTxt: {
        fontSize: 18,
        color: '#000000'
    },
    //退出登陆view
    logoutView: {
        alignItems: 'center',
        marginTop: 20
    },
    //退出登陆txt
    logoutTxt: {
        fontSize: 18,
        color: '#d90018'
    }
})