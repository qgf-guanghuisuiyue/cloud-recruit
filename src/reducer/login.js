import {USER_LOGIN} from 'constants/ActionTypes';

const initialState = {
    token: {}
};

export default function users(state = initialState,actions){
    switch(actions.type){
        case USER_LOGIN: 
            return {...state,token:actions.token};
        default: 
            return state;
    }
} 