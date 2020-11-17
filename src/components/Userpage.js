import React, { useState } from 'react';
import './Userpage.css';

const Userpage = () => {
    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="./usericon.png"
                    />
                </div>
                <div>
                    <h1>YOOOOOOOOOOO</h1>
                </div>
            </div>
        </div>
    )
}

export default Userpage;
