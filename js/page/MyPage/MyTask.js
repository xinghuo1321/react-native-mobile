import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

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
                    <Text tabLabel='全部'>111</Text>
                    <Text tabLabel='待开奖'>222</Text>
                    <Text tabLabel='中奖啦'>22</Text>
                    <Text tabLabel='待评价'>22</Text>
                    <Text tabLabel='已过期'>333</Text>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
    },
    tabBarUnderline: {
        backgroundColor: '#b4282d',
        height: 1,
      }
})