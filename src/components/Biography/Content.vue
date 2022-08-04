<template>
    <div class="section">
        <div id="centerview">
            <h1>HISTORY</h1>
            <Loading v-if="!loaded"/>
            <div id="history-list" v-else>
                <div class="year-group" v-for="(year,i) of msgs_sort" :key="i">
                    <p id="year-a">
                        <span>{{year[0]}}</span>
                    </p>
                    <div class="date-item" v-for="item of year[1]" :key="item.id">
                        <div id="item-inner">
                            <p id="date">{{item.month}}</p>
                            <p class="caption">{{item.text}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Loading from '../Subpage/Loading'
    import axios from 'axios'
    export default {
        name:"Content",
        data(){
            return{
                msgs:[],
                typed:{
                    active:false,
                    obj:undefined
                },
                loaded:false
            }
        },
        beforeMount(){
            axios.post('https://api.yanlinn.com/getdynamic').then(
                response => {
                    const year = {}
                    for(let v of response.data.data){
                        if(year[v.year]===undefined){
                            year[v.year] = [];
                        }
                        year[v.year].push(v);
                    }
                    this.msgs = year;
                    this.loaded = true;
                },
                error=>{
                    console.log(error);
            })
        },
        computed:{
            msgs_sort(){
                return Object.entries(this.msgs).reverse();
            }
        },
        components:{Loading}
    }
</script>

<style scoped>

  @media screen and (orientation: landscape) {
        .section #centerview{
            width: 50%;
        }
        .date-item #date{
            width: 2.5em;
        }
        .date-item:before{
            min-width: 2vw;
        }
  }
  @media screen and (orientation: portrait) {
        .section #centerview{
            width: 80%;
        }
        .date-item #date{
            width: 3em;
        }
        .date-item:before{
            min-width: 3vw;
        }
  }
    .section{
        position: relative;
        background-color: #87CEFA;
    }
    .section #centerview{
        position: relative;
        margin: 0 auto;
        padding: 12vh 5vw 3vh;
        transition: all 1s ease-in-out;
        cursor: default;
    }
    .section #centerview h1{
        color: white;
        user-select:none;
        font-size: 7vh;
    }
    .section #centerview #history-list{
        margin-top: 2vh;
    }
    .year-group{
        border-left: .25vh solid #fff;
    }
    .year-group #year-a{
        position: relative;
        display: inline-block;
        font-size: 5vh;
        font-weight: bold;
        color: #87CEFA;
        background-color: #fff;
        user-select: none;
    }
    .year-group #year-a span{
        position: relative;
        display: block;
        padding: 0 1vw 0;
        z-index: 1;
    }
    .year-group #year-a :after{
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        transform: skewX(30deg) translateX(15%);
        z-index: -2;
    }
    @keyframes item-in{
        0%{opacity: 0;}
        100%{opacity: 1;}
    }
    .date-item{
        padding: 2vh 0;
        display: flex;
        align-items: center;
        color: aliceblue;
        animation: item-in 0.5s ease-in-out;
    }
    .date-item:before{
        content: '';
        display: block;
        height: .25vh;
        background-color: #fff;
    }
    .date-item #item-inner{
        display: flex;
        align-items: center;
        margin-left: 0.5vw;
    }
    .date-item #date{
        font-size: 3vh;
        font-weight: bold;
        user-select: none;
    }
    .date-item .caption{
        margin-left: 2vw;
        cursor: text;
        font-size: 2vh;
        transition: color 0.5s ease-in-out;
    }
    .date-item .caption:hover{
        color:black;
    }
</style>