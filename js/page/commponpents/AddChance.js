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
    Clipboard,
    TouchableOpacity
} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import { SearchToken, Frame, ShopCheck } from './commponpents'
// import SearchToken from '../../page/commponpents/SearchToken';
// import Frame from '../../page/commponpents/Frame';


export default class AddChance extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            frameVisible: false,
            copyVisible: false,
            copyText: '我是文本',
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

    render() {
        return (
            <ScrollView style={styles.contain} >
                <View style={styles.containView} >
                    <Frame
                        frameVisible={this.state.frameVisible}
                        closeFrame={this.closeFrame}
                        msgBtn={'知道了'}
                        msg={'申请成功'}
                    />

                    <SearchToken
                        enterType={1}
                    />
                    {/* <SearchToken
                    enterType={2}
                    onPress={this.copy}
                    visible={this.state.copyVisible}
                /> */}

                    <Text style={styles.titleTxt}>请输入店铺名核对</Text>
                    <ShopCheck />
                    <View style={styles.btnView}>
                        <MyButton
                            onPress={this.toSubmit}
                            btnStyle={styles.btnStyle}
                            title={'提交申请'}
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
});