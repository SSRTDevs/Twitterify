import { React } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { TiGroup } from "react-icons/ti";
import { BiCalendar } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { user_summarizer } from "../../api/Api";
import { InfoCard } from "../";

const Wordcloud = ({ clouds }) => (
  <>
    {clouds === "" ? null : (
      <div className="flex gap-2 justify-between mt-[6%] w-full">
        <Zoom>
          <div className="container flex gap-2 flex-col items-center">
            <h1 className="text-lg">Things mentioned</h1>
            <img
              src={`data:image/png;base64,${JSON.parse(clouds["cloud_nouns"])}`}
              alt="wordcloud"
            />
          </div>
        </Zoom>
        <Zoom>
          <div className="container flex gap-2 flex-col items-center">
            <h1 className="text-lg">Names mentioned</h1>
            <img
              src={`data:image/png;base64,${JSON.parse(clouds["cloud_names"])}`}
              alt="wordcloud"
            />
          </div>
        </Zoom>
      </div>
    )}
  </>
);

const Stat = ({ title, value, icon, children, noVal = false }) => (
  <div className="stats shadow">
    <div className="stat pb-1">
      <div className="stat-figure text-twitter-100">{icon}</div>
      <div className="stat-title">{title}</div>
      {!noVal && <div className="stat-value">{value}</div>}
      {children}
    </div>
  </div>
);

export default function RightUser({ user }) {
  return (
    <>
      <div>
        <div className="h-auto w-full flex items-center border-black-700 rounded-lg p-3 bg-neutral-800">
          {Object.keys(user.details).length > 0 && (
            <Zoom>
              <div className="avatar p-2">
                <div className="w-16 rounded-full ring ring-twitter-200 ring-offset-base-100 ring-offset-1">
                  <img
                    src={user.details["profile_image_url"]}
                    alt="profile_image"
                  />
                </div>
              </div>
            </Zoom>
          )}

          <div className="ml-[5%] space-y-2 text-left">
            <h1 className="text-xl font-bold">{user.details["username"]}</h1>
            <h1 className="text-sm">{user.details["description"]}</h1>
          </div>
        </div>
      </div>

      <InfoCard title="Talks About">
        <div className="text-left w-full p-4 flex flex-wrap gap-0.5">
          {user.topics &&
            user.topics.map((topic, idx) => {
              return (
                <>
                  {" "}
                  <div className="badge border-twitter-100 rounded-full bg-twitter-100 space-y-2 text-white">
                    {topic}
                  </div>{" "}
                  &nbsp;{" "}
                </>
              );
            })}
        </div>
      </InfoCard>

      <InfoCard title="Statistics">
        <div className="stat-container grid grid-cols-2">
          <Stat
            title="Followers"
            value={user.details["followers_count"]}
            icon={<TiGroup size={30} />}
          />
          <Stat
            title="Joined"
            value={user.details["created_at"]}
            icon={<BiCalendar size={30} />}
            noVal={true}
          >
            <div className="stat-desc font-bold text-xl">
              {user.details["created_at"]}
            </div>
          </Stat>
          <Stat
            title="Positive"
            value={user.details["pos_count"]}
            icon={<AiOutlinePlus size={20} />}
          >
            <div className="stat-desc">Tweets</div>
          </Stat>
          <Stat
            title="Negative"
            value={user.details["neg_count"]}
            icon={<AiOutlineMinus size={30} />}
          >
            <div className="stat-desc">Tweets</div>
          </Stat>
        </div>
      </InfoCard>

      <Wordcloud clouds={user.clouds} />

      <InfoCard title="People you may know">
        <div className="w-full overflow-x-scroll flex gap-8 justify-between mt-4 pb-8">
          {user.friends.map((freind, idx) => {
            return (
              <div className="flex flex-col items-center">
                <Zoom>
                  <div className="avatar p-2">
                    <div className="w-16 rounded-full ring ring-twitter-200 ring-offset-base-100 ring-offset-1">
                      <img
                        src={freind["profile_image_url"]}
                        alt="profile_image"
                      />
                    </div>
                  </div>
                </Zoom>
                <p>{freind.name}</p>
              </div>
            );
          })}
        </div>
      </InfoCard>
    </>
  );
}
