document.addEventListener("DOMContentLoaded", function () {
    const profileSection = document.querySelector(".profile-info");
  
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (currentUser) {
      profileSection.innerHTML = `
        <p><strong>Name:</strong> ${currentUser.name}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Member Since:</strong> ${getMemberSinceDate()}</p>
        <p><strong>Role:</strong> ${currentUser.isAdmin ? 'Admin' : 'User'}</p>
      `;
    } else {
      profileSection.innerHTML = "<p>Please login to view your profile.</p>";
      // Redirect to login page if not logged in
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    }
  
    function getMemberSinceDate() {
      const date = new Date();
      return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
    }
});
  