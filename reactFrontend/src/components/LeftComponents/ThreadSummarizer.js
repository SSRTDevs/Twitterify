import React from 'react';

export default function ThreadSummarizer(props) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Thread URL</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Enter thread URL'
                    onChange={(e) => {
                        props.setUsername(e.target.value)
                    }} />
            </div>
            <br />
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Thread Summary</h3>
                    <br />
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <br />
            <br />
            <h2 style={{ textAlign: "left" }}>References</h2>
            <ul>
                <li style={{textAlign: "left"}}>Coffee</li>
                <li style={{textAlign: "left"}}>Tea</li>
                <li style={{textAlign: "left"}}>Milk</li>
            </ul>
        </>
    )
}