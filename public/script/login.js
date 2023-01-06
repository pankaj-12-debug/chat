document.getElementsByClassName('btn')[0].addEventListener('click',(e)=>{
    e.preventDefault();
     const userEmail = document.getElementById("exampleInputEmail1").value;
     const userPassword = document.getElementById("exampleInputPassword1").value;
     const objBody = {
      userEmail,
      userPassword,
    };
   
    axios.post('http://localhost:3000/user/login',objBody).then(result=>{
        console.log(result);
        alert(result.data.message);
        localStorage.setItem('token',result.data.token);
        window.location.href='../chatPage/chatPage.html'
    }).catch(err=>{
        console.log(err)
    })
})