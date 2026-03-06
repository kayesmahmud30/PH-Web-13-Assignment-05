document.getElementById("sing-btn").addEventListener("click", function () {
  const inputUsername = document.getElementById("user-name");
  const userName = inputUsername.value;

  const inputPassword = document.getElementById("password");
  const userPassword = inputPassword.value;

  if (userName == "admin" && userPassword == "admin123") {
    alert("Sign-in successful");
    window.location.assign("./home.html");
  } else {
    alert("Sign-in Failed");
    return;
  }
});
