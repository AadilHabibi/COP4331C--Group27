import React from 'react';



function Emailaddress() {
    return (
        <div>
            <section className="emailbox-wrap">
                <input
                    type="text"
                    placeholder="Enter Email Address"
                    className="emailbox"
                />
            </section>
        </div>

    )
}

function Password() {
    return (
        <div>
            <section className="emailbox-wrap">
                <input
                    type="text"
                    placeholder="Password"
                    className="emailbox"
                />
            </section>
        </div>

    )
}

function Buttons() {
    return (
        <div>
            <section className="buttons">
                <button className="loginbutton">Login</button>
            </section>
        </div>
    )
}

function Homepage() {
    return (
        <div>
            <h1>Hi there</h1>
            <main>
                <Emailaddress />
                <Password />
                <Buttons />
            </main>
        </div>
    )
}

export default Homepage