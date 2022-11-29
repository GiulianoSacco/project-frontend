import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddComment from "../../components/reviewComponents/AddComment";


import './AddReview.css';

function AddReview(props) {
    const [check, setCheck] = useState(null)
    const [comment, setComment] = useState('')
    const [like, setlike] = useState(false)
    const [dislike, setdislike] = useState(false)
    const [likeactive, setlikeactive] = useState(false)
    const [dislikeactive, setdislikeactive] = useState(false)

    const navigate = useNavigate()

    const storedToken = localStorage.getItem('authToken');
    const API_ENDPOINT = "http://localhost:8000/api/addReview/"
    const { placeId } = useParams()

    const checkBoxHandler1 = (event) => {
        if (likeactive) {
            setlikeactive(false)
            setlike(like-1)
        } else {
            setlikeactive(true)
            setlike(like+1)
            if(dislikeactive){
                setdislikeactive(false)
                setlike(like+1)
                setdislike(dislike-1)
            }
        }
    }

    const checkBoxHandler2 = (event) => {
        if (dislikeactive) {
            setdislikeactive(false)
            setdislike(dislike-1)
        } else {
            setdislikeactive(true)
            setdislike(dislike+1)
            if(likeactive){
                setlikeactive(false)
                setdislike(dislike+1)
                setlike(like-1)
            }
        }
    }


    const submitHandler = async (event) => {
        event.preventDefault()

        let newReview = {}
        if (comment !== '') {
            newReview = {
                check: check,
                comment: comment
            }
        } else {
            newReview = {
                check: check
            }
        }

        try {
            await axios.post(API_ENDPOINT + placeId, newReview, { headers: { Authorization: `Bearer ${storedToken}` } })
            setComment('')
            setCheck(null)
            setComment('')
            setCheck(null)
            setlike(false)
            setdislike(false)
            setlikeactive(false)
            setdislikeactive(false)

            navigate (`/places/${placeId}`)

        } catch (error) {
            console.log(error)

        }
    }


    return (
        <div>
            <form onSubmit={submitHandler} >
                <label for="veritifaction">Place verified?</label>
                <br></br>
                {!likeactive && <img src="https://res.cloudinary.com/dfajfbnkr/image/upload/v1669632559/Pawsome/happy_xdpcvc.png" className="iconVerification" />}{like}
                {!likeactive && <input type="checkbox" id="verificationPlace" name="verifiedYes" value={true} onChange={checkBoxHandler1} />}
                {likeactive && <img src="https://res.cloudinary.com/dfajfbnkr/image/upload/v1669632559/Pawsome/happy_xdpcvc.png" className="iconVerification" />}
                <br></br>

                {!dislikeactive && <img src="https://res.cloudinary.com/dfajfbnkr/image/upload/v1669632559/Pawsome/sad-face_lhbvxo.png" className="iconVerification" />}{dislike}
                {!dislikeactive && <input type="checkbox" id="verificationPlace" name="verifiedNo" value={false} onChange={checkBoxHandler2} />}
                {dislikeactive && <img src="https://res.cloudinary.com/dfajfbnkr/image/upload/v1669632559/Pawsome/sad-face_lhbvxo.png" className="iconVerification" />}

                {check !== null && <div> <AddComment comment={comment} onComment={setComment} />

                    <button type="submit" className="submitButton">Add review</button>
                </div>
                }

            </form>
        </div>
    )
}


export default AddReview