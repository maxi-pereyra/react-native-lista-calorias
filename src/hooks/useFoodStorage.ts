import AsyncStorage from "@react-native-async-storage/async-storage";  
import { Meal } from "../types/Index";
import { isToday } from "date-fns";

const MY_FOOD_KEY = '@myFood:keu';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const useFoodStorage = () => {
    const saveFoodToStorage = async (storageKey: string, meal: Meal) => {
        try {
            const currentSaveFood = await AsyncStorage.getItem(storageKey);
            
            if(currentSaveFood !== null ){
                const currentSaveFoodParse = JSON.parse(currentSaveFood );
                currentSaveFoodParse.push(meal);

                await AsyncStorage.setItem(storageKey, JSON.stringify(currentSaveFoodParse))

                return Promise.resolve('Exito')
            } 
            await AsyncStorage.setItem(
                storageKey,
                JSON.stringify([meal])
            )
            
        } catch (error) {
            return Promise.reject(error)
        }
    };

    const handleSaveFood = async ({calories,name,portion}: Meal) => {
        try {
            const result = await saveFoodToStorage(MY_FOOD_KEY,{calories,name,portion})
            return Promise.resolve()
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

    const handleSeaveTodayFood = async ({calories,name,portion}:Meal) =>{
        try {
            const result = await saveFoodToStorage(MY_TODAY_FOOD_KEY,{
                calories,
                name,
                portion,
                date: new Date().toISOString()})
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleGetTodayFood = async () => {
        try {
            const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

            if ( foods !== null){
                const parsedFoods = JSON.parse(foods) as Meal[];

                return Promise.resolve(parsedFoods.filter(meal => meal.date && isToday(new Date  (meal.date))))
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleRomoveFood = async (index: number) => {
        try {
            const todayFoof = await handleGetTodayFood();
            const filterItems = todayFoof?.filter((item:Meal, itemIndex)=>{
                return itemIndex != index
            })

            await AsyncStorage.setItem(
                MY_TODAY_FOOD_KEY,
                JSON.stringify(filterItems)
            )

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    }
    return {
        onSaveFood: handleSaveFood,
        onGetFood: handleGetFood,
        onSaveTodayFood: handleSeaveTodayFood,
        onGetTodayFood: handleGetTodayFood,
        onDeleteTodayFood: handleRomoveFood
    };
};

// guardar info de comida

// metodo para obtener info de comida
// 
export default useFoodStorage;