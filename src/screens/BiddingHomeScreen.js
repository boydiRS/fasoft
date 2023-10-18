import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native'
import React, { useState } from 'react'
import ActionButton from '../components/ActionButton';
import { Component } from 'react';
import IconBack from '../components/IconBack';
import { HEIGHT, moderateScale, scale, WIDTH } from '../components/ScaleRes';
import BiddingModal from '../components/BiddingModal';
import * as FontFamily from '../constants/FontFamily';

export default class BiddingHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  openModal() {
    this.setState({
      modalVisible: true,
    })
  }

  closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  onGoQuizScreen(type) {
    this.closeModal();
    this.props.navigation.navigate('BiddingQuiz', { isOnLuyen: type });
  }

  render() {
    const { modalVisible } = this.state;
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
        <BiddingModal
          disable={modalVisible}
          title={'THI THỬ SÁT HẠCH'}
          text={'Sát hạch: Chứng chỉ hành nghề kiến trúc'}
          onPressClose={() => { this.closeModal() }}
          onPressNew={() => { this.onGoQuizScreen(false) }}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ alignItems: 'center', top: 170 }}>
            <View style={styles.triangleCorner} />
            <View style={styles.rectangle} />
          </View>
          <View style={{ left: scale(32) }}>
            <Text style={styles.titleText}>CHỨNG CHỈ HÀNH NGHỀ</Text>
            <Text style={styles.jobText}>ĐẤU THẦU</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: scale(46) }}>
            <Image
              source={require("../../assets/images/bidding_deco.png")}
              style={[styles.homeLogo, { marginTop: 13 }]}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 25, marginBottom: 25, justifyContent: 'space-evenly', width: WIDTH }}>
            <ActionButton
              type='Training'
              text1='ÔN LUYỆN'
              text2='Trắc nghiệm'
              onPress={() => { this.onGoQuizScreen(true) }}
            />
            <ActionButton
              type='Testing'
              text1='THI THỬ'
              text2='Giống thi thật'
              onPress={() => { this.openModal() }}
            />
          </View>
          {/* <View style={{ marginBottom: 40 }}>
            <TouchableOpacity activeOpacity={0.5}
              style={{ marginTop: 10, marginLeft: 10 }}
              onPress={() => { this.props.navigation.goBack() }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.questionText}>CÂU HỎI TÌNH HUỐNG</Text>
                <Image
                  source={require("../../assets/images/question_icon.png")}
                  style={{ width: scale(40), height: scale(40) }}
                />
              </View>
            </TouchableOpacity>
          </View> */}
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
    width: scale(354),
    height: scale(227),
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
  },
  questionText: {
    fontFamily: FontFamily.RobotoMedium,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(23),
    color: '#FFFFFF',
  }
});