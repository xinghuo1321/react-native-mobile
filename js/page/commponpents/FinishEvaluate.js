import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Clipboard,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import { TokenCom,ImgCom } from './commponpents';
import ShowImage from '../../commonpents/ShowImage';
import UpdataImg from '../../commonpents/UpdataImg';

export default class FinishEvaluate extends Component<Props> {
    constructor(Props) {
        super(Props);
        this.state = {
            copyVisible: false,
            copyText: '我是文本',
            dataBase: '',
            avatarSource: '',
        }
    }

    getDataBase (avatarSource,dataBase){
        this.setState({
            avatarSource,
            dataBase
        });
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
                    <View>
                        <TouchableOpacity style={styles.searchView} onPress={this.props.onPress}>
                            <Text style={styles.searchTitleCopy}>评价图片（点击可一键保存图片）</Text>
                        </TouchableOpacity>
                        <View style={styles.exampleView}>
                            <View style={styles.expView}>
                                <ShowImage src='https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg'/>
                            </View>
                            <View style={styles.expView}>
                                <ShowImage src='https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg'/>
                            </View>
                            <View style={styles.expView}>
                                <ShowImage src='https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg'/>
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.searchView} onPress={this.props.onPress}>
                            <Text style={styles.searchTitleCopy}>评价视频（2.4M）</Text>
                        </TouchableOpacity>
                        <View style={styles.exampleView}>
                            <MyButton
                                onPress={this.toSubmit}
                                btnStyle={[styles.btnStyle, styles.videoBtn]}
                                title={'点击下载评价视频'}
                            />
                        </View>
                    </View>

                    <Text style={styles.titleTxt}>回传评价截图</Text>

                    <ImgCom
                        viewStyle={{ backgroundColor: '#f3f3f3' }}
                        title={'请按示例截图上传购物平台评价截图'}
                        avatarSource={this.state.avatarSource}
                        dataBase={this.state.dataBase}
                        onPress={(avatarSource, dataBase) => { this.getDataBase(avatarSource, dataBase) }}
                    />

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
    //回传截图view
    returnImgView: {
        flexDirection: 'row',
        marginTop: 20
    },
    //示例图View
    expView: {
        marginLeft: 10
    },
    //示例图View
    exampleView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10
    },
    //搜索view
    searchView: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    //搜索标题
    searchTitleCopy: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    //视频btn
    videoBtn: {
        width: 200,
        marginLeft: 10
    }
})