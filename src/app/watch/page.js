"use client"

import useYouTubePlayer from "@/hooks/useYouTubePlayer"
import { useSearchParams } from "next/navigation"


export default function WatchPage () {
    const searchParams = useSearchParams()
    const {v: video_id } = Object.fromEntries(searchParams)
    const playerElementId = "youtube-player"
    const playerState = useYouTubePlayer(video_id, playerElementId)
    const url = `https://www.youtube.com/embed/${video_id}`
    return <>
    
    <div className="w-full h-full px-5">
            <div id="video-container" className="relative w-full">
                <div className="relative w-full pt-[56.25%] bg-black">
                    <div id={playerElementId} className="absolute top-0 left-0 w-full h-full" />
                </div>
            </div>
        </div>


    <h1>{playerState.videoData?.title} - {playerState?.isReady ? "Ready" : "Loading"}</h1>
    <div>{playerState && JSON.stringify(playerState)}</div>
    

  
    </>
}