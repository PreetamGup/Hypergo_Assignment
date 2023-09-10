import React,{useState} from 'react'
import ReactPlayer from 'react-player'
import {BiLike, BiComment} from 'react-icons/bi'

const Modal = ({setmodal, modal, selectedVideo}) => {
    const[likeCount, setLikeCount]=useState(selectedVideo.reaction.count)

    const handleClick=()=>{

        if(!selectedVideo.reaction.voted){

            selectedVideo.reaction.count+=1;
            selectedVideo.reaction.voted=true;
            setLikeCount(selectedVideo.reaction.count)
            
        }
    }

  return (
    <div className="modal bg-black bg-opacity-[80%] fixed top-0 left-0 pt-2 sm:pt-10 flex flex-col items-center w-full h-[100vh]" >
          <span className='text-4xl mb-5 hover:cursor-pointer text-white' onClick={()=> setmodal(!modal)}>X</span>

          <div className=" flex flex-col md:flex-row md:justify-center md: gap-5 w-full md:w-[50%] bg-white p-2">

            <div  className='flex flex-col'>
              <div className='rounded-[20px] overflow-hidden flex justify-center relative'>
                <ReactPlayer url={`${selectedVideo.submission.mediaUrl}`}  playing light={`${selectedVideo.submission.thumbnail}`} width={"300px"} height={"500px"}/>
                <div className="commentLike flex flex-col gap-2 absolute bottom-10 right-2 bg-black bg-opacity-50 p-2 rounded-2xl">
                    <div>
                      <BiLike className={`text-3xl text-white ${selectedVideo.reaction.voted?"bg-amber-400 rounded-xl text-black":""}`} onClick={handleClick}/>
                      <p className="text-center text-white">{likeCount}</p>
                    </div>
                    <div>
                      <BiComment className='text-3xl text-white'/>
                      <p className="text-center text-white">{selectedVideo.comment.count}</p>
                    </div>
                  </div>
              </div>

              <div className='mt-2 relative flex justify-between items-center'>
                  <div className='flex gap-2 items-center'>
                      <div className='overflow-hidden rounded-2xl w-9 h-9'>
                          <img src={`${selectedVideo.creator.pic}`} alt={`${selectedVideo.creator.name}`} />
                      </div>
                      <h1 className=' font-serif font-semibold'>{selectedVideo.creator.name}</h1>
                  </div>
              </div>
            </div>

            <div className='w-full md:w-[50%]'>
              <h2 className='font-bold text-[20px]'>{selectedVideo.submission.title}</h2>
              <p>{`${selectedVideo.submission.description}`}</p>

              <div className={` ${selectedVideo.comment.commentingAllowed? "bg-amber-200 p-4 rounded-lg mt-20" :"hidden" }`}>
                <h2>Add Comment</h2>
                <input type="text" className='w-full p-1 pl-2'/>
                <button className="bg-sky-500 mt-2 pl-2 pr-2 rounded hover:bg-emerald-500">Add</button>
              </div>
            </div>
              

          </div>
        </div>
  )
}

export default Modal