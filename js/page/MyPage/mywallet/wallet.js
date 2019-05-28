import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import MyButton from '../../../commonpents/MyButton'


function TitleCom(props) {

    let btn;
    if(props.titleOff===1){
        btn = <MyButton title='提现' onPress={()=>{console.log('xixixi')}}></MyButton>
    }else{
        btn = null
    }
    return (
        <TouchableOpacity style={styles.titleMoney}>
            <View>
                <Text>{props.title}</Text>
                <Text>{props.money}</Text>
            </View>
            {btn}
        </TouchableOpacity>
    )
}

export default class wallet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleOff: 1 //为1代表金额，2则代表金币
        }
    }

    render() {
        return (
            <View style={styles.box}>
                <View style={styles.boxTitle} >
                    <TitleCom title={this.state.titleOff===1?'金额':'金币'} money={this.state.titleOff===1?400:4000} titleOff={1}/>
                    <TitleCom title={!this.state.titleOff===1?'金额':'金币'} money={!this.state.titleOff===1?400:4000} titleOff={2}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#f3f2f3'
    },
    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 130,
        backgroundColor: 'red'
    },
    titleMoney: {
        height: 80,
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-between',
        backgroundColor: 'blue'
    },
    titleGold: {
        height: 80,
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-between',
        backgroundColor: 'black'
    },
    test: {
        
    }
})