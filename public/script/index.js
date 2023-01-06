





document.getElementsByClassName('btn')[0].addEventListener('click',(e)=>{
    const userName = document.getElementById("exampleInputName1").value;
    const userEmail = document.getElementById("exampleInputEmail1").value;
    const userPhoneNumber = document.getElementById("exampleInputPhoneNumber1").value;
    const userPassword = document.getElementById("exampleInputPassword1").value;
    const objBody = {
      userName,
      userEmail,
      userPhoneNumber,
      userPassword,
    };
  
    console.log(objBody)
    e.preventDefault();
   
    axios.post("http://localhost:3000/user/signUp",objBody).then(result=>{
        console.log(result);
        alert(result.data.message);
        window.location.href='../login/login.html'
    }).catch(err=>{
        console.log(err);
        alert(err.response.data.message)
    });
})
