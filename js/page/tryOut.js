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
import axios from '../../fetch/fetch'


function btn(arr,props){
  if(Array.isArray(arr)){
    return arr.map((item,index)=> <ImgButton img={{uri:item.classIcon}} key={index} onPress={()=>{props.navigation.navigate('ScrollDetails',{goodsId: `clazz:${item.id}`,title:item.className})}} title={item.className} />)
  }else{
    return null
  }
 
}

type Props = {};
function Hearder (that){
  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: '500' }}>免费商品</Text>
        <View style={{ paddingTop: 20 }} >
          <ImgInput onPress={() => { that.prop.props.navigation.navigate('Search') }}
            inpStyle={{ flex: 0, width: 0 }} off={true}
            img={require("../../image/18.png")}
            placeholder="商品名称" />
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18 }}>热门分类</Text>
            <Text style={{ color: 'red' }} onPress={()=>{ that.prop.props.navigation.navigate('All')}}>查看全部</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent:'space-between', padding: 10 }}>
            {btn(that.prop.state.classify,that.prop.props)}
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
      classify: [],
      data: []
    }
    this.page = 0;
    this.size = 10;
    this.total = 0;
    this.footerGet = true;
  }
  reLoading = () => {
    this.setState({
      isLoading: true
    })
    axios({ url: '/m/goods-info/list', params: { search: 'gtype:0', page: 0, size: this.size } }).then((res) => {
      console.log(res)
      this.setState({
        data: [...res.josn.content],
        isLoading: false
      })
      this.page = 1;
      this.total = res.josn.totalPages
      if(this.page>this.total){
        this.setState({
          off: true
        })
      }else{
        this.setState({
          off: false
        })
      }
    }).catch((err) => {
      alert('发生了一个预期之外的错误')
    });

  }

  componentDidMount (){
    axios({url:'/m/categories'}).then((res) => {
      console.log(res)
      if(res.status === 200){
        const newArr = res.josn.splice(0,4)
        
        this.setState({
          classify: newArr
        })
      }
    }).catch((err) => {
      
    });
    axios({ url: '/m/goods-info/list', params: { search: 'gtype:0', page: this.page, size: this.size } }).then((res) => {
      console.log(res)
      this.setState({
        data: [...res.josn.content]
      })
      this.page++;
      this.total = res.josn.totalPages
      if(this.total === 0){
        this.setState({
          off: true
        })
      }
    }).catch((err) => {
      alert('发生了一个预期之外的错误')
    });
  }
  headerView = () =>{
    return <Hearder prop={this}/>
  }
  footerReLoading = () => {
    if(this.footerGet){
      if (!this.state.off) {
        this.footerGet = false;
        axios({ url: '/m/goods-info/list', params: { search: 'gtype:0', page: this.page, size: this.size } }).then((res) => {
          console.log(res)
          let arr = [...this.state.data,...res.josn.content]
          this.setState({
            data:arr
          })
          this.page++;
          this.total = res.josn.totalPages
          if(this.page>this.total){
            this.setState({
              off: true
            })
          }
          this.footerGet = true;
        }).catch((err) => {
          console.log(err)
          alert('发生了一个预期之外的错误')
        });
      }
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
