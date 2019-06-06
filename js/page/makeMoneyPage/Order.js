import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import fetchAjax from '../../../fetch/fetch';

const CITY_NAMES = [

]

const search = 'gtype:1';
export default class Order extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: [],
            con: true
        }
        this.page = 0;
        this.size = 20;
        this.totalPages = 0;
    }

    componentDidMount() {
        let data = this.loadFetch(this.page, this.size, true);
        this.setState({
            dataArray: data
        })
    }

    loadFetch(page, size, isLoading) {
        fetchAjax({
            url: '/m/goods-info/list',
            params: {
                page: page,
                size: size,
                search: search
            }
        }).then((result) => {
            if (result.status === 200) {
                //是否请求到列表数据
                if (result.josn.content && result.josn.content.length > 0) {
                    let dataArrayBuffer = [];
                    //判断是顶部刷新
                    if (isLoading) {
                        this.page = 0;
                        dataArrayBuffer = result.josn.content;
                    } else {//底部加载
                        this.page++;
                        dataArrayBuffer = this.state.dataArray.concat(result.josn.content);
                    }
                    this.totalPages = result.josn.totalPages;
                    //关闭load并渲染数据
                    this.setState({
                        isLoading: false,
                        dataArray: dataArrayBuffer
                    })
                }
            }
        }).catch((err) => {

        });
    }

    toGoodsDetail = (goodsId) => {
        const { navigation } = this.props.param;
        navigation.navigate('GoodsDetail', {
            goodsId: goodsId
        })

    }

    _renderItem(data) {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => this.toGoodsDetail(data.item.goodsId)}>
                <View style={styles.itemTextView}>
                    <View style={styles.itemTextMoneyView}>
                        <Text style={styles.itemTextMoneyText}>+{data.item.workPrice}</Text>
                        <View style={styles.itemTextMoneyUnitView}>
                            <Text>元</Text>
                        </View>
                    </View>
                    <Text>{data.item.goodsName}</Text>
                    <Text style={styles.itemTextMsgText}>支付{data.item.goodsPrice}元,返{data.item.payBack}元</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Image
                        style={{ width: 90, height: 90, marginRight: 10 }}
                        source={require('../../../image/14.png')}
                        source={{ uri: data.item.goodsImg }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    //上拉下拉加载
    reLoading = refreshing => {
        //判断是否顶部刷新
        if (refreshing) {
            //打开load
            this.setState({
                isLoading: true
            });
        }

        let page = 0;
        let size = this.size;
        if (!refreshing) {//底部加载push
            page = this.page + 1;
            //判断是否是最后一页
            if (page >= this.totalPages) {
                this.setState({
                    con: false
                })
                return;
            }
        }
        this.loadFetch(page, size, refreshing);

    }

    //底部标签显示
    genIndicator() {
        if (!this.state.con) {
            return (<View style={styles.indicatorContainer}>
                <Text style={styles.indicatorText}>已无更多数据</Text>
            </View>)
        } else {
            return (<View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={'large'}
                    color={'red'}
                    animating={true}
                />
                <Text>正在加载...</Text>
            </View>)
        }
    }

    render() {
        return (


            <FlatList
                data={this.state.dataArray}
                renderItem={(data) => this._renderItem(data)}
                // refreshing={this.state.isLoading}
                // onRefresh={() => { this.reLoading() }}
                //keyExtractor={(item, index) => item.title}

                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        colors={['red']}
                        tintColor={'red'}
                        refreshing={this.state.isLoading}
                        onRefresh={() => { this.reLoading(true) }}
                    />
                }

                //底部渲染
                ListFooterComponent={() => this.genIndicator()}
                //底部加载回调
                onEndReached={() => { this.reLoading() }}
                //当距离内容最底部还有多远时触发onEndReached回调，此参数是一个比值
                onEndReachedThreshold={0.1}
            />
        )

    }

}
const styles = StyleSheet.create({
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        margin: 10
    },
    indicatorText: {
        margin: 15
    },
    itemView: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#F0F0F0'
    },
    itemTextView: {
        flex: 1,
        margin: 10
    },
    itemTextMoneyView: {
        flexDirection: 'row'
    },
    itemTextMoneyText: {
        fontSize: 35
    },
    itemTextMoneyUnitView: {
        justifyContent: 'flex-end'
    },
    itemTextMsgText: {
        color: '#D0D0D0'
    },
    //item图片view、
    itemImageView: {
        justifyContent: 'center'
    },
    itemImgae: {
        width: 90,
        height: 90,
        marginRight: 10
    }
});