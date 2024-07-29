import React, { useState } from 'react'
import { View, StyleSheet, Text, Alert} from 'react-native'
import Header from '../../components/Header/Index'
import { Button, Icon, Input } from '@rneui/themed'
import AddFoodModal from '../../components/AddFoodModal/AddFoodModal'
import useFoodStorage from '../../hooks/useFoodStorage'

const AddFood = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const { onGetFood } = useFoodStorage();

  const handleModalClose = (shouldUpdate?: boolean) => {
    if(shouldUpdate){
      Alert.alert('comida guardada exitosamente')
      //TODO
    }
    setVisible(!visible)
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
          <Input placeholder='apple,soda,...'/>
        </View>
            <Button  
            radius='lg'
            title='search'
            titleStyle={styles.searchBtnTitle}
            color="#ade8af"/>
      </View>
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
  }
})

export default AddFood