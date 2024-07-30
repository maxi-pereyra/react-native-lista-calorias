import React, {FC} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import { TodayCaloriesProp } from '../../types/Index';

const TodayCalories: FC<TodayCaloriesProp> = ({total,consumed,remaining,percentage}) => {
  return (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
        <CircularProgress value={percentage}/>
    </View>
    <View style={styles.rightContainer}>
            <Text style={styles.today}>Today</Text>
            <View style={styles.rightItem}>
                <Text style={styles.rifhtItemLegend}>Total</Text>
                <Text style={styles.rightItemValue}>{total}</Text>
            </View>
            <View style={styles.rightItem}>
                <Text style={styles.rifhtItemLegend}>Consumed</Text>
                <Text style={styles.rightItemValue}>{consumed}</Text>
            </View>
            <View style={styles.rightItem}>
                <Text style={styles.rifhtItemLegend}>Remaining</Text>
                <Text style={styles.rightItemValue}>{remaining}</Text>
            </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    leftContainer:{
        flex:1
    },
    rightContainer:{
        flex: 1,
        justifyContent: 'center'
    },
    today:{
        fontSize: 20,
        fontWeight: 500,
        marginBottom:14,
    },
    rightItemValue:{
        flex: 1,
        textAlign: 'right'
    },
    rifhtItemLegend:{
        flex: 1
    },
    rightItem:{
        flexDirection: 'row',
        marginBottom: 8,
    }
})
export default TodayCalories