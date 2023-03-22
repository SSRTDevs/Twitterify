import React from "react";

export default function InputWithBtn({ run , placeholder}) {
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder={`Search ${placeholder}`}
          className="input input-sm input-bordered"
        />
        <button
          className="btn btn-sm text-xs btn-outline hover:bg-twitter-200 border-twitter-100 hover:border-twitter-200 normal-case"
          onClick={() => {
            run() ; 
          }}
        >
          Twitterify
        </button>
      </div>
    </div>
  );
}
