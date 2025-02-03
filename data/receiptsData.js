import { getRedisClient } from "../config/redisConnect.js";

let Flag = false;
let data = {}
export const ToggleToObject = ()=>{
    Flag = true;
}

const storePoints = async(id, points)=>{
    if(Flag){
        data[id]= points;
        return;
    }

    const redisClient = await getRedisClient();
    //Setting points in redis
    await redisClient.SET(id, points);
}

const getPoints = async(id)=>{
    if(Flag){
        if(data[id]){
            return data[id]
        }
        else{
            throw `Not found`;
        }
    }

    const redisClient = await getRedisClient();
    //Setting points in redis
    let points = await redisClient.GET(id);

    if(points == undefined){
        throw `not found`;
    }
    return points;
}

const dataFunctions={
    storePoints, getPoints
}


export default dataFunctions;
