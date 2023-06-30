import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../settings/settings.css';
import profileImage from '../../assets/images/4.jpeg';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/userContext/Context';
import { apiDomain } from '../../utils/utilsDomain';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const { user, updateUserName } = useContext(Context);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                username: username || user.username,
                email: email || user.email,
                password: password || user.password
            };
            const response = await axios.put(
                `${apiDomain}/user/${user.id}`,
                updatedUser,
                { headers: { Authorization: user.token } }
            );
            updateUserName(updatedUser.username); // Update the username in the context
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error.response.data.error);
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`${apiDomain}/user/${user.id}`, {
                headers: { Authorization: user.token }
            });
            // Perform any additional actions after successful deletion
            // ...

            // Clear the user context and redirect to the login page
            updateUserName(''); // Clear the username in the context
            // Add any other necessary actions to clear the user context

            console.log("User deleted successfully");
            navigate('/login')
            alert("User deleted successfully");

        } catch (error) {
            console.error(error);
            alert(error.response.data.error);
        }
    };
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update your account</span>
                    <button type='submit' onClick={handleDelete} className="settingsTitleDelete">Delete account</button>
                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={user.image_URL} alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: 'none' }} />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="settingsSubmitButton"
                    >
                        Update
                    </button>
                </form>
            </div>
            <Sidebar />
        </div>
    );
};

export default Settings;
