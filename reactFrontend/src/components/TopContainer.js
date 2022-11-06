import { React} from 'react';
import '../css/TopContainer.css'
import twitter_logo from '../images/twitter_logo.png'

export default function TopContainer(props) {

    return (
        <div className="top-container">
            <div className="links">
                <img style={{width: "5%"}}src={twitter_logo} alt="Logo"></img>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <a className={props.Component === "general" ? "active" : ""}
                    onClick={() => {
                        props.setComponent("general")
                    }}>General</a>
                <a className={props.Component === "thread-summarizer" ? "active" : ""}
                    onClick={() => {
                        props.setComponent("thread-summarizer")
                    }}>Thread-Summarizer</a>
                <a className={props.Component === "user-summarizer" ? "active" : ""}
                    onClick={() => {
                        props.setComponent("user-summarizer")
                    }}>User-Summarizer</a>

                {/* <a className="dropdown-toggle"
                    onClick={() => {
                        props.setdisplayBanner(true)
                    }}>Tags</a> */}
                <button className="btn btn-primary"
                    onClick={() => {
                        if (props.Component === "user-summarizer") {
                            props.user_summarizer();
                        }
                    }}>Twiterify</button>
            </div>
        </div>
    )
}