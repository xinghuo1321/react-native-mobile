/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import UpdataImg from '../commonpents/UpdataImg'
import ShowImage from '../commonpents/ShowImage'
import axios from '../../fetch/fetch'
import { AsyncStorage } from "react-native"

function ItemList(arr,navigation) {
    console.log(arr)
    return arr.map(((item, number) => {
        return <Item key={number}
            name={item.gtype}
            image={item.goodsImg}
            goodsName={item.goodsName}
            goodsPrice={item.goodsPrice}
            payBack={item.payBack}
            click={()=>{navigation.navigate('GoodsDetail',{goodsId: item.goodsId})}} />
    }))
}

function Item(props) {
    console.log(props)
    let btn;
    if (props.name) {
        btn = <Text style={{ position: 'absolute', right: 5, top: 0 }}>+{props.payBack - props.goodsPrice}元</Text>
    } else {
        btn = <Text></Text>
    }
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 15 }} onPress={()=>{props.click()}}>
            <View style={{ width: 50, height: 50, flex: 1, borderRadius: 10 }}>
                <Image
                    style={{ width: 50, height: 50, borderRadius: 5 }}
                    source={{ uri: props.image }}></Image>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 5, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", overflow: 'hidden', }} numberOfLines={1}>{props.goodsName}</Text>
                    {btn}
                </View>

                <Text style={{ color: '#888888' }}>垫付{props.goodsPrice}，返还{props.payBack}</Text>

            </View>
        </TouchableOpacity>
    )
}

function Banner(props, navigation) {
    function click(item) {
        if (!item.external) {
            Linking.openURL('https://active.clewm.net/FqkJap?qrurl=http://qr01.cn/FqkJap>ype=1&key=4526815894210f0965573306589a645020c3bf4872')
        } else {
            if (item.redirect == 2 || item.redirect == 3) {
                navigation.navigate('makeMoney')
            } else if (item.redirect == 1) {
                
                navigation.navigate('ScrollDetails',{goodsId: 'newFlag:1',title: '新人必中'})
            }else if (item.redirect==5){
                console.log('jinlaile')
                navigation.navigate( 'AllDetails')
            }

        }
    }
    return ImgItem = props.map(((item, number) => {
        return (
            <TouchableOpacity style={{ borderRadius: 8 }} key={number.toString()} activeOpacity={1} onPress={() => { click(item) }}>
                <Image source={{ uri: item.imgUrl }} style={{ width: win.width - 40, height: 160 }} />
            </TouchableOpacity>
        )

    }))
}
type Props = {};
export default class recommend extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            dataBase: '',
            avatarSource: '',
            title: "", //banner title
            itemList: [],
            arr: [{ src: 'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg', title: '1' }, { src: 'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg', title: '2' }, { src: 'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg', title: '3' }]
        }
        this.offSet = 0;
        this.index = 0;
        this.width = 330; //记录单个banner的宽度
        AsyncStorage.setItem("aaa", "aaa-value")
    }

    componentDidMount() {
        console.log(AsyncStorage.getItem("aaa"))
        axios({ url: '/m/app/banner-list', }).then((res) => {
            console.log(res)
            let fuck = res.josn
            this.setState({
                arr: fuck,
                title: res.josn[0].title
            })
        }).catch((rej) => {
            alert(rej)
        });
        axios({ url: '/m/goods-info/list?', params: { page: 0, size: 3, search: 'gtype:1' } }).then((res) => {
            console.log(res)
            let fuck = res.josn
            this.setState({
                itemList: fuck.content,
            })
        }).catch((rej) => {
            alert(rej)
        });
    }
    scroll = (event) => {
        const fuck = event.nativeEvent.contentOffset.x; //存储用户滑动结束后的x偏移亮
        const just = fuck - this.offSet;
        if (just !== 0) { //判断是否滑动
            this.index += Math.round(just / this.width) //根据偏移量-上次偏移量求出移动了几个图
        }
        this.offSet = fuck //更换这次偏移量
        this.setState({
            title: this.state.arr[this.index].title, //将数组名称赋值给title
        })

    }
    getDataBase(avatarSource, dataBase) {
        this.setState({
            avatarSource,
            dataBase
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} >
                <Text style={styles.recommend}>推荐</Text>
                <View style={{ paddingTop: 20 }}>
                    <Text>{this.state.title}</Text>
                    <ScrollView style={{ flexDirection: 'row', }} horizontal={true} pagingEnabled={true}
                        onMomentumScrollEnd={this.scroll}  >
                        {/* <Banner list={this.state.arr} navigation={()=>this.props.navigation}/> */}
                        {Banner(this.state.arr, this.props.navigation)}
                    </ScrollView>
                </View>
                <View style={styles.taskBox}>
                    <Text style={styles.taskBoxText}>任务上新</Text>
                    <Text style={styles.taskBoxTitle}>每天更新，限量领取先到先得!</Text>
                    <View style={{ marginTop: 10 }}>
                        {ItemList(this.state.itemList,this.props.navigation)}
                    </View>
                    <Text style={{ alignSelf: 'center', color: '#666666' }} onPress={() => { this.props.navigation.navigate('makeMoney') }}>更多任务</Text>
                </View>
                <View style={{ height: 300, paddingLeft: 10, paddingTop: 15, backgroundColor: 'white', borderRadius: 15, marginTop: 15 }}>
                    <Text style={{ color: '#888888' }}>问卷赚</Text>
                    <Text style={{ fontWeight: '400', fontSize: 18, marginTop: 15 }}>简单问卷，轻松赚金币</Text>
                </View>
                {/* <View style={{flexDirection:'row' ,height: 300,marginTop: 20}}> 
                    <UpdataImg 
                    avatarSource={this.state.avatarSource} 
                    dataBase={this.state.dataBase} 
                    onPress={(avatarSource,dataBase)=>{this.getDataBase(avatarSource,dataBase)}}/>
                    <ShowImage src='https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg'></ShowImage>
                </View> */}
            </ScrollView>
        );
    }
}
const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        backgroundColor: '#f2f2f2',
    },
    recommend: {
        fontSize: 30,
        fontWeight: '500'

    },
    taskBox: {
        justifyContent: 'flex-start',
        height: 300,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15
    },
    taskBoxText: {
        color: '#888888'
    },
    taskBoxTitle: {
        marginTop: 10,
        fontSize: 18
    },
    fuck: {

    }
});
