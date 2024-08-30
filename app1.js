let userinfo = [];
document.addEventListener('DOMContentLoaded', () => {
    async function fetchUserData() {
      try {
        const response = await fetch('/user-data');
        const data = await response.json();
        userinfo = data;
        let n = document.getElementById("NAME");
        let u = document.getElementById("USERNAME");
        let name1 = document.getElementById("name");
        name1.innerText = userinfo[0].name;
        n.innerText = userinfo[0].name;
        let email = document.getElementById("email");
        email.innerText = userinfo[0].email;
        let phone = document.getElementById("phone");
        phone.innerText = userinfo[0].phone;        
        let username = document.getElementById("username");
        username.innerText = userinfo[0].username;
        u.innerText = userinfo[0].username;
        let dob = document.getElementById("dob");
        dob.innerText = userinfo[0].dob;

      }
       catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  
    fetchUserData();
  });