/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View ,Dimensions} from 'react-native';
import ImgInput from '../commonpents/ImgInput'
import ImgButton from '../commonpents/ImgButton'
import FasterListDeom from '../commonpents/FasterListDeom'

type Props = {};
function Hearder (props){

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: '500' }}>免费商品</Text>
        <View style={{ paddingTop: 20 }} >
          <ImgInput onPress={() => { props.prop.navigation.navigate('Search') }}
            inpStyle={{ flex: 0, width: 0 }} off={true}
            img={require("../../image/18.png")}
            placeholder="商品名称" />
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18 }}>热门分类</Text>
            <Text style={{ color: 'red' }} onPress={()=>{ props.prop.navigation.navigate('All')}}>查看全部</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent:'space-between', padding: 10 }}>
            <ImgButton img={require('../../image/27.png')}  onPress={()=>{props.prop.navigation.navigate('ScrollDetails')}} title="测试测试" />
            <ImgButton img={require('../../image/28.png')}  title="测试测试" />
            <ImgButton img={require('../../image/29.png')}  title="测试测试" />
            <ImgButton img={require('../../image/30.png')}  title="测试测试" />
          </View>
        </View>
        
      </View>
  )
}


export default class tryOut extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      off: false,
      data: [{img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了你信么不管你信不信反正我是信了',money: 666},
      {img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666},
      {img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了字你信么不管你信不信',money: 666},
      {img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666}]
    }
  }
  reLoading= () =>{
    console.log(1)
    this.setState({
      isLoading: true
    })
    let arr = []
    setTimeout(() => {
      arr = [{img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666},
      {img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666},
      {img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666},
      {img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666}]
      this.setState({
        data: [...arr],
        isLoading: false
      })
    }, 2000);

  }

  headerView = () =>{
    return <Hearder prop={this.props}/>
  }
  footerReLoading = ()=>{
    console.log(1)
    if(!this.state.off){
      let arr = [];
    setTimeout(()=>{
      arr.push({img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666})
      arr.push({img:'https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg',num:6,txt:'这只是简单的一行文字你信么不管你信不信反正我是信了',money: 666})
      this.setState({
          data: [...this.state.data,...arr],
          off: true
        })
      },2000)
    }
    
  }
  render() {
    return (

      <FasterListDeom array={this.state.data}
      isLoading={this.state.isLoading}
      reLoading={this.reLoading}
      headerView={this.headerView}
      onEndReached={this.footerReLoading}
      footerOff={this.state.off} />

      
    );
  }
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: win.width,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10
  }
});
