import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from 'react-native';

export default class MyInfo extends Component<Props> {

    toRefundsInfo = () => {
        const { navigation } = this.props;
        navigation.navigate('RefundsInfo');
    }
    render() {
        return (
            <View style={styles.contain}>
                <View style={styles.termView}>
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
                </View>
                <TouchableOpacity style={styles.termView} onPress={this.toRefundsInfo}>
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
                <View style={styles.termView}>
                    <View>
                        <Text style={styles.termTxt}>体现密码</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </View>
                <View style={styles.termView}>
                    <View>
                        <Text style={styles.termTxt}>手机号</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </View>
                <View style={styles.termView}>
                    <View>
                        <Text style={styles.termTxt}>登陆密码</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </View>
                <View style={styles.termView}>
                    <View>
                        <Text style={styles.termTxt}>淘宝号</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.ArrowImg}
                            source={require('../../../image/15.png')}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.logoutView}>
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