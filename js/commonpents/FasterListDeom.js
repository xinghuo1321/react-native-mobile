import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, FlatList, Dimensions ,ActivityIndicator} from 'react-native';
import propTypes from 'prop-types'


type Props = {}
export default class FasterListDeom extends Component<Props> {
    static propTypes = {
        array: propTypes.array.isRequired, //渲染数据源
        isLoading: propTypes.bool, //头部显示
        reLoading: propTypes.func, //上拉刷新
        headerView: propTypes.func, //头部控件
        footer: propTypes.func, //底部控件，有默认值
        footerOff: propTypes.bool, //底部控件默认显示字体
        onEndReached: propTypes.func //距离底部多远触发刷新
    }
    constructor(props) {
        super(props)

    }
    _extraUniqueKey = (item, index) => {
        return index + ""
    }
    genIndivator(off){
        let activity;
        if(!off){
           activity =  <ActivityIndicator
                    animating={true}></ActivityIndicator>
                
        }
        return (
            <View style={{alignItems: 'center',}}>
                {activity}
                <Text style={{color:'#666'}}>{off?'暂无更多':'正在加载'}</Text>
            </View>
        )
    }
    _renderItem(data) {
        console.log(data)
        return (
            <TouchableOpacity style={styles.box} activeOpacity={1}>
                <Image source={{ uri: data.item.img }} style={styles.img}></Image>
                <Text style={{marginTop: 10,marginBottom:10}}>{data.item.txt}</Text>
                <View style={styles.bottom}>
                    <Text style={{fontSize:12,alignSelf:'flex-start',color: 'red', textDecorationLine:'line-through'}}>¥{data.item.money}</Text>
                    <Text style={{fontSize:12,color: '#8f8f8f'}}>剩余{data.item.num}份</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <FlatList
                columnWrapperStyle={{ justifyContent:'center',alignItems:'flex-start', padding: 10}}
                numColumns="2"
                style={styles.list}
                data={this.props.array}
                renderItem={(data) => this._renderItem(data)}
                refreshing={this.props.isLoading}
                onRefresh={() => { this.props.reLoading() }}
                keyExtractor={this._extraUniqueKey}
                ListHeaderComponent={this.props.headerView}
                ListFooterComponent={()=>{if(!this.props.footer){return this.genIndivator(this.props.footerOff)}else{return this.props.footer()} }}
                onEndReached={()=>{this.props.onEndReached()}}
            >
            </FlatList>
        )
    }
}
const win = Dimensions.get('window');

const styles = StyleSheet.create({
    list: {
        //height: win.height,
        backgroundColor: '#f2f2f2'
    },
    img: {
        width: '100%',
        height: 161
    },
    box: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: win.width/2-20,
        overflow: 'hidden',
        marginLeft: 10,
    },
    bottom: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    test: {
       
    },

})