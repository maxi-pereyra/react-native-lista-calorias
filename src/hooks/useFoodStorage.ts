import AsyncStorage from "@react-native-async-storage/async-storage";  
import { Meal } from "../types/Index";
const MY_FOOD_KEY = '@myFood:keu';

const useFoodStorage = () => {
    const handleSaveFood = async ({calories,name,portion}: Meal) => {
        try {
            const currentSaveFood = await AsyncStorage.getItem(MY_FOOD_KEY);
            
            if(currentSaveFood !== null ){
                const currentSaveFoodParse = JSON.parse(currentSaveFood );
                currentSaveFoodParse.push({
                    calories,
                    name,
                    portion,
                });
                await AsyncStorage.setItem(MY_FOOD_KEY, JSON.stringify(currentSaveFoodParse))

                return Promise.resolve('Exito')
            } 
            await AsyncStorage.setItem(
                MY_FOOD_KEY,
                JSON.stringify([{
                    calories,
                    name,
                    portion,
                }])
            )
            
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
    const handleGetFood = async () => {
        try {
            const foods = await AsyncStorage.getItem(MY_FOOD_KEY);

            if ( foods !== null){
                const parsedFoods = JSON.parse(foods);
                return Promise.resolve(parsedFoods)
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return {
        onSaveFood: handleSaveFood,
        onGetFood: handleGetFood,
    };
};

// guardar info de comida

// metodo para obtener info de comida
// 
export default useFoodStorage;