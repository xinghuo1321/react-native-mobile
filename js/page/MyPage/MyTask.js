import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,

} from 'react-native';
import Task from './Task';
import Order from '../makeMoneyPage/Order'

import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

type Props = {};
export default class MyTask extends Component<Props> {


    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarActiveTextColor='red'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={{ fontSize: 18 }}
                >
                    <Task tabLabel='全部' status={'all'} param={this.props}></Task>
                    <Task tabLabel='待开奖' status={'1'} param={this.props}></Task>
                    <Task tabLabel='中奖啦' status={'2'} param={this.props}></Task>
                    <Task tabLabel='待评价' status={'3'} param={this.props}></Task>
                    <Task tabLabel='已过期' status={'4'} param={this.props}></Task>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarUnderline: {
        backgroundColor: '#b4282d',
        height: 1,
    }
})