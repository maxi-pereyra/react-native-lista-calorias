export type RootStackParams = {
    Home: undefined;
    AddFood: undefined;
}

export type Meal = {
    calories: string,
    name: string,
    portion: string
    date?: string
}


export type TodayCaloriesProp = {
    total?: number | String,
    consumed: number | String,
    remaining: number |string,
    percentage: number ;
}