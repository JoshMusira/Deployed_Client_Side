import { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { apiDomain } from "../../utils/utilsDomain";
import { Context } from "../../context/userContext/Context";
import './comment.css'

const Comments = ({ id }) => {
    const { user } = useContext(Context);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await Axios.get(`${apiDomain}/comment/${id}`, {
                    headers: { Authorization: user.token }
                });
                setComments(res.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [user.token]);

    return (

        <div>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="Container">
                        <span className="username"> {comment.username}:</span>
                        <span className="comment"> {comment.content}</span>
                    </div>
                ))
            ) : (
                <div>No comments available.</div>
            )}
        </div>
    )



};
export default Comments