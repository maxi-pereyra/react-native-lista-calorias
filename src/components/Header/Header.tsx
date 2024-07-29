import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon } from '@rneui/themed'

const staticInfo = {
    name: 'Robert Negreri',
    uri: '',
}

const Header = () => {
    const { canGoBack, goBack} = useNavigation();
    
    return (
    <View style={styles.container}>
        {canGoBack() ? (
            <View style={styles.arrowContainer}>
                <Button icon={<Icon name='arrow-back' size={24}/>} type='clear' onPress={()=>goBack()}/>
            </View>
        ): undefined

        }
        <View style={styles.leftContainer}>
            <Text>{`Hello ${staticInfo.name}`}</Text>
            <Text style={styles.subtitulos}> bienvenido </Text>
        </View>
        <View style={styles.rightContainer}>
            <Image source={{uri: staticInfo.uri}}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        flex:1,
        alignItems:'flex-end',
        justifyContent: 'center',
    },
    subtitulos: {
        fontSize:12,
        color: '#808080'
    },
    profileImage:{
        width:40,
        height:40,
        
    },
    arrowContainer:{
        marginLeft: 10,
    }
});

export default Header