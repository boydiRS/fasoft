import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, YellowBox, ScrollView, Alert, BackHandler } from 'react-native'
import React, { Component } from 'react'
import Header from '../components/Header';
import QuizLabel from '../components/QuizLabel';
import Footer from '../components/Footer';
import { HEIGHT, moderateScale, WIDTH } from '../components/ScaleRes';
import AnswerBottomSheet from '../components/AnswerBottomSheet';
import SelectDropdown from 'react-native-select-dropdown'
import * as FontFamily from '../constants/FontFamily';
import update from 'immutability-helper';
import TotalResultModal from '../components/TotalResultModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class BuildingQuizScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            currentType: 0,
            questions: [
                {
                    content: '',
                    answers: [''],
                    trueAnswer: [''],
                    choice: '',
                },
            ],
            hideAnswer: true,
            modalVisible: true,
            leftArrowVisible: false,
            rightArrowVisible: true,
            timer: (props.route.params.userChooseType == "1" ? 60 * 30 : 60 * 12),
            userChooseType: props.route.params.userChooseType,
            quizType: (props.route.params.userChooseType == "2" ? ["CÂU HỎI PHÁP LUẬT CHUNG", "CÂU HỎI PHÁP LUẬT RIÊNG"] : ["CÂU HỎI PHÁP LUẬT CHUNG", "CÂU HỎI PHÁP LUẬT RIÊNG", "CÂU HỎI CHUYÊN MÔN"]),
        }
        this.bottomSheet = new Animated.ValueXY({ x: 0, y: (HEIGHT - 410) })
        this.getStorageDataMaster(props.route.params.idCate, props.route.params.parentId);
    }

    getStorageDataMaster = async (idCate, parentId) => {
        try {
            var objs = await AsyncStorage.getItem('buildingDataList');
            var data = [], data_1 = [], data_2 = [], data_3 = [];
            JSON.parse(objs).forEach(element => {
                if (element.type == "1") {
                    data_1.push({ content: element.content, answers: element.answers, trueAnswer: element.trueAnswer, choice: '', type: 'CÂU HỎI PHÁP LUẬT CHUNG' });
                }
                if (element.idCate == parentId && element.type == "2") {
                    data_2.push({ content: element.content, answers: element.answers, trueAnswer: element.trueAnswer, choice: '', type: 'CÂU HỎI PHÁP LUẬT RIÊNG' });
                }
                if (element.idCate == idCate && element.type == "3") {
                    data_3.push({ content: element.content, answers: element.answers, trueAnswer: element.trueAnswer, choice: '', type: 'CÂU HỎI CHUYÊN MÔN' });
                }
            });
            data.push(this.shuffle(data_1, 0));
            data.push(this.shuffle(data_2, 0));
            data.push(this.shuffle(data_3, 0));
            this.setState({
                questions: data,
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.openConfirm
        );
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.openConfirm);
    }

    onClickNextAnswer = (value) => {
        if (this.state.questions[this.state.currentType].length - 1 > value) {
            value += 1;
            this.setState({
                current: value,
            });
            this.checkArrow(value);
        }
    }

    onClickPrevAnswer = (value) => {
        if (value != 0) {
            value -= 1;
            this.setState({
                current: value,
            });
            this.checkArrow(value);
        }
    }

    checkArrow(value) {
        if (this.state.questions[this.state.currentType].length == 1) {
            this.setState({
                leftArrowVisible: false,
                rightArrowVisible: false,
            });
        }
        else {
            if (value == this.state.questions[this.state.currentType].length - 1) {
                this.setState({
                    leftArrowVisible: true,
                    rightArrowVisible: false,
                });
            }
            else if (value == 0) {
                this.setState({
                    leftArrowVisible: false,
                    rightArrowVisible: true,
                });
            }
            else {
                this.setState({
                    leftArrowVisible: true,
                    rightArrowVisible: true,
                });
            }
        }
    }

    onGoFinalResultScreen() {
        var results = [];
        var totalAnswer = 0;
        var totalAnswerCorrect = 0;

        // var totalAnswerGeneralCorrect = 0;
        // var totalAnswer1 = 0;
        // var totalCorrect1 = 0;
        // var totalAnswer2 = 0;
        // var totalCorrect2 = 0;
        // var totalAnswer3 = 0;
        // var totalCorrect3 = 0;

        // this.state.questions.forEach(element => {
        //     totalAnswer += 1;
        //     if (element.type == "CÂU HỎI PHÁP LUẬT CHUNG") {
        //         totalAnswer1 += 1;
        //         if (element.choice != "") {
        //             if (element.trueAnswer[0] == element.choice) {
        //                 totalCorrect1 += 1;
        //                 totalAnswerCorrect += 1;
        //                 totalAnswerGeneralCorrect += 1;
        //             }
        //         }
        //     }
        //     else if (element.type == "CÂU HỎI PHÁP LUẬT RIÊNG") {
        //         totalAnswer2 += 1;
        //         if (element.choice != "") {
        //             if (element.trueAnswer[0] == element.choice) {
        //                 totalCorrect2 += 1;
        //                 totalAnswerCorrect += 1;
        //                 totalAnswerGeneralCorrect += 1;
        //             }
        //         }
        //     }
        //     else {
        //         totalAnswer3 += 1;
        //         if (element.choice != "") {
        //             if (element.trueAnswer[0] == element.choice) {
        //                 totalCorrect3 += 1;
        //                 totalAnswerCorrect += 1;
        //             }
        //         }
        //     }
        // });

        // results.push({
        //     'TypeName': "CÂU HỎI PHÁP LUẬT CHUNG",
        //     'Result': (totalCorrect1 + "/" + totalAnswer1)
        // });

        // results.push({
        //     'TypeName': "CÂU HỎI PHÁP LUẬT RIÊNG",
        //     'Result': (totalCorrect2 + "/" + totalAnswer2)
        // });

        // if (this.state.userChooseType == 1) {
        //     results.push({
        //         'TypeName': "CÂU HỎI CHUYÊN MÔN",
        //         'Result': (totalCorrect3 + "/" + totalAnswer3)
        //     });
        // }

        for (let index = 0; index < this.state.quizType.length; index++) {
            totalAnswer += this.state.questions[index].length;
            var totalCorrect = 0;
            this.state.questions[index].forEach(element => {
                if (element.choice != "") {
                    if (element.trueAnswer[0] == element.choice) {
                        totalCorrect += 1;
                        totalAnswerCorrect += 1;
                    }
                }
            });
            results.push({ 'TypeName': this.state.quizType[index], 'Result': totalCorrect + "/" + this.state.questions[index].length });
        }
        var isPassed = true;

        this.props.navigation.navigate('FinalResult', {
            results: results,
            point: (totalAnswerCorrect + "/" + totalAnswer),
            isPassed: isPassed,
            title: 'XÂY DỰNG',
            goBack: 3,
            isOnLuyen: true
        });
    }

    chooseAnswer = (value) => {
        const questionUpdate = update(this.state.questions, {
            [this.state.currentType]: {
                [this.state.current]: {
                    choice: { $set: value }
                }
            }
        });
        this.setState({
            questions: questionUpdate,
        });
    }

    chooseQuestion = (value) => {
        this.setState({
            current: value,
        })
        this.checkArrow(value);
    }

    openModal(value) {
        this.setState({
            modalVisible: !value,
        })
    }

    openConfirm = () => {
        Alert.alert(
            "",
            "Bạn có chắc muốn thoát?",
            [
                {
                    text: "Thoát",
                    onPress: () => {
                        this.props.navigation.goBack();
                    },
                },
                {
                    text: "Tiếp tục",
                },
            ]
        );
        return true;
    }

    shuffle(array, numberItem) {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        if (numberItem == 0) return array;
        return array.slice(0, numberItem);
    }

    render() {
        const { current, currentType, questions, hideAnswer, leftArrowVisible, rightArrowVisible, modalVisible, quizType, timer } = this.state;
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        let right = (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { this.onGoFinalResultScreen() }} style={{ marginRight: 15 }}>
                    <Text style={styles.txtHeader}>KẾT THÚC</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { this.openModal(modalVisible) }} style={{ marginRight: 10 }}>
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={require('../../assets/images/result_button.png')} />
                </TouchableOpacity>
            </View>
        );
        return (
            <View style={styles.container}>
                <Header
                    Left='back'
                    Right={right}
                    Body='ÔN LUYỆN'
                    onPress={() => this.openConfirm()}
                />
                <TotalResultModal
                    answer={questions[currentType]}
                    disable={modalVisible}
                    height={(HEIGHT - 125)}
                    onChooseQuestion={this.chooseQuestion}
                    onCloseModel={() => { this.openModal(modalVisible) }}
                />
                <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                    <SelectDropdown
                        data={quizType}
                        onSelect={(selectedItem, index) => {
                            this.setState({
                                current: 0,
                                currentType: index,
                            })
                            this.checkArrow(0);
                        }}
                        defaultValueByIndex={currentType}
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
                            );
                        }}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                        statusBarTranslucent
                    />
                </View>
                {
                    questions[currentType][current] != null
                        ?
                        (
                            <GestureRecognizer
                                onSwipeLeft={(state) => this.onClickNextAnswer(current)}
                                onSwipeRight={(state) => this.onClickPrevAnswer(current)}
                                config={config}
                                style={{ flex: 1 }}
                            >
                                <View style={{ height: HEIGHT - 130 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <QuizLabel
                                            text={'Câu ' + (current + 1) + ': '}
                                        />
                                        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
                                            <Text style={styles.question}>{questions[currentType][current].content}</Text>
                                        </View>
                                        <QuizLabel
                                            text='Trả lời:'
                                        />
                                        <AnswerBottomSheet
                                            answer={questions[currentType][current].answers}
                                            choice={questions[currentType][current].choice}
                                            trueAnswer={questions[currentType][current].trueAnswer}
                                            onChooseAnswer={this.chooseAnswer}
                                            isOnLuyen='true'
                                        />
                                    </ScrollView>
                                </View>
                                <Footer
                                    text={'CÂU ' + (current + 1) + '/' + questions[currentType].length}
                                    onPressNext={() => this.onClickNextAnswer(current)}
                                    onPressPrev={() => this.onClickPrevAnswer(current)}
                                    leftArrowVisible={leftArrowVisible}
                                    rightArrowVisible={rightArrowVisible}
                                />
                            </GestureRecognizer>
                        )
                        :
                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={styles.content}>Bộ câu hỏi đang được cập nhật.</Text>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    question: {
        paddingTop: 10,
        fontFamily: FontFamily.RobotoRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000',
    },
    content: {
        fontFamily: FontFamily.RobotoRegular,
        fontSize: moderateScale(14),
        color: "#000000",
        textAlign: "left",
    },
    bottomSheet: {
        width: '100%',
        position: "absolute",
    },
    txtHeader: {
        fontFamily: FontFamily.RobotoRegular,
        fontSize: moderateScale(16),
        textAlign: "center",
        color: 'white'
    },
    dropdown1BtnStyle: {
        width: "95%",
        height: 56,
        backgroundColor: "#FFFFFF",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#BABABA'
    },
    dropdown1BtnTxtStyle: {
        fontFamily: FontFamily.RobotoRegular,
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: "#000000",
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
        fontFamily: FontFamily.RobotoRegular,
        fontSize: moderateScale(14),
        color: "#000000",
        textAlign: "left"
    }
});