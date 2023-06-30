import React from 'react'
import './post.css'
import post1 from '../../assets/images/9.jpeg'

const Post = () => {
    return (
        <div className='post'>
            <img className='postImg' src={post1} alt="" />
            <div className="postInfo">
                <div className="postCats">
                    {/* <span className="postCat">Music</span> */}
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle">
                    Lorem ipsum dolor sit amet.

                </span>
                <hr />
                <span className="postDate">1 hr ago</span>

            </div>
            <p className="postDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi dolores, optio nesciunt culpa adipisci veniam aperiam aspernatur commodi ea aliquam sapiente suscipit deserunt dolor reiciendis, laboriosam repudiandae blanditiis ad neque nihil officia quaerat? Illum harum labore sequi ducimus, dolores atque quod dolor sit, nemo corporis ut optio odio qui eaque reprehenderit molestiae numquam iusto itaque consequuntur earum enim veritatis, vitae excepturi. Ducimus voluptatum fugit blanditiis itaque? Cumque consectetur ex ducimus autem officia ab non maiores odio sit harum quisquam voluptas praesentium, eligendi expedita corrupti recusandae quo ullam hic omnis velit dolores ipsa a magnam perferendis! Quasi saepe minus error.</p>
           
            <div className="commentContainer">
                <span className="viewComments">View all comments</span>
                <div className="addComment">
                    <textarea type='text' name="" placeholder='Add a comment' id="" className="comment"></textarea>
                    <input type="submit" className='submit' value="Post" /><span className='emoji'>😂</span>
                </div>
            </div>
        </div>
    )
}

export default Post