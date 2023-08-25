import React, { useState } from 'react';
import { api, heartApi } from '../../networks/heartApi';

function Heart({ memberId, gatherId }) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
        try {

            const data = await heartApi(`/api/v1/heart/gather`, 'POST', { memberId, gatherId });
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="Heart">
            {liked ? (
                <img
                    src="/img/heart.png"
                    alt=" "
                    className="liked"
                    onClick={handleLike}
                />
            ) : (
                <img
                    src="/img/heart1.png"
                    alt=" "
                    onClick={handleLike}
                />
            )}
            <p>{likes}</p>
        </div>
    );
}

export default Heart;
