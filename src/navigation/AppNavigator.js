import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import BuildingHomeScreen from '../screens/BuildingHomeScreen';
import BuildingTrainingScreen from '../screens/BuildingTrainingScreen';
import BuildingQuizScreen from '../screens/BuildingQuizScreen';
import BiddingHomeScreen from '../screens/BiddingHomeScreen';
import BuildingTestScreen from '../screens/BuildingTestScreen';
import BiddingQuizScreen from '../screens/BiddingQuizScreen';
import ArchitectureHomeScreen from '../screens/ArchitectureHomeScreen';
import ArchitectureQuizScreen from '../screens/ArchitectureQuizScreen';
import ArchitectureTestScreen from '../screens/ArchitectureTestScreen';
import FinalResultScreen from '../screens/FinalResultScreen';
import TestScreen from '../screens/TestScreen';
import BankScreen from '../screens/BankScreen';

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    }

    return (
        // <ReduxProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                    <Stack.Screen name='Home' component={HomeScreen} />
                    <Stack.Screen name='Bank' component={BankScreen}/>
                    <Stack.Screen name="Building" component={BuildingHomeScreen} />
                    <Stack.Screen name='BuildingTraining' component={BuildingTrainingScreen} />
                    <Stack.Screen name='BuildingQuiz' component={BuildingQuizScreen} />
                    <Stack.Screen name='BuildingTest' component={BuildingTestScreen} />
                    <Stack.Screen name="Bidding" component={BiddingHomeScreen} />
                    <Stack.Screen name="BiddingQuiz" component={BiddingQuizScreen} />
                    <Stack.Screen name='Architecture' component={ArchitectureHomeScreen} />
                    <Stack.Screen name='ArchitectureQuiz' component={ArchitectureQuizScreen} />
                    <Stack.Screen name='ArchitectureTest' component={ArchitectureTestScreen} />
                    <Stack.Screen name='FinalResult' component={FinalResultScreen}/>
                    <Stack.Screen name='TestScreen' component={TestScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        // </ReduxProvider>
    )
}