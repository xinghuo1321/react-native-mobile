import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

export default class PassInput extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            Msg: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 36, justifyContent: 'center' }}>
                    <TextInput
                        style={styles.textInputMsg}
                        ref={(ref) => this.textInput = ref}
                        maxLength={6}
                        autoFocus={true}
                        keyboardType="number-pad"
                        defaultValue={this.state.Msg}
                        onChangeText={
                            (text) => {
                                this.setState({
                                    Msg: text
                                });
                                if (text.length === 6) {
                                    this.onEnd(text);
                                }
                            }
                        } />
                    {
                        this._getInputItem()
                    }
                </View>
            </View>
        );
    }

    onEnd = (text) => {
        //alert(this.state.Msg)
    };

    _getInputItem = () => {
        let inputItem = [];
        let { Msg } = this.state;
        //理论上TextInput的长度是多少，这个i就小于它
        for (let i = 0; i < 6; i++) {
            inputItem.push(
                //i是从0开始的所以到最后一个框i的值是5
                //前面的框的右边框设置为0，最后一个边框再将右边框加上
                <View key={i} style={i === 5 ? [styles.textInputView, { borderRightWidth: 1 }] : [styles.textInputView, { borderRightWidth: 0 }]}>
                    {i < Msg.length
                        ? <View style={{
                            width: 16,
                            height: 16,
                            backgroundColor: '#222',
                            borderRadius: 8
                        }} />
                        : null}
                </View>)
        }
        return inputItem;
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputView: {
        height: 85 / 2,
        width: 85 / 2,
        borderWidth: 1,
        borderColor: '#c9c7c7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputMsg: {
        zIndex: 99,
        position: 'absolute',
    }
});