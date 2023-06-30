import React, { useEffect, useState } from 'react';
import '../singlepost/singlepost.css';
import post1 from '../../assets/images/placeholder.jpeg';
import { useParams } from 'react-router-dom';
import { apiDomain } from '../../utils/utilsDomain';
import Axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/userContext/Context';
import { GrUpdate } from 'react-icons/gr'
import Comments from '../comment/Comments';
import AddComment from '../comment/AddComment';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Update from '../../pages/update/Update';

const SinglePost = () => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const { id } = useParams();
    const [blogs, setBlogs] = useState({});

    const [showComments, setShowComments] = useState(false);

    const [likeTotal, setLike] = useState(2);
    const [isLiked, setIsLiked] = useState(false);

    const handleCommentClick = () => {
        setShowComments((prevState) => !prevState);
    };


    const getBlogs = async () => {
        console.log(id);
        const res = await Axios.get(`${apiDomain}/post/${id}`, {
            headers: { Authorization: `${user.token}` },
        });
        setBlogs(res.data);
    };
    const likeHandler = () => {
        setLike(isLiked ? likeTotal - 1 : likeTotal + 1);
        setIsLiked(!isLiked);
    };

    const handleDelete = async () => {
        try {
            // Delete the comments associated with the post
            await Axios.delete(`${apiDomain}/comment/${id}`, {
                headers: { Authorization: `${user.token}` },
            });

            // Delete the post
            await Axios.delete(`${apiDomain}/post/${id}`, {
                headers: { Authorization: `${user.token}` },

            });
            navigate('/')
            alert('Post deleted successfully');
            // Post and associated comments deleted successfully, perform any necessary actions
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the post');
            // Handle error while deleting the post or comments
        }
    };
    const handleUpdate = () => {
        navigate(`/update/${id}`); // Navigate to the update page with the post ID
    }
    // <Update />
    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <>
            {blogs && (
                <div className="post">
                    <div className="imageContainer1">
                        {
                            blogs.image_URL ? <img className="postImg" src={blogs.image_URL} style={{ width: '100%' }} alt="" /> : <img style={{ width: '100%' }} className="postImg" src={post1} alt="" />
                        }
                    </div>
                    <div className="postInfo">
                        <div className="postCats">
                            <span className="postCat">{blogs.category_name}</span>
                        </div>
                        <span className="postTitle">{blogs.title}</span>
                        <hr />
                        <span className="postDate">Date: {blogs.created_at}</span>
                    </div>
                    <p className="postDesc">{blogs.Content}</p>

                    <div className="commentContainer">
                        <span className="viewComments" onClick={handleCommentClick}>
                            View all comments
                        </span>

                        {showComments && <Comments id={blogs.post_id} />}
                        <AddComment id={blogs.post_id} />
                    </div>
                    <div className="icons2">

                        <span>
                            <RiDeleteBin6Line className="delete" onClick={handleDelete} />
                        </span>
                        <span onClick={handleUpdate} className=' updateMain'>
                            <GrUpdate className='update' />Update
                        </span>
                    </div>
                    <div className="btnSingle">

                        <button className="backHome" onClick={() => { navigate('/') }} >Back Home</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SinglePost;
