const chatMessage = document.getElementById("chatMessage");
const availableGroup = document.getElementById("availableGroup");
function showMessageinUI(message,userName){
  console.log(chatMessage)
   
    chatMessage.innerHTML += `<p>${userName}: ${message}</p>`;
   
   
}
function joinedNotificationinUI(userName){
  console.log(chatMessage);
    chatMessage.innerHTML+=`<p><b>${userName} Created this group</b></p>`
}




document.getElementById('addGroup').addEventListener('click',()=>{
  document.getElementById("addGroupForm").classList.toggle("hidden")
});

document.getElementById("addGroupSubmitButton").addEventListener('click',(e)=>{

  let token=localStorage.getItem('token')
  let groupName = document.getElementById("inputGroupName").value;
  let reqObj={
    groupName
  }
  axios
    .post(`http://localhost:3000/group/addGroup`, reqObj,{
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});
function viewGroupInUI(obj){
  availableGroup.innerHTML += `<div><span>${obj.name}</span> <button onclick='openChat(event)'>Open Chat</button></div>`;
}
var groupName;
function addUserGroup(e){
  document.getElementById("addUserForm").classList.toggle('hidden');
}

window.addEventListener('DOMContentLoaded',()=>{
  let token=localStorage.getItem('token')
  axios
    .get("http://localhost:3000/group/getAllGroup", {
      headers: {
        Authorization: token,
      }
    })
    .then((result) => {
    
      result.data.forEach((element) => {
        viewGroupInUI(element);
      });
    })
    .catch((err) => {
      console.log(err);
    });
})


function openChat(e) {
  groupName = e.target.parentNode.firstElementChild.innerText;
  console.log(groupName)
 if(!document.getElementById('user-list').classList.contains('hidden'))
 document.getElementById("user-list").classList.add("hidden");
  let token=localStorage.getItem('token')
  document.getElementById(
    "chatHeader"
  ).innerHTML = `<h1>${groupName}</h1>`
  axios.get("http://localhost:3000/group/adminChecks", {
  headers: {
    Authorization: token,
  }
}).then((result)=>{
  let flag=0;
  console.log(result.data);
  result.data.forEach(ele=>{
    if (ele.name == groupName){
      if(ele.User_group.isAdmin == true){
      document.getElementById("buttons-admin").classList.remove("hidden");
      if(!document.getElementById("buttons-user").classList.contains('hidden'))
         document.getElementById("buttons-user").classList.add("hidden");
      }
      else{
      document.getElementById("buttons-user").classList.remove("hidden");
      if(!document.getElementById("buttons-admin").classList.contains('hidden'))
       document.getElementById("buttons-admin").classList.add("hidden");
        
      }
    }
  })
  }).then(()=>{
  setInterval(() => {
    let messagesObj = JSON.parse(localStorage.getItem(`${groupName}`));
    let lastMessageId;
    if (messagesObj) {
      let lastObj = messagesObj[messagesObj.length - 1];
      lastMessageId = lastObj.id;
    } else {
      lastMessageId = 0;
    }
    axios
      .get(
        `http://localhost:3000/user/getAllMessage?lastMessageId=${lastMessageId}&groupName=${groupName}`
      )
      .then((response) => {
        let message = response.data.result;
        if (!localStorage.getItem(`${groupName}`)) {
          localStorage.setItem(`${groupName}`, JSON.stringify(message));
        } else {
          if (message.length > 0) {
            messagesObj.push(message[0]);
            localStorage.setItem(`${groupName}`, JSON.stringify(messagesObj));
          }
        }
        chatMessage.innerHTML = "";

        if (Array.isArray(messagesObj)) {
          messagesObj.forEach((element) => {
            if (element.messageText == "CREATED") {
              joinedNotificationinUI(element.name);
            } else showMessageinUI(element.messageText, element.name);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);

}).catch(err=>console.log(err));
 
}

document.getElementsByClassName("btn")[0].addEventListener("click", () => {
  let token = localStorage.getItem("token");
  let chatMessage = document.getElementById("chatMessageInput").value;
  console.log(groupName)
  let reqObj = {
    chatMessage,
    groupName
  };
  axios
    .post("http://localhost:3000/user/sendMessage", reqObj, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      console.log(result);
      
    })
    .catch((err) => {
      console.log(err);
    });
});


// setInterval(()=>{
//     let messagesObj = JSON.parse(localStorage.getItem("messagesObj"));
//     let lastMessageId;
//     if(messagesObj){ 
//       let lastObj=messagesObj[(messagesObj.length-1)]
//       lastMessageId=lastObj.id;
//     }else{
//       lastMessageId=0;
//     }
//     axios
//       .get(
//         `http://localhost:3000/user/getAllMessage?lastMessageId=${lastMessageId}`
//       )
//       .then((response) => {
//         let message = response.data.result;       
//         if(!localStorage.getItem('messagesObj')){
//           localStorage.setItem("messagesObj",JSON.stringify(message));
//         }else{
//           if(message.length>0){
//            messagesObj.push(message[0]);     
//            localStorage.setItem("messagesObj", JSON.stringify(messagesObj));
//           }
//         }
//         chatMessage.innerHTML='';
        
//        if(Array.isArray(messagesObj)){
//          messagesObj.forEach((element) => {
//            if (element.messageText == "JOINED") {
//              joinedNotificationinUI(element.name);
//            } else showMessageinUI(element.messageText, element.name);
//          });
//        }
        
       
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// },2000);


document.getElementById("addUserSubmitButton").addEventListener('click',(e)=>{
  e.preventDefault();
   const inputEmail = document.getElementById("inputEmail").value;
   const reqObj = {
     inputEmail,
     groupName,
   };
   console.log(reqObj);
   axios
     .post("http://localhost:3000/group/addUserGroup", reqObj)
     .then((result) => {
       console.log(result);
       alert(`${inputEmail} added to ${groupName}`);
       window.location.reload();
     })
     .then((err) => {
       console.log(err);
     });
});

function addAdminGroup(e){
  document.getElementById("addAdminForm").classList.toggle("hidden");
}

function showUser(){
  document.getElementById("user-list").classList.toggle('hidden');
  document.getElementById("user-list").innerHTML='';
  axios.get(`http://localhost:3000/group/groupUser?groupName=${groupName}`).then(result=>{
    console.log(groupName)
    console.log(result)
    let users=result.data;
    users.forEach(ele=>{
      document.getElementById( "user-list").innerHTML += `<div class='user-row'>${ele.name}</div>`;
    })
  }).catch(err=>console.log(err));
}

document.getElementById("addAdminSubmitButton").addEventListener('click',(e)=>{
  e.preventDefault();
  let admin=document.getElementById("inputEmail-admin").value;
  let reqObj={
    admin,
    groupName
  }
  console.log(reqObj)
  axios.post("http://localhost:3000/group/addAdminGroup",reqObj).then(response=>{
    alert(`${admin} is admin now`);
    window.location.reload();
  }).catch(err=>{
    console.log(err)
  });
});

function deleteUSer(event){
  document.getElementById("addDeleteUserForm").classList.toggle('hidden');
}
document.getElementById("deleteUserSubmitButton").addEventListener('click',(e)=>{
  e.preventDefault();
  let email = document.getElementById("inputDeleteUser").value;
  let reqObj={
    email,
    groupName
  }
  axios.post("http://localhost:3000/group/deleteUserGroup",reqObj).then(data=>{
    console.log('removed')
    alert(`${email} removed from ${groupName}`)
    window.location.reload();
  }).catch(err=>console.log(err));
});


