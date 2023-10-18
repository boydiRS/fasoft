import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { scale, moderateScale, WIDTH } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';

export default class TotalResultModal extends Component {
    static propTypes = {
        answer: PropTypes.arrayOf(PropTypes.object),
        disable: PropTypes.bool,
        height: PropTypes.number,
        onChooseQuestion: PropTypes.func,
        onCloseModel: PropTypes.func,
        isOnLuyen: PropTypes.bool,
    }

    static defaultProps = {
        isOnLuyen: true,
    };

    onChooseQuestion(value) {
        this.props.onChooseQuestion(value);
    }

    onCloseModel() {
        this.props.onCloseModel();
    }

    render() {
        var currentType = "";
        var answers = [];
        for (let i = 0; i < this.props.answer.length; i++) {
            const element = this.props.answer[i];
            var type = '';
            if (element.choice != "") {
                if (this.props.isOnLuyen) {
                    if (element.choice == element.trueAnswer[0]) {
                        type = 'Yes';
                    } else {
                        type = 'No';
                    }
                } else {
                    type = 'Not'
                }
            }

            if (currentType != element.type) {
                currentType = element.type;
                answers.push(
                    <View style={{marginBottom: 10, width: 280}}>
                        <Text style={{ color: '#ffffff' }}>{currentType}</Text>
                    </View>
                )
            }

            answers.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { this.onChooseQuestion(i) }}>
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
                            {i + 1}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            this.props.disable
                ? <View></View>
                : <View
                    style={styles.container}>
                    <TouchableOpacity
                        style={{ width: '25%', height: this.props.height }}
                        onPress={() => { this.onCloseModel() }}
                    >
                    </TouchableOpacity>
                    <View style={[styles.modalBackground, { height: this.props.height }]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.modalContainer}>
                                {answers}
                            </View>
                        </ScrollView>
                    </View>
                </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        top: 65,
        width: WIDTH,
        position: 'absolute',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'flex-end'
    },
    modalBackground: {
        width: 280,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    circle: {
        height: 40,
        width: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginRight: 10,
        marginBottom: 10,
    },
    titleText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: moderateScale(18),
        color: '#000000',
    },
});