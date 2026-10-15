
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("loggedInUser");
    const nav = document.querySelector("nav ul");

    console.log("Logged-in user:", username);
    console.log("Navigation list found:", !!nav);

    if (!nav) {
        console.error("Could not find nav ul in index.html");
        return;
    }

    // Show or hide Login and Register links
    document.querySelectorAll("nav a").forEach((link) => {
        const href = link.getAttribute("href") || "";

        if (
            href.includes("login.html") ||
            href.includes("register.html")
        ) {
            link.style.display = username ? "none" : "";
        }
    });

    // Add username and Logout links for logged-in users
    if (username && !document.getElementById("logout-link")) {
        const userItem = document.createElement("li");
        userItem.className = "nav-item";

        const userLink = document.createElement("a");
        userLink.className = "nav-link";
        userLink.href = "index.html";
        userLink.textContent = username;

        userItem.appendChild(userLink);
        nav.appendChild(userItem);

        const logoutItem = document.createElement("li");
        logoutItem.className = "nav-item";

        const logoutLink = document.createElement("a");
        logoutLink.className = "nav-link";
        logoutLink.href = "#";
        logoutLink.id = "logout-link";
        logoutLink.textContent = "Logout";

        logoutLink.addEventListener("click", async (event) => {
            event.preventDefault();

            try {
                const response = await fetch(
                    "http://127.0.0.1:8003/api/users/logout/",
                    {
                        method: "POST",
                        credentials: "include"
                    }
                );

                if (response.ok) {
                    localStorage.removeItem("loggedInUser");
                    window.location.href = "login.html";
                } else {
                    alert("Logout failed. Please try again.");
                }
            } catch (error) {
                alert("Could not connect to the server.");
            }
        });

        logoutItem.appendChild(logoutLink);
        nav.appendChild(logoutItem);
    }
});
