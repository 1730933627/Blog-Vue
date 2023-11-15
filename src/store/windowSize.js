export default {
    namespaced:true,
    actions:{
        changeSize(context){
            window.onresize = () => {
                return (() => {
                    context.commit('CHANGEHEIGHT',window.innerHeight);
                    context.commit('CHANGEWIDTH',window.innerWidth);
                })()
            }
        },
        homeLogo(context){
            context.commit('ChangeLogo',0);
        },
        elseHome(context){
            context.state.logoAnime += 1;
        }
    },
    mutations:{
        CHANGEHEIGHT(state,value){
            state.Height = value;
        },
        CHANGEWIDTH(state,value){
            state.Width = value;
        },
        ChangeLogo(state,value){
            state.logoAnime = value;
        }
    },
    state:{
        Height:window.innerHeight||0,
        Width:window.innerWidth||0,
        logoAnime:0
    },
    getters:{
        getHeight(state){
            return state.Height;
        },
        getWidth(state){
            return state.Width;
        },
        isLandscape(state){
            return state.Height < state.Width;
        },
        getLogoStatus(state){
            return state.logoAnime;
        }
    },
}