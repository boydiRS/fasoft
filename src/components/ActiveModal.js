import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable, StatusBar, TextInput } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Col } from 'react-native-easy-grid';
import DefaultButton from './DefaultButton';
import { scale, moderateScale, verticalScale, WIDTH } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';

export default class ActiveModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        };
    }

    static propTypes = {
        type: PropTypes.string,
        disable: PropTypes.bool,
        activeCode: PropTypes.string,
        onPressClose: PropTypes.func,
        onPressActive: PropTypes.func,
        onChangeActiveCode: PropTypes.func,
    }

    static defaultProps = {
        disable: false,
        activeCode: '1234-1234-2345-5678',
    }

    onPressActive() {
        this.props.onPressActive();
    }

    onChangeActiveCode(text) {
        this.setState({
            code: 'a'
        });
        console.log(text);
        // this.props.onChangeActiveCode(text);
    }

    render() {
        const {code} = this.state;
        return (
            <Modal transparent visible={this.props.disable} statusBarTranslucent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={styles.header}>
                                <Grid>
                                    <Col size={1} ></Col>
                                    <Col size={8} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.headerTitle}>ACTIVE TÀI KHOẢN</Text>
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
                            <View style={[styles.body, { marginTop: 10 }]}>
                                <Text style={styles.boldText}>
                                    Nhập series key để active tài khoản
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    autoFocus={true}
                                    blurOnSubmit={true}
                                    keyboardType={Platform.OS === 'ios' ? 'phone-pad' : 'default'}
                                    maxLength={27}
                                    placeholder="Active Code"
                                    underlineColorAndroid='transparent'
                                    onChangeText={this.onChangeActiveCode}
                                    value={code}
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <DefaultButton
                                    text='ACTIVE'
                                    width={WIDTH * 0.7}
                                    height={scale(64)}
                                    textSize={moderateScale(16)}
                                    onPress={this.props.onPressNew}
                                />
                            </View>
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
        fontWeight: 'bold',
        fontSize: moderateScale(18),
        lineHeight: moderateScale(21),
        color: '#3F6DB1'
    },
    defaultText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(23),
        color: '#000000',
    },
    boldText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(23),
        color: '#000000',
    },
    body: {
        alignItems: 'center'
    },
    button: {
        paddingTop: 30,
    },
    moneyText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(30),
        lineHeight: moderateScale(35),
        color: '#000000',
    },
    sendText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(30),
        lineHeight: moderateScale(35),
        color: '#C00E0E',
    },
    input: {
        fontFamily: FontFamily.RobotoRegular,
        marginTop: 10,
        fontSize: moderateScale(16),
        textAlign: 'center',
        width: WIDTH * 0.84,
        height: WIDTH * 0.84 / 7,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        backgroundColor: 'white',
        color: '#000000'
    }
});