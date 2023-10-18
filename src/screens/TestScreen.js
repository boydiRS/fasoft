import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import React, { Component } from 'react';
import * as Keychain from 'react-native-keychain';

export default class TestScreen extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dataConfig: null,
      dataActive: null,
      modalVisible: false,
      activeModalVisible: false,
      contactInfo: {
        bankAccName: '',
        bankAccNo: '',
        bankName: '',
        email: '',
        note: '',
        phone: '',
        price: '',
      },
    };
  }

  async storage() {
    const username = 'phong';
    const password = 'test';
  
    // Store the credentials
    await Keychain.setGenericPassword(username, password);
  
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    await Keychain.resetGenericPassword();
  };

  render() {
    const { modalVisible, activeModalVisible, contactInfo } = this.state;
    const countries = ["Egypt", "Canada", "Australia", "Ireland"];
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <SelectDropdown
            data={countries}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={"Select country"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <Image
                  style={{ width: 10, height: 16, transform: [{ rotate: '-90deg' }] }}
                  source={require('../../assets/images/blue_arrow.png')}
                />
                // <FontAwesome
                //   name={isOpened ? "chevron-up" : "chevron-down"}
                //   color={"#444"}
                //   size={18}
                // />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: "90%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
  },
  dropdown1DropdownStyle: {
    backgroundColor: "#EFEFEF"
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left"
  },
});