<template>
    <footer class="footer">
        <div class="sns-list">
            <div class="f-item" v-for="item in LinkList" :key="item.name"
                 v-show="!item.hidden&&(item.heart===getStatus||item.heart===undefined)"
                 @click="openLink(item)"
            >
              <img :src="'images/icon/Links/'+item.icon" :alt="item.name"/>
            </div>
        </div>
        <p>
          <span>@YanLin</span>
          <span><router-link to="/about">YanLin Inc</router-link></span>
          <span><router-link to="/edit">Edit</router-link></span>
        </p>
    </footer>
</template>

<script>
    import {mapGetters} from 'vuex'
    import openQQ from "@/hooks/openQQ";
    export default {
        name:"Footer",
        computed:{
            ...mapGetters('heardStatus',['getStatus']),
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
          }
        }
    }
</script>

<style scoped>
    .footer{
        background-color: #87CEFA;
        padding: 5vh 0 2vh 0;
        user-select: none;
    }
    .footer .sns-list{
        text-align: center;
    }
    .sns-list .f-item{
        display: inline-block;
        margin: 0 2vh;
    }
    .sns-list .f-item > a{
      display: block;
    }
    .f-item img{
        transform: translate(0px,0px);
        transition:transform 0.2s ease-in-out;
        width:5vh;
        cursor: pointer;
    }
    .f-item img:hover{
        transform: translate(0px,-5px);
        transition:transform 0.2s ease-in-out;
    }
    .footer > p{
        margin-top: 2vh;
        text-align: center;
        color: white;
        font-size: 1.5vh;
    }
    .footer > p > span{
        margin: 1vh 1vw;
    }
    .footer > p > span > a{
        color: white;
        text-decoration: none;
    }
    .footer > p > a:hover{
        text-decoration:underline;
    }
</style>