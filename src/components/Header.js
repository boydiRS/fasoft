import { View, Text, StyleSheet, Platform, TouchableOpacity, StatusBar } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconBack from './IconBack'
import { Grid, Col } from 'react-native-easy-grid';
import * as FontFamily from '../constants/FontFamily';
import { scale, moderateScale } from './ScaleRes';

class Header extends Component {
    static propTypes = {
        Left: PropTypes.string,
        LeftContent: PropTypes.any,
        Body: PropTypes.string,
        Right: PropTypes.any,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        Left: 'none',
        LeftContent: <View />,
        Right: <View />,
    };

    onPress() {
        this.props.onPress();
    }

    render() {
        let LeftContent;
        if (this.props.Left === 'back')
            LeftContent = (
                <TouchableOpacity onPress={() => { this.onPress() }}>
                    <IconBack />
                </TouchableOpacity>
            );
        return (
            <View>
                <StatusBar hidden />
                {/* <View style={styles.statusBar}></View> */}
                <View style={{ height: 64, backgroundColor: "#3F6DB1" }}>
                    <Grid>
                        <Col size={50} style={{ justifyContent: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                {this.props.Left === 'back' ? LeftContent : this.props.LeftContent}
                                <Text style={styles.txtHeader}>{this.props.Body}</Text>
                            </View>
                        </Col>
                        <Col size={50} style={{ justifyContent: 'center' }}>
                            {this.props.Right}
                        </Col>
                    </Grid>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios'
            ? HEIGHT === 812
                ? 44
                : 20
            : Platform.Version >= 21
                ? 20
                : 0,
        backgroundColor: "#1b3882"
    },
    txtHeader: {
        fontFamily: FontFamily.RobotoRegular,
        fontSize: moderateScale(16),
        textAlign: "center",
        color: 'white'
    },
});

export default Header