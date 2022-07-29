<template>
    <div class="item">
        <a :href=item.video_url target="_blank">
            <div class="image">
                <img :src="item.img_url"/>
            </div>
            <div id="data">
                <p>
                    <span id="year"><span id="num">{{item.year}}</span></span>
                    <span id="month"><span id="num">{{item.month}}</span></span>
                </p>
                <h3>{{item.name}}</h3>
                <div class="item_button">
                    <p id="word">{{item.type}}</p>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name:"NewsItem",
        props:['item']
    }
</script>

<style scoped>
@media screen and (orientation: landscape) {
    .item{
        margin: 2% 1%;
        width: 30%;
    }
    .item #data #year{
        margin-right: 0.3vw;
        margin-left: -1.1vw;
    }
    .item #data #month{
        margin-left: -0.35vw;
    }
    .item #data #num{
        padding: 0.3vh 0.5vw;
    }
    .item_button{
        right: 1.15vw;
        bottom: 1.75vh;
        padding: 0.5vh .5vw;
    }
}
@media screen and (orientation: portrait) {
    .item{
        margin: 5% 1%;
        width: 100%;
    }
    .item #data #year{
        margin-right: 0.3vw;
        margin-left: -2.75vw;
    }
    .item #data #month{
        margin-left: -0.5vw;
    }
    .item #data #num{
        padding: .5vh 2vw;
    }
    .item_button{
        right: 2vw;
        bottom: 1vh;
        padding: 0.75vh 2vw;
    }
}
    @keyframes item-in{
        0%{opacity: 0;}
        100%{opacity: 1;}
    }
    .item{
        position: relative;
        color: #3b3b3b;
        word-break: break-all;
        background-color: #fff;
        box-shadow: 0px 0px 0.5vw #008ee0;
        transition: transform 0.2s ease-in-out;
        animation: item-in 0.5s ease-in-out;
    }
    .item:hover{
        transform: scale(1.03);
        transition: transform 0.2s ease-in-out;
    }
    .item > a{
        text-decoration: none;
    }
    .item .image img{
        width: 100%;
        user-select: none;
    }
    .item #data{
        padding: 1.5vh 0.75vw 5vh;
    }
    .item #data #year{
        display: inline-block;
        background-color: #e5e5e5;
        transform: skewX(-30deg);
        color:#008ee0;
    }
    .item #data #month{
        display: inline-block;
        background-color: #008ee0;
        transform: skewX(-30deg);
        color:aliceblue;
    }
    .item #data #num{
        display: block;
        font-size: 1.5vh;
        transform: skewX(30deg);
        user-select: none;
    }
    .item #data h3{
        margin: 2vh 0 1vh;
        font-size: 2vh;
        color: #3b3b3b;
    }
    .item_button{
        position: absolute;
        text-align: right;
        background: linear-gradient(225deg, transparent .75vh, #363636 0);
        user-select: none;
    }
    .item_button #word{
        text-align: center;
        color: aliceblue;
        font-size: 1.5vh;
    }
</style>