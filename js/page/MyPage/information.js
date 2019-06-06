import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View, TextInput, Modal, TouchableHighlight } from 'react-native';
import Picker from 'react-native-picker';
import axios from '../../../fetch/fetch';
import DataStore from '../../expand/dao/DataStore';
import MyButton from '../../commonpents/MyButton';


function Radius(props) {
    if (props.sex) {
        return <View style={styles.radius}></View>
    } else {
        return null
    }
}

export default class Information extends Component {
    constructor(props) {
        super(props)
        this.state = {
            globalOff: false,
            name: '',
            age: '',
            job: '',
            areaArr: '',
            jobArr: [],
            areaArr: [],
            sex: true,
            ModalOff: false
        }
        this.job = false;
        this.area = false;
        this.ageArr = getTime()
        this.obj = {
            job: '',
            age: '',
            area: ''
        }

    }
    componentDidMount() {
        getUid().then((res) => {
            if(res){
                axios({url: `/my/userInfo/${res}`}).then((result) => {
                    console.log(result)
                    if(result.status===200&&result.josn.realName){
                        let area;
                        let arr = result.josn.address.split(' ')
                        console.log('area',arr)
                        if(arr.length<3){
                            area = [arr[0],...arr]
                        }else{
                            area = arr
                        }
                        this.obj = {
                            job: result.josn.job,
                            age: result.josn.birthday,
                            area: result.josn.address
                        }
                        this.setState({
                            globalOff: false,
                            name: result.josn.realName,
                            sex: result.josn.sex==="男"?true: false,
                            age: result.josn.birthday.split('-'),
                            area,
                            job: [result.josn.job]
                        })
                    }else{
                        this.setState({
                            globalOff: true
                        })
                    }
                }).catch((err) => {
                    
                });
            }else{
                this.props.navigation.navigate('Login')
            }
           
        }).catch((err) => {
            this.props.navigation.navigate('Login')
        });
        axios({ url: '/my/job-info' }).then((res) => {
            //console.log(eval(res.josn.data))
            let arr = JSON.parse(eval(res.josn.data))
            let newArr = arr.map(item => item.value)

            this.setState({
                jobArr: newArr
            }, () => { this.job = true })
        }).catch((err) => {

        });
        axios({ url: '/my/address-info' }).then((res) => {
            let arr, newArr;
            if (res.status === 200) {
                arr = JSON.parse(res.josn.data)
                newArr = arr.result.map((item) => {
                    let obj = {}
                    let objChildren = [];
                    let off = true
                    if (item.childArea.length) {
                        objChildren = item.childArea.map(itemF => {
                            let children = {}
                            let objL = []
                            if (itemF.childArea.length) {
                                objL = itemF.childArea.map(itemL => {
                                    return itemL.areaName
                                })
                                children[itemF.areaName] = objL
                                return children
                            } else {
                                off = false
                                return itemF.areaName
                            }
                        })
                        if (!off) {
                            let offArr = {}
                            offArr[item.areaName] = objChildren;
                            objChildren = [offArr]
                        }
                        obj[item.areaName] = objChildren;
                        return obj
                    }
                })

                this.setState({
                    areaArr: [...newArr]
                }, () => { this.area = true })
            } else {
                alert('请求错误')
            }
        }).catch((err) => {

        });
    }
    show(off) {
        this.setState({
            ModalOff: true
        })
        Picker.init({
            pickerTitleText: off ? '请选择职业' : '请选择地区',
            pickerData: off ? this.state.jobArr : this.state.areaArr,
            selectedValue: off?this.state.job:this.state.area,
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            onPickerCancel: data => {
                console.log(data);
                this.setModakOff(false)
            },
            onPickerConfirm: data => {
                console.log(data)
                let newArr = [...new Set(data)]
                if (off) {
                    this.obj.job = newArr.join(' ')
                    this.setState({ job: newArr })
                } else {
                    this.obj.area = newArr.join(' ')
                    this.setState({
                        area: newArr
                    })
                }
                console.log(newArr.join(' '))
                this.setModakOff(false)
            },
        });
        Picker.show()
    }
    ageShow(off) {
        this.setState({
            ModalOff: true
        })
        Picker.init({
            pickerTitleText: '请选择出生日期',
            pickerData: this.ageArr,
            selectedValue: this.state.age,
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            onPickerCancel: data => {
                console.log(data);
                this.setModakOff(false)
            },
            onPickerConfirm: data => {
                this.setState({ age: data.join('-') })
                this.setModakOff(false)

            },
        });
        Picker.show()
    }
    submit=()=>{
        let realName,sex,birthday,address,job;
        realName = this.state.name;
        sex = this.state.sex?'男':'女';
        birthday = this.obj.age;
        address = this.obj.area;
        job = this.obj.job;
        getUid().then((result) => {
            axios({url:`/my/userInfo/${result}`,method:'post',headers:{'Content-Type':'application/json'},data:{realName,sex,birthday,address,job}}).then((res) => {
                console.log(res)
                if(res.status===200){
                    if(res.josn.meta.success){
                        alert('提交成功')
                    }else{
                        alert('提交失败')
                    }
                }else{
                    alert('提交失败')
                }
            }).catch((err) => {
                
            });
        }).catch((err) => {
            
        });
       
    }

