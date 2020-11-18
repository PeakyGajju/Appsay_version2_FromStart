
var sharedMomentsArea=document.getElementById('shared-moments');
const chatForm=document.querySelector('#chat-form');


const socket = io();

socket.on('message', function(message){
  console.log(message);
  outputMessage(message);

  sharedMomentsArea.scrollTop=sharedMomentsArea.scrollHeight;

  if(document.visibilityState === 'hidden'){
      notify(message)
  }

})

var flag=0;


window.addEventListener('load', function(event){

  console.log("Inside onload event of the body tag");

  setTimeout(Notification.requestPermission((permission)=>{

      if(permission === 'granted'){
          flag=1;
          console.log("From asking permission event");
       }

  }), 3000);

})


function notify(msg){

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification,try Chromium!");
  }

  else if(Notification.permission === "granted"){
    
    var options={
      body: msg.username + ": " + msg.body,
      icon: '/src/images/icons/app-icon-96x96.png' 
    }

    navigator.serviceWorker.ready
    .then(function(swreg){
      swreg.showNotification('Successfully Subsribed', options);
    });

}

else if (Notification.permission !== 'denied') {
 
    if (flag === 1) {
           var options={
        body: msg.username + ": " + msg.body,
        icon: '/src/images/icons/app-icon-96x96.png' 
      
      }

      navigator.serviceWorker.ready
      .then(function(swreg){
        swreg.showNotification('Successfully Subsribed', options);
      });
        

    } 
  }

}



chatForm.addEventListener('submit', function(event){
    event.preventDefault();

  let msg=event.target.elements.msg.value;
    console.log("msg"+msg);

    msg=msg.trim();

    if(!msg){
        return false;
    }

    var msgObj={
        msg:msg,
        to:"UnNamed User"
    }

    socket.emit('chatMessage', msgObj);

    event.target.elements.msg.value = '';
    // event.target.elements.msg.focus();

})


function outputMessage(message) {
  var msgWrapper = document.createElement('div');
  msgWrapper.className = 'message-container';
  var msgTitle = document.createElement('div');
  msgWrapper.appendChild(msgTitle);
  var msgTitleTextElement = document.createElement('h5');
  msgTitleTextElement.style.color = 'black';
  msgTitleTextElement.className = 'message-title';
  msgTitleTextElement.textContent = "from - "+message.username+" - "+message.time;
  msgTitle.appendChild(msgTitleTextElement);
  var msgSupportingText = document.createElement('div');
  msgSupportingText.className = 'message-body';
  msgSupportingText.textContent = message.body;
  msgSupportingText.style.fontSize='20px';
  msgWrapper.appendChild(msgSupportingText);
  sharedMomentsArea.appendChild(msgWrapper);

}

// function updateUI(data, len) {
//   clearCards();
//   for (var i = 0; i < len; i++) {
//       console.log("Data[i]: " + data[i])
//       outputMessage(data[i]);
//   }
// }


function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
      sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}


