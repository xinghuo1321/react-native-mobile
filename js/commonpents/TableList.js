
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import FasterListDeom from './FasterListDeom'
import propTypes from 'prop-types'

export default class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            off: false,
            data: [{time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
            {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
            {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
            {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
            {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
            {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},]
        }
        this.addArr;
        this.refresh;
    }
    static propTypes = {
        params: propTypes.any
    }

    reLoading = () => {
        console.log(1)
        this.setState({
            isLoading: true
        })
        let arr = []
        this.refresh = setTimeout(() => {
            arr = [
                {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
                {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
                {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
                {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
                {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
                {time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'},
            ]
            this.setState({
                data: [...arr],
                isLoading: false
            })
        }, 2000);

    }

    footerReLoading = () => {
        console.log(1)
        if (!this.state.off) {
            let arr = [];
            this.addArr =  setTimeout(() => {
                arr.push({time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'})
                arr.push({time: '2019/5/28',stutas: '返款试用任务，商品标题四个字',money: '+666'})
                this.setState({
                    data: [...this.state.data, ...arr],
                    off: true
                })
            }, 2000)
        }

    }


    _renderItem(data) {
        return (
            <View style={styles.itemBox}>
                <View style={styles.time}>
                    <Text>{data.item.time}</Text>
                    <Text>{data.item.stutas}</Text>
                </View>
                <View style={styles.money}>
                    <Text style={{fontSize: 20,marginRight:10}}>{data.item.money}</Text>
                    <Text>元</Text>
                </View>
            </View>
        )
    }
    componentWillUnmount (){
        clearTimeout(this.addArr);
        clearTimeout(this.refresh);
        this.setState = (state, callback) => {
            return
          }        
    }
    render() {
        return (
            <FasterListDeom array={this.state.data}
                isLoading={this.state.isLoading}
                reLoading={this.reLoading}
                onEndReached={this.footerReLoading}
                renderItem={(data) => this._renderItem(data)}
                footerOff={this.state.off}
                numColumns={1} />
        )
    }
}
const styles = StyleSheet.create({
    itemBox: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        height: 80,
        backgroundColor: '#fff',
        marginBottom: 5,
        padding: 15,
    },
    time: {
        flex: 1,
        justifyContent: 'space-between',
    },
    money: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        alignSelf: 'center'
    },
    test: {
            
    }
})