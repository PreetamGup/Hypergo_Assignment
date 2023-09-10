import "./App.css";
import { useState, useEffect } from "react";
import VideoCard from "./components/videoCard";
import Modal from "./components/Modal";

function App() {
  const [page, setPage] = useState(0);
  const [videosData, setvideosData] = useState([]);
  const [modal, setmodal] = useState(false);
  const [loading, setloading] = useState(true);
  const [selectedVideo, setselectedVideo] = useState({});



  const handleClick=(video)=>{
    setmodal(true)
    setselectedVideo(video)
  }

  console.log(selectedVideo)

  useEffect(() => {
    
    fetchVideos();
    console.log(page);
  }, [page]);

  const fetchVideos = async () => {
    setloading(true)
    const response = await fetch(
      `https://internship-service.onrender.com/videos?page=${page}`
    );
    const data = await response.json();
    setvideosData(data.data.posts);
    setloading(false)
  };


  if (loading){
    return (
      <>  
        <h2 className="text-3xl text-center mt-10">Loading...</h2>
      </>
    )
  }

  return (
    <div className="flex-col">
      <div>
        <div  className="flex justify-between items-center p-5 pl-8 bg-teal-300">
          <h1 className="text-3xl text-center font-bold">Hypergo</h1>

          {/* pagination */}
          <div className="hidden sm:flex sm:gap-2 sm:items-center ">
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
        
        {/* Video Card Component */}
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

        {/* pagination */}
        <div className="flex justify-center gap-2 mt-10 mb-5">
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

      {/* Modal to show selected video  */}
      {
        modal && <Modal setmodal={setmodal} modal={modal} selectedVideo={selectedVideo}/>
      }
      

    </div>
  );
}

export default App;
