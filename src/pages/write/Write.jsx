import React, { useState } from 'react';
import './write.css';
import writeImage from '../../assets/images/placeholder.jpeg';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { Context } from '../../context/userContext/Context';
import Axios from 'axios';
import { apiDomain } from '../../utils/utilsDomain';
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

const Write = () => {
    const { user } = useContext(Context);
    const [imageUpload, setImageUpload] = useState(null);

    const schema = yup.object().shape({
        category_name: yup.string().required('category_name is required'),
        title: yup.string().required('title is required'),
        user_id: yup.number().required('user_id is required'),
        Content: yup.string().required('Content is required'),
    });


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `blogs/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        saveDataToDatabase(url);
                        // console.log(url)// Save the image URL and other data to the database
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
            title: formData.get("title"),
            Content: formData.get("Content"),
            image_URL: imageUrl,
            category_name: formData.get("category_name"),
            user_id: user.id,
        };
        // console.log(data)

        Axios.post(`${apiDomain}/post`, data, {
            headers: { 'Authorization': `${user.token}` }
        })
            .then((response) => {
                response.data.message && alert(response.data.message);
                reset();
            })
            .catch(({ response }) => {
                alert(response.data.error);
            });
    };

    const onSubmit = (formData) => {
        // console.log(formData);
        uploadImage();
    };

    return (
        <div className="write">
            <p className="error">{errors.user_id?.message}</p>
            <input {...register('user_id')} type="hidden" value={user.id} />
            <form onSubmit={handleSubmit(onSubmit)} className="writeForm">
                {
                    imageUpload ? <img className="writeImg" src={URL.createObjectURL(imageUpload)} alt="" /> :
                        <img className="writeImg" src={writeImage} alt="" />

                }


                <div className="writeFormGroup">
                    {/* <label className="label" htmlFor="fileInput">
                        Upload <i className=" icon fa-solid fa-file-import"></i>
                    </label> */}
                    <input
                        onChange={(event) => { setImageUpload(event.target.files[0]) }}
                        type="file"
                        id="fileInput"
                    // style={{ display: 'none' }}
                    />
                    <p className="error">{errors.category_name?.message}</p>
                    <select className="writeInputSelect" {...register('category_name')}>
                        <option value="">Categories</option>
                        <option value="Music">Music</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Nature">Nature</option>
                        <option value="Education">Education</option>
                        <option value="Movies">Movies</option>
                        <option value="Sports">Sports</option>
                    </select>
                    <p className="error">{errors.title?.message}</p>
                    <input {...register('title')} type="text" placeholder="Title" id="" className="writeInput" autoFocus={true} />
                    <button type="submit" className="Submit">
                        Publish
                    </button>
                </div>
                <div className="textArea">
                    <p className="error">{errors.Content?.message}</p>
                    <textarea {...register('Content')} placeholder="Tell your story....." className="text"></textarea>
                </div>
            </form>
        </div>
    );
};

export default Write;
