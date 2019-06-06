import React, { Component } from 'react';
import ImgInput from '../../commonpents/ImgInput'
import MyButton from '../../commonpents/MyButton'
import { Platform, StyleSheet, Text, View } from 'react-native';
import axios from '../../../fetch/fetch'

type Props = {};

function Entry(props) {
    return <MyButton btnStyle={{ backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, marginRight: 12, marginTop: 10 }}
        txtStyle={{ color: "black", fontSize: 14 }}
        title={props.title}
        onPress={()=>{props.navigation.navigate('ScrollDetails',{goodsId:`goodsName:${props.title}`,title:props.title})}}></MyButton>
}
export default class search extends Component<Props> {
    constructor(props) {
        super(props)
        this.txt = ""
        this.state = {
            arr: [],
            record: []
        }
    }

    static navigationOptions = (navigation, screenProps) => ({

        // headerTitle instead of title
        headerTitle: (<ImgInput style={{ flex: 1 }} img={require('../../../image/18.png')} placeholder="请输入关键词" inpBox={{ backgroundColor: '#f1f0f5' }}
            inpStyle={{ backgroundColor: '#f1f0f5' }} onChange={(text) => { navigation.navigation.setParams({ text }) }} />),
        headerRight: (
            <MyButton title="搜索"
                btnStyle={{ width: 60, height: 30, marginRight: 5, backgroundColor: 'red' }}
                onPress={() => { console.log(navigation.navigation.state.params.text);navigation.navigation.navigate('ScrollDetails',{goodsId:`goodsName:${navigation.navigation.state.params.text}`,title:navigation.navigation.state.params.text}) }}
                txtStyle={{ fontSize: 15, fontWeight: "500" }} />
        )
    })
    componentDidMount() {
        this.props.navigation.setParams({ text: this.txt })
        axios({url:'/m/hot-search'}).then((res) => {
            let resopone = JSON.parse(res.josn.data) 
            console.log(Array.isArray(resopone))
           if(Array.isArray(resopone)){
              const arr = resopone.map((item)=>{ return item.word})
              console.log(arr)
                this.setState({
                    arr: [...arr]
                })
           }
        }).catch((err) => {
            
        });
    }
    render() {
        return (
            <View style={styles.box}>
                <Text>搜索历史</Text>
                <View style={styles.search}>
                {list(this.state.record,this.props.navigation)}
                </View>
                <View style={{marginTop: 20}}>
                    <Text>最热搜索</Text>
                    <View style={styles.search}>
                        {list(this.state.arr,this.props.navigation)}
                    </View>
                </View>
            </View>
        )
    }
}
function list (arr,navigation){
   return arr.map((item,index)=><Entry title={item} key={index} navigation={navigation}/>)
}
const styles = StyleSheet.create({
    box: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2'
    },
    search: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10
    },
    a: {
    }
})