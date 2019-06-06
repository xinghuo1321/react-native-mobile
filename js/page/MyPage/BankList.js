import React, { Component } from "react";
import {
    Dimensions,
    DeviceEventEmitter,
    SectionList,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View, Alert, FlatListProps as getItemLayout
} from "react-native";


import ImgInput from "../../commonpents/ImgInput";
import DataStore from "../../expand/dao/DataStore.js";

const { height, width } = Dimensions.get('window');
// const RecentlyArr = [];  //最近选择，最多有三个元素，后选择的在最前


// let thisCity;
export default class BankList extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            cityData: []
        }
        this.allData = [];
    }

    touchEnd(e, index) {
        this.refs.SectionList.scrollToLocation(
            {
                sectionIndex: index,
                itemIndex: 0,
                viewOffset: 25,

            },
        )
    }

    componentDidMount() {
        DataStore.getAuthToken((error, token) => {
            DataStore.fetchDataGet('/my/bank-info/list', '', { 'authToken': token }).then((result) => {
                this.setState({
                    cityData: result.data
                })
                this.allData = result.data;
            }).catch((err) => {

            });
        })

    }

    matchingBank = (text) => {
        let channelData = [];
        for (let i = 0; i < this.allData.length; i++) {
            let data = this.allData[i];
            //标题
            let title = data.title;
            //数据
            let titleData = data.data;

            let itemData = [];
            for (let j = 0; j < titleData.length; j++) {
                let obj = titleData[j];
                if (obj.name.indexOf(text) !== -1) {
                    itemData.push(obj);
                }

            }
            if (itemData.length > 0) {
                let titleObj = {};
                titleObj.title = title;
                titleObj.data = itemData;
                channelData.push(titleObj);
            }
        }
        this.setState({
            cityData: channelData
        })
    }


    goBack = (item) => {
        DeviceEventEmitter.emit('ChangeUI', { bankName: item.name });
        this.props.navigation.goBack();
    }

    SectionListHeadre = () => {
        return (
            <View style={{ padding: 20, backgroundColor: '#f3f3f3', height: 80 }}>
                <ImgInput
                    img={require('../../../image/18.png')}
                    placeholder="搜索开户行名称"
                    inpBox={{ backgroundColor: 'white' }}
                    inpStyle={{ backgroundColor: 'white' }}
                    onChange={(text) => this.matchingBank(text)}
                />
            </View>
        )
    }

    render() {

        let textList = [];
        for (let i = 0; i < this.state.cityData.length; i++) {
            textList.push(
                <TouchableOpacity key={i} onPressIn={({ nativeEvent: e }) => this.touchEnd(e, i)}>
                    <Text style={{ fontSize: 16 }}>{this.state.cityData[i].title}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.view}>
                <View style={styles.view2}>
                    {/* <Header thisCity={this.state.thisCity} ref={'hotHeader'} /> */}
                    <SectionList
                        renderItem={({ item, index, section }) => (
                            <TouchableNativeFeedback onPress={() => {
                                Alert.alert('确定选择' + item.name + '吗？',
                                    '点击OK后会切换到' + item.name,
                                    [{
                                        text: 'OK', onPress: () => { this.goBack(item) }
                                        // this.props.navigation.navigate('RefundsInfo', {
                                        //     bankName: item
                                        // })
                                        // this.setState({
                                        //     thisCity: item,
                                        //     RecentlyArr: item
                                        // })
                                    }],

                                    { cancelable: false })
                            }}>
                                <View style={styles.TouchableNativeFeedback}>
                                    <Text style={{ fontSize: 22 }} key={index}>{item.name}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.listTitle}>
                                <Text style={{ fontSize: 20 }}>{"      " + title}</Text>
                            </View>
                        )}
                        sections={this.state.cityData}
                        keyExtractor={(item, index) => item + index}
                        ItemSeparatorComponent={ItemDivideComponent}
                        ref={'SectionList'}
                        ListHeaderComponent={this.SectionListHeadre}
                        getItemLayout={(data, index) => ({
                            length: 40, offset: 40 * index + 80, index
                            //方法说明:
                            //当调用this.refs.SectionList.scrollToLocation这个方法的时候,列表的所有数据并没有渲染完成，这个时候跳到指定位置时，程序就无法确定。
                            //所有用此方法来规定位置以及数据，length：列表行高，offset是第几行，index：跳转到哪个index就是这个index
                        })}
                    />
                </View>
                <TouchableOpacity style={styles.TouchableOpacity}
                    number={1}
                >{textList}</TouchableOpacity>
            </View>
        );
    }
}
//列表头部
//最近选择的和热门城市
class SectionListHeadre extends Component {
    render() {
        return (
            // <View style={styles.listHeader}>
            //     {/*<Text style={{fontSize: 20}}> 最近选择 </Text>*/}
            //     {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center',backgroundColor:'#EEEEEE'}}>*/}
            //     {/*{RecentlyArr}*/}
            //     {/*</View>*/}
            //     <Text style={{ fontSize: 20 }}> 热门城市 </Text>
            //     <View style={{ flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center', backgroundColor: '#EEEEEE' }}>
            //         {textArr}
            //     </View>
            // </View>
            <View style={{ padding: 20, backgroundColor: '#f3f3f3', height: 80 }}>
                <ImgInput
                    img={require('../../../image/18.png')}
                    placeholder="搜索开户行名称"
                    inpBox={{ backgroundColor: 'white' }}
                    inpStyle={{ backgroundColor: 'white' }}
                    onChange={(text) => { this.props.matchingBank(text) }}
                />
            </View>
        )
    }
}

//列表每一组
type Props = {
    thisCity: thisCity
}

class Header extends Component<Props> {

    render() {

        let { thisCity } = this.props;
        return (
            <View style={{ height: 40, justifyContent: "center" }}>
                <Text
                    style={{
                        justifyContent: "center",
                        marginLeft: 20,
                        fontSize: 22
                    }}
                >
                    {"当前位置：" + thisCity}
                </Text>
            </View>
        );
    }
}

class ItemDivideComponent extends Component {
    render() {
        return (
            <View
                style={{
                    height: 0.5,
                    backgroundColor: "#a5a5a5",
                    marginRight: 10,
                    marginLeft: 20
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: "row"
    },
    view2: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    TouchableOpacity: {
        width: 30,
        alignItems: "center",
    },
    listTitle: {
        height: 25,
        backgroundColor: "#EEEEEE",
        justifyContent: "center"
    },
    TouchableNativeFeedback: {
        height: 40,
        justifyContent: "center",
        marginLeft: 20
    },
    listHeader: {
        height: 180,
        backgroundColor: '#EEEEEE',

    }
});




// <View style={{ padding: 20 ,backgroundColor:'#f3f3f3'}}>
            //     <ImgInput
            //         img={require('../../../image/18.png')} 
            //         placeholder="搜索开户行名称"
            //         inpBox={{ backgroundColor: 'white' }}
            //         inpStyle={{ backgroundColor: 'white' }}
            //         onChange={(text) => this.matchingBank}
            //     />
            // </View>