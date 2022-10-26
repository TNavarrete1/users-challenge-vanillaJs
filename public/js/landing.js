
const toggleDropdown = (event) => {
    const postContainer = event.currentTarget.querySelector(".user-post-container");
    const iconPlus = event.currentTarget.querySelector(".dropdown-icon-plus");
    const iconMinus = event.currentTarget.querySelector(".dropdown-icon-minus");

    if (postContainer.classList.contains("dropdown-open")) {
        postContainer.classList.remove("dropdown-open");
        iconPlus.classList.remove("dropdown-flip-icon")
        iconMinus.classList.add("dropdown-flip-icon");
    } else {
        postContainer.classList.add("dropdown-open");
        iconMinus.classList.remove("dropdown-flip-icon");
        iconPlus.classList.add("dropdown-flip-icon");
    }
};

const userComponent = (user) => {
    const userInfoContainer = document.createElement("div");
    userInfoContainer.classList.add("user-info-container");
    userInfoContainer.innerHTML = 
        `
            <i class="fa-solid fa-user user-icon"></i>
            <div class="username">${user.username}</div>
            <div class="email">${user.email}</div>
            <i class="fa-solid fa-circle-plus dropdown-icon-plus"></i>
            <i class="fa-solid fa-circle-minus dropdown-icon-minus dropdown-flip-icon"></i>
            <div class="user-post-container">
                <header class="posts-header">Posts</header>
                <ul>
                </ul>
            </div>
        `;
    userInfoContainer.addEventListener("click", toggleDropdown);

    return userInfoContainer;
};

const postComponent = (post) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = 
        `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
        `

    return liElement;
};

const requestUserData = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const requestUserPosts = async (userId) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const fillUserData = async () => {
    const layout = document.querySelector("#layout");

    const users = await requestUserData();
    if (!users) {
        return;
    }

    for (const user of users) {
        const userInfoContainer = userComponent(user);
        const posts = await requestUserPosts(user.id);
        if (!posts) {
            return;
        }

        for (const post of posts) {
            const postElement = postComponent(post);
            userInfoContainer.querySelector("ul").appendChild(postElement);
        }

        layout.appendChild(userInfoContainer);
    }
};

/**************************
 * Events Listeners
**************************/
window.addEventListener("load", fillUserData);