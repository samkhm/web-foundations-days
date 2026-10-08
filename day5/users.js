const loadButton = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusMessage = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

let users = [];

// Load users from the API
async function loadUsers() {
    loadButton.disabled = true;
    statusMessage.textContent = "Loading users...";

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

```
// We will implement this in the next step.
```

}

// Filter users
filterInput.addEventListener("input", () => {
const searchTerm = filterInput.value.trim().toLowerCase();

```
const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
);

renderUsers(filteredUsers);
```

});

// Load users when the button is clicked
loadButton.addEventListener("click", loadUsers);
