import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { scale, moderateScale } from '../components/ScaleRes';
import * as FontFamily from '../constants/FontFamily';
import Header from '../components/Header';

export default class BankScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankAccName: props.route.params.bankAccName,
            bankAccNo: props.route.params.bankAccNo,
            bankName: props.route.params.bankName,
            email: props.route.params.email,
            note: props.route.params.note,
            phone: props.route.params.phone,
            price: props.route.params.price,
        }
    }

    render() {
        const { bankAccName, bankAccNo, bankName, email, note, phone, price } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    Left='back'
                    Body='BANK'
                    onPress={() => { this.props.navigation.goBack() }}
                />
                <View style={styles.modalContainer}>
                    <View style={[styles.body, { marginTop: 10 }]}>
                        <Text style={styles.boldText}>
                            ĐỂ KÍCH HOẠT SẢN PHẨM, XIN VUI LÒNG
                        </Text>
                        <Text style={styles.boldText}>
                            CHUYỂN KHOẢN THÔNG TIN SAU:
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 12, padding: 10, marginTop: 10, marginBottom: 15, width: '90%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.defaultText}>Chủ tài khoản: </Text>
                            <Text style={[styles.boldText, { color: '#000000' }]}>{bankAccName}</Text>
                        </View>
                        <View style={{ borderBottomColor: '#C4C4C4', borderBottomWidth: 1 }} />
                        <Text style={styles.defaultText}>Tên ngân hàng:</Text>
                        <Text style={styles.boldText}>{bankName}</Text>
                        <Text style={styles.defaultText}>Số tài khoản:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.sendText}>{bankAccNo} </Text>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => { this.copyToClipboard(bankAccNo) }}>
                                <Image
                                    source={require('../../assets/images/copy_button.png')}
                                    style={{ height: scale(32), width: scale(32) }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rectange}>
                        <View style={[styles.rectangeColor, { backgroundColor: '#7EB932' }]}>
                            <Text style={styles.rectangeColorText}>Kích hoạt</Text>
                            <Text style={styles.rectangeColorText}>16 ngày</Text>
                            <Text style={[styles.rectangeColorText, { fontSize: 24 }]}>100,000 vnđ</Text>
                        </View>
                        <View style={styles.rectangeNoColor}>
                            <Text style={[styles.defaultText, { color: '#4083BF', marginTop: 15 }]}>
                                Nội dung chuyển khoản
                            </Text>
                            <Text style={[styles.rectangeNoColorText, { color: '#4083BF', fontSize: 32 }]}>
                                SHXD16N
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.rectange, { marginTop: 15 }]}>
                        <View style={[styles.rectangeColor, { backgroundColor: '#3F6DB1' }]}>
                            <Text style={styles.rectangeColorText}>Kích hoạt</Text>
                            <Text style={styles.rectangeColorText}>30 ngày</Text>
                            <Text style={[styles.rectangeColorText, { fontSize: 24 }]}>200,000 vnđ</Text>
                        </View>
                        <View style={styles.rectangeNoColor}>
                            <Text style={[styles.defaultText, { color: '#4083BF', marginTop: 15 }]}>
                                Nội dung chuyển khoản
                            </Text>
                            <Text style={[styles.rectangeNoColorText, { color: '#4083BF', fontSize: 32 }]}>
                                SHXD30N
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.rectange, { marginTop: 15 }]}>
                        <View style={[styles.rectangeColor, { backgroundColor: '#A288DA' }]}>
                            <Text style={styles.rectangeColorText}>Kích hoạt</Text>
                            <Text style={styles.rectangeColorText}>90 ngày</Text>
                            <Text style={[styles.rectangeColorText, { fontSize: 24 }]}>500,000 vnđ</Text>
                        </View>
                        <View style={styles.rectangeNoColor}>
                            <Text style={[styles.defaultText, { color: '#4083BF', marginTop: 15 }]}>
                                Nội dung chuyển khoản
                            </Text>
                            <Text style={[styles.rectangeNoColorText, { color: '#4083BF', fontSize: 32 }]}>
                                SHXD90N
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C2DBFF',
    },
    modalContainer: {
        alignItems: 'center',
    },
    rectange: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        width: '90%',
        height: 92
    },
    rectangeColor: {
        width: '45%',
        height: 92,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rectangeColorText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
        color: '#ffffff'
    },
    rectangeNoColor: {
        alignItems: 'center',
        marginLeft: 15,
    },
    rectangeNoColorText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(32),
        lineHeight: moderateScale(38),
        color: '#ffffff'
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
    },
    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        left: 125
    },
});