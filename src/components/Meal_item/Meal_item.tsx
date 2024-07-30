import React, {FC} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import { Meal } from '../../types/Index'
import { Button, Icon } from '@rneui/themed'
import useFoodStorage from '../../hooks/useFoodStorage'

type MealItemProps = Meal & {
    isAbleToadd?: boolean;
    onCompleteAddRemove?: ()=>void;
    itemPosition?:number;
}
const  Meal_item: FC<MealItemProps> = ( {calories, portion, name, isAbleToadd,onCompleteAddRemove,itemPosition}) => {
    const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();

    const handleIconPress = async () => {
        try {
            if(isAbleToadd){
                await onSaveTodayFood({calories,portion,name})
                Alert.alert('comida agregada al dia')
            }else{
                await onDeleteTodayFood(itemPosition ?? -1);
                Alert.alert('comida eliminada')
            }
            onCompleteAddRemove?.();
        } catch (error) {
            console.log(error)
            Alert.alert('comida no agregada')
        }
    };
    
  return (
    <View style={styles.container}>
        <View style={styles.leftContainer}>
        <Text style={styles.name}> {name} </Text>
        <Text style={styles.portion}> {portion} </Text>

        </View>
        <View>
        <Text style={styles.rifghtContainer}>  </Text>
            <Button
                icon={<Icon name={isAbleToadd ? 'add-circle-outline' : "close"}/>}
                type='clear' 
                style={styles.iconButton}
                onPress={handleIconPress}/>
            <Text style={styles.calories}> `${calories} cal`  </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ade8af",
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        flexDirection: 'row',
    },
    leftContainer:{
        flex: 1,
        justifyContent: "center",
    },
    rifghtContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    name:{
        fontSize: 18,
        fontWeight: 500,
    },
    calories:{
        fontSize: 18,
    },
    portion:{
        fontSize: 13,
        color: "#808080",
        fontWeight: 500,
    },
    iconButton:{
        marginBottom: -8,
    }
})

export default Meal_item