import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native'
import React, { useState } from 'react'
import ActionButton from '../components/ActionButton';
import { Component } from 'react';
import IconBack from '../components/IconBack';
import { HEIGHT, moderateScale, scale, WIDTH } from '../components/ScaleRes';
import * as FontFamily from '../constants/FontFamily';

export default class BuildingHomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <TouchableOpacity activeOpacity={0.5}
                    style={{ marginTop: 10, marginLeft: 10 }}
                    onPress={() => { this.props.navigation.goBack() }}>
                    <IconBack
                        color='blue'
                    />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ alignItems: 'center', top: 200 }}>
                        <View style={styles.triangleCorner} />
                        <View style={styles.rectangle} />
                    </View>
                    <View style={{ left: scale(32) }}>
                        <Text style={styles.titleText}>CHỨNG CHỈ HÀNH NGHỀ</Text>
                        <Text style={styles.jobText}>XÂY DỰNG</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require("../../assets/images/building_deco.png")}
                            style={[styles.homeLogo, { marginTop: 13 }]}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 25, marginBottom: 25, justifyContent: 'space-evenly', width: WIDTH }}>
                        <ActionButton
                            type='Training'
                            text1='ÔN LUYỆN'
                            text2=''
                            onPress={() => this.props.navigation.navigate('BuildingTraining', { isOnLuyen: true })}
                        />
                        <ActionButton
                            type='Testing'
                            text1='THI THỬ'
                            text2=''
                            onPress={() => this.props.navigation.navigate('BuildingTraining', { isOnLuyen: false })}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C2DBFF',
    },
    titleText: {
        fontFamily: FontFamily.RobotoMedium,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(18),
        lineHeight: moderateScale(23),
        color: '#3F6DB1',
    },
    jobText: {
        fontFamily: FontFamily.RobotoMedium,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(36),
        lineHeight: moderateScale(47),
        color: '#3F6DB1',
    },
    homeLogo: {
        width: scale(302),
        height: scale(256),
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 500,
        borderTopWidth: 140,
        borderRightColor: "transparent",
        borderTopColor: "#3F6DB1",
        position: 'absolute',
        transform: [{ rotate: "180deg" }],
    },
    rectangle: {
        top: 135,
        width: 500,
        height: 1000,
        backgroundColor: "#3F6DB1",
        position: 'absolute',
    }
});