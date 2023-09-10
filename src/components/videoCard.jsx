import React from 'react'

const videoCard = ({video}) => {
  return (
    <div className='flex-col'>
        <div className='w-full rounded-[20px] overflow-hidden'>
            <img src={`${video.submission.thumbnail}`} alt={`${video.submission.title}`} />
            {/* <ReactPlayer url={`${video.submission.mediaUrl}`}  controls playing light={`${video.submission.thumbnail}`} width={"100%"} /> */}
       </div>
        <div className='flex-col mt-2'>
            <div className='flex gap-2 items-center'>
                <div className='overflow-hidden rounded-2xl w-9 h-9'>
                    <img src={`${video.creator.pic}`} alt={`${video.creator.name}`} />
                </div>
                <h1 className=' font-serif font-semibold'>{video.creator.name}</h1>
            </div>
            <h2 className='font-bold text-[20px]'>{video.submission.title}</h2>
            {/* <p>{`${video.submission.description}`}</p> */}
        </div>
    </div>
  )
}

export default videoCard