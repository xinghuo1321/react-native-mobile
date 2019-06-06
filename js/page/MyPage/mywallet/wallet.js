import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import MyButton from '../../../commonpents/MyButton'
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import TableList from "../../../commonpents/TableList";
import MyModal from '../../../commonpents/MyModal'
import axios from '../../../../fetch/fetch';
function TitleCom(props) {
    return (
        <View style={props.titleMoney}>
            <View style={{ justifyContent: 'space-between' }}>
                <Text style={{ color: '#888' }}>{props.title}</Text>
                <Text style={{ color: '#fff', fontSize: 20 }}>{props.money}</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <MyButton title='提现'
                    btnStyle={{ width: 60, height: 30, backgroundColor: 'red' }}
                    txtStyle={{ fontSize: 15 }}
                    onPress={()=>{props.onPress()}}></MyButton>
            </View>

        </View>
    )
}

function TitleGlod(props) {
    return (
        <TouchableOpacity style={props.titleMoney} onPress={() => { props.click() }}>
            <View style={{ flexDirection: 'row', height: 20, alignItems: 'flex-end' }}>
                <Text style={{ color: '#888' }}>{props.title}</Text>
                <Text style={{ color: '#888', fontSize: 17, marginLeft: 5 }}>{props.money}</Text>
            </View>
            <Text style={{ color: '#888' }}>点击切换</Text>
        </TouchableOpacity>
    )
}

function list(params) {
     
    if (params.titleOff) {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar />}
                tabBarActiveTextColor='red'
                tabBarUnderlineStyle={styles.tabBarUnderline}
                tabBarTextStyle={{ fontSize: 18 }}>
                <TableList tabLabel='收入' />
                <TableList tabLabel='支出' />
                <TableList tabLabel='待反' />
            </ScrollableTabView>

        )
    } else {
      return (<ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarActiveTextColor='red'
            tabBarUnderlineStyle={styles.tabBarUnderline}
            tabBarTextStyle={{ fontSize: 18 }}>
            <TableList tabLabel='获得' />
            <TableList tabLabel='消耗' />

        </ScrollableTabView>)
    }
}
export default class wallet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleOff: true, //为1代表金额，2则代表金币
            modalOff: false,
            title: '',
            gold: 0,
            money: 0,
            modalTitle:'',
            modalBtn: '',
            userOff: false,
            pswOff: false,
        }
        this.name = ""
    }
    componentDidMount (){
        axios({url:'/my/balance-info'}).then((res) => {
            console.log('jinbi',res.josn)
            this.setState({
                money: res.josn.cashBalance,
                gold: res.josn.coinBalance
            })
        }).catch((err) => {
            
        });
        axios({url:'/my/bank-info/status'}).then((res) => {
            console.log(res)
            if(res.josn.status == 1){
                this.setState({
                    userOff: true
                })
            }
        }).catch((err) => {
            
        });
        axios({url:'/my/account/withdraw/pwd'}).then((res) => {
            console.log('miam',res)
            if(res.josn.status == 0){
                this.setState({
                    pswOff: true
                })
            }
        }).catch((err) => {
            
        });
    }
    setTitleOff = (titleOff) => {
        this.setState({
            titleOff
        })
    }
    close (){
        this.setState({
            modalOff: false
        })
    }
    onOk (name){
        this.setState({
            modalOff: false
        })
        this.props.navigation.navigate(name)
    }
    deposit (){
        
        if(this.state.userOff){
            this.setState({modalOff: true,modalTitle:'您未绑定提现账户',modalBtn: '去绑定'})
            this.name = 'CashOutAccount'
        }else if(this.state.pswOff){
            this.setState({modalOff: true,modalTitle:'您未绑定提现密码',modalBtn: '去绑定'})
            this.name = 'CashOutPass'
        }else{
            this.props.navigation.navigate('BringMoney')
        }
    }
    render() {
        return (
            <View style={styles.box}>
             <MyModal 
                hidden={this.state.modalOff}
                title={this.state.modalTitle}
                btnLeft="知道了"
                onOkText={this.state.modalBtn}
                close={()=>{this.close()}}
                onOk={()=>{this.onOk(this.name)}}
                />
                <View style={styles.boxTitle} >
                    <TitleCom
                        title={this.state.titleOff ? '金额（元）' : '金币（枚）'}
                        money={this.state.titleOff ? this.state.money : this.state.gold}
                        titleMoney={styles.titleMoney}
                        onPress = {()=>{this.deposit()}}
                    />
                    <TitleGlod
                        title={!this.state.titleOff ? '金额' : '金币'}
                        money={!this.state.titleOff ? this.state.money : this.state.gold}
                        titleMoney={styles.titleGold}
                        click={() => { this.setTitleOff(!this.state.titleOff) }} />
                </View>
                {list(this.state)}
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 130,
        padding: 30,

    },
    titleMoney: {
        height: 80,
        flexDirection: 'row',
        flex: 4,
        padding: 15,
        justifyContent: 'space-between',
        marginRight: 10,
        backgroundColor: 'black',
        borderRadius: 10
    },
    titleGold: {
        height: 80,
        padding: 15,
        flex: 3,
        justifyContent: 'space-between',
        backgroundColor: '#f1f0f5'
    },
    tabBarUnderline: {
        backgroundColor: '#b4282d',
        height: 1,
    },
    test: {

    }
})