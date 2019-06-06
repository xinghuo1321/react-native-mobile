import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { InputCom } from './commponpents'
import MyButton from '../../commonpents/MyButton';
import UpdataImg from '../../commonpents/UpdataImg';

export default class Evaluate extends Component<Props> {
    constructor(Props) {
        super(Props);
        this.state = {
            isShow: false,
            dataBase: '',
            avatarSource: '',
        }
    }
    toSubmit = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    getDataBase (avatarSource,dataBase){
        this.setState({
            avatarSource,
            dataBase
        });
    }

    render() {
        return (
            <ScrollView style={styles.contain}>
                <View style={styles.containView}>
                    <Text>·请确认物流已签收,在此处提交评价内容,待审核成功后再去购物平台评价。</Text>
                    <Text>·不可提前在购物平台确认收货评价,否则将导致评价审核不通过,无法返款。</Text>

                    <Text style={styles.titleTxt}>请输入评价文本</Text>
                    <Text>评价文本需不少于14个字</Text>
                    <InputCom
                        placehold={'在此处输入评价文本'}
                        multiline={true}
                    />
                    <TextShow
                        isShow={this.state.isShow}
                    />

                    <Text style={styles.titleTxt}>请拍照上传</Text>
                    <Text>就收到的免费商品拍照3张上传</Text>
                    <View style={styles.imgView}>
                        <UpdataImg 
                            avatarSource={this.state.avatarSource} 
                            dataBase={this.state.dataBase} 
                            onPress={(avatarSource,dataBase)=>{this.getDataBase(avatarSource,dataBase)}}
                        />
                        <UpdataImg 
                            avatarSource={this.state.avatarSource} 
                            dataBase={this.state.dataBase} 
                            onPress={(avatarSource,dataBase)=>{this.getDataBase(avatarSource,dataBase)}}
                        />
                        <UpdataImg 
                            avatarSource={this.state.avatarSource} 
                            dataBase={this.state.dataBase} 
                            onPress={(avatarSource,dataBase)=>{this.getDataBase(avatarSource,dataBase)}}
                        />
                    </View>
                    <View style={styles.btnView}>
                        <MyButton
                            onPress={this.toSubmit}
                            btnStyle={styles.btnStyle}
                            title={'提交'}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

class TextShow extends Component<Props> {
    render() {
        if (this.props.isShow) {
            return (
                <Text style={{ color: 'red' }}>评价文本需不少于14个字</Text>
            )
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    contain: {
        backgroundColor: '#f3f3f3'
    },
    containView: {
        flex: 1,
        padding: 20,
    },
    //标题txt
    titleTxt: {
        marginTop: 20,
        color: 'black',
        fontSize: 24,
    },
    //按钮view
    btnView: {
        marginTop: 20,
        alignItems: 'center'
    },
    //按钮
    btnStyle: {
        backgroundColor: 'red',
        height: 40,
        width: 140
    },
    //图片view
    imgView: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20
    }
})