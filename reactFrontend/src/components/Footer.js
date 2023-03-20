import React from "react";
import logo from "../images/logo.png";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
    let year = new Date().getFullYear();

    return (
        <div>
            <footer className="footer py-5 px-10 bg-neutral text-neutral-content">
                <div>
                    <img src={logo} alt="logo" width={50} height={50} />
                    <p>
                        <span className="text-base font-bold">Twitterify</span>
                        <div>
                            <p className="text-xs">Copyright © {year} - All right reserved by SSRT Devs</p>
                        </div>
                    </p>
                </div>
                <div>
                    <span className="footer-title">Team</span>
                    <div className="grid grid-flow-col gap-4">
                        <div>
                            <a className="link link-hover" href="https://github.com/SSRTDevs">
                                About us
                            </a>
                        </div>
                        <div>
                            <a className="link link-hover" href="mailto:prithvirohira8@gmail.com">
                                Contact
                            </a>
                        </div>
                        <div>
                            <a className="link link-hover" href="https://github.com/SSRTDevs/Twitterify/">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <span className="footer-title">Social</span>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://github.com/SSRTDevs/Twitterify">
                            <AiFillGithub />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
