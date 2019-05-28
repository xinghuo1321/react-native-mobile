import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    Clipboard
} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import { SearchToken, Frame, InputCom } from './commponpents'
// import Frame from '../../page/commponpents/Frame';
// import InputCom from '../../page/commponpents/InputCom';
// import SearchToken from '../../page/commponpents/SearchToken';


const win = Dimensions.get('window');
export default class SearchTryout extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            frameVisible: false,
            copyVisible: false,
            copyText: '我是文本'
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
            <ScrollView style={styles.contain}>
                <View style={styles.containView}>
                    {/* <Frame
                    frameVisible={this.state.frameVisible}
                    closeFrame = {this.closeFrame}
                    msgBtn={'知道了'}
                    msg={'淘口令错误,请核对商品'}
                />

                <SearchToken
                    enterType={1}
                />

                <Text style={styles.titleTxt}>请粘贴淘口令核对</Text>
                <InputCom
                    placehold={'在此处粘贴淘口令'}
                    multiline={true}
                /> */}

                    <Frame
                        frameVisible={this.state.frameVisible}
                        closeFrame={this.closeFrame}
                        msgBtn={'知道了'}
                        msg={'商品标题错误,请核对商品'}
                    />

                    <SearchToken
                        enterType={2}
                        onPress={this.copy}
                        visible={this.state.copyVisible}
                    />
                    <Text style={styles.titleTxt}>请粘贴商品标题核对</Text>
                    <InputCom
                        placehold={'在此处粘贴标题'}
                        multiline={true}
                    />



                    <Text style={styles.titleTxt}>请收藏,加入购物车</Text>
                    <View style={styles.searchView}>
                        <Image
                            style={{ width: 200, height: 80 }}
                            source={{ uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=336071046,1752780664&fm=26&gp=0.jpg' }}
                        />
                    </View>

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
    //搜索view
    searchView: {
        marginTop: 10,
        backgroundColor: '#f3f3f3',
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