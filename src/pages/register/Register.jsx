import { Link } from 'react-router-dom';
import "../register/register.css";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

export default function Register() {
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState(null);
    const schema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters long')
            .max(20, 'Username must not exceed 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores'),
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email address')
            .matches(
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/,
                'Invalid email address'
            ),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
            ),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        saveDataToDatabase(url);
                        console.log(url)// Save the image URL and other data to the database
                    })
                    .catch((error) => {
                        console.log("Error retrieving image URL:", error);
                    });
                alert("Image Uploaded Successful");
            })
            .catch((error) => {
                console.log("Error uploading image:", error);
            });
    };

    const saveDataToDatabase = (imageUrl) => {
        const formData = new FormData(document.querySelector("form")); // Access the form data
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            image_Url: imageUrl
        };
        console.log(data)

        Axios.post("http://localhost:8081/auth/register", data)
            .then((response) => {
                response.data.message && alert(response.data.message);
                navigate("/login");
            })
            .catch(({ response }) => {
                alert(response.data.error);
            });
    };

    const onSubmit = (formData) => {
        console.log(formData);
        uploadImage();
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form onSubmit={handleSubmit(onSubmit)} className="registerForm">

                <label htmlFor="profile"> Profile Image</label>
                <input id='profile' type="file" onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }} />
                <label>Username</label>
                <p className='error'>{errors.username?.message}</p>
                <input {...register("username")} className="registerInput" type="text" placeholder="Enter your username..." />
                <label>Email</label>
                <p className='error'>{errors.email?.message}</p>
                <input {...register("email")} className="registerInput" type="email" placeholder="Enter your email..." />
                <label>Password</label>
                <p className='error'>{errors.password?.message}</p>
                <input {...register("password")} className="registerInput" type="password" placeholder="Enter your password..." />
                <label>Confirm Password</label>
                <p>{errors.confirmPassword?.message}</p>
                <input
                    type="password" className="registerInput" placeholder="Confirm Password..." {...register("confirmPassword")} />

                <input type="submit" value="Register" className="registerButton" />
            </form>
            <button className="registerLoginButton">
                <Link className='link' to='/login'>Login</Link>
            </button>
        </div>
    );
}
