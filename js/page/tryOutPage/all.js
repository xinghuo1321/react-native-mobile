import React, { Component } from 'react';
import ImgButton from '../../commonpents/ImgButton'
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';

type Props = {};
export default class all extends Component<Props> {
    render() {
        return (
            <ScrollView style={{ height: window.height, backgroundColor: '#f2f2f2' }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'flex-start', padding: 30 }}>
                    <ImgButton img={require('../../../image/27.png')} title="测试测试" />
                    <ImgButton img={require('../../../image/28.png')} title="测试测试" />
                    <ImgButton img={require('../../../image/29.png')} title="测试测试" />
                    <ImgButton img={require('../../../image/30.png')} title="测试测试" />
                    <ImgButton img={require('../../../image/27.png')} title="测试测试" />
                    <ImgButton img={require('../../../image/28.png')} title="测试测试" />
                    <ImgButton img={require('../../../image/29.png')} title="测试测试" />
                    <ImgButton img={require('../../../image/30.png')} title="测试测试" />
                </View>
            </ScrollView>
        )
    }
}

const win = Dimensions.get('window');