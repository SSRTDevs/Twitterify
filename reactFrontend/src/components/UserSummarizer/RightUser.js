import { React } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { TiGroup } from "react-icons/ti";
import { BiCalendar } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function RightUser({ user }) {
  return (
      <>
          <div>
              <div className="h-auto w-full flex items-center border-black-700  rounded-lg p-4  bg-neutral-800">
                  {Object.keys(user.details).length > 0 && (
                      <Zoom>
                          <div className="avatar p-2">
                              <div className="w-16 rounded-full ring ring-twitter-200 ring-offset-base-100 ring-offset-1">
                                  <img src={user.details["profile_image_url"]} alt="profile_image" />
                              </div>
                          </div>
                      </Zoom>
                  )}

                  <div className="ml-[5%] space-y-2 text-left">
                      <h1 className="text-2xl font-bold">{user.details["username"]}</h1>
                      <h1 className="text-sm">{user.details["description"]}</h1>
                  </div>
              </div>
          </div>

          <div className="h-auto w-full checker-bg rounded-lg border border-base-300 p-4 mt-3">
              <div className="w-full text-2xl">Talks About</div>

              <div className="text-left w-full p-4 flex flex-wrap gap-0.5">
                  {user.topics &&
                      user.topics.map((topic, idx) => {
                          return (
                              <>
                                  {" "}
                                  <div className="badge border-twitter-100 rounded-full bg-twitter-100 text-white">
                                      {topic}
                                  </div>{" "}
                                  &nbsp;{" "}
                              </>
                          );
                      })}
              </div>
          </div>

          <div className="h-auto w-full checker-bg flex flex-col items-start rounded-lg border border-base-300 p-4 space-y-2 mt-3">
              <div className="w-full text-2xl">Statistics</div>

              <div className="stat-container grid grid-cols-2">
                  <div className="stats shadow">
                      <div className="stat">
                          <div className="stat-figure text-twitter-100">
                              <TiGroup size={30} />
                          </div>
                          <div className="stat-title">Followers</div>
                          <div className="stat-value">{user.details["followers_count"]}</div>
                      </div>
                  </div>
                  <div className="stats shadow">
                      <div className="stat">
                          <div className="stat-figure text-twitter-100">
                              <BiCalendar size={30} />
                          </div>
                          <div className="stat-title">Joined</div>
                          <div className="stat-desc font-bold text-xl">{user.details["created_at"]}</div>
                      </div>
                  </div>
                  <div className="stats shadow">
                      <div className="stat">
                          <div className="stat-figure text-twitter-100">
                              <AiOutlinePlus size={20} />
                          </div>
                          <div className="stat-title">Positive</div>
                          <div className="stat-value">{user.details["pos_count"]}</div>
                          <div className="stat-desc">Tweets</div>
                      </div>
                  </div>
                  <div className="stats shadow">
                      <div className="stat">
                          <div className="stat-figure text-twitter-100">
                              <AiOutlineMinus size={30} />
                          </div>
                          <div className="stat-title">Negative</div>
                          <div className="stat-value">{user.details["neg_count"]}</div>
                          <div className="stat-desc">Tweets</div>
                      </div>
                  </div>
              </div>
          </div>

          {user.clouds === "" ? null : (
              <div className="flex gap-2 justify-between mt-[6%] w-full">
                  <Zoom>
                      <div className="container flex gap-2 flex-col gap-1 items-center">
                          <h1 className="text-lg">Things mentioned</h1>
                          <img
                              src={`data:image/png;base64,${JSON.parse(user.clouds["cloud_nouns"])}`}
                              alt="wordcloud"
                          />
                      </div>
                  </Zoom>
                  <Zoom>
                      <div className="container flex gap-2 flex-col gap-1 items-center">
                          <h1 className="text-lg">Names mentioned</h1>

                          <img
                              src={`data:image/png;base64,${JSON.parse(user.clouds["cloud_names"])}`}
                              alt="wordcloud"
                          />
                      </div>
                  </Zoom>
              </div>
          )}
      </>
  );
}
