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
    Modal,
    WebView
} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import fetchAjax from '../../../fetch/fetch';
import DataStore from '../../expand/dao/DataStore';

const BaseScript =
    `
    (function () {
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setTimeout(changeHeight, 300);
    } ())
    `

const win = Dimensions.get('window');
export default class GoodDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            myWidth: win.width,
            myHeight: win.height,
            //遮罩层开关
            maskVisible: false,
            //商品图片
            goodsImg: '',
            //商品价格
            price: 0,
            //商品名称
            goodsName: '',
            //结束时间
            endDay: '',
            //商品剩余数量
            remain: '',
            //是否包邮
            mail: false,
            btnTitle: '',
            sellerRequire: '',
            goodsDesc: '',
            height: 0,
            detailHeight: 0,
            //按钮是否置灰false是灰
            btnColor: true
        };
        // this.dataStore = new DataStore();
        this.btnStatus = '03';
    }

    /**
   * web端发送过来的交互消息
   */
    onMessage(event) {
        try {
            const action = JSON.parse(event.nativeEvent.data)
            if (action.type === 'setHeight' && action.height > 0) {
                this.setState({ height: action.height })
            }
        } catch (error) {
            // pass
        }
    }

    /**
   * web端发送过来的交互消息
   */
    onMessage1(event) {
        try {
            const action = JSON.parse(event.nativeEvent.data)
            if (action.type === 'setHeight' && action.height > 0) {
                this.setState({ detailHeight: action.height })
            }
        } catch (error) {
            // pass
        }
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
        if (this.btnStatus === '03') {
            navigation.navigate('Login');//登陆
        } else if (this.btnStatus === '11' || this.btnStatus === '13') {
            navigation.navigate('BindTaobao');//绑定淘宝
        }
        // navigation.navigate('SearchTryout');
        // navigation.navigate('Commission');
        // navigation.navigate('AddChance');
        //navigation.navigate('TryoutReceive');//试用领奖
        // navigation.navigate('BindTaobao');//绑定淘宝
        // navigation.navigate('Evaluate');//提交评价内容
        // navigation.navigate('FinishEvaluate');//完成评价
    }

    componentDidMount() {
        let { goodsId } = this.props.navigation.state.params;

        DataStore.getAuthToken((error, token) => {
            DataStore.fetchDataGet('/m/goods-info/' + goodsId, '', { 'authToken': token }).then((result) => {
                this.btnStatus = result.status.code;

                let btnTitle = '';
                if (result.status.code === '03') {//	用户未登录
                    btnTitle = '免费领取';
                } else if (result.status.code === '11') {//未绑定买号
                    btnTitle = '请绑定淘宝';
                } else if (result.status.code === '12') {//买号未审核
                    btnTitle = '淘宝待审核';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '13') {//买号不合格
                    btnTitle = '淘宝不合格';
                } else if (result.status.code === '14') {//禁止中奖
                    btnTitle = '违规禁用';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '21') {//当前商品普通任务中奖
                    btnTitle = '做任务';
                } else if (result.status.code === '22') {//当前佣金任务中奖
                    btnTitle = '做任务';
                } else if (result.status.code === '30') {//普通任务待提交
                    btnTitle = '免费领取';
                } else if (result.status.code === '31') {//佣金任务待提交
                    btnTitle = '已参与';
                } else if (result.status.code === '16') {//已参与
                    btnTitle = '已参与';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '26') {//其他佣金中奖
                    btnTitle = '有任务待领奖';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '23') {//继续邀请好友
                    btnTitle = '邀请注册继续';
                } else if (result.status.code === '15') {//同一店铺中奖限制
                    btnTitle = '请领取其它';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '18') {
                    //第3，4次领取佣金，当天有中奖的任务
                    //中奖次数大于0，两天领取一次
                    btnTitle = '不符要求';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '05') {//商品已下架
                    btnTitle = '已下架';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '04') {//已超过日申请限制
                    btnTitle = '已满额';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '20') {//佣金任务可领取
                    btnTitle = '领取任务';
                } else if (result.status.code === '00') {//普通任务可领取
                    btnTitle = '申请商品';
                } else if (result.status.code === '17') {//没有设置提醒的情况下
                    btnTitle = '设置开抢提醒';
                } else if (result.status.code === '24') {//设置提醒的情况下
                    btnTitle = '已设置提醒';
                    this.setState({
                        btnColor: false
                    })
                } else if (result.status.code === '32') {//同一商家下面的店铺的中奖限制
                    btnTitle = '请领取其它';
                    this.setState({
                        btnColor: false
                    })
                }

                this.setState({
                    goodsImg: result.goodsImg,
                    price: result.price,
                    goodsName: result.goodsName,
                    endDay: result.endDay,
                    remain: result.remain,
                    mail: result.mail,
                    btnTitle: btnTitle,
                    sellerRequire: result.sellerRequire,
                    goodsDesc: result.goodsDesc,
                })

            }).catch((err) => {

            });
        })

        // fetchAjax({
        //     url: '/m/goods-info/' + goodsId,
        // }).then((result) => {
        //     if (result.status === 200) {
        //         let btnTitle = '';
        //         if (result.josn.status.code === '03') {//	用户未登录
        //             btnTitle = '免费领取';
        //         } else if (result.josn.status.code === '11') {//未绑定买号
        //             btnTitle = '请绑定淘宝';
        //         } else if (result.josn.status.code === '12') {//买号未审核
        //             btnTitle = '淘宝待审核';
        //         } else if (result.josn.status.code === '13') {//买号不合格
        //             btnTitle = '淘宝不合格';
        //         } else if (result.josn.status.code === '14') {//禁止中奖
        //             btnTitle = '违规禁用';
        //         } else if (result.josn.status.code === '21') {//当前商品普通任务中奖
        //             btnTitle = '做任务';
        //         } else if (result.josn.status.code === '22') {//当前佣金任务中奖
        //             btnTitle = '做任务';
        //         } else if (result.josn.status.code === '30') {//普通任务待提交
        //             btnTitle = '免费领取';
        //         } else if (result.josn.status.code === '31') {//佣金任务待提交
        //             btnTitle = '已参与';
        //         } else if (result.josn.status.code === '16') {//已参与
        //             btnTitle = '已参与';
        //         } else if (result.josn.status.code === '26') {//其他佣金中奖
        //             btnTitle = '有任务待领奖';
        //         } else if (result.josn.status.code === '23') {//继续邀请好友
        //             btnTitle = '邀请注册继续';
        //         } else if (result.josn.status.code === '15') {//同一店铺中奖限制
        //             btnTitle = '请领取其它';
        //         } else if (result.josn.status.code === '18') {
        //             //第3，4次领取佣金，当天有中奖的任务
        //             //中奖次数大于0，两天领取一次
        //             btnTitle = '不符要求';
        //         } else if (result.josn.status.code === '05') {//商品已下架
        //             btnTitle = '已下架';
        //         } else if (result.josn.status.code === '04') {//已超过日申请限制
        //             btnTitle = '已满额';
        //         } else if (result.josn.status.code === '20') {//佣金任务可领取
        //             btnTitle = '领取任务';
        //         } else if (result.josn.status.code === '00') {//普通任务可领取
        //             btnTitle = '申请商品';
        //         } else if (result.josn.status.code === '17') {//没有设置提醒的情况下
        //             btnTitle = '设置开抢提醒';
        //         } else if (result.josn.status.code === '24') {//设置提醒的情况下
        //             btnTitle = '已设置提醒';
        //         } else if (result.josn.status.code === '32') {//同一商家下面的店铺的中奖限制
        //             btnTitle = '请领取其它';
        //         }

        //         this.setState({
        //             goodsImg: result.josn.goodsImg,
        //             price: result.josn.price,
        //             goodsName: result.josn.goodsName,
        //             endDay: result.josn.endDay,
        //             remain: result.josn.remain,
        //             mail: result.josn.mail,
        //             btnTitle: btnTitle,
        //             sellerRequire: result.josn.sellerRequire,
        //             goodsDesc: result.josn.goodsDesc,
        //         })
        //     }
        // }).catch((err) => {

        // });


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
                        source={{ uri: this.state.goodsImg }}
                    />

                    <View style={styles.startView}>
                        <View style={styles.moneyExpress}>
                            <Text style={styles.moneyTxt}>￥{this.state.price}</Text>
                            <View style={styles.expressView}>
                                <Text style={styles.expressTxt}>{this.state.mail ? '包邮' : '不包邮'}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>{this.state.endDay}结束</Text>
                        </View>
                    </View>
                    <View style={styles.titleNumView}>
                        <Text style={styles.titleTxt}>{this.state.goodsName}</Text>
                        <Text style={styles.numTxt}>奖品剩余 {this.state.remain} 份</Text>
                    </View>
                    <View style={styles.businessOut} backgroundColor={'#f3f3f3'}>
                        <View style={styles.businessView}>
                            <Text>商家要求</Text>
                        </View>

                        <WebView
                            injectedJavaScript={BaseScript}
                            source={{ html: this.state.sellerRequire, baseUrl: '' }}
                            style={{
                                width: Dimensions.get('window').width,
                                height: this.state.height
                            }}
                            automaticallyAdjustContentInsets
                            decelerationRate='normal'
                            scalesPageToFit
                            javaScriptEnabled // 仅限Android平台。iOS平台JavaScript是默认开启的。
                            domStorageEnabled // 适用于安卓
                            scrollEnabled={false}
                            onMessage={this.onMessage.bind(this)}

                        />
                    </View>
                    <View style={styles.detailView}>
                        <Text style={styles.detailTxt}>商品详情</Text>
                    </View>

                    <WebView
                        injectedJavaScript={BaseScript}
                        source={{ html: this.state.goodsDesc, baseUrl: '' }}
                        style={{
                            width: Dimensions.get('window').width,
                            height: this.state.detailHeight
                        }}
                        automaticallyAdjustContentInsets
                        decelerationRate='normal'
                        scalesPageToFit
                        javaScriptEnabled // 仅限Android平台。iOS平台JavaScript是默认开启的。
                        domStorageEnabled // 适用于安卓
                        scrollEnabled={false}
                        onMessage={this.onMessage1.bind(this)}

                    />

                </ScrollView >
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.shareAll} style={{ flex: 1 }}>
                        <Image
                            style={styles.helpShareImg}
                            source={require('../../../image/help.png')}
                        />
                        <Text>帮助</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.exitShare} style={{ flex: 1 }}>
                        <Image
                            style={styles.helpShareImg}
                            source={require('../../../image/share.png')}
                        />
                        <Text>分享</Text>
                    </TouchableOpacity>
                    <MyButton
                        onPress={this.toSearchTryout}
                        btnStyle={this.state.btnColor ? styles.btnStyle : styles.btnStyle1}
                        title={this.state.btnTitle}
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
        marginRight: 10,
    },
    //帮助分享图片
    helpShareImg: {
        width: 30,
        height: 30,
    },
    //按钮
    btnStyle: {
        height: 40,
        padding: 10,
        backgroundColor: 'red',
    },
    //按钮
    btnStyle1: {
        height: 40,
        padding: 10,
        backgroundColor: '#f3f3f3',
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