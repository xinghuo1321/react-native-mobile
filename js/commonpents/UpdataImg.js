import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import propTypes from 'prop-types'
import ImagePicker from "react-native-image-picker";

const options = {
    title: '请选择',
    quality: 0.8,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class MyButton extends Component {
    constructor(props) {
        super(props)
        
    }
    static propTypes = {
        avatarSource: propTypes.any,//图片
        dataBase: propTypes.any,//database64,
        onPress: propTypes.func //处理函数,会返回两个值（avatarSource，dataBase）
    }
    //点击调取相机
    cameraAction = () => {

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                let dataBase = { uri: 'data:image/jpeg;base64,' + response.data };

                
                this.props.onPress(source,dataBase)
            }
        });
    }
    //avatarSource有值，则代表true
    ImageOff = (state)=>{
        if(state.avatarSource){
            return (<Image source={state.avatarSource} style={{ width: '100%', height: '100%' }}></Image>)
        }else{
            return (
                <View style={{flex: 1}}>
                    <View style={styles.txtBox}>
                        <Text style={styles.txt}>+</Text>
                    </View>
                    <View style={styles.uploadBox}>
                        <Text styles={styles.upload}>上传</Text>
                    </View>
                </View>
                    
            )
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.cameraAction} style={styles.box}>
                    {this.ImageOff(this.props)}
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        position: 'relative',
        width: 100,
        height: 100,
        padding: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 2,//虚线部分
        borderStyle: 'dotted',
        backgroundColor: '#edeced'
    },
    txtBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -30,
        marginLeft: -12
    },
    txt: {
        color: '#b9b9b9',
        fontSize: 40,
        fontWeight: '300'
    },
    uploadBox: {
        position: 'absolute',
        left: '50%',
        marginLeft: -12,
        bottom: 8
    },
    upload: {
        
        
    }

})