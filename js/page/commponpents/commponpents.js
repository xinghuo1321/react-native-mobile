import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Modal
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import MyButton from '../../commonpents/MyButton';
import UpdataImg from '../../commonpents/UpdataImg';
import ShowImage from '../../commonpents/ShowImage';

export class BussRequire extends Component<Props> {
    render() {
        return (
            <View style={[styles.searchView, this.props.bussStyle]}>
                <Text style={styles.searchTitle}>商家要求</Text>
                <Text style={styles.searchTxt}>●要求1</Text>
                <Text style={styles.searchTxt}>●要求2</Text>
            </View>
        )
    }
}

export class EnterCar extends Component<Props> {

    render() {
        return (
            <View>
                <Text style={styles.titleTxt}>收藏商品,加入购物车</Text>
                <View>
                    <Text style={styles.buyCarTxt}>●今天请收藏,加入购物车,不要下单</Text>
                    <Text style={styles.buyCarTxt}>●明天再从购物车下单付款,回到平台填写订单号</Text>
                </View>
                <View style={styles.searchView}>
                    <Text style={styles.searchTitle}>商品信息</Text>
                    <Text style={styles.searchTxt}>使用淘宝号：cs369549270</Text>
                    <Text style={styles.searchTxt}>下单规格：黑色</Text>
                    <Text style={styles.searchTxt}>下单数量：2</Text>
                </View>
                <View style={styles.searchView}>
                    <Text style={styles.searchTitle}>商家要求</Text>
                    <Text style={styles.searchTxt}>●要求1</Text>
                    <Text style={styles.searchTxt}>●要求2</Text>
                </View>

                <View style={styles.checkBoxView}>

                    <CheckBox
                        label=''
                        checked={this.props.checked}
                        onChange={this.props.onChange}
                    />
                    <Text style={styles.checkBoxTxt}>请确认已收藏并加入购物车并打勾确认</Text>
                </View>
                <View style={styles.buyCarImgView}>
                    <Image
                        style={styles.buyCarImg}
                        source={{ uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=336071046,1752780664&fm=26&gp=0.jpg' }}
                    />
                </View>
            </View>
        )
    }
}

export class Frame extends Component<Props> {

    render() {
        return (
            <Modal
                visible={this.props.frameVisible}
                transparent={true}
            >
                <View style={styles.maskView}>
                    <View style={styles.frameView}>
                        <View style={styles.msgView}>
                            <Text style={styles.msgTxt}>{this.props.msg}</Text>
                        </View>
                        <TouchableOpacity style={styles.btnMsgView} onPress={this.props.closeFrame}>
                            <Text style={styles.btnMsgTxt}>{this.props.msgBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

export class InputCom extends Component<Props> {

    render() {
        return (
            <View style={styles.searchView}>
                <TextInput
                    style={[styles.txtInput, this.props.inputStyle]}
                    placeholder={this.props.placehold}
                    //是否自动换行
                    multiline={this.props.multiline || false}
                    //行高
                    numberOfLines={this.props.numberOfLines || 5} />
            </View>
        )
    }
}

export class OrderCom extends Component<Props> {

    render() {
        return (
            <View>
                <Text style={styles.titleTxt}>下单垫付货款</Text>
                <View style={styles.searchView}>
                    <Text style={styles.searchTitle}>下单信息</Text>
                    <Text style={styles.searchTxt}>使用淘宝号：cs369549270</Text>
                    <Text style={styles.searchTxt}>下单总金额：35元</Text>
                    <Text style={styles.searchTxt}>下单规格：黑色</Text>
                    <Text style={styles.searchTxt}>下单数量：2</Text>
                </View>

                <BussRequire />

                <Text style={styles.titleTxt}>订单号</Text>
                <InputCom
                    placehold={'输入订单号'}
                    multiline={true}
                    inputStyle={styles.inputStyle}
                    numberOfLines={1}
                />
            </View>
        )
    }
}

export class SearchCom extends Component<Props> {

    render() {
        return (
            <View>
                <Text style={styles.titleTxt}>请按条件在淘宝搜索商品</Text>
                <View style={styles.searchView}>
                    <Text style={styles.searchTitle}>搜索关键字</Text>
                    <Text style={styles.searchTxt}>天然水</Text>
                </View>
                <View style={styles.searchView}>
                    <Text style={styles.searchTitle}>筛选商品</Text>
                    <Text style={styles.searchTxt}>排序方式：综合</Text>
                    <Text style={styles.searchTxt}>价格区间：30~40</Text>
                    <Text style={styles.searchTxt}>发货地：珠三角</Text>
                </View>
                <View style={styles.searchView}>
                    <Text style={styles.searchTitle}>其他信息</Text>
                    <Text style={styles.searchTxt}>手机搜索展示价格：100元</Text>
                    <Text style={styles.searchTxt}>搜索展示付款人数约：10万人</Text>
                </View>
                <View style={styles.goodsInfo}>
                    <View>
                        <Image
                            style={styles.goodsImg}
                            source={{ uri: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=328731812,3815975191&fm=15&gp=0.jpg' }}
                        />
                    </View>
                    <View style={styles.goodsInfoTxt}>
                        <Text>店铺名：横***店</Text>
                        <Text style={{ marginTop: 10 }}>商品价格：35元</Text>
                    </View>
                </View>
            </View>
        )
    }

}

export class SearchToken extends Component<Props> {

    render() {
        if (this.props.enterType === 1) {
            return <SearchCom />
        } else {
            return <TokenCom
                onPress={this.props.onPress}
                visible={this.props.visible}
            />
        }

    }

}

export class TokenCom extends Component<Props> {

    render() {
        return (
            <View>
                <Modal
                    visible={this.props.visible}
                    transparent={true}
                >
                    <View style={styles.copyMaskView}>
                        <View style={styles.copyFrameView}>
                            <Text>复制成功</Text>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.titleTxt}>{this.props.title || '请复制淘口令在淘宝打开'}</Text>
                <TouchableOpacity style={styles.searchView} onPress={this.props.onPress}>
                    <Text style={styles.searchTitleCopy}>{this.props.copyTitle || '淘口令-点击可复制'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export class ShopCheck extends Component<Props> {

    render() {
        return (
            <View style={styles.shopView}>
                <View style={styles.shopInputView}>
                    <InputCom
                        placehold={'输入店铺名'}
                        multiline={true}
                        inputStyle={styles.shopInput}
                        numberOfLines={1}
                    />
                    {/* <TextInput style={{ height: 40, textAlignVertical: 'top' }} placeholder={'输入店铺名'} multiline={true} /> */}
                </View>
                <View style={styles.shopBtnView}>
                    <MyButton
                        onPress={this.check}
                        title='核对'
                        btnStyle={styles.checkBtn}
                    />
                </View>
            </View>
        )
    }
}

export class ImgCom extends Component<props>{
    render() {
        return (
            <View style={this.props.viewStyle}>
                <View style={styles.collectShopView}>
                    <Text>{this.props.title}</Text>
                </View>
                <View style={styles.collectImpView}>
                    <UpdataImg
                        avatarSource={this.props.avatarSource}
                        dataBase={this.props.dataBase}
                        onPress={(avatarSource, dataBase) => { this.props.onPress(avatarSource, dataBase) }}
                    />
                    <View style={styles.expView}>
                        <ShowImage src='https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg' />
                    </View>
                </View>
            </View>
        )
    }
}

export class ClickArrow extends Component<props>{
    render() {
        return (
            <TouchableOpacity style={styles.termView} onPress={this.props.onPress}>
                <View>
                    <Text style={styles.termTxt}>{this.props.title}</Text>
                </View>
                <View>
                    <Image
                        style={styles.ArrowImg}
                        source={require('../../../image/15.png')}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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
    //每项行view
    termView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //左右边距
        paddingHorizontal: 20,
        //上下边距
        paddingVertical: 15
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
    },
    //店铺和输入框view
    shopView: {
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        flex: 1
    },
    //店铺输入框view
    shopInputView: {
        flex: 2,
    },
    //店铺输入框
    shopInput: {
        height: 35
    },
    //核对按钮view
    shopBtnView: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'center'
    },
    //核对按钮
    checkBtn: {
        backgroundColor: 'red',
        height: 40,
        width: 120
    },

    //复制遮罩层view
    copyMaskView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //弹框view
    copyFrameView: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#d4d4d4'
    },
    //搜索标题
    searchTitleCopy: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },

    //商品图片
    goodsImg: {
        width: 100,
        height: 100
    },
    //商品详情view
    goodsInfo: {
        marginTop: 10,
        flexDirection: 'row',
    },
    //商品详情txt
    goodsInfoTxt: {
        marginLeft: 10
    },


    //输入框样式
    inputStyle: {
        height: 50,
        textAlignVertical: 'center'
    },

    txtInput: {
        height: 100,
        textAlignVertical: 'top'
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
    //收藏，购物车提醒
    buyCarTxt: {
        marginLeft: 25,
        marginTop: 10
    },
    //复选框view
    checkBoxView: {
        flexDirection: 'row',
        marginTop: 10
    },
    //复选框txt
    checkBoxTxt: {
        fontSize: 18
    },
    //购物车图片view
    buyCarImgView: {
        alignItems: 'center'
    },
    //购物车图片
    buyCarImg: {
        width: 200, height: 80
    },


    //遮罩层view
    maskView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    //弹框view
    frameView: {
        width: 240,
        height: 140,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    //消息view
    msgView: {
        alignItems: 'center'
    },
    //消息view
    msgTxt: {
        marginBottom: 20
    },
    //关闭消息框view
    btnMsgView: {
        borderTopWidth: 1,
        borderTopColor: '#f3f3f3',
        alignItems: 'center'
    },
    //关闭消息文本
    btnMsgTxt: {
        marginTop: 10,
        color: 'red'
    },
})
