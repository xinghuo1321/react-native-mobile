import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import Video from 'react-native-video';

const win = Dimensions.get('window');
export default class VideoOper extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0
        }
    }
    
    render() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={this.toBack} style={{ position: 'absolute', left: win.width/2-45, top: 150-45, zIndex: 10 }}>
                    <Image
                        style={styles.backImg}
                        source={require('../../../image/back.png')}
                    />
                </TouchableOpacity>
                <Video
                    ref={(ref) => {
                        this.videoPlayer = ref
                    }}
                    /* For ExoPlayer */
                    source={{ uri: 'https://vd4.bdstatic.com/mda-jbmhv3u6sw67pk8g/sc/mda-jbmhv3u6sw67pk8g.mp4?auth_key=1559136729-0-0-efc190ba8416428e345fd484039e9b8a&bcevod_channel=searchbox_feed&pd=bjh&abtest=all' }}
                    rate={1.0}
                    volume={1.0}
                    paused={true}
                    muted={false}
                    resizeMode={'cover'}
                    playWhenInactive={false}
                    playInBackground={false}
                    ignoreSilentSwitch={'ignore'}
                    progressUpdateInterval={250.0}
                    style={[styles.backgroundVideo, { width: win.width, height: 300 }]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})