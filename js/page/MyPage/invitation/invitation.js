import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Modal, Image, Clipboard, Dimensions } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import TableList from "../../../commonpents/TableList";
export default class Invitation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false,
            copyText: 'zheshitext',
            copyLink: 'zheshilink',
            copySus: false
        }
    }
    copyText (text){
        Clipboard.setString(text);
        this.closeModal(false)
        this.setState({
            copySus: true
        })
        setTimeout(()=>{this.closeSus()},1500)
    }
    closeModal(hidden) {
        this.setState({ hidden })
    }
    closeSus(){
        this.setState({copySus: false})
    }
    render() {
        return (
            <View style={styles.box}>
                <View style={styles.titleBox}>
                    <View style={styles.titleTop}>
                        <View style={styles.titleLf}>
                            <Text style={{ color: '#868686', fontSize: 13 }}>我的等级</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>超级团长</Text>
                        </View>
                        <View style={styles.titleRg}>
                            <TouchableOpacity onPress={() => { this.setState({ hidden: true }) }}>
                                <Image source={require('../../../../image/6.png')} style={{ width: 25, height: 25 }} />
                                <Text style={{ color: '#fabe01' }}>邀请</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../../image/5.png')} style={{ width: 25, height: 25 }} />
                                <Text style={{ color: '#fabe01' }}>规则</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.titleBottom}>
                        <View style={styles.titleLf}>
                            <Text style={{ color: '#868686', fontSize: 13 }}>已邀请(人)</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>4000</Text>
                        </View>
                        <View style={[styles.titleLf, { flex: 2 }]}>
                            <Text style={{ color: '#868686', fontSize: 13 }}>已收益(元)</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>4000</Text>
                        </View>
                    </View>
                </View>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarActiveTextColor='red'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={{ fontSize: 18 }}>
                    <TableList tabLabel='收益' />
                    <TableList tabLabel='名单' />

                </ScrollableTabView>
                <Modal
                    visible={this.state.hidden}
                    transparent={true}
                    onRequestClose={() => {
                        this.closeModal(false)
                    }}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.modalBox} onPress={() => { this.closeModal(false) }}>

                    </TouchableOpacity>
                    <View style={styles.popurBox}>
                        <View style={{flexDirection: 'row',flex: 2}}>
                            <TouchableOpacity style={styles.copy} onPress={() => { this.setState({ hidden: true }) }} onPress={()=>{this.copyText(this.state.copyText)}}>
                                <Image source={require('../../../../image/5.png')} style={{ width: 25, height: 25,marginBottom: 10 }} />
                                <Text style={{ fontSize: 12}}>复制邀请码</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.copy} onPress={() => { this.setState({ hidden: true }) }} onPress={()=>{this.copyText(this.state.copyLink)}}>
                                <Image source={require('../../../../image/6.png')} style={{ width: 25, height: 25 ,marginBottom: 10}}/>
                                <Text style={{fontSize: 12 }}>复制邀请链接</Text>
                            </TouchableOpacity>
                            <View style={{flex: 2}}></View>
                        </View>
                        <TouchableOpacity activeOpacity={1} style={{flex: 1,justifyContent: 'center',alignItems: 'center',borderTopColor: '#fff',borderTopWidth: 1}}
                        onPress={()=>{this.closeModal(false)}}>
                            <Text style={{fontSize: 18}}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                visible={this.state.copySus}
                onRequestClose={() => {
                    this.closeSus(false)
                }}
                transparent={true}>
                <TouchableOpacity activeOpacity={1} 
                 onPress={()=>{this.closeSus()}}
                 style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <Text style={{color: '#fff',fontSize: 15}}>复制成功 </Text>
                </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const win = Dimensions.get('window')
const styles = StyleSheet.create({
    box: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2'
    },
    titleBox: {
        justifyContent: 'space-between',
        height: 180,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 25,
        backgroundColor: '#000',
        borderRadius: 10,

    },
    titleTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleLf: {
        flex: 5,
        justifyContent: 'space-between'
    },
    titleRg: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleBottom: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'row',

        justifyContent: 'space-between',
    },
    tabBarUnderline: {
        backgroundColor: '#b4282d',
        height: 1,
    },
    modalBox: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    popurBox: {
        width: win.width,
        height: 130,
        backgroundColor: 'rgba(230,230,230,0.9)'
    },
    copy: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})