<template>
    <div class="open_menu" @click="isShow=!isShow" :style="HomeStyle">
        <img src="images/icon/menu.png"/>
    </div>
    <div class="top" v-show="isHome"></div> 
    <transition name="menu">
        <div class="menu_list" v-show="isShow" :style="HomeStyle">
            <ul>
                <router-link to="/"><li class="list">Home</li></router-link>
                <router-link to="/news"><li class="list">News</li></router-link>
                <router-link to="/biography"><li class="list">Biography</li></router-link>
                <span id="Links" v-if="getStatus">
                    <li class="list">
                        <div class="dropdown">
                            <span>Links</span>
                            <div class="dropdown-content" :style="dropdownStyle">
                                <a href="https://space.bilibili.com/22516494" target="_blank">BiliBili</a>
                                <a href="https://ecchi.iwara.tv/users/yanlin-0" target="_blank">Iwara</a>
                            </div>
                        </div>
                    </li>
                </span>
                <a v-else href="https://space.bilibili.com/22516494" target="_blank"><li class="list">BiliBili</li></a>
                <router-link to="/download"><li class="list">Download</li></router-link>
                <router-link to="/contact"><li class="list">Contact</li></router-link>
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
                isShow:window.innerHeight<window.innerWidth?true:false,
            }
        },
        computed:{
            ...mapGetters('heardStatus',['getStatus']),
            ...mapGetters('windowSize',['getHeight','isLandscape']),
            isHome(){
                return this.$route.fullPath == "/"?false:true;
            },
            HomeStyle(){
                return this.isHome?"right:1%":this.isLandscape?"right:2.5%":"left:2.5%;";
            },
            dropdownStyle(){
                return this.isHome ? this.isLandscape?"left:22.5%":"right:125%;":this.isLandscape?"left:22.5%":"left:225%;";
            }
        },
        watch:{
            getHeight(){
                this.isShow = this.isLandscape;
            }
        },
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
    #Links,ul a,ul a:visited{
        color:#00BFFF;
    }
    .dropdown-content{
        padding: 10px 0px;
        display: none;
        position: fixed;
        text-align: left;
    }
    @keyframes dropdownR{
        0%{padding-left: 6px;}
        100%{padding-left: 0px;}
    }
    .dropdown-content a{
        animation: dropdownR 0.5s ease-in-out;
    }
    .menu_list ul > a:hover,#Links:hover{
        transform:translate(0px,-0.5vh);
    }
    .list{
        margin: 1vh 2.5vh;
    }
    .dropdown-content a{
        margin-right: 2.5vh;
    }
}
@media screen and (orientation: portrait) {
    .open_menu{
        z-index: 100;
        cursor: pointer;
        margin: 2vh;
        width: 7.5vh;
        position: fixed;
        top:0;
    }
    .open_menu img{
        width: 100%;
    }
    .menu_list{
        top: 10.5%;
    }
    .menu_list ul{
        flex-direction: column;
    }
    #Links,ul a,ul a:visited,.dropdown-content > a{
        color:#00BFFF;
        background-color: white;
        border-radius: 1vh;
        box-shadow: 0 0 0.5vh #00BFFF;
        padding: .6vh;
        margin: .25vh 0;
    }
    .dropdown-content{
        display: none;
        flex-direction: column;
        position: absolute;
        top: -40%;
    }
    @keyframes dropdownP{
        0%{margin-top: 0.75vh}
        100%{margin-top: 0.5vh;}
    }
    .dropdown-content a{
        animation: dropdownP 0.5s ease-in-out;
    }
    .menu_list ul > a:hover,#Links:hover{
        transform:translate(1vw,0px);
    }
}
    .menu_list ul > a,#Links{
        transition: transform 0.25s ease-in-out;
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
    #Links{
        cursor: default;
    }
    .dropdown{
        position: relative;
        display: inline-block;
    }
    #Links:hover .dropdown-content{
        display: flex;
    }
</style>