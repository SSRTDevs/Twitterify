import { React } from 'react';
import link from '../../images/link.png'


export default function ThreadSummarizer(props) {
    return (
        <>
            <div className="container mx-auto w-[75%]">
                <div className="flex flex-row">
                    <input type="search" id="default-search" className="block p-3 py-2 pl-10 w-full text-sm bg-neutral-900 rounded-lg text-base" placeholder="Enter Thread URL" onChange={(e) => {
                        props.setUser({ ...props.user, "Username": e.target.value })

                    }} />
                </div>
            </div>
            <br />
            <div className="h-auto w-full checker-bg flex flex-col items-start border-gray-200 rounded-lg px-3 py-2 border mt-3 justify-around gap-3">
                <div className="w-full">
                    <div className="text-2xl">Thread Summary</div>
                </div>
                <p className="card-text text-md bg-[#f4f4f40f] p-2.5 rounded-sm">
                    {
                        Object.keys(props.thread.details).length === 0
                            ? <p>No summary to show</p> :
                            props.thread.details["thread_summary"]
                    }
                </p>
            </div>
            <br />
            <div className="h-auto w-full checker-bg flex flex-col items-start border-gray-200 rounded-lg px-3 py-2 border mt-3 justify-around gap-3">
                <div className="w-full">
                    <div className="text-2xl">References</div>
                </div>
                <div className="grid grid-cols-12 gap-3.5">
                    {
                        Object.keys(props.thread.details).length === 0 ?
                            <li style={{ textAlign: "left" }}>No references to show</li> :
                            props.thread.details["references"].map((item, id) => {
                                return (
                                    <div className="text-white bg-[#ffffff78] w-10 h-10 p-1.5 rounded-[50%]">
                                        <a className="" href={item}><img src={link} alt="links" /></a>
                                    </div>)
                            })

                    }
                </div>

            </div>

        </>
    )
}