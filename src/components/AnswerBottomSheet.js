import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';

const Alphabe = ['a', 'b', 'c', 'd', 'e', 'f'];

export default class AnswerBottomSheet extends Component {
    static propsType = {
        answer: PropTypes.arrayOf(PropTypes.string),
        choice: PropTypes.string,
        trueAnswer: PropTypes.arrayOf(PropTypes.string),
        onChooseAnswer: PropTypes.func,
        isOnLuyen: PropTypes.bool,
    };

    static defaultProps = {
        isOnLuyen: true,
    };

    onChooseAnswer(value) {
        this.props.onChooseAnswer(value);
    }

    render() {
        var answers = [];
        for (let i = 0; i < this.props.answer.length; i++) {
            const element = this.props.answer[i];
            var type = '';
            if (this.props.choice != "") {
                if (this.props.choice == i) {
                    if (this.props.isOnLuyen) {
                        if (this.props.choice == this.props.trueAnswer[0]) {
                            type = 'Yes';
                        } else {
                            type = 'No';
                        }
                    } else {
                        type = 'Not'
                    }
                }
            }

            answers.push(
                <TouchableOpacity
                    activeOpacity={this.props.choice == '' ? 0.5 : 1}
                    onPress={() => { this.onChooseAnswer(i.toString()) }}
                    style={styles.answerContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.circle,
                        type == 'Yes'
                            ? { backgroundColor: '#7EB932' }
                            : (type == 'No'
                                ? { backgroundColor: '#C00E0E' }
                                : (type == 'Not'
                                    ? { backgroundColor: '#FFAA33' }
                                    : ''
                                )
                            )
                        ]}>
                            <Text style={[styles.titleText,
                            type != '' ? { color: '#FFFFFF' } : { color: '#000000' }
                            ]}>
                                {Alphabe[i]}
                            </Text>
                        </View>
                        <Text style={[styles.answerText,
                        type == 'Yes'
                            ? { color: '#7EB932' }
                            : (type == 'No'
                                ? { color: '#C00E0E' }
                                : (type == 'Not'
                                    ? { color: '#FFAA33' }
                                    : ''
                                )
                            )
                        ]}>
                            {element}
                        </Text>
                    </View>
                    <View style={{ borderBottomColor: '#C4C4C4', borderBottomWidth: 1 }} />
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    {answers}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    rotateButton: {
        transform: [{ rotateX: '90deg', rotateY: '90deg' }]
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 19,
        color: '#ffffff',
    },
    col: {
        alignItems: 'center',
    },
    answerContainer: {
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
    },
});