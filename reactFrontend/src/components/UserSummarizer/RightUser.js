import { React } from "react";
import "../../css/RightComponents/RightUser.css";
import { TiGroup } from "react-icons/ti";
import { BiCalendar } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function RightUser({ user }) {
  console.log("RightUser rendered again");
  return (
    <>
      <div>
        <div className='h-auto w-full flex items-center border-black-700  rounded-lg p-4  bg-neutral-800'>
          {Object.keys(user.details).length > 0 && (
            <div className='avatar p-2'>
              <div className='w-16 rounded-full ring ring-twitter-200 ring-offset-base-100 ring-offset-1'>
                <img src={user.details["profile_image_url"]} />
              </div>
            </div>
          )}

          <div className='ml-[5%] space-y-2 text-left'>
            <h1 className='text-2xl font-bold'>{user.details["username"]}</h1>
            <h1 className='text-sm'>{user.details["description"]}</h1>
          </div>
        </div>
      </div>

      <div className='h-auto w-full checker-bg flex flex-col items-start rounded-lg border border-base-300 p-4 space-y-2 mt-3'>
        <div className='w-full'>
          <div className='text-2xl'>Statistics</div>
        </div>

        <div className='stats shadow w-full'>
          <div className='stat'>
            <div className='stat-figure text-twitter-100'>
              <TiGroup size={30} />
            </div>
            <div className='stat-title'>Followers</div>
            <div className='stat-value'>{user.details["followers_count"]}</div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-twitter-100'>
              <BiCalendar size={30} />
            </div>
            <div className='stat-title'>Joined</div>
            <div className='stat-desc font-bold text-xl'>
              {user.details["created_at"]}
            </div>
          </div>
        </div>

        <div className='stats shadow w-full'>
          <div className='stat'>
            <div className='stat-figure text-twitter-100'>
              <AiOutlinePlus size={20} />
            </div>
            <div className='stat-title'>Positive</div>
            <div className='stat-value'>{user.details["pos_count"]}</div>
            <div className='stat-desc'>Tweets</div>
          </div>
          <div className='stat'>
            <div className='stat-figure text-twitter-100'>
              <AiOutlineMinus size={30} />
            </div>
            <div className='stat-title'>Negative</div>
            <div className='stat-value'>{user.details["neg_count"]}</div>
            <div className='stat-desc'>Tweets</div>
          </div>
        </div>
      </div>
      {user.clouds === "" ? null : (
        <div className='flex gap-2 justify-between mt-[6%] w-full'>
          <div className='container flex gap-2 flex-col gap-1 items-center'>
            <h1 className='text-lg'>Things mentioned</h1>
            <img
              src={`data:image/png;base64,${JSON.parse(
                user.clouds["cloud_nouns"]
              )}`}
              alt='wordcloud'
              className='max-w-[80%] h-auto'
            />
          </div>
          <div className='container flex gap-2 flex-col gap-1 items-center'>
            <h1 className='text-lg'>Names mentioned</h1>
            <img
              src={`data:image/png;base64,${JSON.parse(
                user.clouds["cloud_names"]
              )}`}
              alt='wordcloud'
              className='max-w-[80%] h-auto'
            />
          </div>
        </div>
      )}
    </>
  );
}
