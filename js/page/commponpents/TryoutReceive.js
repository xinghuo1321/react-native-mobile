import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Clipboard,
    Image
} from 'react-native';
import { SearchToken, Frame, InputCom, BussRequire, ShopCheck, ImgCom } from './commponpents'
import MyButton from '../../commonpents/MyButton';
import ShowImage from '../../commonpents/ShowImage';
import UpdataImg from '../../commonpents/UpdataImg';

export default class TryoutReceive extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            frameVisible: false,
            copyVisible: false,
            copyText: '我是文本',
            dataBase: '',
            avatarSource: '',
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

    getDataBase(avatarSource, dataBase) {
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
                    <Frame
                        frameVisible={this.state.frameVisible}
                        closeFrame={this.closeFrame}
                        msgBtn={'知道了'}
                        msg={'领奖成功'}
                    />

                    {/* <SearchToken
                    enterType={1}
                /> */}

                    <Text style={styles.titleTxt}>从购物车中找到商品</Text>
                    <View style={styles.searchView}>
                        <Text style={styles.searchTitle}>操作信息</Text>
                        <Text style={styles.searchTxt}>使用淘宝号：cs369549270</Text>
                        <Text style={styles.searchTxt}>下单总金额：35元</Text>
                        <Text style={styles.searchTxt}>下单规格：黑色</Text>
                        <Text style={styles.searchTxt}>下单数量：2</Text>
                        <Text style={styles.searchTxt}>店铺名称：2</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.searchTxt}>商品主图：</Text>
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={require('../../../image/27.png')}
                            />
                        </View>
                    </View>


                    {/* <SearchToken
                    enterType={2}
                    onPress={this.copy}
                    visible={this.state.copyVisible}
                /> */}

                    <Text style={styles.titleTxt}>请输入店铺名核对</Text>
                    <ShopCheck />

                    <Text style={styles.titleTxt}>请粘贴3个同行淘口令</Text>
                    <InputCom
                        placehold={'在此处粘贴淘口令'}
                        multiline={true}
                    />
                    <InputCom
                        placehold={'在此处粘贴淘口令'}
                        multiline={true}
                    />
                    <InputCom
                        placehold={'在此处粘贴淘口令'}
                        multiline={true}
                    />

                    <Text style={styles.titleTxt}>请上传相关截图</Text>

                    <ImgCom
                        viewStyle={{ backgroundColor: '#f3f3f3' }}
                        title={'收藏商品'}
                        avatarSource={this.state.avatarSource}
                        dataBase={this.state.dataBase}
                        onPress={(avatarSource, dataBase) => { this.getDataBase(avatarSource, dataBase) }}
                    />

                    <ImgCom
                        viewStyle={{ backgroundColor: 'white' }}
                        title={'关注店铺'}
                        avatarSource={this.state.avatarSource}
                        dataBase={this.state.dataBase}
                        onPress={(avatarSource, dataBase) => { this.getDataBase(avatarSource, dataBase) }}
                    />

                    <Text style={styles.titleTxt}>问大家</Text>
                    <View>
                        <View style={styles.askView}>
                            <Text>请打开目标商品的</Text>
                            <Text style={styles.askTxt}>【问大家】</Text>
                            <Text>,提问指定问题:</Text>
                        </View>
                        <Text style={styles.askTxt}>鞋子偏大还是偏小?</Text>
                        <ImgCom
                            viewStyle={{ backgroundColor: '#f3f3f3' }}
                            title={'并上传截图'}
                            avatarSource={this.state.avatarSource}
                            dataBase={this.state.dataBase}
                            onPress={(avatarSource, dataBase) => { this.getDataBase(avatarSource, dataBase) }}
                        />
                        <Text style={styles.howAskTxt}>如何【问大家】?</Text>
                    </View>

                    <Text style={styles.titleTxt}>下单垫付货款</Text>

                    <BussRequire />

                    <Text style={styles.titleTxt}>订单号</Text>
                    <InputCom
                        placehold={'输入订单号'}
                        multiline={true}
                        inputStyle={styles.inputStyle}
                        numberOfLines={1}
                    />
                    <ImgCom
                        viewStyle={{ backgroundColor: 'white' }}
                        title={'订单页面(需显示"买家已付款")'}
                        avatarSource={this.state.avatarSource}
                        dataBase={this.state.dataBase}
                        onPress={(avatarSource, dataBase) => { this.getDataBase(avatarSource, dataBase) }}
                    />
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

    //问大家view
    askView: {
        flexDirection: 'row',
        marginTop: 10
    },
    //问大家txt
    askTxt: {
        color: 'black'
    },
    //如何问大家txt
    howAskTxt: {
        color: 'red'
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
    //输入框样式
    inputStyle: {
        height: 50,
        textAlignVertical: 'center',
        backgroundColor:'#f3f3f3'
    },
    //搜索view
    searchView: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    //搜索标题
    searchTitle: {
        marginTop: 10,
        marginLeft: 10
    },
    //搜索txt
    searchTxt: {
        color: 'black',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    //收藏图片view
    collectImpView: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10
    },
    //收藏商品View
    collectShopView: {
        marginTop: 15,
        marginLeft: 10
    },
    //示例图view
    expView: {
        marginLeft: 10,
        marginBottom: 20
    }
});