import React, { Component, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Header from '../components/Header';
import BuildingModal from '../components/BuildingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, moderateScale } from '../components/ScaleRes';
import * as FontFamily from '../constants/FontFamily';

const COLOR = ['#88C06E', '#55B9CF', '#FFAE35', '#D3676E', '#A26ACE', '#88C06E'];

export default class BuildingTrainingScreen extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.state = {
      activeSections: [],
      modalVisible: false,
      fieldParentID: '',
      fieldID: '',
      parentFieldID: '',
      fieldTitle: '',
      cateList: [],
      isOnLuyen: props.route.params.isOnLuyen,
    };
  }

  openModal(id, title, parentId) {
    this.setState({
      parentFieldID: parentId,
      fieldID: id,
      fieldTitle: title,
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
    if (this.state.isOnLuyen) {
      this.props.navigation.navigate('BuildingQuiz', { idCate: this.state.fieldID, userChooseType: type, parentId: this.state.parentFieldID });
    } else {
      this.props.navigation.navigate('BuildingTest', { idCate: this.state.fieldID, userChooseType: type, parentId: this.state.parentFieldID });
    }
  }

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        key={section.key}
        duration={200}
        style={styles.header}
        transition="backgroundColor"
      >
        <View style={[styles.headerLeft, { backgroundColor: section.color }]} />
        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    const fields = [];
    var i = 0;
    section.content.forEach(element => {
      i++;
      fields.push(
        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.openModal(element.id, element.name, element.parentId) }}>
          <View style={{ borderBottomColor: '#C4C4C4', borderBottomWidth: 1, marginLeft: 20, width: '90%' }} />
          <View style={styles.contentItem}>
            <Text style={{ marginLeft: 30, color: '#000000' }}>{i} - {element.name}</Text>
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <Animatable.View
        duration={400}
        style={styles.content}
        transition="backgroundColor"
      >
        {fields}
      </Animatable.View>
    );
  };

  getStorageDataMaster = async () => {
    try {
      var objs = await AsyncStorage.getItem('buildingCateList');
      console.log(objs);
      var data = [];
      var i = 0;
      JSON.parse(objs).forEach(element => {
        var content1 = [];
        element.children.forEach(element1 => {
          content1.push({ id: element1.id, name: element1.name, parentId: element.id });
        });
        data.push({ key: { i }, title: element.name, content: content1, color: COLOR[i] })
        i++;
      });
      this.setState({
        cateList: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.getStorageDataMaster();
  }

  render() {
    const { activeSections, modalVisible, fieldTitle, fieldID, cateList, isOnLuyen } = this.state;
    return (
      <View style={styles.container}>
        <Header
          Left='back'
          Body={isOnLuyen ? 'ÔN LUYỆN' : 'THI THỬ'}
          onPress={() => { this.props.navigation.goBack() }}
        />
        <BuildingModal
          isOnLuyen={isOnLuyen}
          disable={modalVisible}
          text={fieldTitle}
          onPressClose={() => { this.closeModal() }}
          onPressNew={() => { this.onGoQuizScreen('1') }}
          onPressDel={() => { this.onGoQuizScreen('2') }}
        />
        <ScrollView contentContainerStyle={{ paddingTop: 30, paddingLeft: 10, paddingRight: 10 }}>
          <Accordion
            activeSections={activeSections}
            sections={cateList}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={200}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EDF0',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    height: scale(64),
    backgroundColor: '#ffffff',
    borderRadius: 6,
    marginTop: 16,
  },
  headerText: {
    fontFamily: FontFamily.RobotoMedium,
    fontStyle: 'normal',
    fontSize: moderateScale(14),
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#000000',
  },
  headerLeft: {
    width: 18,
    height: 64,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 6,
  },
  content: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  contentItem: {
    height: 47,
    backgroundColor: '#F8FCFF',
    justifyContent: 'center',
  },
});