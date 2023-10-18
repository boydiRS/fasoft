import { View, Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AnswerItem extends Component {
    static propsType = {
        text: PropTypes.string,
        title: PropTypes.string,
        type: 'Not' | 'Yes' | 'No',
    }

    static defaultProps = {
        type: 'Yes',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.circle,
                    this.props.type == 'Yes'
                        ? { backgroundColor: '#7EB932' }
                        : (this.props.type == 'No'
                            ? { backgroundColor: '#C00E0E' }
                            : ''
                        )
                    ]}
                    >
                        <Text style={[styles.titleText,
                        this.props.type != 'Not'
                            ? { color: '#FFFFFF' }
                            : { color: '#000000' }
                        ]}>
                            {this.props.title}
                        </Text>
                    </View>
                    <Text style={styles.answerText}>{this.props.text}</Text>
                </View>
                <View style={{ borderBottomColor: '#C4C4C4', borderBottomWidth: 1 }} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        minHeight: 63,
    },
    circle: {
        height: 32,
        width: 32,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 15,
    },
    answerText: {
        padding: 5,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 16,
        color: '#000000',
        marginLeft: 10,
        width: '90%'
    },
    titleText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 23,
        color: '#000000',
    }
})