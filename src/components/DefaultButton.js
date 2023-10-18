import React from 'react';
import * as FontFamily from '../constants/FontFamily'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { scale, moderateScale, verticalScale } from './ScaleRes';
import PropTypes from 'prop-types';

export default class DefaultButton extends React.Component {
    static propTypes = {
        disable: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        backgroundColor: PropTypes.string,
        text: PropTypes.string,
        textSize: PropTypes.number,
        style: PropTypes.any,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        disable: false,
        width: scale(315),
        height: scale(45),
        backgroundColor: '#3F6DB1',
    };

    render() {
        if (this.props.disable === false) {
            return (
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={[{
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: this.props.backgroundColor,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }, this.props.style]}>
                        <Text style={{
                            width: this.props.width,
                            fontFamily: FontFamily.SFUISemibold,
                            fontSize: this.props.textSize,
                            letterSpacing: 0.19,
                            textAlign: "center",
                            color: 'white'
                        }}>
                            {this.props.text}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <View>
                    <View style={[{
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: '#b3bfc4',
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }, this.props.style]}>
                        <Text style={{
                            fontFamily: FontFamily.SFUISemibold,
                            fontSize: this.props.textSize,
                            letterSpacing: 0.19,
                            textAlign: "center",
                            color: 'white'
                        }}>
                            {this.props.text}
                        </Text>
                    </View>
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({

});
