import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Meal, RootStackParams } from '../../types/Index'
import Header from '../../components/Header/Header'
import { Button , Icon} from '@rneui/themed'
import useFoodStorage from '../../hooks/useFoodStorage'
import TodayCalories from '../../components/TodayCalories'
import { TodayCaloriesProp } from '../../types/Index'
import TodayMeals from '../../components/TodaysMeals/TodaysMeals'

const TotalCaloriesPerDay = 2000;

const Home = () => {
  const [todayFood,setTodayFood] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProp>();
  const {onGetTodayFood} = useFoodStorage();

  const { navigate }= useNavigation<NativeStackNavigationProp<RootStackParams, 'Home'>>()
  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  }

  const calculateStatistics = (meals: Meal[]) => {
    const caloriesConsumed = meals.reduce((acum,curr)=> acum + Number(curr.calories), 0);
    const remainingCalories = TotalCaloriesPerDay - caloriesConsumed
    const porcentage = (caloriesConsumed / TotalCaloriesPerDay)* 100;

    setTodayStatistics({
      total: TotalCaloriesPerDay,
      consumed: caloriesConsumed,
      percentage: porcentage,
      remaining: remainingCalories,
    })
  }

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = (await onGetTodayFood() as Meal[]);
      calculateStatistics(todayFoodResponse)
      setTodayFood(todayFoodResponse);
      
    } catch (error) {
      setTodayFood([]);
      console.log(error)
    }
  },[]);

  useFocusEffect( useCallback( () => {
    loadTodayFood().catch(null)
  },[loadTodayFood])
  );

  return (
    <View style={styles.container}>
        <Header/>
        <View>
          <View style={styles.buttonContainer}>
            <Button icon={<Icon name='add-circle-outline' type='material' color="#fff"/>} 
            radius="lg" 
            color="#4ecb71"
            onPress={handleAddCaloriesPress}/>
          </View>
          <TodayCalories {...todayStatistics} />
          <TodayMeals foods={todayFood} onCompleteAddRemove={()=>loadTodayFood()}/>
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
  buttonContainer:{
    alignItems: 'flex-end',
    justifyContent: 'center',
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