<template>
    <div class="item">
        <div class="item_list" v-for="item in LinkList" :key="item.name"
             v-show="!item.hidden&&(item.heart===getStatus||item.heart===undefined)"
             @click="openLink(item)"
        >
            <img :src="'images/icon/Links/'+item.icon" :alt="item.name"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import openQQ from "@/hooks/openQQ";

    export default {
        name:"Sidebar",
        computed:{
            ...mapGetters('heardStatus',['getStatus']),
            ...mapGetters('windowSize',['isLandscape']),
            ...mapGetters("links",["LinkList"]),
        },
        methods:{
            openLink(item){
              if(item.name==="QQ"){
                openQQ(true,this.getStatus);
              }else if(item.name==="QQ_Group"){
                openQQ(false,this.getStatus);
              }else{
                window.open(item.url,"_blank");
              }
            },
        },
    }
</script>

<style scoped>
@media screen and (orientation: landscape) {
    .item{
        top:9vh;
    }
    .item .item_list img{
        border-radius:4vh;
        width:4vh;
    }
}
@media screen and (orientation: portrait) {
    .item{
        top:13vh;
    }
    .item .item_list img{
        border-radius:5vh;
        width:5vh;
    }
}
    .item{
        position: absolute;
        right:1vw;
    }
    .item_list{
        transform:translate(0px,0px);
        transition:transform 0.2s ease-in-out;
        margin-bottom: 1.5vh;
        cursor: pointer;
        user-select: none;
    }
    .item_list:hover{
        transform:translate(-5px,0px);
        transition:transform 0.2s ease-in-out;
    }
</style>