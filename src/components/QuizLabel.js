import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class QuizLabel extends Component {
    static propTypes = {
        text: PropTypes.string,
    };

    static defaultProps = {
        width: 78,
        height: 25,
    };

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('../../assets/images/quiz-lable.png')}>
                <Text style={[styles.label, { marginLeft: 10 }]}>{this.props.text}</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 78,
        height: 25,
        justifyContent: 'center',
        marginLeft: 10,
    },
    label: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 16,
        color: '#FFFFFF'
    }
});
