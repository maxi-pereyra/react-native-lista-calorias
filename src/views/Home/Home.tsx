import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
//import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types' 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../types/Index'
import Header from '../../components/Header/Header'

import { Button , Icon} from '@rneui/themed'

const Home = () => {
  const { navigate }= useNavigation<NativeStackNavigationProp<RootStackParams, 'Home'>>()
  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  }
  return (
    <View style={styles.container}>
        <Header/>
        <View>
          <View style={styles.leftContainer}>
            <Text style={styles.caloriesLegend}></Text>
          </View>
          <View style={styles.rightContainer}>
            <Button icon={<Icon name='start' type='material' color="#fff"/>} radius="lg" color="#4ecb71"
            onPress={handleAddCaloriesPress}/>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 12,
    backgroundColor: '#FFF',
    flex:1,
  },
  leftContainer:{
    flex: 1,
    justifyContent: 'center'
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caloriesLegend:{
    fontSize: 20,
  }
})

export default Home