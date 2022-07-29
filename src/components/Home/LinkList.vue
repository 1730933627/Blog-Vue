<template>
    <div class="menu_list" id="menu_list">
        <ul>    
            <router-link to="/"><li class="list">Home</li></router-link>
            <router-link to="/news"><li class="list">News</li></router-link>
            <router-link to="/biography"><li class="list">Biography</li></router-link>
            <span id="Links" v-if="getStatus">
                <li class="list">
                    <div class="dropdown">
                        <span>Links</span>
                        <div class="dropdown-content">
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
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name:"LinkList",
        computed:{
            ...mapGetters('heardStatus',['getStatus']),
        }
    }
</script>

<style scoped>
@media screen and (orientation: landscape) {
    .menu_list{
        right:2.5%;
    }
    .menu_list ul{
        align-items: center;
    }
    #Links,ul a,ul a:visited{
        color:#63B8FF;
    }
    .dropdown-content{
        padding: 10px 0px;
        display: none;
        position: absolute;
        text-align: left;
    }
    @keyframes dropdownR{
        0%{padding-left: 6px;}
        100%{padding-left: 0px;}
    }
    .dropdown-content a{
        animation: dropdownR 0.5s ease-in-out;
        line-height: 200%;
        margin-right: 1vw;
    }
    .menu_list ul > a:hover,#Links:hover{
        transform:translate(0px,-0.5vh);
        transition:transform 0.3s ease-in-out;
    }
}
@media screen and (orientation: portrait) {
    .menu_list{
        left:2.5%;
    }
    .menu_list ul{
        flex-direction: column;
    }
    #Links,ul a,ul a:visited{
        color:#00BFFF;
        background-color: white;
        margin: 0.5vh 0;
        border-radius: 1vh;
        box-shadow: 0 0 0.5vh #00BFFF;
    }
    .dropdown-content{
        display: none;
        flex-direction: column;
        position: absolute;
        left: 250%;
        top: -40%;
    }
    @keyframes dropdownP{
        0%{margin-top: 0.75vh}
        100%{margin-top: 0.5vh;}
    }
    .dropdown-content a{
        animation: dropdownP 0.5s ease-in-out;
        line-height: 3vh;
        margin-right: 1vw;
        padding: 0 1vw;
    }
    .menu_list ul > a:hover,#Links:hover{
        transform:translate(1vw,0px);
        transition:transform 0.3s ease-in-out;
    }
}
    .menu_list{
        position: absolute;
        top: 2.5%;
    }
    .menu_list ul{
        display: flex;
        list-style-type:none;
        user-select: none;
    }
    .list{
        margin: 3% 1.5vw 0;
        font-weight:bold;
    }
    ul a,ul a:visited{
        text-decoration: none;
        font-size: 1.75vh;
    }
    #Links{
        cursor: default;
        font-size: 1.75vh;
    }
    .dropdown{
        position: relative;
        display: inline-block;
    }
    #Links:hover .dropdown-content{
        display: flex;
    }
</style>