import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Col } from 'react-native-easy-grid';
import DefaultButton from './DefaultButton';
import { scale, moderateScale, WIDTH } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';

export default class BiddingModal extends Component {
    static propTypes = {
        disable: PropTypes.bool,
        title: PropTypes.string,
        text: PropTypes.string,
        onPressClose: PropTypes.func,
        onPressNew: PropTypes.func,
    }

    static defaultProps = {
        disable: false,
    };

    render() {
        return (
            <Modal visible={this.props.disable} transparent statusBarTranslucent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={styles.header}>
                                <Grid>
                                    <Col size={1} ></Col>
                                    <Col size={8} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.headerTitle}>{this.props.title}</Text>
                                    </Col>
                                    <Col size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity activeOpacity={0.5} onPress={this.props.onPressClose}>
                                            <Image
                                                source={require('../../assets/images/close_button.png')}
                                                style={{ height: scale(32), width: scale(32) }}
                                            />
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </View>
                            <View style={{ borderBottomColor: '#C4C4C4', borderBottomWidth: 1 }} />
                            <View style={styles.body}>
                                <Text style={styles.boldText}>
                                    {this.props.text}
                                </Text>
                                <View>
                                    <Text style={styles.boldText}>Đề thi bao gồm:</Text>
                                    <Text style={styles.defaultText}>70 câu / 60 phút</Text>
                                    <Text style={styles.defaultText}>*** Các câu hỏi được lấy ngẫu nhiên trong bộ đề.</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <DefaultButton
                                text='THI THỬ'
                                width={WIDTH * 0.7}
                                height={scale(64)}
                                textSize={moderateScale(16)}
                                onPress={this.props.onPressNew}
                            />
                            <View style={{ paddingTop: 20 }}></View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingBottom: 20,
        borderRadius: 16,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 47,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(18),
        color: '#3F6DB1'
    },
    defaultText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000',
    },
    boldText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000',
    },
    body: {
        alignItems: 'flex-start'
    },
    button: {
        paddingTop: 30,
    }
});