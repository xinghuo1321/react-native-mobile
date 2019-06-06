import React, { Component } from 'react';
import ImgButton from '../../commonpents/ImgButton'
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from '../../../fetch/fetch'

function btn(arr,props){
    console.log(props)
    if(Array.isArray(arr)){
      return arr.map((item,index)=> <ImgButton img={{uri:item.classIcon}} key={index} onPress={()=>{props.navigation.navigate('ScrollDetails',{goodsId: `clazz:${item.id}`,title:item.className})}} title={item.className} />)
    }else{
      return null
    }
   
  }
  

type Props = {};
export default class all extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            classify: []
        }
    }

    componentDidMount (){
        axios({url:'/m/categories'}).then((res) => {
            console.log(res)
            if(res.status === 200){
              this.setState({
                classify: res.josn
              })
            }
          }).catch((err) => {
            
          });
    }
    render() {
        return (
            <ScrollView style={{ height: window.height, backgroundColor: '#f2f2f2' }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'flex-start', padding: 30 }}>
                    {btn(this.state.classify,this.props)}
                </View>
            </ScrollView>
        )
    }
}

const win = Dimensions.get('window');