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

export default class TaoBao extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.termView}>
                    <Text style={styles.txtAll}>已绑定您的cs******30账号</Text>
                </View>
                <View style={styles.termView}>
                    <Text style={styles.txtAll}>如需换绑</Text>
                    <Text style={styles.txtAll}>请添加客服微信</Text>
                    <Text style={styles.txtAll}>联系客服</Text>
                </View>
                <View style={styles.termView}>
                    <Image
                        style={styles.img}
                        source={require('../../../image/3.jpg')}
                    />
                </View>
                <View style={styles.termView}>
                    <Text style={styles.txtAll}>客服微信号:shihuowang005</Text>
                    <Text style={styles.txtAll}>长按二维码可保存或识别</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    termView: {
        marginTop: 20,
        alignItems: 'center'
    },
    txtAll: {
        fontSize: 18
    },
    img: {
        width: 140,
        height: 140
    }
})