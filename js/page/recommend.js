/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import UpdataImg from '../commonpents/UpdataImg'
import ShowImage from '../commonpents/ShowImage'

function Item(props) {
    let btn;
    if (props.name) {
        btn = <Text style={{ position: 'absolute', right: 5, top: 0 }}>14元</Text>
    } else {
        btn = <Text>14元</Text>
    }
    return (
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ width: 50, height: 50, flex: 1, borderRadius: 10 }}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../../navigators/images/icon01.png')}></Image>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 5, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>赚佣金</Text>
                    {btn}
                </View>

                <Text style={{ color: '#888888' }}>垫付650，返还650</Text>

            </View>
        </View>
    )
}

function Banner(props) {

    return ImgItem = props.list.map(((item, number) => {
        return (
            <TouchableOpacity style={{ borderRadius: 8 }} key={number.toString()} activeOpacity={1}>
                <Image source={{ uri: item.src }} style={{ width: win.width-40, height: 160 }} />
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
            arr: [{ src: 'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg', title: '1' }, { src: 'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg', title: '2' }, { src: 'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg', title: '3' }]
        }
        this.offSet = 0;
        this.index = 0;
        this.width = 330; //记录单个banner的宽度
    }
    
    componentDidMount() {
        this.setState({
            title: this.state.arr[0].title
        })
    }
    scroll = (event) => {
        const fuck = event.nativeEvent.contentOffset.x; //存储用户滑动结束后的x偏移亮
        const just = fuck - this.offSet;
        if(just !== 0){ //判断是否滑动
             this.index += Math.round(just/this.width) //根据偏移量-上次偏移量求出移动了几个图
        }
        this.offSet = fuck //更换这次偏移量
        this.setState({
            title: this.state.arr[this.index].title, //将数组名称赋值给title
        })

    }
    getDataBase (avatarSource,dataBase){
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
                        <Banner list={this.state.arr}/>
                    </ScrollView>
                </View>
                <View style={styles.taskBox}>
                    <Text style={styles.taskBoxText}>任务上新</Text>
                    <Text style={styles.taskBoxTitle}>每天更新，限量领取先到先得!</Text>
                    <View style={{ marginTop: 10 }}>
                        <Item />
                        <Item />
                        <Item />
                    </View>
                    <Text style={{ alignSelf: 'center', color: '#666666' }}>更多任务</Text>
                </View>
                <View style={{ height: 300, paddingLeft: 10, paddingTop: 15, backgroundColor: 'white', borderRadius: 15, marginTop: 15 }}>
                    <Text style={{ color: '#888888' }}>问卷赚</Text>
                    <Text style={{ fontWeight: '400', fontSize: 18, marginTop: 15 }}>简单问卷，轻松赚金币</Text>
                </View>
                <View style={{flexDirection:'row' ,height: 300,marginTop: 20}}> 
                    <UpdataImg 
                    avatarSource={this.state.avatarSource} 
                    dataBase={this.state.dataBase} 
                    onPress={(avatarSource,dataBase)=>{this.getDataBase(avatarSource,dataBase)}}/>
                    <ShowImage src='https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg'></ShowImage>
                </View>
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
