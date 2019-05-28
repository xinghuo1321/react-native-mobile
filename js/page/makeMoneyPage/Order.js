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

const CITY_NAMES = [
    { money: 1, title: 'erwtew标题1', msg: '标题1sss' },
    { money: 2, title: 'hhhhhhtetuytuyjtd标题2', msg: '标题2sssdsfg' },
    { money: 3, title: 'hhh标题3', msg: '标题3sss' },
    { money: 4, title: 'hhhherrrrrrerwgtywert标题4', msg: '标题4sss' },
    { money: 5, title: 'ewtwert标题5', msg: '标题5sssgdsfg' },
]
export default class Order extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES
        }
    }
    
    toGoodsDetail = () => {
        const { navigation } = this.props.param;
        navigation.navigate('GoodsDetail')

    }

    _renderItem(data) {
        return (
            <TouchableOpacity style={styles.itemView} onPress={this.toGoodsDetail}>      
                <View style={styles.itemTextView}>
                    <View style={styles.itemTextMoneyView}>
                        <Text style={styles.itemTextMoneyText}>+{data.item.money}</Text>
                        <View style={styles.itemTextMoneyUnitView}>
                            <Text>元</Text>
                        </View>
                    </View>
                    <Text>{data.item.title}</Text>
                    <Text style={styles.itemTextMsgText}>{data.item.msg}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Image
                        style={{ width: 90, height: 90, marginRight: 10 }}
                        source={require('../../../image/14.png')}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    //上拉下拉加载
    reLoading = refreshing => {
        console.log(1);
        //判断是否顶部刷新
        if (refreshing) {
            //打开load
            this.setState({
                isLoading: true
            });
        }

        setTimeout(() => {

            let dataArrayBuffer = [];
            //判断是否顶部刷新
            if (refreshing) {
                // let i = this.state.dataArray.length - 1;
                // for (i; i >= 0; i--) {
                //     dataArrayBuffer.push(this.state.dataArray[i])
                // }
                let i = CITY_NAMES.length - 1;
                for (i; i >= 0; i--) {
                    dataArrayBuffer.push(CITY_NAMES[i])
                }
            } else {//底部加载push
                if (this.state.dataArray.length > 10) {
                    dataArrayBuffer = this.state.dataArray;
                } else {
                    dataArrayBuffer = this.state.dataArray.concat(CITY_NAMES);
                }

            }

            //关闭load并渲染数据
            this.setState({
                isLoading: false,
                dataArray: dataArrayBuffer
            })
        }, 2000)
    }

    //底部标签显示
    genIndicator() {
        if (this.state.dataArray.length > 10) {
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