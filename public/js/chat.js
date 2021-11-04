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
    socket.emit('sendMessage', msg, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message delivered!");
    })
})

document.querySelector("#send-location").addEventListener("click",(e)=>{
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by the browser")
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        socket.emit("sendLocation", { lat: position.coords.latitude, lng: position.coords.longitude }, (err) => {
            console.log("Message delivered");
        })
    })
})