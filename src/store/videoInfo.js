import axios from 'axios'
export default {
    namespaced:true,
    actions:{
        getInfoList(context,value=false){
            context.commit("deleteInitList");
            context.commit("deleteInfoList");
            axios.post(process.env.VUE_APP_URL+'getvideoinfo').then(
                res => {
                    let maxId = 0;
                    res.data.data.forEach(element => {
                        if(element.id>maxId)maxId = element.id;
                        if(element.img_url.split("/").length === 1){
                            element.img_url = process.env.VUE_APP_IMAGE_URL+"MMD/"+element.img_url;
                        }else if(element.img_url.split("/").length === 4){
                            element.img_url = process.env.VUE_APP_IMAGE_URL+"MMD/"+element.img_url.split("/").pop();
                        }else{
                            element.img_url = process.env.VUE_APP_IMAGE_URL+"MMD/"+"cb.jpg";
                        }
                        if(element.year&&!context.state.year.includes(element.year)){
                            context.state.year.push(element.year);
                        }
                        if(element.month&&!context.state.month.includes(element.month.split("/")[0])){
                            context.state.month.push(element.month.split("/")[0]);
                        }
                        if(element.type&&!context.state.types.includes(element.type)){
                            context.state.types.push(element.type);
                        }
                    });
                    context.commit('changeMaxId',maxId);
                    context.commit('saveInfoList',{data:res.data.data,status:value});
                },
                err => {
                    console.log(err.message);
                    context.commit('isError',true);
                }
            )
        },
        getItem(context,value){
            return context.getters.readInfoListAll.filter(item=>{
                if(item.id===Number(value))return item;
            })
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
            state.news.PageEnd = Math.floor(state.info.length / state.news.PageSize);
            state.download.PageEnd = Math.floor(state.info.filter(item=>{
                if(item.bdy_video&&item.type==="Video")return item;
            }).length / state.download.PageSize);
        },
        deleteInitList(state,value){
            state.initList = [];
        },
        deleteInfoList(state,value){
            state.info = [];
        },
        changeType(state,value){
            state.type = value;
        },
        changeNewsPage(state,value){
            if(value >= 0 && value <= state.news.PageEnd){
                state.news.Page = value;
            }
        },
        changeNewsPageEnd(state,value){
            state.news.Page = 0;
            state.news.PageEnd = Math.floor(value / state.news.PageSize)+1;
        },
        changeDownloadPage(state,value){
            if(value >= 0 && value <= state.download.PageEnd){
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
        },
        isError(state,value){
            state.error = value;
        },
        changeMaxId(state,value){
            state.maxID = value;
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
        year:[],
        month:[],
        types:[],
        error:false,
        maxID:0,
        defaultImg:process.env.VUE_APP_IMAGE_URL+"MMD/"+"cb.jpg"
    },
    getters:{
        getDefaultImg(state){
            return state.defaultImg;
        },
        isInit(state){
            return state.initList.length === 0;
        },
        isLoading(state){
            if(state.error){
                return false;
            }
            else{
                return state.info.length === 0;
            }
        },
        getMaxId(state){
            return state.maxID===0?false:state.maxID;
        },
        readDownloadItem(state){
            return state.download.item;
        },
        readInfoListAll(state){
            return state.info;
        },
        readInfoListOfVideo(state){
            return state.info.filter(item => {
                if(item.type === "Video")return item;
            });
        },
        readInfoListOfType(state){
            if(state.type === 'All'){
                return state.info;
            }else{
                return state.info.filter(item => {
                    if(item.type === state.type)return item;
                });
            }
        },
        isError(state){
            return state.error;
        },
        getYear(state){
            return state.year;
        },
        getMonth(state){
            return state.month;
        },
        getTypes(state){
            return state.types;
        },
    },
}