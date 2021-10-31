console.log("Script loaded");
const socket = io()

// socket.on('countUpdated',(count)=>{
//     console.log("The count has been updated:",count);
// })

// document.querySelector("#incriment").addEventListener('click',()=>{
//     console.log("Clicked");
//     socket.emit('increment')
// })

socket.on('message',(msg)=>{
    console.log(msg);
})

document.querySelector("#chat").addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg = document.querySelector('#message').value;
    socket.emit('sendMessage',msg)
})