import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParams } from '../types/Index';
import Home from '../views/Home/Home';
import AddFood from '../views/AddFood/AddFood';

const Stack = createNativeStackNavigator<RootStackParams>();

const RouterScreenDefaultOptions = {
    headerStyle: {
        backgroundColor: 'rgba(7,26,93,255)',

    },
    headerTitleStyle:{
        color:'#fff',
    },
}
const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' >
            <Stack.Screen name='Home' component={Home} options={RouterScreenDefaultOptions}/>
            <Stack.Screen name='AddFood' component={AddFood} options={RouterScreenDefaultOptions}/>
        </Stack.Navigator>
    </NavigationContainer>
  )

export default Routes