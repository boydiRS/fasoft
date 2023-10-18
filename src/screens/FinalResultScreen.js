import { View, Text, StyleSheet, Image, ScrollView, StatusBar } from 'react-native'
import React, { Component } from 'react'
import DefaultButton from '../components/DefaultButton'
import { moderateScale } from '../components/ScaleRes';
import * as FontFamily from '../constants/FontFamily';

export default class FinalResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPassed: props.route.params.isPassed,
            point: props.route.params.point,
            results: props.route.params.results,
            title: props.route.params.title,
            goBack: props.route.params.goBack,
            isOnLuyen: props.route.params.isOnLuyen,
        }
    }

    onGoQuizScreen() {
        this.props.navigation.pop(this.state.goBack);
    }

    onGoHomeScreen() {
        this.props.navigation.popToTop();
    }

    render() {
        const { results, isPassed, point, title, isOnLuyen } = this.state;
        let detailItem = [];
        let i = 0;
        results.forEach(element => {
            detailItem.push(
                <View>
                    {
                        i > 0 ? <View style={{ borderBottomColor: '#C4C4C4', borderBottomWidth: 1 }} /> : <View />
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, width: '100%', alignItems: 'center' }}>
                        <Text style={styles.detailText}>{element.TypeName}</Text>
                        <Text style={styles.detailText}>{element.Result}</Text>
                    </View>
                </View>
            );
            i++;
        });

        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.titleText, { marginTop: 15 }]}>KẾT QUẢ</Text>
                        <Text style={styles.titleText}>SÁT HẠCH CHỨNG CHỈ {title}</Text>
                        <Text style={styles.titlePointText}>{point}</Text>

                        {
                            isOnLuyen
                                ? <View></View>
                                : <View style={[isPassed ? styles.passArea : styles.noPasstArea, { marginTop: 10 }]}>
                                    <Text style={styles.resultText}>Kết quả: {isPassed ? 'ĐẠT' : 'KHÔNG ĐẠT'}</Text>
                                </View>
                        }
                        {
                            isPassed
                                ? <Image
                                    source={require("../../assets/images/pass_logo.png")}
                                    style={{ width: 218, height: 218, alignContent: "center", marginTop: 20 }}
                                />
                                : <Image
                                    source={require("../../assets/images/no_pass_logo.png")}
                                    style={{ width: 218, height: 218, alignContent: "center", marginTop: 20 }}
                                />
                        }

                        {/* <Text style={[styles.headerText, { width: '90%', alignItems: 'center', marginTop: 20 }]}>
                            Bạn đã sai tất cả 17 câu hỏi, bao gồm sai cả câu điểm liệt.
                        </Text> */}
                        <View style={[styles.detailArea, { marginTop: 15 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, width: '100%' }}>
                                <Text style={styles.headerText}>Trong đó</Text>
                                <Text style={styles.headerText}>Kết quả</Text>
                            </View>
                            {detailItem}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 20, marginBottom: 20 }}>
                            <DefaultButton
                                text='THI LẠI'
                                width={151}
                                height={64}
                                onPress={() => this.onGoQuizScreen()}
                            />
                            <DefaultButton
                                text='THOÁT'
                                width={151}
                                height={64}
                                backgroundColor='#C00E0E'
                                onPress={() => this.onGoHomeScreen()}
                            />
                        </View>
                    </View>
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
    noPasstArea: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 182,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#C00E0E'
    },
    passArea: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 182,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#7EB932'
    },
    detailArea: {
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '90%'
    },
    headerText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000'
    },
    detailText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000'
    },
    titleText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(18),
        lineHeight: moderateScale(21),
        color: '#000000'
    },
    titlePointText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(24),
        lineHeight: moderateScale(28),
        color: '#000000'
    },
    resultText: {
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#ffffff'
    }
});
