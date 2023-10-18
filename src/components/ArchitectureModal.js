import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable, StatusBar } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Col } from 'react-native-easy-grid';
import DefaultButton from './DefaultButton';
import { scale, moderateScale, verticalScale, WIDTH } from './ScaleRes';
import * as FontFamily from '../constants/FontFamily';

export default class ArchitectureModal extends Component {
    static propTypes = {
        disable: PropTypes.bool,
        title: PropTypes.string,
        text: PropTypes.string,
        isOnLuyen: PropTypes.bool,
        onPressClose: PropTypes.func,
        onPressNew: PropTypes.func,
        onPressDel: PropTypes.func,
    }

    static defaultProps = {
        disable: false,
        isOnLuyen: true,
        backgroundColor: '#FFFFFF',
    };

    render() {
        let detail;
        if (this.props.isOnLuyen == false) {
            detail = (
                <View>
                    <Text style={styles.boldText}>Sát hạch cấp mới:</Text>
                    <Text style={styles.defaultText}>Tổng cộng 30 câu / 30 phút</Text>
                    <Text style={styles.defaultText}>- 10 câu: Kinh nghiệm nghề nghiệp (40 điểm)</Text>
                    <Text style={styles.defaultText}>- 5 câu: Kiến thức chuyên môn (20 điểm)</Text>
                    <Text style={styles.defaultText}>- 5 câu: Kiến thức pháp luật (20 điểm)</Text>
                    <Text style={styles.defaultText}>- 5 câu: Quy tắc ứng xử nghề nghiệp (20 điểm)</Text>
                    <Text style={styles.defaultText}>Điểm đạt tối thiểu 70/100, pháp luật phải đạt tối thiểu 16/20.</Text>
                    <Text style={styles.boldText}>Thi cấp lại/ gia hạn chứng chỉ hành nghề:</Text>
                    <Text style={styles.defaultText}>Đề thi gồm 5 câu / 10 phút</Text>
                    <Text style={styles.defaultText}>- 5 câu: Quy tắc ứng xử nghề nghiệp (tối thiểu 16/20 điểm)</Text>
                </View>
            );
        }
        else {
            detail = (
                <View>
                    <Text style={styles.boldText}>Sát hạch cấp mới sẽ ôn tập:</Text>
                    <Text style={styles.defaultText}>Kinh nghiệm nghề nghiệp, Kiến thức pháp luật, Kiến thức chuyên môn, Quy tắc ứng xử nghề nghiệp.</Text>
                    <Text style={styles.boldText}>Sát hạch Miễn Chuyên Môn sẽ ôn tập:</Text>
                    <Text style={styles.defaultText}>Quy tắc ứng xử nghề nghiệp.</Text>
                </View>
            );
        }

        return (
            <Modal visible={this.props.disable} transparent statusBarTranslucent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={styles.header}>
                                <Grid>
                                    <Col size={1} ></Col>
                                    <Col size={8} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.headerTitle}>{this.props.title}</Text>
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
                                    {this.props.text}
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
                                text='THI CẤP LẠI, GIA HẠN'
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
        fontSize: moderateScale(16),
        lineHeight: moderateScale(18),
        color: '#3F6DB1'
    },
    defaultText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000',
    },
    boldText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000',
    },
    body: {
        alignItems: 'flex-start'
    },
    button: {
        paddingTop: 30,
    }
});