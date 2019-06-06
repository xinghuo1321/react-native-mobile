import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import propTypes from 'prop-types'
import { withNavigation } from 'react-navigation';

function list(that) {
    if (that.props.numColumns === 1) {
        return (
            <FlatList
                style={styles.list}
                data={that.props.array}
                renderItem={(data) => { return that.props.renderItem ? that.props.renderItem(data) : that._renderItem(data) }}
                refreshing={that.props.isLoading}
                onRefresh={() => { that.props.reLoading() }}
                keyExtractor={that._extraUniqueKey}
                ListHeaderComponent={that.props.headerView}
                ListFooterComponent={() => { if (!that.props.footer) { return that.genIndivator(that.props.footerOff) } else { return that.props.footer() } }}
                onEndReached={() => { that.props.onEndReached() }}
                onEndReachedThreshold={0.1}
            >
            </FlatList>
        )
    } else {
        return (
            <FlatList
                columnWrapperStyle={{ alignItems: 'flex-start', padding: 10 }}
                numColumns={that.props.numColumns ? that.props.numColumns : "2"}
                style={styles.list}
                data={that.props.array}
                renderItem={(data) => { return that.props.renderItem ? that.props.renderItem(data) : that._renderItem(data) }}
                refreshing={that.props.isLoading}
                onRefresh={() => { that.props.reLoading() }}
                keyExtractor={that._extraUniqueKey}
                ListHeaderComponent={that.props.headerView}
                ListFooterComponent={() => { if (!that.props.footer) { return that.genIndivator(that.props.footerOff) } else { return that.props.footer() } }}
                onEndReached={() => { that.props.onEndReached() }}
                onEndReachedThreshold={0.1}
            >
            </FlatList>
        )
    }
}
type Props = {}
 class FasterListDeom extends Component<Props> {
    static propTypes = {
        array: propTypes.array.isRequired, //渲染数据源
        isLoading: propTypes.bool, //头部显示
        reLoading: propTypes.func, //上拉刷新
        headerView: propTypes.func, //头部控件
        renderItem: propTypes.func, //中间组件函数
        footer: propTypes.func, //底部控件，有默认值
        footerOff: propTypes.bool, //底部控件默认显示字体
        onEndReached: propTypes.func, //距离底部多远触发刷新
        numColumns: propTypes.number, //一行几个
        navigation: propTypes.any //导航
    }
    constructor(props) {
        super(props)
    }
    _extraUniqueKey = (item, index) => {
        return index + ""
    }

    loadModeDataMore() { }

    genIndivator(off) {
        let activity;
        if (!off) {
            activity = <ActivityIndicator
                animating={true}></ActivityIndicator>

        }
        return (
            <View style={{ alignItems: 'center', }}>
                {activity}
                <Text style={{ color: '#666' }}>{off ? '暂无更多' : '正在加载'}</Text>
            </View>
        )
    }
    _renderItem = (data)=> {
        return (
            <TouchableOpacity style={styles.box} activeOpacity={1} onPress={()=>{this.props.navigation.navigate('GoodsDetail',{'goodsId':data.item.goodsId})}}>
                <Image source={{ uri: data.item.goodsImg }} style={styles.img}></Image>
                <Text style={{ marginTop: 10, marginBottom: 10 }}>{data.item.goodsName}</Text>
                <View style={styles.bottom}>
                    <Text style={{ fontSize: 12, alignSelf: 'flex-start', color: 'red', textDecorationLine: 'line-through' }}>¥{data.item.goodsPrice}</Text>
                    <Text style={{ fontSize: 12, color: '#8f8f8f' }}>剩余{data.item.goodsNum}份</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            list(this)
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
        width: win.width / 2 - 20,
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
export default withNavigation(FasterListDeom);