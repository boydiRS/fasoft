import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { moderateScale, scale } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';

class CategoryButton extends Component {
    static propTypes = {
        type: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        text: PropTypes.string,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        type: 'Building',
        width: 343,
        height: 128,
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={{justifyContent: 'center'}} onPress = {this.props.onPress}>
                {
                    this.props.type === 'Building' 
                    ? <Image source={require('../../assets/images/home_xaydung_icon_bkg.png')}/>
                    : (this.props.type === 'Architecture'
                        ? <Image source={require('../../assets/images/home_kientruc_icon_bkg.png')}/>
                        : <Image source={require('../../assets/images/home_dauthau_icon_bkg.png')}/>
                    )
                }
                
                <View style={styles.absoluteView}>
                    <Text style={styles.defaultText}>
                        Chứng chỉ hành nghề
                    </Text>
                    <Text style={styles.boldText}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

var styles = StyleSheet.create({
    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        left: 125
    },
    defaultText: {
        fontFamily: FontFamily.RobotoMedium,
        fontStyle:'normal',
        fontWeight:'normal',
        fontSize: moderateScale(18),
        lineHeight: moderateScale(21),
        color: '#3F6DB1',
    },
    boldText: {
        fontFamily: FontFamily.RobotoMedium,
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize: moderateScale(20),
        lineHeight: moderateScale(23),
        color: '#3F6DB1',
    },
    backgroundImage:{
        width: scale(343),
        height: scale(128),
    }
});

module.exports = CategoryButton;