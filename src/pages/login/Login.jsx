import React from 'react'
import '../login/login.css'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/userContext/Context'
import { apiDomain } from '../../utils/utilsDomain'
const Login = () => {
    const { dispatch } = useContext(Context);
    // console.log(user);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        Axios.post(`${apiDomain}/auth/login`, data)
            .then(({ data }) => {
                if (data.token) {
                    dispatch({ type: "LOGIN_SUCCESS", payload: data })
                    // alert('Login Successfull ');
                    navigate('/');


                }
            })
            .catch(({ response }) => {
                alert(response.data.error)
            });
    }
    return (
        <div className='login'>

            <span className="loginTitle">Login</span>
            <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                <label> Username</label>
                <p className='error'>{errors.username?.message}</p>
                <input {...register("username")} className='loginInput' type="text" placeholder='Enter your Username ...' />
                <label >Password</label>
                <p className='error'>{errors.password?.message}</p>
                <input {...register("password")} className='loginInput' type="password" placeholder='Enter your password ...' />
                <input type="submit" value="Submit" className="loginButton" />
            </form>
            <button className="loginRegisterButton">
                <Link className='link' to='/register'>Register</Link>
            </button>

        </div>
    )
}

export default Login  