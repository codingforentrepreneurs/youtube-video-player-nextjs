"use client"

import { useSearchParams } from "next/navigation"


export default function WatchPage () {
    const searchParams = useSearchParams()
    const {v: video_id } = Object.fromEntries(searchParams)
    const url = `https://www.youtube.com/embed/${video_id}`
    return <><h1>Watch {video_id}</h1>
    
    
    <iframe width="560" height="315" 
          src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
         
  
    </>
}