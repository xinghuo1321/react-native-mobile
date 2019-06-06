import React, { Component } from 'react';
import FasterListDeom from '../../commonpents/FasterListDeom'
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from '../../../fetch/fetch'

type Props = {};
export default class AllDetails extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      off: false,
      off2: false,
      data: []
    }
    this.goodsId = "";
    this.page = 0;
    this.page2 = 0;
    this.size = 10;
    this.total = 0;
    this.total2 = 0;
  }

  static navigationOptions = (navigation, screenProps) =>({
    
    // headerTitle instead of title
    headerTitle: <Text>全部商品</Text>
  })
  reLoading = () => {
    this.setState({
      isLoading: true
    })
    axios({ url: '/m/goods-info/list', params: { search: 'gtype:1', page: 0, size: this.size } }).then((res) => {
      console.log(res)
      this.setState({
        data: [...res.josn.content],
        isLoading: false
      },
      ()=>{console.log(this.state.arr)})
      this.page = 1;
      this.total = res.josn.totalPages
      if(this.page>this.total){
        this.setState({
          off: true,
          off2: false
        })
      }else{
        this.setState({
          off: false,
          off2: false
        })
      }
    }).catch((err) => {
      alert('发生了一个预期之外的错误')
    });

  }

  headerView = () => {
    return <Hearder prop={this.props} />
  }
  footerReLoading = () => {
    if (!this.state.off) {
      axios({ url: '/m/goods-info/list', params: { search: 'gtype:1', page: this.page, size: this.size } }).then((res) => {
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
      }).catch((err) => {
        console.log(err)
        alert('发生了一个预期之外的错误')
      });
    }else if(!this.state.off2){
        axios({ url: '/m/goods-info/list', params: { search: 'gtype:0', page: this.page2, size: this.size } }).then((res) => {
            console.log(res)
            let arr = [...this.state.data,...res.josn.content]
            this.setState({
              data:arr
            })
            this.page2++;
            this.total2 = res.josn.totalPages
            if(this.page2>this.total2){
              this.setState({
                off2: true
              })
            }
          }).catch((err) => {
            console.log(err)
            alert('发生了一个预期之外的错误')
          });
    }

  }
  componentDidMount() {
    this.goodsId = this.props.navigation.getParam('goodsId')
    axios({ url: '/m/goods-info/list', params: { search: 'gtype:1', page: this.page, size: this.size } }).then((res) => {
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
  render() {
    return (
      <FasterListDeom
        array={this.state.data}
        isLoading={this.state.isLoading}
        reLoading={this.reLoading}
        onEndReached={this.footerReLoading}
        footerOff={this.state.off&&this.state.off2}></FasterListDeom>
    )
  }
}