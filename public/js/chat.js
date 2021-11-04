console.log("Script loaded");
const socket = io();
//ELEMENTS
const $messageForm = document.querySelector("#chat");
const $messageFormInput = document.querySelector("#message");
const $submitButton = document.querySelector("#submit");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages")

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML
const locationTemplate = document.querySelector("#location-template").innerHTML

socket.on("message", (msg) => {
    console.log(msg);
    const html = Mustache.render(messageTemplate, {
        message:msg
    })
    $messages.insertAdjacentHTML('beforeend',html)
});
socket.on("locationMessage", (url) => {
    console.log(url);
    const html = Mustache.render(locationTemplate,{
        loc:url
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //disable
  $submitButton.setAttribute("disabled", "disabled");
  const msg = document.querySelector("#message").value;
  socket.emit("sendMessage", msg, (error) => {
    //enable
    $submitButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    $submitButton.removeAttribute("disabled");
    if (error) {
      return console.log(error);
    }
    console.log("Message delivered!");
  });
});

document.querySelector("#send-location").addEventListener("click", (e) => {
  e.preventDefault();
  $sendLocationButton.setAttribute("disabled", "disabled");
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by the browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    socket.emit(
      "sendLocation",
      { lat: position.coords.latitude, lng: position.coords.longitude },
      (err) => {
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location delivered");
      }
    );
  });
});
