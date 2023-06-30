import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { Context } from '../../context/userContext/Context'
import Axios from 'axios'
import { apiDomain } from '../../utils/utilsDomain'

const AddComment = ({ id }) => {
    const { user } = useContext(Context)
    const schema = yup.object().shape({
        user_id: yup.number().required("user_id is required"),
        content: yup.string().required("Comment is required")
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        Axios.post(`${apiDomain}/comment/${id}`, data, {
            headers: {
                "Authorization": `${user.token}`,
            }
        }).then((response) => {
            reset();
            response.data.message && alert(response.data.message)
        }).catch((error) => {
            alert(error.response.data.error);
        })
    }

    return (
        <>
            {user && (
                <div>
                    <p className='error'>{errors.user_id?.message}</p>
                    <input {...register("user_id")} type="hidden" value={user.id} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="addComment">
                            <p className='error'>{errors.content?.message}</p>
                            <textarea {...register("content")} placeholder='Add a comment' name='content' className="comment"></textarea>
                            <input type="submit" className='submit' value="Post" /><span className='emoji'>😂</span>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default AddComment
