export default {
    namespaced:true,
    actions:{},
    mutations:{
        CHANGESTATUS(state,value){
            sessionStorage.setItem('heart',value);
            state.status = value;
        },
    },
    state:{
        status:(sessionStorage.getItem('heart') === "true" || false),
    },
    getters:{
        getStatus(state){
            return state.status;
        }
    },
}