import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import React from 'react'
import makeMoney from '../js/page/makeMoney'
import mine from '../js/page/mine'
import recommend from '../js/page/recommend'
import tryOut from '../js/page/tryOut'
import { Button, Image } from "react-native"

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
            }
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
            }
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
            }
        }
    },
    mine: {
        screen: mine,
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
    
},{
    tabBarOptions: {
        tabStyle: { minWidth: 50 },
        upperCaseLabel: false, //标签是否大写
        scrollEnabled: true,//是否可以滚动
        activeTintColor: 'red' ,
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
    mine: {
        screen: mine
    },
    recommend: {
        screen: recommend
    },
    tryOut: {
        screen: tryOut
    },
    Bottom: {
        screen: AppBottomNavigator,
        navigationOptions: {
            tabBarVisible: false
        }
    },
},{
    initialRouteName: 'Bottom',
})