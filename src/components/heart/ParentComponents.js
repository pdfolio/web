// ParentComponent.js
import React from 'react';
import Heart from './Heart';

function ParentComponent() {
    const memberId = 'user123'; // 사용자 ID
    const gatherId = 'post456'; // 게시물 ID

    return (
        <div>
            <Heart memberId={memberId} gatherId={gatherId} />
        </div>
    );
}

export default ParentComponent;