import React, { Component } from 'react';
import {
    DeviceEventEmitter,
} from "react-native";
import { NavigationActions, StackActions } from 'react-navigation';
import Task from './Task';
import DataStore from '../../expand/dao/DataStore'


export default class MyIndex extends Component<Props> {
    constructor(props) {
        super(props);
        // this.dataStore = new DataStore();
    }

    componentDidMount() {

        this.listener = DeviceEventEmitter.addListener("LoginBack", (param) => {
            DataStore.getDataKey('bottom', (error, result) => {
                if (result) {
                    let resetActiom = StackActions.reset({
                        index: 0,//默认打开actions中的第几个页面
                        actions: [//actions是页面集合
                            // NavigationActions.navigate({ routeName: 'Login' }),
                            NavigationActions.navigate({
                                routeName: 'Bottom',
                                //子页面
                                action: NavigationActions.navigate({
                                    routeName: result
                                })
                            }),
                        ]
                    })
                    this.props.navigation.dispatch(resetActiom)
                    DataStore.removeDataKey('Bottom');
                }
            })
        });

        DataStore.getAuthToken((error, result) => {
            if (!result) {
                this.props.navigation.navigate('Login', { backPage: 'MyIndex' });
            } else {

            }
        })
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    _reLoad() {

    }

    render() {
        return (
            <Task status={'all'} headVisible={true} param={this.props} />
        )
    }
}
