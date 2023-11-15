export default {
    namespaced:true,
    actions:{},
    mutations:{},
    state:{
        data:{
            QQ:{
                name:"QQ",
                url:null,
                icon:"QQ.png",
                hidden: false,
            },
            QQ_Group:{
                name:"QQ_Group",
                url:null,
                icon:"QQ1.png",
                hidden: false,
            },
            BiliBili:{
                name:"BiliBili",
                url:"https://space.bilibili.com/22516494",
                icon: "",
                hidden: true,
            },
            Iwara:{
                name:"Iwara",
                url:"https://ecchi.iwara.tv/profile/yanlinn",
                icon: "",
                hidden: true,
            },
            Patreon:{
                name:"Patreon",
                url:"https://www.patreon.com/YanLinn",
                icon:"PT.png",
                heart: true,
                hidden: false,
            } ,
            AZZ:{
                name:"AZZ",
                url:"https://azz.ee/yanlin",
                icon:"AZZ.png",
                heart: true,
                hidden: false,
            } ,
            MBD:{
                name:"MBD",
                url:"https://mbd.pub/o/yanlinn",
                icon:"MBD.png",
                heart: true,
                hidden: false,
            },
            Aplaybox:{
                name:"Aplaybox",
                url:"https://www.aplaybox.com/u/178812252",
                icon:"MZW.png",
                heart: false,
                hidden: false,
            },
            Github:{
                name:"Github",
                url:"https://github.com/1730933627",
                icon:"GIT.png",
                heart: false,
                hidden: false,
            }
        }
    },
    getters:{
        LinkList(state){
            return state.data;
        }
    },
}