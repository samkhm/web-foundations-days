const loadButton = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusMessage = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

let users = [];

// Load users from the API
async function loadUsers() {
    loadButton.disabled = true;
    statusMessage.textContent = "Loading users....";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to load users.");
        }

        users = await response.json();

        renderUsers(users);

        statusMessage.textContent = `Loaded ${users.length} users.`;
    } catch (error) {
        statusMessage.textContent =
            "Unable to load users. Please try again.";

        users = [];
        renderUsers(users);
    } finally {
        loadButton.disabled = false;
    }
}

// Render users
function renderUsers(list) {
    usersList.textContent = "";

    if (list.length === 0) {
        if (filterInput.value.trim() !== "") {
            const message = document.createElement("li");
            message.textContent = "No users match your filter.";
            usersList.appendChild(message);
        }

        return;
    }

    list.forEach((user) => {
        const listItem = document.createElement("li");

        const name = document.createElement("h3");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        listItem.appendChild(name);
        listItem.appendChild(email);
        listItem.appendChild(city);
        listItem.appendChild(company);

        usersList.appendChild(listItem);
    });
}

// Filter users without making another API request
filterInput.addEventListener("input", () => {
    const searchTerm = filterInput.value.trim().toLowerCase();

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
    );

    renderUsers(filteredUsers);
});

// Load users when button is clicked
loadButton.addEventListener("click", loadUsers);