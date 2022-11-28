//users
const users = [
  {
    id: 1,
    name: "Samir",
    username: "samir",
    password: "samir",
  },
  {
    id: 2,
    name: "Ferrux",
    username: "ferrux",
    password: "ferrux",
  },
  {
    id: 3,
    name: "Emil",
    username: "emil",
    password: "emil",
  },
  {
    id: 4,
    name: "Refail",
    username: "refail",
    password: "refail",
  },
];

const followers = [];
const followings = [];
const notifications = [];

//Choosing DOM elements
const loginContainer = document.querySelector(".login");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const signInBtn = document.querySelector("#signIn");
const logoutBtns = document.querySelectorAll(".logout");

//main containers
const mainContainer = document.querySelector(".main-container");
const btnsContainer = document.querySelector(".btns-container");
const othersContainer = document.querySelector(".others-container");

//btns
const discoverBtn = document.querySelector(".discover");
const followingBtn = document.querySelector(".following");
const followersBtn = document.querySelector(".followers");
const notificationsBtn = document.querySelector(".notifications");

//buttons containers
const discoverContainer = document.querySelector(".discover-container");
const followingContainer = document.querySelector(".following-container");
const followersContainer = document.querySelector(".followers-container");
const notificationsContainer = document.querySelector(
  ".notifications-container"
);

let currentUser;

//Login
const login = function () {
  let user = users.find(
    (user) =>
      user.username === username.value && user.password === password.value
  );
  currentUser = user;
  loginContainer.style.display = "none";
  renderMainContainer();
};

//render main container
const renderMainContainer = function () {
  mainContainer.style.display = "block";

  //discover
  discoverContainer.innerHTML = "";
  for (const user of users) {
    if (
      user.id !== currentUser.id &&
      !notifications.some((n) => n.receiverId === user.id)
    ) {
      discoverContainer.innerHTML += `
      <div style="display: flex;justify-content: space-around;align-items: baseline;">
        <p style="display:inline-block; color:white;font-weight:bold">${user.name}</p>
        <button class="btn btn-outline-warning follow" data-senderId="${currentUser.id}" data-receiverId="${user.id}">Follow</button></br>
      </div>
      `;
    }
  }

  const followBtns = document.querySelectorAll(".follow");
  followBtns.forEach((followBtn) => {
    followBtn.addEventListener("click", (e) => {
      const senderId = Number(followBtn.getAttribute("data-senderId"));
      const receiverId = Number(followBtn.getAttribute("data-receiverId"));
      notifications.push({
        id: 1,
        senderId: senderId,
        receiverId: receiverId,
        isAccept: false,
      });
      e.target.remove();
    });
  });
};

//discover btn
discoverBtn.addEventListener("click", () => {
  discoverContainer.style.display = "block";

  //other containers
  followingContainer.style.display = "none";
  followersContainer.style.display = "none";
  notificationsContainer.style.display = "none";
});

//following btn
followingBtn.addEventListener("click", () => {
  followingContainer.style.display = "block";
  followingContainer.innerHTML = "";
  const filteredFollowings = followings.filter(
    (following) => following.userId === currentUser.id
  );
  for (const filteredFollowing of filteredFollowings) {
    followingContainer.innerHTML += `<p style="color:white"><span style="color:red;font-weight:bold">${filteredFollowing.name}</span> follows you</p>`;
  }

  //other containers
  discoverContainer.style.display = "none";
  followersContainer.style.display = "none";
  notificationsContainer.style.display = "none";
});

//followers btn
followersBtn.addEventListener("click", () => {
  followersContainer.style.display = "block";
  followersContainer.innerHTML = "";
  const filteredFollowers = followers.filter(
    (follower) => follower.receiverId === currentUser.id
  );
  for (const filteredFollower of filteredFollowers) {
    followersContainer.innerHTML += `<p style="color:white"><span style="color:red;font-weight:bold">${filteredFollower.name}</span> follows you</p>`;
  }

  //other containers
  discoverContainer.style.display = "none";
  followingContainer.style.display = "none";
  notificationsContainer.style.display = "none";
});

//notifictions btn
notificationsBtn.addEventListener("click", () => {
  notificationsContainer.style.display = "block";

  const filteredNotifications = notifications.filter(
    (notification) => notification.receiverId === currentUser.id
  );

  let senders = [];
  for (i = 0; i < filteredNotifications.length; i++) {
    for (j = 0; j < users.length; j++) {
      if (filteredNotifications[i].senderId === users[j].id) {
        senders.push(users[j].name);
      }
    }
  }
  notificationsContainer.innerHTML = "";
  for (i = 0; i < filteredNotifications.length; i++) {
    if (currentUser.id === filteredNotifications[i].receiverId) {
      notificationsContainer.innerHTML += `<p style="display:inline-block;color:white;font-size:20px;">
      <span style="color:red;font-weight:bold;">${senders[i]}</span> wants to follow you</p><button data-senderId="${filteredNotifications[i].senderId}" data-receiverId="${currentUser.id}" class="btn btn-outline-danger accept" style="margin-left:10px;">Accept</button></br>`;
    }
  }
  const acceptBtns = document.querySelectorAll(".accept");

  acceptBtns.forEach((acceptBtn) => {
    acceptBtn.addEventListener("click", (e) => {
      const senderId = Number(acceptBtn.getAttribute("data-senderId"));
      const receiverId = Number(acceptBtn.getAttribute("data-receiverId"));
      e.target.remove();
      const senderUser = users.find((user) => user.id === senderId);
      followers.push({
        id: Math.floor(Math.random() * 1000),
        userId: senderId,
        receiverId: receiverId,
        name: senderUser.name,
        username: senderUser.username,
        password: senderUser.password,
      });
      const receiverUser = users.find((user) => user.id === receiverId);
      followings.push({
        id: Math.floor(Math.random() * 1000),
        userId: senderId,
        receiverId: receiverId,
        name: receiverUser.name,
        username: receiverUser.username,
        password: receiverUser.password,
      });
    });
  });

  //other containers
  discoverContainer.style.display = "none";
  followingContainer.style.display = "none";
  followersContainer.style.display = "none";
});

//Sign in
signInBtn.addEventListener("click", () => {
  login();
});

//Logout button
logoutBtns.forEach((logoutBtn) => {
  logoutBtn.addEventListener("click", () => {
    loginContainer.style.display = "block";
    mainContainer.style.display = "none";
    discoverContainer.style.display = "none";
    followersContainer.style.display = "none";
    followingContainer.style.display = "none";
    notificationsContainer.style.display = "none";
  });
});
