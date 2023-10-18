import axios from "axios";
import { Alert } from 'react-native';
import * as global from '../constants/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import md5 from 'md5';

const start_app_config = 'start-app-config';
const active_key = 'active-key';
const get_data = 'get-data';

// export function getStartAppConfig(sendData) {
//     var url = `${global.domain + start_app_config}?`;
//     return getAPI(url, )
// }

function callAPI(url, sendData, receiveSuccess, receiveError = null, method = 'POST') {
    const data = sendData.data;
    if (url.search('https://') === -1 && url.search('http://') === -1) {
        url = `${global.domain + url}?`;
    }
    else {
        url = `${url}?`;
    }

    for (const key in data) {
        url += `${key}=${data[key]}&`;
    }
    url = url.slice(0, url.length - 1);
    console.log(`[SEND]: ${url}`);

    return (method === 'POST') ?
        this.postAPI(url, sendData, receiveSuccess, receiveError) :
        this.getAPI(url, sendData, receiveError);
}

function postAPI(url, sendData) {
    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };
    return axios.post(global.domain + url, sendData, { headers })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return {
                "errCode": '1000',
                "message": 'Không tải được dữ liệu, vui lòng kiểm tra kết nối mạng và thử lại',
            }
        });
}

function getAPI(url, sendData) {
    return axios.get(global.domain + url, { params: sendData })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return {
                "errCode": '1000',
                "message": 'Không tải được dữ liệu, vui lòng kiểm tra kết nối mạng và thử lại',
            }
        });
}

function getCurrentTimestamp() {
    const d = new Date();
    return d.getTime();
}

function getDeviceInfo(){
    return (Platform.OS === 'ios') ? DeviceInfo.getUniqueID() : DeviceInfo.getDeviceId();
}

function getActiveKey() {
    return 'ZH92-2CXD-NIXB-YQOF-4F81';
}

function showAlrtNetWorkError() {
    Alert.alert(
        'Thông báo',
        'Không tải được dữ liệu, vui lòng kiểm tra kết nối mạng và thử lại',
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
    );
}

export function getDataApp(appName, key) {
    let timeStamp = getCurrentTimestamp();
    let deviceId = getDeviceInfo();
    let _secretKey = md5(deviceId + key + 'PMSH-XXX' + timeStamp);
    const article = {
        deviceId: deviceId,
        time: timeStamp,
        secretKey: _secretKey,
        app: appName,
    };
    return getAPI(get_data, article);
}

export function getStartInfo(key) {
    let timeStamp = getCurrentTimestamp();
    let deviceId = getDeviceInfo();
    let _secretKey = md5(deviceId + key + 'PMSH-XXX' + timeStamp);
    const article = {
        deviceId: deviceId,
        time: timeStamp,
        secretKey: _secretKey,
    };
    return getAPI(start_app_config, article);
}

export function activeKey(key) {
    const article = {
        deviceId: getDeviceInfo(),
        key: key,
        os: Platform.OS,
    };
    return postAPI(active_key, article);
}
