import { React } from 'react';
import '../css/TopContainer.css'
import { PAGES } from '../App';
import twitter_logo from '../images/twitter_logo.png'

export default function TopContainer(props) {

    return (
        <div className="top-container">
            <div className="links">
                <img style={{ width: "5%" }} src={twitter_logo} alt="Logo"></img>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <a className={props.Component === PAGES.TRENDING ? "active" : ""}
                    onClick={() => {
                        props.setComponent(PAGES.TRENDING)
                    }}>Trending</a>
                <a className={props.Component === PAGES.THREAD ? "active" : ""}
                    onClick={() => {
                        props.setComponent(PAGES.THREAD)
                    }}>Thread-Summarizer</a>
                <a className={props.Component === PAGES.PROFILE ? "active" : ""}
                    onClick={() => {
                        props.setComponent(PAGES.PROFILE)
                    }}>User-Summarizer</a>

                {/* <a className="dropdown-toggle"
                    onClick={() => {
                        props.setdisplayBanner(true)
                    }}>Tags</a> */}
                <button className="btn btn-primary"
                    onClick={() => {
                        if (props.Component == PAGES.PROFILE) {
                            props.user_summarizer();
                        }
                        else if (props.Component == PAGES.THREAD) {
                            props.thread_summarizer();
                        }
                    }}>Twiterify</button>
            </div>
        </div>
    )
}