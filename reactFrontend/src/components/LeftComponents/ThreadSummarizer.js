import { React } from 'react';

export default function ThreadSummarizer(props) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Thread URL</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Enter thread URL'
                    onChange={(e) => {
                        props.setThread({ ...props.thread, 'url': e.target.value })
                    }} />
            </div>
            <br />
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Thread Summary</h3>
                    <br />
                    <p className="card-text">
                        {
                            Object.keys(props.thread.details).length === 0
                                ? <p>No summary to show</p> :
                                props.thread.details["thread_summary"]
                        }
                    </p>
                </div>
            </div>
            <br />
            <br />
            <h2 style={{ textAlign: "left" }}>References</h2>
            <ul>
                {
                    Object.keys(props.thread.details).length === 0 ?
                        <li style={{ textAlign: "left" }}>No references to show</li> :
                        props.thread.details["references"].map((item, id) => {
                            return <li style={{ textAlign: "left" }}>{item}</li>
                        })

                }
            </ul>
        </>
    )
}