    setModakOff = (ModalOff) => {
        this.setState({
            ModalOff
        },()=>{Picker.hide()})
    }
    componentWillUnmount() {
        Picker.hide()
    }
    render() {
        return (
            <View style={styles.box}>
                <Modal visible={this.state.ModalOff}
                    transparent={true}
                    onRequestClose={() => {
                        this.setModakOff(!this.state.ModalOff)
                    }}>
                    <TouchableHighlight style={{ width: win.width, height: win.height, backgroundColor: 'rgba(0,0,0,.5)' }} onPress={() => { this.setModakOff(!this.state.ModalOff) }}>
                        <Text></Text>
                    </TouchableHighlight>
                </Modal>
                <View>
                    <Text style={{ fontSize: 18 }}>昵称</Text>
                    <TextInput
                        value={this.state.name}
                        style={styles.inp}
                        placeholder="请输入昵称"
                        onChangeText={(text) => {
                            console.log(text)
                            this.setState({ name: text })
                        }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 18 }}>性别</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.radiusBox} onPress={() => {if(this.state.globalOff) {this.setState({ sex: true })}else{alert('不允许更换性别')}}}>
                            <View style={styles.selectBox} >
                                <Radius sex={this.state.sex} />
                            </View>
                            <Text style={{ marginLeft: 5 }}>男</Text>
                        </TouchableOpacity>
                        <View >
                            <TouchableOpacity style={styles.radiusBox} onPress={() => {if(this.state.globalOff) {this.setState({ sex: false })}else{alert('不允许更换性别')}}}>
                                <View style={styles.selectBox} >
                                    <Radius sex={!this.state.sex} />
                                </View>
                                <Text style={{ marginLeft: 5 }}>女</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18 }}>年龄</Text>
                    {/* <TextInput
                            value={this.state.age}
                            style={styles.inp}
                            placeholder="请输入年龄"
                            onChangeText={(text) => {
                                const newText = text.replace(/[^\d]+/, '');
                                this.setState({ age: newText })
                            }} /> */}
                    <TouchableOpacity onPress={() => { if(this.state.globalOff){this.ageShow()}else{alert('不允许更换生日')} }} style={styles.jobBox} >
                        <Text style={this.state.area ? {} : { color: '#bfbfc5' }}>{this.state.age ? this.state.age : '请选择出生日期'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18 }}>请选择地区</Text>
                    <TouchableOpacity onPress={() => { if (this.area) this.show() }} style={styles.jobBox}>
                        <Text style={this.state.area ? {} : { color: '#bfbfc5' }}>{this.state.area ? [...new Set(this.state.area)] : '请选择地区'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18 }}>请选择职业</Text>
                    <TouchableOpacity onPress={() => { if (this.job) this.show(true) }} style={styles.jobBox}>
                        <Text style={this.state.job ? {} : { color: '#bfbfc5' }}>{this.state.job ? this.state.job : '请选择职业'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:'center',marginTop:20}}>
                    <MyButton title={this.state.globalOff?'提交':'确认修改'}
                    btnStyle={{width:100,height:40,backgroundColor:'red'}}
                    onPress={()=>{this.submit()}}/>
                </View>
                
            </View>
        )
    }
}

async function getUid(){
    let str 
   str = await DataStore.getToken('authToken')
   str = str.match(/@(\S*)/)[1]
   return str
}

function getTime() {
    let date = [];
    var currDate = new Date()
    var year = 2100  //currDate.getFullYear()
    var month = currDate.getMonth() + 1
    for (let i = 1970; i <= year; i++) {
        let month = [];
        for (let j = 1; j < 13; j++) {
            let day = [];
            if (j === 2) {
                for (let k = 1; k < 29; k++) {
                    let time = k < 10 ? `0${k}` : `${k}`
                    day.push(time);
                }
                if (i % 4 === 0) {
                    day.push(`29`);
                }
            }
            else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                for (let k = 1; k < 32; k++) {
                    let monther = k < 10 ? `0${k}` : `${k}`
                    day.push(monther);
                }
            }
            else {
                for (let k = 1; k < 31; k++) {
                    let monther = k < 10 ? `0${k}` : `${k}`
                    day.push(monther);
                }
            }
            let _month = {};
            let mon = j < 10 ? `0${j}` : `${j}`
            _month[mon] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i] = month;
        date.push(_date);
    }
    return date;
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    box: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f3f3f3'
    },
    inp: {
        height: 40,
        marginTop: 5,
        padding: 0,
        borderColor: '#efefef',
        borderWidth: 1
    },
    selectBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 14,
        height: 14,
        marginLeft: 20,
        borderRadius: 7,
        borderColor: '#000',
        borderWidth: 1
    },
    radiusBox: {
        flexDirection: 'row',
        marginTop: 10
    },
    radius: {
        width: 8,
        height: 8,
        backgroundColor: '#000',
        borderRadius: 4
    },
    jobBox: {
        justifyContent: 'center',
        paddingLeft: 2,
        //alignItems: 'center',
        height: 40,
        borderColor: '#efefef',
        borderWidth: 1
    },
    test: {

    }
})