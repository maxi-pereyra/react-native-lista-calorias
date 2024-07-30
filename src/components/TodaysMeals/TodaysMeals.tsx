import React, {FC} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { Meal } from '../../types/Index'
import Meal_item from '../Meal_item'

type TodayMealsProps = {
    foods: Meal [],
    onCompleteAddRemove?: () => void;
}

const  TodayMeals: FC<TodayMealsProps> = ({foods, onCompleteAddRemove}) => {
   
  return (
    <View style={styles.container}>
            <Text style={styles.title}> Comidas </Text> 
            <View style={styles.content}>
                <ScrollView>
                    {foods?.map((meal:Meal,index)=> <Meal_item key={`today-meal-item-${meal.name}-${index}`} 
                        {...meal}
                        onCompleteAddRemove={onCompleteAddRemove}
                        itemPosition={index}/>)}
                </ScrollView>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 12,
        backgroundColor: 'red'
    },
    title: {
        fontSize: 16,
        marginBottom:4
    },
    content: {
        marginVertical: 10
    }
})

export default TodayMeals
