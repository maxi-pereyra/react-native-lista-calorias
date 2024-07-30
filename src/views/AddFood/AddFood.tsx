import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Alert, ScrollView} from 'react-native'
import Header from '../../components/Header/Index'
import { Button, Icon, Input } from '@rneui/themed'
import AddFoodModal from '../../components/AddFoodModal/AddFoodModal'
import useFoodStorage from '../../hooks/useFoodStorage'
import { Meal } from '../../types/Index'
import Meal_item from '../../components/Meal_item'

const AddFood = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const { onGetFood } = useFoodStorage();
  const [food , setFood] = useState<Meal[]>([]);
  const [search , setSearch] = useState<string>('')

  const loadFoods = async () =>{
    try {
      const foodsResponse = await onGetFood();
      setFood(foodsResponse)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    loadFoods().catch(null)
  },[]);

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if(shouldUpdate){
      Alert.alert('comida guardada exitosamente')
      loadFoods()
    }
    setVisible(!visible)
  }

  const handleSearchPress = async () => {
    try {
      const result = await onGetFood();
      setFood(result.filter((item: Meal)=>item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
    } catch (error) {
      setFood([])
    }
  }

  return (
    <View style={styles.container}>
      <Header>
        
      </Header>
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>AddFood</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
            <Button icon={<Icon name='add-circle-outline' color='#fff'/>} 
            radius='lg'
            color="#4ecb71"
            onPress={() => setVisible(true)}/>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder='apple,soda,...'
                 value={search}
                 onChangeText={(text: string) => setSearch(text)}/>
        </View>
            <Button  
            radius='lg'
            title='search'
            titleStyle={styles.searchBtnTitle}
            onPress={handleSearchPress}
            color="#ade8af"/>
      </View>
      <ScrollView style={styles.content}>
        {
          food?.map((meal) => <Meal_item key={`my-meal-item-${meal.name}`} {...meal} isAbleToadd   />)
        }
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{

  },
  addFoodContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  legendContainer:{
    flex:1,
  },
  addFoodBtnContainer:{
    flex: 1,
    alignItems: 'flex-end'
  },
  addFoodLegend:{
    fontSize:20,
  },
  searchContainer:{
    flexDirection: 'row',
    
  },
  inputContainer:{
    flex: 1,
  },
  searchBtnTitle:{
    fontSize: 14,
    color: '#000'
  },
  content:{

  }
})

export default AddFood