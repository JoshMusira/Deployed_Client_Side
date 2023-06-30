import React from "react";
import { Link } from "react-router-dom";
import "../blog/blog.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useState } from "react";
import { Context } from "../../context/userContext/Context";
import Axios from "axios";
import { apiDomain } from "../../utils/utilsDomain";
import post1 from "../../assets/images/9.jpeg";
import Comments from "../comment/Comments";
import AddComment from "../comment/AddComment";
import { GrUpdate } from 'react-icons/gr'

const Blog = ({ post }) => {
    const { user } = useContext(Context);
    const [showComments, setShowComments] = useState(false);

    const [likeTotal, setLike] = useState(2);
    const [isLiked, setIsLiked] = useState(false);

    const handleCommentClick = () => {
        setShowComments((prevState) => !prevState);
    };


    return (
        <>{

            <Link className="Link" to={`/post/${post.post_id}`}>
                <div className="post">
                    {
                        post.image_URL ? <img className="postImg" src={post.image_URL} alt="" /> : <img className="postImg" src={post1} alt="" />
                    }

                    <div className="postInfo">
                        <div className="postCats">
                            <span className="postCat">{post.category_name}</span>
                        </div>
                        <span className="postTitle">{post.title}</span>
                        <hr />
                        <span className="postDate">Date:{post.created_at}</span>
                    </div>
                    <p className="postDesc">{post.Content}</p>

                    <div className="commentContainer">
                        <span className="viewComments" onClick={handleCommentClick}>
                            View all comments
                        </span>
                        {showComments && <Comments id={post.post_id} />}
                        <AddComment id={post.post_id} />
                    </div>
                    <span className="delete">
                        <RiDeleteBin6Line />
                    </span>
                </div>
            </Link>
        }
        </>

    );
};

export default Blog;
