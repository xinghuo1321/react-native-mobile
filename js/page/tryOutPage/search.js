import React, {Component} from 'react';
import ImgInput from '../../commonpents/ImgInput'
import MyButton from '../../commonpents/MyButton'
import {Platform, StyleSheet, Text, View} from 'react-native';


type Props = {};

function Entry (props){
    return  <MyButton btnStyle={{backgroundColor: '#fff',paddingLeft: 20,paddingRight: 20,paddingTop: 10,paddingBottom: 10,marginRight:12,marginTop: 10}}
    txtStyle={{color: "black",fontSize: 14}}
    title={props.title}></MyButton>
}
export default class search extends Component<Props> {
    constructor (props){
        super(props)
        this.txt = ""
    }

    static navigationOptions = (navigation,screenProps)=>({
        
        // headerTitle instead of title
        headerTitle: (<ImgInput img={require('../../../image/18.png')} placeholder="请输入关键词" inpBox={{backgroundColor: '#f1f0f5'}}
        inpStyle={{backgroundColor:'#f1f0f5'}} onChange={(text)=>{navigation.navigation.setParams({text})}}/>),
        headerRight: (
            <MyButton title="搜索" 
            btnStyle={{width:60,height: 30,marginRight: 5,backgroundColor: 'red'}} 
            onPress={()=>{console.log(navigation.navigation.state.params.text); }}
            txtStyle={{fontSize: 15,fontWeight: "500"}}/>
        )
      })
      componentDidMount (){
        this.props.navigation.setParams({text: this.txt})
      }
    render (){
        return (
            <View style={styles.box}>
                <Text>搜索历史</Text>
                <View style={styles.search}>
                    <Entry title="测试测试"/>
                    <Entry title="测试测试"/>
                    <Entry title="测试测试"/>
                    <Entry title="测试测试"/>
                </View>
            </View>
        )
    }
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