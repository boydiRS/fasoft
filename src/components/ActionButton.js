import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { moderateScale, scale } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';

class ActionButton extends Component {
    static propTypes = {
        type: PropTypes.string,
        disable: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        backgroundColor: PropTypes.string,
        text1: PropTypes.string,
        text2: PropTypes.string,
        textSize: PropTypes.number,
        style: PropTypes.any,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        type: 'Testing',
        disable: false,
        width: 343,
        height: 128,
        backgroundColor: '#FFFFFF',
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={{ justifyContent: 'center', flexDirection: 'column' }} onPress={this.props.onPress}>
                <View style={styles.backgroundView}>
                    {
                        this.props.type === 'Testing'
                            ? <Image style={[styles.iconImage, { top: 20 }]} source={require('../../assets/images/test_button.png')} />
                            : <Image style={[styles.iconImage, { top: 20 }]} source={require('../../assets/images/training_button.png')} />
                    }
                    <Text style={[styles.boldText, { top: 45 }]}>{this.props.text1}</Text>
                    <Text style={[styles.defaultText, { top: 55 }]}>{this.props.text2}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

var styles = StyleSheet.create({
    backgroundView: {
        alignItems: 'center',
        width: scale(163),
        height: scale(240),
        borderRadius: moderateScale(16),
        backgroundColor: '#ffffff'
    },
    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    defaultText: {
        fontFamily: FontFamily.RobotoMedium,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: moderateScale(18),
        lineHeight: moderateScale(23),
        color: '#9C9C9C',
    },
    boldText: {
        fontFamily: FontFamily.RobotoMedium,
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: moderateScale(23),
        fontSize: moderateScale(20),
        color: '#000000',
    },
    iconImage: {
        width: scale(122),
        height: scale(122),
    }
});

module.exports = ActionButton;