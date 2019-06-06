import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import MyButton from '../../../commonpents/MyButton';
import PasswordInput from '../../../commonpents/passwordInput';

export default class bringMoney extends Component {
    constructor(props) {
        super(props)
        this.state = {
            money: '',
            gold: '',
            password: '',
            total: 0
        }
    }

    computed = (money, gold) => {
        let total = 0;
        money = money ? money * 1 : 0
        gold = gold ? gold * 1 : 0
        total = money + gold / 100
        this.setState({
            total
        })
    }
    render() {
        return (
            <View style={styles.box}>
                <View>
                    <Text style={{ fontSize: 18 }}>提现金额</Text>
                    <TextInput keyboardType={'numeric'}
                        value={this.state.money}
                        style={styles.inp}
                        placeholder="请输入金额"
                        onChangeText={(text) => {
                            console.log(text)
                            const newText = text.replace(/[^\d]+/, '');
                            console.log(newText)
                            this.setState({ money: newText })
                            this.computed(newText, this.state.gold)
                        }} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18 }}>提现金币(100金币=1元)</Text>
                    <TextInput keyboardType={'numeric'}
                        value={this.state.gold}
                        style={styles.inp}
                        placeholder="请输入金币数"
                        onChangeText={(text) => {
                            console.log(text)
                            const newText = text.replace(/[^\d]+/, '');
                            console.log(newText)
                            this.setState({ gold: newText })
                            this.computed(this.state.money, newText)
                        }} />
                </View>
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18 }}>提现密码</Text>
                    <View style={{marginTop:20}}>
                        <PasswordInput
                            maxLength={6}
                            onChange={(text) => {
                                console.log(text)
                                const newText = text.replace(/[^\d]+/, '');
                                console.log(newText)
                                this.setState({ password: newText })
                            }} />
                    </View>

                </View>
                <Text>可到账{this.state.total}元</Text>
                <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                    <MyButton title='提现'
                        btnStyle={{ width: 80, height: 40, backgroundColor: 'red' }}
                        onPress={() => { alert('fuck') }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        padding: 30,
        backgroundColor: '#f2f2f2'
    },
    inp: {
        height: 40,
        marginTop: 5,
        padding: 0,
        borderColor: '#efefef',
        borderWidth: 1
    }
})