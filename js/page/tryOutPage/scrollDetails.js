import React, { Component } from 'react';
import FasterListDeom from '../../commonpents/FasterListDeom'
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';

type Props = {};
export default class scrollDetails extends Component<Props> {
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

     render (){
         return (
            <FasterListDeom
            array={this.state.data}
            isLoading={this.state.isLoading}
            reLoading={this.reLoading}
            onEndReached={this.footerReLoading}
            footerOff={this.state.off}></FasterListDeom>
         )
     }
}