import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable, StatusBar } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Col } from 'react-native-easy-grid';
import DefaultButton from './DefaultButton';
import { scale, moderateScale, verticalScale, WIDTH } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';
import Clipboard from '@react-native-clipboard/clipboard';

export default class BankModal extends Component {
    static propTypes = {
        bankAccName: PropTypes.string,
        bankAccNo: PropTypes.string,
        bankName: PropTypes.string,
        email: PropTypes.string,
        note: PropTypes.string,
        phone: PropTypes.string,
        price: PropTypes.string,
        disable: PropTypes.bool,
        onPressClose: PropTypes.func,
    }

    static defaultProps = {
        disable: false,
    }

    copyToClipboard = (value) => {
        Clipboard.setString(value);
    };

    render() {
        return (
            <Modal transparent visible={this.props.disable} statusBarTranslucent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={styles.header}>
                                <Grid>
                                    <Col size={1} ></Col>
                                    <Col size={8} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.headerTitle}>THÔNG BÁO</Text>
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
                                    THỜI GIAN DÙNG THỬ ĐÃ HẾT !
                                </Text>
                                <Text style={styles.boldText}>
                                    Để có thể tiếp tục, vui lòng kích hoạt tài khoản.
                                </Text>
                                <Text style={styles.defaultText}>
                                    Giá kích hoạt tài khoản:
                                </Text>
                                <Text style={styles.moneyText}>
                                    {this.props.price}
                                </Text>
                                <Text style={styles.defaultText}>
                                    Xin vui lòng chuyển khoản theo thông tin:
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', backgroundColor: '#E9EDF0', borderRadius: 12, padding: 10, marginTop: 10, marginBottom: 15 }}>
                            <Text style={styles.defaultText}>Chủ tài khoản:</Text>
                            <Text style={styles.boldText}>{this.props.bankAccName}</Text>
                            <Text style={styles.defaultText}>Tên ngân hàng:</Text>
                            <Text style={styles.boldText}>{this.props.bankName}</Text>
                            <Text style={styles.defaultText}>Số tài khoản:</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.sendText}>{this.props.bankAccNo} </Text>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.copyToClipboard(this.props.bankAccNo)}}>
                                    <Image
                                        source={require('../../assets/images/copy_button.png')}
                                        style={{ height: scale(32), width: scale(32) }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.defaultText}>Nội dung chuyển tiền:</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.sendText}>{this.props.note} </Text>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.copyToClipboard(this.props.note)}}>
                                    <Image
                                        source={require('../../assets/images/copy_button.png')}
                                        style={{ height: scale(32), width: scale(32) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.defaultText}>Sđt hỗ trợ        :  {this.props.phone}</Text>
                            <Text style={styles.defaultText}>Email hỗ trợ    :  {this.props.email}</Text>
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
        fontSize: moderateScale(16),
        lineHeight: moderateScale(19),
        color: '#3F6DB1'
    },
    defaultText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(21),
        color: '#000000',
    },
    boldText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(21),
        color: '#C00E0E',
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
        fontSize: moderateScale(28),
        lineHeight: moderateScale(32),
        color: '#000000',
    },
    sendText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(28),
        lineHeight: moderateScale(32),
        color: '#C00E0E',
    }
});