<template>
    <div class="open_menu" @click="isShow=!isShow" :style="HomeStyle+menuAnime" ref="menuButton">
        <img src="images/icon/menu.png" draggable="false" alt="menu"/>
    </div>
    <div class="top" v-show="isHome"></div> 
    <transition name="menu">
        <div class="menu_list" v-show="isShow" :style="HomeStyle" ref="menuList">
            <ul :style="isHome?'align-items: flex-end;':''">
              <li class="list"><router-link to="/">Home</router-link></li>
              <li class="list"><router-link to="/news">News</router-link></li>
              <li class="list"><router-link to="/biography">Biography</router-link></li>
              <li class="list" id="Links" v-if="getStatus" style="position: relative">
                <a>Links</a>
                <div class="dropdown-content" :style="dropdownStyle">
                  <a :href="LinkList.BiliBili.url" target="_blank">BiliBili</a>
                  <a :href="LinkList.Iwara.url" target="_blank">Iwara</a>
                </div>
              </li>
              <li class="list" v-else><a :href="LinkList.BiliBili.url" target="_blank">BiliBili</a></li>
              <li class="list"><router-link to="/download">Download</router-link></li>
              <li class="list"><router-link to="/contact">Contact</router-link></li>
            </ul>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:"LinkList",
        data(){
            return{
                isShow:window.innerHeight < window.innerWidth,
            }
        },
        computed:{
            ...mapGetters('heardStatus',['getStatus']),
            ...mapGetters('windowSize',['getHeight','isLandscape']),
            ...mapGetters("links",["LinkList"]),
            isHome(){
                return this.$route.fullPath !== "/";
            },
            HomeStyle(){
                return this.isHome?"right:1%;":this.isLandscape?"right:2.5%;":"left:0%;";
            },
            dropdownStyle(){
                return this.isHome ? this.isLandscape?"left:0;top:100%":"right:100%;":this.isLandscape?"left:0;top:100%":"left:100%;";
            },
            menuAnime(){
                return this.isShow?'transform: rotateZ(90deg);':''
            }
        },
        watch:{
            getHeight(){
                this.isShow = this.isLandscape;
            }
        },
        methods:{
            closeMenu(e){
              if(!this.$refs.menuButton.contains(e.target) && !(e.target.parentNode.parentNode.parentNode === this.$refs.menuList)){
                this.isShow= false;
              }
            }
        },
        mounted() {
            if(!this.isLandscape){
              document.addEventListener("touchstart", this.closeMenu, false);
              document.addEventListener("click", this.closeMenu, false);
            }
        },
        beforeUnmount() {
            document.removeEventListener("touchstart", this.closeMenu, false);
            document.removeEventListener("click", this.closeMenu, false);
        }
    }
</script>

<style scoped>
    .menu-enter-active,.menu-leave-active {
        transition: opacity 0.5s ease;
    }
    .menu-enter-from,.menu-leave-to {
        opacity: 0;
    }
@media screen and (orientation: landscape) {
    .open_menu,.open_menu > img{
        display: none;
    }
    .menu_list{
        top: 2.5%;
    }
    .menu_list ul{
        align-items: center;
        user-select: none;
    }
    ul a,ul a:visited{
        color:#00BFFF;
        padding: 1vh 2.5vh;
    }
    @keyframes dropdownR{
        0%{margin-left: .5vw;}
        100%{margin-left: 0;}
    }
    .dropdown-content a{
        animation: dropdownR 0.5s ease-in-out;
        padding: 0 .25vh 0 2.5vh;
    }
    .menu_list ul > li:hover,#Links:hover{
        transform:translate(0,-0.5vh);
    }
}
@media screen and (orientation: portrait) {
    .open_menu{
        z-index: 100;
        cursor: pointer;
        margin: 1vh .1vh 1vh 1vh;
        width: 8.5vh;
        position: fixed;
        top:0;
        transition: transform .25s ease-out;
        font-size: 0;
    }
    .open_menu img{width: 100%;}
    .menu_list{
        top: 10.5%;
        margin: 0 .5vh 0 1vh;
    }
    .menu_list ul{
        flex-direction: column;
    }
    ul a,ul a:visited,.dropdown-content > a{
        color:#00BFFF;
        background-color: white;
        border-radius: 1vh;
        box-shadow: 0 0 0.5vh #00BFFF;
        padding: .6vh;
        margin: .25vh 0;
    }
    .dropdown-content{
        display: none;
        top: 20%;
    }
    .dropdown-content a{
        margin-right: 2.5vw;
    }
    .menu_list ul > li:hover,#Links:hover{
        transform:translateX(1vw);
    }
}

    .menu_list ul > li,#Links{
        transition: transform 0.25s ease-in-out;
    }
    .list{
      display: flex;
    }
    .top{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 10vh;
        background-color: white;
        z-index: 99;
    }
    .menu_list{
        position: fixed;
        z-index: 100;
    }
    .menu_list ul{
        display: flex;
        list-style-type:none;
    }
    ul a,ul a:visited,#Links{
        font-weight:bold;
        text-decoration: none;
        font-size: 2.25vh;
    }
    .dropdown-content{
      display: none;
      position: absolute;
    }
    #Links:hover .dropdown-content{
        display: block;
    }
</style>