import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import React from 'react'
import makeMoney from '../js/page/makeMoney'
import mine from '../js/page/mine'
import recommend from '../js/page/recommend'
import tryOut from '../js/page/tryOut'
import Login from '../js/page/user/Login'
import Register from '../js/page/user/Register'
import PassLogin from '../js/page/user/PassLogin';
import ForgetPass from '../js/page/user/ForgetPass'
import BindPhone from '../js/page/user/BindPhone'
import GoodsDetail from '../js/page/commponpents/GoodDetail';
import SearchTryout from '../js/page/commponpents/SearchTryout';
import Commission from '../js/page/commponpents/Commission';
import AddChance from '../js/page/commponpents/AddChance';
import TryoutReceive from '../js/page/commponpents/TryoutReceive';
import Evaluate from '../js/page/commponpents/Evaluate';
import FinishEvaluate from '../js/page/commponpents/FinishEvaluate';
import BindTaobao from '../js/page/MyPage/BindTaobao';
import MyIndex from '../js/page/MyPage/MyIndex';
import MyInfo from '../js/page/MyPage/MyInfo';
import RefundsInfo from '../js/page/MyPage/RefundsInfo';
import MyTask from '../js/page/MyPage/MyTask';
import BankList from '../js/page/MyPage/BankList';
import CashOutAccount from '../js/page/MyPage/CashOutAccount';
import CashOutPass from '../js/page/MyPage/CashOutPass';
import PhoneSet from '../js/page/MyPage/PhoneSet';
import LoginPassSet from '../js/page/MyPage/LoginPassSet';
import TaoBao from '../js/page/MyPage/TaoBao';
import CustomerService from '../js/page/MyPage/CustomerService';
import HelpInfo from '../js/page/MyPage/HelpInfo';
import TaoBaoOper from '../js/page/MyPage/TaoBaoOper';
import VideoOper from '../js/page/MyPage/VideoOper';
import DataStore from '../js/expand/dao/DataStore'

import AllDetails from '../js/page/tryOutPage/AllDetails';
import Invitation from '../js/page/MyPage/invitation/invitation'
import Information from '../js/page/MyPage/information'
import bringMoney from "../js/page/MyPage/mywallet/bringMoney";
import wallet from "../js/page/MyPage/mywallet/wallet";
import search from '../js/page/tryOutPage/search'
import all from '../js/page/tryOutPage/all'
import scrollDetails from '../js/page/tryOutPage/scrollDetails'
import { Button, Image, View, TouchableOpacity } from "react-native"

const AppBottomNavigator = createBottomTabNavigator({
    recommend: {
        screen: recommend,
        navigationOptions: {
            tabBarLabel: '推荐',
            tabBarIcon: ({ tinColor, focused }) => {
                const icon = !focused ? require('./images/icon01.png') : require('./images/icon1.png')
                return <Image
                    style={{ height: 25, width: 25 }}
                    source={icon} />
            },
            tabBarOnPress: (event) => {
                event.defaultHandler();//调用组建内默认的实现方法
                // let dataStore = new DataStore();
                DataStore.saveDataKey("bottom", "recommend");
            },
        }
    },
    makeMoney: {
        screen: makeMoney,
        navigationOptions: {
            tabBarLabel: '赚钱',
            tabBarIcon: ({ tinColor, focused }) => {
                const icon = !focused ? require('./images/icon02.png') : require('./images/icon2.png')
                return <Image
                    style={{ height: 25, width: 25 }}
                    source={icon} />
            },
            tabBarOnPress: (event) => {
                event.defaultHandler();//调用组建内默认的实现方法
                // let dataStore = new DataStore();
                DataStore.saveDataKey("bottom", "makeMoney");
            },
        }
    },
    tryOut: {
        screen: tryOut,
        navigationOptions: {
            tabBarLabel: '试用',
            tabBarIcon: ({ tinColor, focused }) => {
                const icon = !focused ? require('./images/icon03.png') : require('./images/icon3.png')
                return <Image
                    style={{ height: 25, width: 25 }}
                    source={icon} />
            },
            tabBarOnPress: (event) => {
                event.defaultHandler();//调用组建内默认的实现方法
                // let dataStore = new DataStore();
                DataStore.saveDataKey("bottom", "tryOut");
            },
        }
    },
    MyIndex: {
        screen: MyIndex,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tinColor, focused }) => {
                const icon = !focused ? require('./images/icon04.png') : require('./images/icon4.png')
                return <Image
                    style={{ height: 25, width: 25 }}
                    source={icon} />
            }
        }
    },

}, {
        tabBarOptions: {
            tabStyle: { minWidth: 50 },
            upperCaseLabel: false, //标签是否大写
            scrollEnabled: true,//是否可以滚动
            activeTintColor: 'red',
            style: {
                backgroundColor: 'f3f3f3' //tabBar 的背景色 
            },
            indicatorStyle: {
                height: 15,
            },//标签指示器样式
            labelStyle: {
                fontSize: 12,
            }//文字样式
        }
    })
