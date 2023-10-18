import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

class IconBack extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        color: PropTypes.string,
    };

    static defaultProps = {
        width: 10,
        height: 16,
        color: 'white',
    };

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 32, height: 32 }}>
                {
                    this.props.color == 'white'
                        ? <Image
                            style={{ width: this.props.width, height: this.props.height }}
                            source={require('../../assets/images/back_button.png')} />
                        : <Image
                            style={{ width: this.props.width, height: this.props.height }}
                            source={require('../../assets/images/blue_arrow.png')} />
                }
            </View>
        );
    }
}

module.exports = IconBack;
