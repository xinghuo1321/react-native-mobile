/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import Order from './makeMoneyPage/Order'

type Props = {};
export default class makeMoney extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          赚佣金
        </Text>
        <ScrollableTabView initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
          tabBarActiveTextColor='red'
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarTextStyle={{ fontSize: 18 }}
        >
          <Order tabLabel='下单' param={this.props}></Order>
          <Text tabLabel='调研'></Text>
          <Text tabLabel='试玩'></Text>
        </ScrollableTabView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyle: {
    fontSize: 28,
    margin: 20,
    color: 'black'
  },
  tabBarUnderline: {
    backgroundColor: '#b4282d',
    height: 1,
  }
});
