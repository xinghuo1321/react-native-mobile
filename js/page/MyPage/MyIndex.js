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
    TouchableOpacity,

} from 'react-native';
import MyButton from '../../commonpents/MyButton';
import { BussRequire } from '../commponpents/commponpents'

const CITY_NAMES = [
    { status: 1, title: '商品标题商品标题商品标题商品标题商品1标题商品标题1商2333品标题商品标题商品标题' },
    { status: 2, title: '商品标题商品标题商品标题商品标题商品1标题商品标题1商2333品标题商品标题商品标题' },
    { status: 3, title: '商品标题商品标题商品标题商品标题商品1标题商品标题1商2333品标题商品标题商品标题' },
]

export default class MyIndex extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES
        }
    }

    toMyInfo = () => {
        const { navigation } = this.props;
        navigation.navigate('MyInfo');
    }

    toMyTask = (pathSrc) => {
        const { navigation } = this.props;
        navigation.navigate(pathSrc);
    }

    toSearchTryout = status => {
        const { navigation } = this.props;
        if (status === 1) {
            navigation.navigate('SearchTryout');
        } else if (status === 2) {
            navigation.navigate('Commission');
        } else if (status === 3) {
            navigation.navigate('TryoutReceive');
        }
        // navigation.navigate('SearchTryout');
        // navigation.navigate('Commission');
        // navigation.navigate('AddChance');
        // navigation.navigate('TryoutReceive');
        // navigation.navigate('BindTaobao');//绑定淘宝
        // navigation.navigate('Evaluate');//提交评价内容
        // navigation.navigate('FinishEvaluate');//完成评价
    }

    //数据格式返回
    _renderItem(data) {
        let status = '中奖啦';
        let btnTitle = '领奖';
        let tabs = (
            <View style={styles.tipsView}>
                <Text>2019/01/31 12:12:12 截至领奖</Text>
            </View>
        );
        let bussTab = (
            <BussRequire
                bussStyle={styles.bussStyle}
            />
        );
        if (data.item.status === 2) {
            status = '待开奖';
            btnTitle = '可增加中奖率';
            tabs = (
                <View style={styles.tipsView}>
                    <Text>开奖计划</Text>
                    <Text>2019/01/31</Text>
                    <Text>2019/02/01</Text>
                </View>
            );
            bussTab = null;
        } else if (data.item.status === 3) {
            status = '待评价';
            btnTitle = '提交评价内容';
            tabs = (
                <View style={styles.tipsView}>
                    <Text>驳回原因</Text>
                    <Text style={styles.rejectTxt}>请认真浏览宝贝详情3分钟以上 谢谢啦</Text>
                </View>
            );
            bussTab = null;
        }

        return (

            <View style={styles.todoView}>
                <View style={styles.todoTitleView}>
                    <View>
                        <Image
                            style={styles.todoImg}
                            source={{ uri: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2524308173,3523903298&fm=26&gp=0.jpg' }}
                        />
                    </View>
                    <View style={styles.todoTitle}>
                        <Text>{status}</Text>
                        <Text>{data.item.title}</Text>
                    </View>
                </View>
                {bussTab}
                {tabs}
                <View style={styles.btnView}>
                    <MyButton
                        onPress={() => { this.toSearchTryout(data.item.status) }}
                        btnStyle={styles.btnStyle}
                        title={btnTitle}
                    />
                </View>
            </View>

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

    headComponent() {
        return (
            <View style={styles.containView}>
                <TouchableOpacity onPress={this.toMyInfo}>
                    <Text style={styles.headInfo}>Hi,157*****663</Text>
                    <Text>点击修改信息</Text>
                </TouchableOpacity>
                <View style={styles.headTab}>
                    <TouchableOpacity style={styles.headTabView} onPress={()=>{this.toMyTask('MyTask')}}>
                        <Image
                            style={styles.headTabImg}
                            source={require('../../../image/10.png')}
                        />
                        <Text>任务</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headTabView} onPress={()=>{this.toMyTask('Wallet')}}>
                        <Image
                            style={styles.headTabImg}
                            source={require('../../../image/8.png')}
                        />
                        <Text>钱包</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headTabView}>
                        <Image
                            style={styles.headTabImg}
                            source={require('../../../image/9.png')}
                        />
                        <Text>邀请</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headTabView}>
                        <Image
                            style={styles.headTabImg}
                            source={require('../../../image/11.png')}
                        />
                        <Text>帮助</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <Text style={styles.todoTxt}>待处理</Text>
                </View>
            </View>

        )
    }

    render() {
        return (

            <FlatList
                data={this.state.dataArray}
                renderItem={(data) => this._renderItem(data)}
                backgroundColor={'#f3f3f3'}
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        colors={['red']}
                        tintColor={'red'}
                        refreshing={this.state.isLoading}
                        onRefresh={() => { this.reLoading(true) }}
                    />
                }

                ListHeaderComponent={() => this.headComponent()}
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
    contain: {
        backgroundColor: '#f3f3f3'
    },
    containView: {
        flex: 1,
        padding: 20,
    },
    //头部我的信息
    headInfo: {
        fontSize: 24,
        color: 'black'
    },
    //头部标签
    headTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    //头部标签
    headTabView: {
        alignItems: 'center'
    },
    //头部标签图标
    headTabImg: {
        height: 30,
        width: 39
    },
    //按钮
    btnStyle: {
        backgroundColor: 'red',
        height: 40,
        width: 140,
    },
    //底部
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        margin: 10
    },
    indicatorText: {
        margin: 15
    },
    //待处理txt
    todoTxt: {
        fontSize: 18
    },
    //待处理view
    todoView: {
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
        borderRadius: 10
    },
    //待处理标题View
    todoTitleView: {
        flexDirection: 'row',
    },
    //待处理图片
    todoImg: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    //待处理标题
    todoTitle: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: 5
    },
    //按钮view
    btnView: {
        marginTop: 10,
        alignItems: 'flex-end'
    },
    //提示view
    tipsView: {
        borderWidth: 1,
        borderColor: '#f3f3f3',
        padding: 10,
        marginTop: 10
    },
    //驳回原因txt
    rejectTxt: {
        color: '#000000'
    },
    //商家要求
    bussStyle: {
        backgroundColor: '#f3f3f3'
    }
})