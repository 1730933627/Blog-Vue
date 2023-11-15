function openQQ(oneself,getStatus){
    let qq= "1730933627";
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        if(oneself){
            window.location.href = `mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=oicqzone.com`;
        }else{
            if(getStatus){
                window.location.href = `mqqapi://card/show_pslcard?src_type=internal&version=1&uin=906690705&card_type=group&source=qrcode`;
            }else{
                window.location.href = `mqqapi://card/show_pslcard?src_type=internal&version=1&uin=885802204&card_type=group&source=qrcode`;
            }
        }
    }
    else {
        if(oneself){
            window.location.href = `tencent://message/?uin=${qq}`;
        }else{
            if(getStatus){
                window.open("https://qm.qq.com/cgi-bin/qm/qr?k=oEH0WYAUNRAjiNkucmYXshgHy7awMqh0&jump_from=webapi&authKey=xkI6b9WpB1uoAFm/gHG++glAz9eBgB27FSumU3TfYQhuVBYCD7BE4T+7Z6c90zfs","_blank");
            }else{
                window.open("https://qm.qq.com/cgi-bin/qm/qr?k=5H12bVA7qtxS3M8cYBJrcKkeEJrU745J&jump_from=webapi&authKey=NsBvo2l/e/0CtAyw4kGB1j1AYd9bycENUIME7bNqFNSFqILnvbWHnQyafrH3epOL","_blank");
            }
        }
    }
}

export default openQQ