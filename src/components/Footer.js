import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { Grid, Col } from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import IconBack from './IconBack';
import { scale, moderateScale } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Footer extends Component {
    static propsType = {
        text: PropTypes.string,
        leftArrowVisible: PropTypes.bool,
        rightArrowVisible: PropTypes.bool,
        onPressNext: PropTypes.func,
        onPressPrev: PropTypes.func,
    };

    static defaultProps = {
        leftArrowVisible: true,
        rightArrowVisible: true,
    };

    onPressNext() {
        this.props.onPressNext();
    }

    onPressPrev() {
        this.props.onPressPrev();
    }

    render() {
        let leftArrow;
        leftArrow = (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { this.onPressPrev() }}
                style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ width: 10, height: 16 }}
                    source={require('../../assets/images/back_button.png')} />
            </TouchableOpacity>
        );
        let rightArrow;
        rightArrow = (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { this.onPressNext() }}
                style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ width: 10, height: 16, transform: [{ rotate: '180deg' }] }}
                    source={require('../../assets/images/back_button.png')}
                />
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
                {this.props.leftArrowVisible === true ? leftArrow : <View style={{ width: 30 }}></View>}
                <Text style={styles.title}>{this.props.text}</Text>
                {this.props.rightArrowVisible === true ? rightArrow : <View style={{ width: 30 }}></View>}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: '#3F6DB1',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
    },
    title: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
        lineHeight: scale(19),
        color: '#FFFFFF'
    },
    col: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});