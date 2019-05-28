import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Clipboard
} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import { TokenCom } from './commponpents'

export default class FinishEvaluate extends Component<Props> {
    constructor(Props) {
        super(Props);
        this.state = {
            copyVisible: false,
            copyText: '我是文本',
        }
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

    render() {
        return (
            <ScrollView style={styles.contain}>
                <View style={styles.containView}>
                    <TokenCom
                        onPress={this.copy}
                        visible={this.state.copyVisible}
                        title={'复制评价内容到购物平台评价'}
                        copyTitle={'评价文本'}
                    />
                    <Text style={styles.titleTxt}>回传评价截图</Text>
                    <Text>请按示例截图上传购物平台评价截图</Text>
                    <View style={styles.btnView}>
                        <MyButton
                            onPress={this.toSubmit}
                            btnStyle={styles.btnStyle}
                            title={'提交'}
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