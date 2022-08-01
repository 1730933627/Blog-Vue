import axios from 'axios'
export default {
    namespaced:true,
    actions:{
        getInfoList(context,value=false){
            if(!context.state.initList.length){
                axios.post('https://api.yanlinn.com/getvideoinfo').then(res => {
                    res.data.data.forEach(element => {
                        if(element.img_url.split("/").length === 1){
                            element.img_url = "/images/cover/"+element.img_url;
                        }else if(element.img_url.split("/").length === 4){
                            element.img_url = "/images/cover/"+element.img_url.split("/")[3];
                        }
                    });
                    context.commit('saveInfoList',{data:res.data.data,status:value});
                }).catch(err=>{
                    console.log(err);
                })
            }else{
                context.commit('saveInfoList',{data:context.state.initList,status:value});
            }
        }
    },
    mutations:{
        saveInfoList(state,value){
            state.initList = value.data;
            if(!value.status){
                state.info = state.initList.filter(item => {
                    if(item.pattern === 0){
                        return item;
                    }
                });
            }else{
                state.info = value.data;
            }
            state.news.PageEnd = Math.floor(state.info.length / state.news.PageSize)+1;
            state.download.PageEnd = Math.floor(state.info.length / state.download.PageSize);
        },
        changeType(state,value){
            state.type = value;
        },
        changeNewsPage(state,value){
            if(value >= 0 && value < state.news.PageEnd){
                state.news.Page = value;
            }
        },
        changeNewsPageEnd(state,value){
            state.news.Page = 0;
            state.news.PageEnd = Math.floor(value / state.news.PageSize)+1;
        },
        changeDownloadPage(state,value){
            if(value >= 0 && value < state.download.PageEnd){
                state.download.Page = value;
            }
        },
        changeDownloadPageEnd(state,value){
            state.download.Page = 0;
            state.download.PageEnd = Math.floor(value / state.download.PageSize)+1;
        },
        saveDownloadItem(state,value){
            state.download.item.info = value.info;
            state.download.item.show = value.show;
        },
        setDownloadShow(state,value){
            state.download.item.show = value.show;
        }
    },
    state:{
        initList:[],
        info:[],
        type:'All',
        news:{
            Page:0,
            PageSize:15,
            PageEnd:0,
        },
        download:{
            Page:0,
            PageSize:16,
            PageEnd:0,
            item:{
                show:false,
                info:{}
            }
        },
    },
    getters:{
        readDownloadItem(state){
            return state.download.item;
        },
        readInfoListAll(state){
            return state.info;
        },
        readInfoListOfVideo(state){
            return state.info.filter(item => {
                if(item.type == "Video")return item;
            });
        },
        readInfoListOfType(state){
            if(state.type == 'All'){
                return state.info;
            }else{
                return state.info.filter(item => {
                    if(item.type == state.type)return item;
                });
            }
        },
    },
}