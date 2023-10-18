import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, YellowBox, ScrollView } from 'react-native'
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

export default class BiddingQuizScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
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
            timer: 60 * 60,
            isOnLuyen: props.route.params.isOnLuyen,
        }
        this.bottomSheet = new Animated.ValueXY({ x: 0, y: (HEIGHT - 470) })
        this.getStorageDataMaster();
    }

    getStorageDataMaster = async () => {
        try {
            var objs = await AsyncStorage.getItem('biddingDataList');
            var data = []
            JSON.parse(objs).forEach(element => {
                // console.log(element.trueAnswer);
                data.push({ content: element.content, answers: element.answers, trueAnswer: element.trueAnswer, choice: '' });
            });

            this.setState({
                questions: this.shuffle(data, this.state.isOnLuyen ? 0 : 60),
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }

    onClickNextAnswer = (value) => {
        value += 1;
        this.setState({
            current: value,
        });
        this.checkArrow(value);
    }

    onClickPrevAnswer = (value) => {
        value -= 1;
        this.setState({
            current: value,
        });
        this.checkArrow(value);
    }

    onGoFinalResultScreen() {
        var results = [];
        var totalAnswer = 0;
        var totalCorrect = 0;
        this.state.questions.forEach(element => {
            if (element.choice != "") {
                if (element.trueAnswer[0] == element.choice) {
                    totalCorrect += 1;
                }
            }
        });
        results.push({ 'TypeName': this.state.isOnLuyen == true ? "Ôn luyện trắc nghiệm" : "Thi thử trắc nghiệm", 'Result': totalCorrect + "/" + this.state.questions.length });
        var isPassed = (totalCorrect / this.state.questions.length) > 0.8;
        this.props.navigation.navigate('FinalResult', { results: results, point: totalCorrect + "/" + this.state.questions.length, isPassed: isPassed, title: 'ĐẤU THẦU', goBack: 2, isOnLuyen: this.state.isOnLuyen });
    }

    checkArrow(value) {
        if (value == this.state.questions.length - 1) {
            this.setState({
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

    answerHide = () => {
        this.setState({
            hideAnswer: false
        });
        Animated.timing(this.bottomSheet, {
            toValue: { x: 0, y: (HEIGHT - 170) },
            duration: 200
        }).start()
    }

    answerShow = () => {
        this.setState({
            hideAnswer: true
        });
        Animated.timing(this.bottomSheet, {
            toValue: { x: 0, y: (HEIGHT - 470) },
            duration: 200
        }).start()
    }

    openModal(value) {
        this.setState({
            modalVisible: !value,
        })
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
        if (this.state.isOnLuyen == true) clearInterval(this.interval);
        else {
            this.interval = setInterval(
                () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
                1000
            );
        }
    }

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.onGoFinalResultScreen();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { current, questions, hideAnswer, leftArrowVisible, rightArrowVisible, modalVisible, isOnLuyen, timer } = this.state;
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
        var minutes = Math.floor(timer / 60);
        var seconds = timer - minutes * 60;
        return (
            <View style={styles.container}>
                <Header
                    Left='back'
                    Right={right}
                    Body={isOnLuyen == true ? 'ÔN LUYỆN' : ('THI THỬ - ' + minutes + ':' + seconds)}
                    onPress={() => { this.props.navigation.goBack() }}
                />
                <TotalResultModal
                    answer={questions}
                    disable={modalVisible}
                    height={(HEIGHT - 125)}
                    isOnLuyen={isOnLuyen}
                    onChooseQuestion={this.chooseQuestion}
                    onCloseModel={() => { this.openModal(modalVisible) }}
                />
                <View style={{ marginTop: 10 }}></View>
                {
                    questions[current] != null
                        ?
                        (
                            <View style={{ flex: 1 }}>
                                <QuizLabel
                                    text={'Câu ' + (current + 1) + ': '}
                                />
                                <View style={{ paddingLeft: 10, paddingRight: 10, height: HEIGHT - 270 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <Text style={styles.question}>{questions[current].content}</Text>
                                        {/* <RenderHtml
                                            tagsStyles={{ p: { color: '#58585A' } }}
                                            contentWidth={WIDTH}
                                            source={{ html: questions[current].content }}
                                        /> */}
                                    </ScrollView>
                                </View>
                                <Animated.View style={[styles.bottomSheet, this.bottomSheet.getLayout()]}>
                                    <AnswerBottomSheet
                                        answer={questions[current].answers}
                                        choice={questions[current].choice}
                                        trueAnswer={questions[current].trueAnswer}
                                        onPressHide={() => this.answerHide()}
                                        onPressShow={() => this.answerShow()}
                                        onChooseAnswer={this.chooseAnswer}
                                        hideAnswer={hideAnswer}
                                        height={HEIGHT - 310}
                                        isOnLuyen={isOnLuyen}
                                    />
                                </Animated.View>
                                <Footer
                                    text={'CÂU ' + (current + 1) + '/' + questions.length}
                                    onPressNext={() => this.onClickNextAnswer(current)}
                                    onPressPrev={() => this.onClickPrevAnswer(current)}
                                    leftArrowVisible={leftArrowVisible}
                                    rightArrowVisible={rightArrowVisible}
                                />
                            </View>
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
        backgroundColor: '#E9EDF0',
    },
    question: {
        paddingTop: 10,
        fontFamily: FontFamily.RobotoMedium,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        color: '#000000',
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
    },
    content: {
        fontFamily: FontFamily.RobotoRegular,
        fontSize: moderateScale(14),
        color: "#000000",
        textAlign: "left",
    }
});