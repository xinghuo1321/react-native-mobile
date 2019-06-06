import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from 'react-native';
import { ClickArrow } from '../commponpents/commponpents'

export default class TaoBaoOper extends Component<Props> {

    toVideo = (nextStr) => {
        const { navigation } = this.props;
        navigation.navigate('VideoOper', {
            title: nextStr
        });
    }
    render() {
        return (
            <View style={styles.contain}>
                <ClickArrow
                    title={'如何找到【我的淘宝】'}
                    onPress={() => { this.toVideo('如何找到【我的淘宝】') }}
                />
                <ClickArrow
                    title={'如何找到【评价管理】'}
                    onPress={() => { this.toVideo('如何找到【评价管理】') }}
                />
                <ClickArrow
                    title={'如何进入店铺'}
                    onPress={() => { this.toVideo('如何进入店铺') }}
                />
                <ClickArrow
                    title={'如何查看全部评论'}
                    onPress={() => { this.toVideo('如何查看全部评论') }}
                />
                <ClickArrow
                    title={'如何关注店铺'}
                    onPress={() => { this.toVideo('如何关注店铺') }}
                />
                <ClickArrow
                    title={'如何找到店铺名称'}
                    onPress={() => { this.toVideo('如何找到店铺名称') }}
                />
                <ClickArrow
                    title={'如何打开购物车'}
                    onPress={() => { this.toVideo('如何打开购物车') }}
                />
                <ClickArrow
                    title={'如何找到足迹'}
                    onPress={() => { this.toVideo('如何找到足迹') }}
                />
                <ClickArrow
                    title={'如何找到会员名和淘气值'}
                    onPress={() => { this.toVideo('如何找到会员名和淘气值') }}
                />
                <ClickArrow
                    title={'如何问大家'}
                    onPress={() => { this.toVideo('如何问大家') }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {

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
})