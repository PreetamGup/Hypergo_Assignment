import "./App.css";
import { useState, useEffect } from "react";
import VideoCard from "./components/videoCard";
import ReactPlayer from 'react-player'
import {BiLike, BiComment} from 'react-icons/bi'

function App() {
  const [page, setPage] = useState(0);
  const [videosData, setvideosData] = useState([]);
  const [modal, setmodal] = useState(false);
  const [singleVideo, setsingleVideo] = useState({});


  const handleClick=(video)=>{
    setmodal(true)
    setsingleVideo(video)
  }

  console.log(singleVideo)

  useEffect(() => {
    fetchVideos();
    console.log(page);
  }, [page]);

  const fetchVideos = async () => {
    const response = await fetch(
      `https://internship-service.onrender.com/videos?page=${page}`
    );
    const data = await response.json();
    setvideosData(data.data.posts);
  };

  return (
    <div className="flex-col m-8">
      <div>
        <h1 className="text-3xl text-center font-bold">Hypergo</h1>

        <div className="flex justify-center gap-2 mt-10">
          {Array(10)
            .fill(0)
            .map((page, idx) => (
              <div
                onClick={() => setPage(idx)}
                className="hover:cursor-pointer hover:bg-sky-400  bg-red-500 w-6 text-center"
                key={idx}
              >
                <span>{idx + 1}</span>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {videosData?.map((video) => (
            <div
              key={video.postId}
              className="m-5 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] p-2 rounded-3xl flex justify-center"
              onClick={()=> handleClick(video)}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {Array(10)
            .fill(0)
            .map((page, idx) => (
              <div
                onClick={() => setPage(idx)}
                className="hover:cursor-pointer hover:bg-sky-400  bg-red-500 w-6 text-center"
                key={idx}
              >
                <span>{idx + 1}</span>
              </div>
            ))}
        </div>
      </div>
      
      {
        modal && 
        <div className="modal bg-black bg-opacity-[80%] fixed top-0 left-0 pt-10 flex flex-col items-center w-full h-[100vh]" >
          <span className='text-4xl mb-5 hover:cursor-pointer text-white' onClick={()=> setmodal(!modal)}>X</span>

          <div className=" flex flex-col md:flex-row md:justify-center md: gap-5 w-full md:w-[50%] bg-white p-2">

            <div  className='flex flex-col'>
              <div className='rounded-[20px] overflow-hidden flex justify-center relative'>
                <ReactPlayer url={`${singleVideo.submission.mediaUrl}`}  playing light={`${singleVideo.submission.thumbnail}`} width={"300px"} height={"500px"}/>
                <div className="commentLike flex flex-col gap-2 absolute bottom-10 right-2 bg-black bg-opacity-50 p-2 rounded-2xl">
                    <div>
                      <BiLike className="text-3xl text-white"/>
                      <p className="text-center text-white">{singleVideo.reaction.count}</p>
                    </div>
                    <div>
                      <BiComment className='text-3xl text-white'/>
                      <p className="text-center text-white">{singleVideo.comment.count}</p>
                    </div>
                  </div>
              </div>

              <div className='mt-2 relative flex justify-between items-center'>
                  <div className='flex gap-2 items-center'>
                      <div className='overflow-hidden rounded-2xl w-9 h-9'>
                          <img src={`${singleVideo.creator.pic}`} alt={`${singleVideo.creator.name}`} />
                      </div>
                      <h1 className=' font-serif font-semibold'>{singleVideo.creator.name}</h1>
                  </div>
              </div>
            </div>

            <div className='w-full md:w-[50%]'>
              <h2 className='font-bold text-[20px]'>{singleVideo.submission.title}</h2>
              <p>{`${singleVideo.submission.description}`}</p>
            </div>
              

          </div>
        </div>
      }

    </div>
  );
}

export default App;
