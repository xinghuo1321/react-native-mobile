import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import { SearchToken, Frame, OrderCom, EnterCar, ShopCheck } from './commponpents'
// import SearchToken from './SearchToken';
// import OrderCom from './OrderCom';
// import EnterCar from './EnterCar'
// import Frame from '../../page/commponpents/Frame';

const win = Dimensions.get('window');
export default class SearchTryout extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            frameVisible: false,
            copyVisible: false,
            copyText: '我是文本',
            checked: false
        }
    }
    toSubmit = () => {
        this.setState({
            frameVisible: !this.state.frameVisible
        })
    }
    closeFrame = () => {
        this.setState({
            frameVisible: !this.state.frameVisible
        })
    }

    //复制文本
    copy = () => {
        Clipboard.setString(this.state.copyText);
        //打开复制弹框
        this.setState({
            copyVisible: !this.state.copyVisible,
        })
        //定时1秒关闭弹框
        setTimeout(() => {
            this.setState({
                copyVisible: !this.state.copyVisible,
            })
        }, 1000)
    }

    //核对店铺
    check = () => {

    }

    //复选框改变事件
    changeCheckBox = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
    render() {
        return (
            <ScrollView style={styles.contain}>
                <View style={styles.containView}>
                    <Frame
                        frameVisible={this.state.frameVisible}
                        closeFrame={this.closeFrame}
                        msgBtn={'去补充'}
                        msg={'请补充返回信息,否则商家无法返款'}
                    />

                    <View>
                        <Text style={{ color: 'red' }}>●请严格按照商家要求进行任务</Text>
                        <Text style={{ color: 'red' }}>●按下述条件找到商品</Text>
                        <Text style={{ color: 'red' }}>●根据下单信息下单</Text>
                        <Text style={{ color: 'red' }}>●商家快递发空包,不发商品,您可获得佣金</Text>
                    </View>
                    <Text style={{ color: 'red' }}>否则将被驳回任务,情节严重封号处理</Text>

                    {/* <SearchToken
                    enterType={1}
                /> */}
                    <SearchToken
                        enterType={2}
                        onPress={this.copy}
                        visible={this.state.copyVisible}
                    />

                    <Text style={styles.titleTxt}>请输入店铺名核对</Text>
                    <ShopCheck />

                    <OrderCom />

                    <EnterCar
                        checked={this.state.checked}
                        onChange={this.changeCheckBox}
                    />

                    <View style={styles.btnView}>
                        <MyButton
                            onPress={this.toSubmit}
                            btnStyle={styles.btnStyle}
                            title={'提交领奖'}
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
        marginTop: 5,
        color: 'black',
        fontSize: 24,
    },
    //按钮
    btnStyle: {
        backgroundColor: 'red',
        height: 40,
        width: 140
    },
    //按钮view
    btnView: {
        marginTop: 20,
        alignItems: 'center'
    },
})