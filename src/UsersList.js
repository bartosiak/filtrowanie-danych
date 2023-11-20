import { useState } from "react";
import "./UsersList.css";

const UsersList = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        usertype: "Admin",
    });

    const [users, setUsers] = useState([]);
    const [usersFiltered, setUsersFiltered] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData((prevDataForm) => {
            return { ...prevDataForm, [name]: target.value };
        });
    };

    const setUser = (e) => {
        e.preventDefault();
        const newUser = { ...formData, id: Date.now() };
        setUsers(users.concat(newUser));
        setUsersFiltered(users.concat(newUser));
    };

    const removeUser = (id, usertype) => {
        const removedUser = users.filter((user) => user.id !== id);
        const filteredAdmin = users.filter((user) => user.usertype === "Admin");
        const filteredUsers = users.filter((user) => user.usertype === "User");

        setUsers(removedUser);
        setUsersFiltered(removedUser);
        if (isSorted) {
            if (usertype === "Admin") {
                setUsersFiltered(filteredAdmin);
                setIsSorted(true);
            } else {
                setUsersFiltered(filteredUsers);
                setIsSorted(true);
            }
        } else {
            setIsSorted(false);
        }
    };

    const filterUsers = (usertype) => {
        const filteredAdmin = users.filter((user) => user.usertype === "Admin");
        const filteredUsers = users.filter((user) => user.usertype === "User");
        if (usertype === "Admin") {
            setUsersFiltered(filteredAdmin);
            setIsSorted(true);
        } else if (usertype === "User") {
            setUsersFiltered(filteredUsers);
            setIsSorted(true);
        } else {
            setUsersFiltered(users);
            setIsSorted(false);
        }
    };

    return (
        <div className="usersList">
            <form onSubmit={setUser}>
                <label htmlFor="username">User name</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="User name"
                    onChange={handleInputChange}
                    value={formData.username}
                />
                <label htmlFor="email">User email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="User email"
                    onChange={handleInputChange}
                    value={formData.email}
                />
                <label htmlFor="usertype">User type</label>
                <select
                    id="usertype"
                    name="usertype"
                    onChange={handleInputChange}
                >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button>Save</button>
            </form>

            <div className="list">
                <div className="buttonsPanel">
                    <button
                        className="btnFilter"
                        onClick={() => filterUsers("Admin")}
                    >
                        Wyświetl tylko adminów
                    </button>
                    <button
                        className="btnFilter"
                        onClick={() => filterUsers("User")}
                    >
                        Wyświetl tylko userów
                    </button>
                    <button
                        className="btnFilter"
                        onClick={() => filterUsers("All")}
                    >
                        Wyświetl wszystkich
                    </button>
                </div>
                {usersFiltered.map((user) => {
                    return (
                        <div
                            className="userItem"
                            key={user.id}
                            onClick={() => removeUser(user.id, user.usertype)}
                        >
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                            <p>{user.usertype}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UsersList;
