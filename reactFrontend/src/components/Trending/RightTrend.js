import React from "react";
import { motion } from "framer-motion";


export default function RightTrend(props) {
    return (
        <>
            {
                props.trends.show_tweets.length === 0 ? "Nothing to show" :
                    props.trends.show_tweets.map((item) => {
                        return (
                            <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5,1] }}>
                                <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5,1] }} className="card">
                                    <div className="card-body">
                                        <p className="card-text" >
                                            {item}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    })
            }

        </>
    )
}