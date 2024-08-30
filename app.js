let userinfo = [];
document.addEventListener('DOMContentLoaded', () => {
    async function fetchUserData() {
      try {
        const response = await fetch('/user-data');
        const data = await response.json();
        userinfo = data;
        let heading = document.getElementById("h111");
        heading.innerText =  userinfo[0].name;
        heading.style.color = "red";
      }
       catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  
    fetchUserData();
  });
