
import {inforStore} from './firebase';
import axios from 'axios';
export const setUser = ()=> {
    return inforStore.child('infor').once('value').then(function(snapshot) {
        return (snapshot && snapshot.val());
        
    }).then(result => result);
}
export const getSkill = ()=>{
    return inforStore.child('skill').once('value').then(function(snapshot) {
        return snapshot ? snapshot.val() : [];
        
    }).then(result => result);
}
export const getExperience =async ()=>{
    try {
        
        const config = {
            header:{
                "Content-Type":"application/json"
            }
        };
        const res = await axios.get('/api/experience',{},config);
        console.log(res);
        return res.data;
    } catch (error) {

        console.log(error.response.data);
    }
    // return inforStore.child('experience').once('value').then(function(snapshot) {
    //     return snapshot? snapshot.val() : [];
    // }).then(result => result);
}
export const getAchivement = ()=>{
    return inforStore.child('achivement').once('value').then(function(snapshot) {
        return snapshot? snapshot.val() : [];
    }).then(result => result);
}
export const getPortfolio = ()=>{
    return inforStore.child('portfolios').once('value').then(function(snapshot) {
        return snapshot? snapshot.val() : [];
    }).then(result => result);
}