export const AppStackNavigator = new createStackNavigator({
    makeMoney: {
        screen: makeMoney
    },
    MyIndex: {
        screen: MyIndex
    },
    recommend: {
        screen: recommend
    },
    tryOut: {
        screen: tryOut
    },
    AllDetails: {
        screen: AllDetails
    },
    Register: {
        screen: Register,
        navigationOptions: ({ }) => ({
            headerTitle: '完成注册',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    PassLogin: {
        screen: PassLogin,
        navigationOptions: ({ }) => ({
            headerTitle: '密码登陆',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    ForgetPass: {
        screen: ForgetPass,
        navigationOptions: ({ }) => ({
            headerTitle: '忘记密码',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    BindPhone: {
        screen: BindPhone,
        navigationOptions: () => ({
            headerTitle: '绑定手机',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    GoodsDetail: {
        screen: GoodsDetail,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    SearchTryout: {
        screen: SearchTryout,
        navigationOptions: ({ }) => ({
            headerTitle: '申请试用',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    Information: {
        screen: Information,
        navigationOptions: ({ }) => ({
            headerTitle: '个人信息',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    Commission: {
        screen: Commission,
        navigationOptions: ({ }) => ({
            headerTitle: '佣金领奖',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    AddChance: {
        screen: AddChance,
        navigationOptions: ({ }) => ({
            headerTitle: '增加中奖率',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    TryoutReceive: {
        screen: TryoutReceive,
        navigationOptions: ({ }) => ({
            headerTitle: '试用领奖',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    BindTaobao: {
        screen: BindTaobao,
        navigationOptions: ({ }) => ({
            headerTitle: '绑定淘宝',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    Evaluate: {
        screen: Evaluate,
        navigationOptions: ({ }) => ({
            headerTitle: '提交评价内容',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    FinishEvaluate: {
        screen: FinishEvaluate,
        navigationOptions: ({ }) => ({
            headerTitle: '完成评价',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    MyInfo: {
        screen: MyInfo,
        navigationOptions: ({ }) => ({
            headerTitle: '我的信息',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    RefundsInfo: {
        screen: RefundsInfo,
        navigationOptions: ({ }) => ({
            headerTitle: '返款信息',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    MyTask: {
        screen: MyTask,
        navigationOptions: ({ }) => ({
            headerTitle: '我的任务',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },

    Invitation: {
        screen: Invitation,
        navigationOptions: ({})=>({
            headerTitle: '我的邀请',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    BringMoney: {
        screen: bringMoney,
        navigationOptions: ({})=>({
            headerTitle: '提现',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    Wallet: {
        screen: wallet,
        navigationOptions: ({ }) => ({
            headerTitle: '我的钱包',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    Search: {
        screen: search,
    },
    All: {
        screen: all,
        navigationOptions: () => ({
            headerTitle: '全部分类',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    ScrollDetails: {
        screen: scrollDetails,
        navigationOptions: (navigation)=>({
            headerRight: (
                <View style={{flexDirection:'row', paddingRight: 20}}>
                    <TouchableOpacity style={{marginRight: 20}} onPress={()=>{navigation.navigation.navigate('Search')}}>
                        <Image style={{width: 25,height: 25}} source={require('../image/16.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'space-around'}} onPress={()=>{console.log(navigation.navigation);navigation.navigation.navigate('All')}}>
                        <View style={{width: 15,height: 2,backgroundColor: 'black'}}></View>
                        <View style={{width: 18,height: 2,backgroundColor: 'black'}}></View>
                        <View style={{width: 15,height: 2,backgroundColor: 'black'}}></View>
                    </TouchableOpacity>
                </View>
            ),
            
        })
    },
    BankList: {
        screen: BankList,
        navigationOptions: ({ }) => ({
            headerTitle: '选择开户行',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    CashOutAccount: {
        screen: CashOutAccount,
        navigationOptions: ({ }) => ({
            headerTitle: '提现账号',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    CashOutPass: {
        screen: CashOutPass,
        navigationOptions: ({ }) => ({
            headerTitle: '提现密码',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    PhoneSet: {
        screen: PhoneSet,
        navigationOptions: ({ }) => ({
            headerTitle: '提现账号',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    LoginPassSet: {
        screen: LoginPassSet,
        navigationOptions: ({ }) => ({
            headerTitle: '登陆密码',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    TaoBao: {
        screen: TaoBao,
        navigationOptions: ({ }) => ({
            headerTitle: '淘宝号',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    Login: {
        screen: Login,
        navigationOptions: ({ }) => ({
            headerTitle: '登陆/注册',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    HelpInfo: {
        screen: HelpInfo,
        navigationOptions: ({ }) => ({
            headerTitle: '帮助',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    CustomerService: {
        screen: CustomerService,
        navigationOptions: ({ }) => ({
            headerTitle: '联系客服',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    TaoBaoOper: {
        screen: TaoBaoOper,
        navigationOptions: ({ }) => ({
            headerTitle: '淘宝操作指引',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (<View />)
        })
    },
    VideoOper: {
        screen: VideoOper,
        navigationOptions: (navigation) => {
            console.log(navigation)
            return (
                {
                    headerTitle: navigation.navigation.state.params.title,
                    headerTitleStyle: {
                        flex: 1,
                        textAlign: 'center',
                    },
                    headerRight: (<View />)
                }
            )
        }
    },
    Bottom: {
        screen: AppBottomNavigator,
        navigationOptions: {
            tabBarVisible: false
        }
    },
}, {
        initialRouteName: 'Bottom',
    })
