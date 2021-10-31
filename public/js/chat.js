console.log("Script loaded");
const socket = io()

socket.on('countUpdated',(count)=>{
    console.log("The count has been updated:",count);
})

document.querySelector("#incriment").addEventListener('click',()=>{
    console.log("Clicked");
    socket.emit('increment')
})