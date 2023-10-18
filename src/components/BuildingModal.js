import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable, StatusBar } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Col } from 'react-native-easy-grid';
import DefaultButton from './DefaultButton';
import { scale, moderateScale, verticalScale, WIDTH } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';

export default class BuildingModal extends Component {
    static propTypes = {
        isOnLuyen: PropTypes.bool,
        disable: PropTypes.bool,
        text: PropTypes.string,
        onPressClose: PropTypes.func,
        onPressNew: PropTypes.func,
        onPressDel: PropTypes.func,
    }

    static defaultProps = {
        disable: false,
        backgroundColor: '#FFFFFF',
    };

    render() {
        let detail;
        if (this.props.isOnLuyen == false) {
            detail = (
                <View>
                    <Text style={styles.boldText}>Thi sát hạch cấp mới:</Text>
                    <Text style={styles.defaultText}>Đề thi gồm: 25 câu/30 phút</Text>
                    <Text style={styles.defaultText}>- 3 câu: Pháp luật chung</Text>
                    <Text style={styles.defaultText}>- 2 câu: Pháp luật riêng</Text>
                    <Text style={styles.defaultText}>- 20 câu: Kiến thức chuyên môn</Text>
                    <Text style={styles.noteText}>Cá nhân có kết quả sát hạch phần kiến thức pháp luật tối thiểu 16 điểm và tổng điểm từ 80 điểm trở lên thì đạt yêu cầu.</Text>
                    <Text style={styles.boldText}>Thi sát hạch cấp chuyển đổi:</Text>
                    <Text style={styles.defaultText}>Đề thi gồm 10 câu/12 phút</Text>
                    <Text style={styles.defaultText}>- 5 câu: Pháp luật chung</Text>
                    <Text style={styles.defaultText}>- 5 câu: Pháp luật riêng</Text>
                    <Text style={styles.noteText}>Cá nhân có kết quả sát hạch từ 32 điểm trở lên thì đạt yêu cầu.</Text>
                </View>
            );
        }
        else {
            detail = (
                <View>
                    <Text style={styles.boldText}>Sát hạch cấp mới sẽ ôn tập:</Text>
                    <Text style={styles.defaultText}>Pháp luật chung, Pháp luật riêng và Chuyên môn.</Text>
                    <Text style={styles.boldText}>Sát hạch Miễn cấp chuyển đổi sẽ ôn tập:</Text>
                    <Text style={styles.defaultText}>Pháp luật chung, Pháp luật riêng.</Text>
                </View>
            );
        }
        return (
            <Modal transparent visible={this.props.disable} statusBarTranslucent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={styles.header}>
                                <Grid>
                                    <Col size={1} ></Col>
                                    <Col size={8} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.headerTitle}>
                                            {this.props.isOnLuyen ? 'LỰA CHỌN ÔN LUYỆN' : 'THI THỬ SÁT HẠCH'}
                                        </Text>
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
                                    Nội dung: {this.props.text}
                                </Text>
                                {detail}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <DefaultButton
                                text='SÁT HẠCH CẤP MỚI'
                                width={WIDTH * 0.7}
                                height={scale(64)}
                                textSize={moderateScale(16)}
                                onPress={this.props.onPressNew}
                            />
                            <View style={{ paddingTop: 20 }}></View>
                            <DefaultButton
                                text='SÁT HẠCH MIỄN CHUYÊN MÔN'
                                width={WIDTH * 0.7}
                                height={scale(64)}
                                textSize={moderateScale(16)}
                                onPress={this.props.onPressDel}
                            />
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
    noteText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'italic',
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
        alignItems: 'flex-start'
    },
    button: {
        paddingTop: 30,
    }
});