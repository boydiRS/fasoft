import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Modal, TextInput, Keyboard, ActivityIndicator, PermissionsAndroid } from 'react-native';
import React, { Component } from 'react';
import BankModal from '../components/BankModal';
import { getDataApp, getStartInfo, activeKey } from '../services/base.service';
import CategoryButton from '../components/CategoryButton';
import DefaultButton from '../components/DefaultButton';
import { scale, WIDTH, HEIGHT, moderateScale } from '../components/ScaleRes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FontFamily from '../constants/FontFamily';
import { Grid, Col } from 'react-native-easy-grid';
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from "@react-native-community/netinfo";
// import SInfo from 'react-native-sensitive-info';
import * as Keychain from 'react-native-keychain';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.onHiddenInputChangeText = this.onHiddenInputChangeText.bind(this);
    this.state = {
      key: '',
      isActive: false,
      activeCode: 'Q7BV-OXUF-1RS1-S772-QSIZ',
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
      activeResult: false,
      activeSuccess: false,
      image: '',
      isLoading: false,
    };
  }

  openModal(modal) {
    if (modal == 'bank') { this.setState({ modalVisible: true, }) }
    else { this.setState({ activeModalVisible: true, }) }
  }

  closeModal(modal) {
    if (modal == 'bank') { this.setState({ modalVisible: false, }) }
    else { this.setState({ activeModalVisible: false, }) }
  }

  storageDataApps = async (apps) => {
    this.setState({ isLoading: true, })
    try {
      let dt = JSON.stringify(apps.DT);
      let dtApp = await AsyncStorage.getItem('DTApp');
      if ((dtApp != null && dtApp != dt) || dtApp == null) {
        await AsyncStorage.setItem('DTApp', dt);
        this.getDataMaster('DT');
      }
      else {
        if (this.state.activeSuccess) {
          await AsyncStorage.setItem('DTApp', dt);
          this.getDataMaster('DT');
        }
      }
    } catch (error) {
      await AsyncStorage.setItem('DTApp', dt);
      this.getDataMaster('DT');
    }

    try {
      let kts = JSON.stringify(apps.KTS);
      let ktsApp = await AsyncStorage.getItem('KTSApp');
      if ((ktsApp != null && ktsApp != kts) || ktsApp == null) {
        await AsyncStorage.setItem('KTSApp', kts);
        this.getDataMaster('KTS');
      }
      else {
        if (this.state.activeSuccess) {
          await AsyncStorage.setItem('KTSApp', kts);
          this.getDataMaster('KTS');
        }
      }
    } catch (error) {
      await AsyncStorage.setItem('KTSApp', kts);
      this.getDataMaster('KTS');
    }

    try {
      let xd = JSON.stringify(apps.XD);
      let xdApp = await AsyncStorage.getItem('XDApp');
      if ((xdApp != null && xdApp != xd) || xdApp == null) {
        await AsyncStorage.setItem('XDApp', xd);
        this.getDataMaster('XD');
      }
      else {
        if (this.state.activeSuccess) {
          await AsyncStorage.setItem('XDApp', xd);
          this.getDataMaster('XD');
        }
      }
    } catch (error) {
      await AsyncStorage.setItem('XDApp', xd);
      this.getDataMaster('XD');
    }
    this.setState({ isLoading: false, })
  }

  async getDataMaster(appName) {
    const data = await getDataApp(appName, this.state.key);
    if (data.errCode == '00') {
      if (appName == 'XD') {
        console.log('XD');
        console.log(JSON.stringify(data.dataList));
        await AsyncStorage.setItem('buildingCateList', JSON.stringify(data.cateList));
        await AsyncStorage.setItem('buildingDataList', JSON.stringify(data.dataList));
        await AsyncStorage.setItem('buildingTypeList', JSON.stringify(data.typeList));
      }
      else if (appName == 'KTS') {
        console.log('KTS');
        const dataClone = await this.getDataWithImage(data.dataList);
        await AsyncStorage.setItem('architectureDataList', JSON.stringify(dataClone));
        await AsyncStorage.setItem('architectureTypeList', JSON.stringify(data.typeList));
      }
      else {
        console.log('DT');
        await AsyncStorage.setItem('biddingDataList', JSON.stringify(data.dataList));
      }
    }
  }

  async getStartInfo() {
    var key = await AsyncStorage.getItem('activeKey');
    if (key == null) key = '';
    this.setState({
      key: key,
      isLoading: true,
    })
    const data = await getStartInfo(key);
    this.setState({ isLoading: false, })
    console.log(data);
    if (data.errCode == '00') {
      if (data.appendData.isActive == true) {
        this.storageDataApps(data.appendData.apps);
      }
      else {
        if (key != '') {
          this.clearStorage();
        } else {
          this.storageDataApps(data.appendData.apps);
        }
      }
      this.setState({
        contactInfo: data.appendData.contactInfo,
        isActive: data.appendData.isActive,
      })
    } else {

    }
  }

  async activeKey(value) {
    this.setState({ isLoading: true, })
    const data = await activeKey(value);
    if (data.errCode == '00') {
      await AsyncStorage.setItem('activeKey', this.state.activeCode);
      this.setState({
        activeResult: true,
        activeSuccess: true,
      })
      this.getStartInfo();
    } else {
      this.setState({
        activeResult: true,
        activeSuccess: false,
        isLoading: false,
      })
    }
  }

  async clearStorage() {
    await AsyncStorage.clear()
  }

  async getData() {
    var key = await AsyncStorage.getItem('activeKey');
    if (key == null) key = "";
    const data = await getDataApp('KTS', key);
    // if (data.dataList.length > 0) {
    //   for (const element of data.dataList) {
    //     if (element.image != null) {
    //       element.image = await this.convertImageTobase64(element.image);
    //     }
    //   }
    // }
    console.log(JSON.stringify(data));
  }

  async getDataWithImage(data) {
    console.log(data);
    if (data.length > 0) {
      for (const element of data) {
        if (element.image != null) {
          element.image.url = await this.downloadImage(element.image.url);
        }
      }
    }
    return data;
  }

  async convertImageTobase64(value) {
    return RNFetchBlob.fetch('GET', value, {
      Authorization: 'Bearer access-token...',
    }).then((res) => {
      let status = res.info().status;
      if (status == 200) {
        return res.base64();
      }
    }).catch((errorMessage, statusCode) => { })
  }

  async downloadImage(value) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let dirs = RNFetchBlob.fs.dirs;
        let fullPath = dirs.DownloadDir + "/" + this.getCurrentTimestamp() + ".png"
        console.log(fullPath);
        return RNFetchBlob.config({
          path: fullPath,
          fileCache: true,
        }).fetch('GET', value, {
          Authorization: 'Bearer access-token...',
        }).then((res) => {
          let status = res.info().status;
          if (status == 200) {
            return fullPath;
          }
        }).catch((errorMessage, statusCode) => { console.log(errorMessage) })
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getCurrentTimestamp() {
    const d = new Date();
    return d.getTime();
  }

  async onSaveKey() {
    const username = 'zuck';
    const password = 'poniesRgr8';

    // Store the credentials
    // await Keychain.setGenericPassword(username, password);

    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Credentials successfully loaded for user ' + credentials.username + ' password: ' + credentials.password);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    // await Keychain.resetGenericPassword();
  }

  async onGetKey() {
    const gettingAllKeys = await SInfo.getAllItems({
      sharedPreferencesName: "mySharedPrefs",
      keychainService: "myKeychain",
    });

    console.log(gettingAllKeys); //value1
  }

  componentDidMount() {
    // this.downloadImage("http://118.70.72.11/upload/images/kts/623d8efa2cc7a.png");
    // this.clearStorage();
    // this.getStartInfo();
    // this.activeKey();tr4r

    // const unsubscribe = NetInfo.addEventListener(state => {
    //   if (state.isConnected) {
    //     this.getStartInfo();
    //   }
    // });
    this.onSaveKey();
  }

  onSendActiveCode() {
    this.activeKey(this.state.activeCode);
  }

  onHiddenInputChangeText(text) {
    let digits = text.match(/[A-Za-z0-9]+/g);
    console.log('digits: ' + digits);
    if (digits === null) {
      text = '';
    } else {
      text = digits.join([]);
    }
    text = this.processActiveCode(text)
    console.log('text: ' + text);
    this.setState({ activeCode: text })
    if (text.length === 24) {
      Keyboard.dismiss();
      // this.onPressSendOTP(text);
    }
  }

  onGoBankScreen() {
    this.props.navigation.navigate('Bank', {
      bankAccName: this.state.contactInfo.bankAccName,
      bankAccNo: this.state.contactInfo.bankAccNo,
      bankName: this.state.contactInfo.bankName,
      email: this.state.contactInfo.email,
      note: this.state.contactInfo.note,
      phone: this.state.contactInfo.phone,
      price: this.state.contactInfo.price,
    });
  }

  processActiveCode(value) {
    if (value.length <= 4) return value;
    let output = "";
    let first = true;
    for (var x = 0; x < value.length; x++) {
      if (x % 4 == 0) {
        if (first) {
          first = false;
        } else {
          output += "-";
        }
      }
      output += value.charAt(x);
    }
    return output;
  }

  onOpenZaLo() {

  }

  onOpenFacebook() {

  }

  onOpenTelegram() {

  }

  onOpenTwitter() {

  }

  onOpenPhone() {

  }

  render() {
    const { isActive, modalVisible, activeModalVisible, contactInfo, activeCode, activeResult, activeSuccess, image, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BankModal
          bankAccName={contactInfo.bankAccName}
          bankAccNo={contactInfo.bankAccNo}
          bankName={contactInfo.bankName}
          email={contactInfo.email}
          note={contactInfo.note}
          phone={contactInfo.phone}
          price={contactInfo.price}
          disable={modalVisible}
          onPressClose={() => { this.closeModal('bank') }}
        />
        {/* <Image
          source={{ uri: 'file:///storage/emulated/0/Download/abc.png' }}
          style={{ height: scale(200), width: scale(200) }}
        /> */}
        <Modal transparent visible={activeModalVisible} statusBarTranslucent>
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
                      <TouchableOpacity activeOpacity={0.5} onPress={() => { this.closeModal('active') }}>
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
                    maxLength={24}
                    placeholder="Active Code"
                    underlineColorAndroid='transparent'
                    onChangeText={this.onHiddenInputChangeText}
                    // onSubmitEditing={() => { this.refs.hiddenInput.blur(); }}
                    value={activeCode}
                  />
                </View>
                {
                  activeResult
                    ?
                    (activeSuccess
                      ?
                      <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Image
                          source={require('../../assets/images/success_icon.png')}
                          style={{ height: scale(36), width: scale(36) }}
                        />
                      </View>
                      :
                      <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.errorText}>
                          *Series key của bạn không đúng*
                        </Text>
                      </View>
                    )
                    :
                    <View></View>
                }
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <DefaultButton
                    disable={activeSuccess}
                    text='ACTIVE'
                    width={WIDTH * 0.7}
                    height={scale(64)}
                    textSize={moderateScale(16)}
                    onPress={() => { this.onSendActiveCode() }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => this.onGoBankScreen()}
              style={{ marginTop: 14, marginLeft: 14 }}>
              <Image style={styles.buttonLogo}
                source={require("../../assets/images/home_button_bank.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => { this.openModal('active') }}
              style={{ marginTop: 14, marginRight: 14 }}
              disabled={isActive}>
              {
                isActive ?
                  <Image style={styles.buttonLogo}
                    source={require('../../assets/images/home_button_active_on.png')}
                  />
                  :
                  <Image style={styles.buttonLogo}
                    source={require('../../assets/images/home_button_active.png')}
                  />
              }
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Image
              source={require("../../assets/images/home_deco.png")}
              style={styles.homeLogo}
            />
            <View style={{ marginTop: 16 }} />
            <CategoryButton
              type="Building"
              text='XÂY DỰNG'
              onPress={() => this.props.navigation.navigate('Building')}
            />
            <View style={{ marginTop: 16 }} />
            <CategoryButton
              type="Architecture"
              text='KIẾN TRÚC SƯ'
              onPress={() => this.props.navigation.navigate('Architecture')}
            />
          </View>
        </ScrollView>
        <View style={{ alignItems: 'center', alignContent: 'center', textAlign: 'center', marginBottom: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%' }}>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => this.onOpenZaLo()}>
              <Image style={styles.buttonLogo}
                source={require("../../assets/images/zalo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => this.onOpenFacebook()}>
              <Image style={styles.buttonLogo}
                source={require("../../assets/images/facebook.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => this.onOpenTelegram()}>
              <Image style={styles.buttonLogo}
                source={require("../../assets/images/telegram.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => this.onOpenTwitter()}>
              <Image style={styles.buttonLogo}
                source={require("../../assets/images/twitter.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => this.onOpenPhone()}>
              <Image style={styles.buttonLogo}
                source={require("../../assets/images/phone.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          isLoading === true ? <ActivityIndicator
            animating={true}
            size='large'
            style={styles.loading}
            color='black' />
            : <View />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2DBFF',
  },
  homeLogo: {
    width: scale(290),
    height: scale(212),
  },
  buttonLogo: {
    width: scale(32),
    height: scale(32),
  },
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
  },
  errorText: {
    fontFamily: FontFamily.RobotoRegular,
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: '#C00E0E'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});