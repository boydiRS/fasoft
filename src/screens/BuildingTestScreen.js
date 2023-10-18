import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, YellowBox, ScrollView, Alert, BackHandler } from 'react-native'
import React, { Component } from 'react'
import Header from '../components/Header';
import QuizLabel from '../components/QuizLabel';
import Footer from '../components/Footer';
import { HEIGHT, moderateScale, WIDTH } from '../components/ScaleRes';
import AnswerBottomSheet from '../components/AnswerBottomSheet';
import * as FontFamily from '../constants/FontFamily';
import update from 'immutability-helper';
import TotalResultModal from '../components/TotalResultModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper'

export default class BuildingTestScreen extends Component {
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
            if (this.state.userChooseType == 1) {
                data = this.shuffle(data_1, 3).concat(this.shuffle(data_2, 2), this.shuffle(data_3, 20));
            } else {
                data = this.shuffle(data_1, 5).concat(this.shuffle(data_2, 5));
            }
            var i = 0;
            data.forEach(element => {
                element.key = i++;
            });
            this.setState({
                questions: data,
            });
        } catch (e) {
            console.log(e);
        }
    }

    onClickNextAnswer = (value) => {
        if (this.state.questions.length - 1 > value) {
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
        if (this.state.questions.length == 1) {
            this.setState({
                leftArrowVisible: false,
                rightArrowVisible: false,
            });
        }
        else {
            if (value == this.state.questions.length - 1) {
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
        var totalAnswerGeneralCorrect = 0;

        var totalAnswer1 = 0;
        var totalCorrect1 = 0;
        var totalAnswer2 = 0;
        var totalCorrect2 = 0;
        var totalAnswer3 = 0;
        var totalCorrect3 = 0;

        this.state.questions.forEach(element => {
            totalAnswer += 1;
            if (element.type == "CÂU HỎI PHÁP LUẬT CHUNG") {
                totalAnswer1 += 1;
                if (element.choice != "") {
                    if (element.trueAnswer[0] == element.choice) {
                        totalCorrect1 += 1;
                        totalAnswerCorrect += 1;
                        totalAnswerGeneralCorrect += 1;
                    }
                }
            }
            else if (element.type == "CÂU HỎI PHÁP LUẬT RIÊNG") {
                totalAnswer2 += 1;
                if (element.choice != "") {
                    if (element.trueAnswer[0] == element.choice) {
                        totalCorrect2 += 1;
                        totalAnswerCorrect += 1;
                        totalAnswerGeneralCorrect += 1;
                    }
                }
            }
            else {
                totalAnswer3 += 1;
                if (element.choice != "") {
                    if (element.trueAnswer[0] == element.choice) {
                        totalCorrect3 += 1;
                        totalAnswerCorrect += 1;
                    }
                }
            }
        });

        results.push({
            'TypeName': "CÂU HỎI PHÁP LUẬT CHUNG",
            'Result': ((totalCorrect1 * 4) + "/" + (totalAnswer1 * 4))
        });

        results.push({
            'TypeName': "CÂU HỎI PHÁP LUẬT RIÊNG",
            'Result': ((totalCorrect2 * 4) + "/" + (totalAnswer2 * 4))
        });

        if (this.state.userChooseType == 1) {
            results.push({
                'TypeName': "CÂU HỎI CHUYÊN MÔN",
                'Result': ((totalCorrect3 * 4) + "/" + (totalAnswer3 * 4))
            });
        }

        var isPassed = true;
        if (this.state.userChooseType == "1")
            isPassed = (totalAnswerGeneralCorrect >= 4 && totalAnswerCorrect >= 20);
        else
            isPassed = (totalAnswerCorrect >= 8);

        this.props.navigation.navigate('FinalResult', {
            results: results,
            point: ((totalAnswerGeneralCorrect * 4) + "/" + (totalAnswer * 4)),
            isPassed: isPassed,
            title: 'XÂY DỰNG',
            goBack: 3,
            isOnLuyen: false
        });
    }

    chooseAnswer = (value) => {
        const questionUpdate = update(this.state.questions, {
            [this.state.current]: {
                choice: { $set: value }
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

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.openConfirm
        );
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.onGoFinalResultScreen();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        BackHandler.removeEventListener("hardwareBackPress", this.openConfirm);
    }

    renderPagination(index, total, context) {
        return (
            <View style={styles.paginationStyle}>
                <Text style={{ color: 'grey' }}>
                    <Text style={styles.paginationText}>{index + 1}</Text>/{total}
                </Text>
            </View>
        )
    }

    render() {
        const { current, currentType, questions, hideAnswer, leftArrowVisible, rightArrowVisible, modalVisible, quizType, timer } = this.state;
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        const right = (
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
        var minutes = Math.floor(timer / 60);
        var seconds = timer - minutes * 60;
        return (
            <View style={styles.container}>
                <Header
                    Left='back'
                    Right={right}
                    Body='THI THỬ'
                    onPress={() => this.openConfirm()}
                />
                <TotalResultModal
                    answer={questions}
                    disable={modalVisible}
                    height={(HEIGHT - 125)}
                    isOnLuyen={false}
                    onChooseQuestion={this.chooseQuestion}
                    onCloseModel={() => { this.openModal(modalVisible) }}
                />
                {
                    questions[current] != null
                        ?
                        (
                            // <Swiper renderPagination={renderPagination()} loop={false}>
                            //     {
                            //         questions.map((question) => {
                            //             return (
                            //                 <View style={{ flex: 1 }} key={question.key}>
                            //                     <QuizLabel
                            //                         text={'Câu ' + (question.key + 1) + ': '}
                            //                     />
                            //                     <Text style={styles.question}>{question.content}</Text>
                            //                     <AnswerBottomSheet
                            //                         answer={question.answers}
                            //                         choice={question.choice}
                            //                         trueAnswer={question.trueAnswer}
                            //                         onPressHide={() => this.answerHide()}
                            //                         onPressShow={() => this.answerShow()}
                            //                         onChooseAnswer={this.chooseAnswer}
                            //                         hideAnswer={hideAnswer}
                            //                         height={HEIGHT - 355}
                            //                         isOnLuyen={isOnLuyen}
                            //                     />
                            //                 </View>
                            //             )
                            //         })}
                            // </Swiper>
                            <GestureRecognizer
                                onSwipeLeft={(state) => this.onClickNextAnswer(current)}
                                onSwipeRight={(state) => this.onClickPrevAnswer(current)}
                                config={config}
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                            >
                                <View style={{ height: HEIGHT - 130 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={{ alignItems: 'center', }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.question, { color: '#3F6DB1' }]}>Thời gian còn lại: </Text>
                                                <Text style={[styles.question, { color: '#3F6DB1' }]}>{minutes + ':' + seconds}</Text>
                                            </View>
                                        </View>
                                        <QuizLabel
                                            text={'Câu ' + (current + 1) + ': '}
                                        />
                                        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
                                            <Text style={styles.question}>{questions[current].content}</Text>
                                        </View>
                                        <QuizLabel
                                            text='Trả lời:'
                                        />
                                        <AnswerBottomSheet
                                            answer={questions[current].answers}
                                            choice={questions[current].choice}
                                            trueAnswer={questions[current].trueAnswer}
                                            onChooseAnswer={this.chooseAnswer}
                                            isOnLuyen={false}
                                        />
                                    </ScrollView>
                                </View>
                                <Footer
                                    text={'CÂU ' + (current + 1) + '/' + questions.length}
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