import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from 'react-native';
import {ClickArrow} from '../commponpents/commponpents'

export default class HelpInfo extends Component<Props> {

    toNext = (nextStr) => {
        const { navigation } = this.props;
        navigation.navigate(nextStr);
    }
    render() {
        return (
            <View style={styles.contain}>
                <ClickArrow
                    title={'淘宝操作指引'}
                    onPress={()=>{this.toNext('TaoBaoOper')}}
                />
                <ClickArrow
                    title={'联系客服'}
                    onPress={()=>{this.toNext('CustomerService')}}
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