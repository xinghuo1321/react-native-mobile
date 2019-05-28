import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import MyButton from '../../commonpents/MyButton';

const win = Dimensions.get('window');
export default class GoodDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            myWidth: win.width,
            myHeight: win.height,

            //遮罩层开关
            maskVisible: false,
        };

    }
    //返回
    toBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
    //退出分享
    exitShare = () => {
        console.log(this.state.maskVisible)
        this.setState({
            maskVisible: !this.state.maskVisible
        })
    }
    toSearchTryout = () => {
        const { navigation } = this.props;
        navigation.navigate('SearchTryout');
        // navigation.navigate('Commission');
        // navigation.navigate('AddChance');
        // navigation.navigate('TryoutReceive');
        // navigation.navigate('BindTaobao');//绑定淘宝
        // navigation.navigate('Evaluate');//提交评价内容
        // navigation.navigate('FinishEvaluate');//完成评价
    }

    componentDidMount() {
        //获取网络图片大小
        Image.getSize('https://oyfs.qianhaihuanyu.com/upload/1539058191234/%E6%B2%99%E6%BC%A0%E5%B0%8F%E6%B2%B31013.png', (width, height) => {
            height = win.width * height / width; //按照屏幕宽度进行等比缩放
            this.setState({
                myHeight: height,
            });
        });
    }


    render() {
        return (
            <View style={{ flex: 1 }} >
                <Modal
                    visible={this.state.maskVisible}
                    transparent={true}
                >
                    <View backgroundColor='rgba(0, 0, 0, 0.5)' style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.exitShare} style={{ flex: 1 }}>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomMaskView} backgroundColor='white'>
                        <View style={styles.shareAll}>
                            <Image
                                style={styles.helpShareImg}
                                source={require('../../../image/14.png')}
                            />
                            <Text>分享给好友</Text>
                        </View>
                        <View style={styles.shareAll}>
                            <Image
                                style={styles.helpShareImg}
                                source={require('../../../image/13.png')}
                            />
                            <Text>分享到朋友圈</Text>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={this.toBack} style={{ position: 'absolute', left: 15, top: 15, zIndex: 10 }}>
                    <Image
                        style={styles.backImg}
                        source={require('../../../image/back.png')}
                    />
                </TouchableOpacity>
                <ScrollView style={{ flex: 1 }}>
                    <Image
                        style={styles.titleImage}
                        source={{ uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3429149743,132351892&fm=26&gp=0.jpg' }}
                    />

                    <View style={styles.startView}>
                        <View style={styles.moneyExpress}>
                            <Text style={styles.moneyTxt}>￥188</Text>
                            <View style={styles.expressView}>
                                <Text style={styles.expressTxt}>不包邮</Text>
                            </View>
                        </View>
                        <View>
                            <Text>2018/12/12   0点结束</Text>
                        </View>
                    </View>
                    <View style={styles.titleNumView}>
                        <Text style={styles.titleTxt}>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</Text>
                        <Text style={styles.numTxt}>奖品剩余 {3} 份</Text>
                    </View>
                    <View style={styles.businessOut} backgroundColor={'#f3f3f3'}>
                        <View style={styles.businessView}>
                            <Text>商家要求</Text>
                        </View>
                        <View style={styles.requireTxt}>
                            <Text>要求1要求1要求1要求1要求1要求1要求1要求1要求1要求1要求1要求1要求1要求1要求1</Text>
                        </View>
                        <View style={styles.requireTxt}>
                            <Text>要求2</Text>
                        </View>
                    </View>
                    <View style={styles.detailView}>
                        <Text style={styles.detailTxt}>商品详情</Text>
                    </View>

                    <Image
                        style={{ width: win.width, height: this.state.myHeight }}
                        source={{ uri: 'https://oyfs.qianhaihuanyu.com/upload/1539058191234/%E6%B2%99%E6%BC%A0%E5%B0%8F%E6%B2%B31013.png' }}
                    />
                </ScrollView >
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.shareAll}>
                        <Image
                            style={styles.helpShareImg}
                            source={require('../../../image/help.png')}
                        />
                        <Text>帮助</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.exitShare}>
                        <Image
                            style={styles.helpShareImg}
                            source={require('../../../image/share.png')}
                        />
                        <Text>分享</Text>
                    </TouchableOpacity>
                    <MyButton
                        onPress={this.toSearchTryout}
                        btnStyle={styles.btnStyle}
                        title={'立即申请'}
                    />
                </View>
            </View>
        )

    }

}
const styles = StyleSheet.create({
    //头部图片
    titleImage: {
        width: win.width,
        height: 300,
    },
    //返回图片定位
    backImage: { position: 'absolute', left: 15, top: 15 },
    //返回图片大小
    backImg: {
        width: 30,
        height: 30,
    },
    //第一行view
    startView: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20
    },
    //金额和快递类型view
    moneyExpress: {
        flexDirection: 'row',
        flex: 1
    },
    //金额text
    moneyTxt: {
        fontWeight: '600',
        fontSize: 18,
        color: 'black'
    },
    //快递类型view
    expressView: {
        backgroundColor: '#ffd84d',
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 10,
        borderWidth: 1
    },
    //快递文本
    expressTxt: {
        fontSize: 12
    },
    //标题和可用数量view
    titleNumView: {
        marginLeft: 20,
        marginTop: 10,
        marginRight: 30
    },
    //标题txt
    titleTxt: {
        fontSize: 18,
        color: 'black'
    },
    //可用数量txt
    numTxt: {
        marginTop: 5
    },
    //商家要求最外层view
    businessOut: {
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        borderRadius: 8
    },
    //商家要求文本view
    businessView: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5
    },
    //要求文本view
    requireTxt: {
        marginLeft: 20,
        marginBottom: 5
    },
    //商品详情view
    detailView: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5
    },
    //商品详情文本
    detailTxt: {
        fontSize: 18
    },
    //底部view
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginTop: 10,
        marginRight: 10
    },
    //帮助分享图片
    helpShareImg: {
        width: 30,
        height: 30,
    },
    //按钮
    btnStyle: {
        backgroundColor: 'red',
        height: 40,
        width: 140
    },
    //遮罩层底部view
    bottomMaskView: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
        marginRight: 10
    },
    //所有分享
    shareAll: {
        alignItems: 'center',
        marginLeft: 20
    }
});