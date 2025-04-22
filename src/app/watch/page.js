"use client"

import useYouTubePlayer from "@/hooks/useYouTubePlayer"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"

const TEMP_API_ENDPOINT = "http://localhost:8000/api/watch-events/"

export default function WatchPage () {
    const searchParams = useSearchParams()
    const {v: video_id, t:startTime } = Object.fromEntries(searchParams)
    const playerElementId = "youtube-player"
    const playerState = useYouTubePlayer(video_id, playerElementId, startTime, 1500)
    const url = `https://www.youtube.com/embed/${video_id}`
    // console.log(playerState)

    // useCallback -> fetch -> fastAPI -> timescaledb 
    // useEffect

    const updateBackend = useCallback(async (currentPlayerState) => {
        const headers = {'Content-Type': 'application/json'}
        console.log(video_id, currentPlayerState)

        try {
            const response = await fetch(TEMP_API_ENDPOINT, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({...currentPlayerState, video_id: video_id})
            })
            if (!response.ok) {
                console.log("error adding data to the backend")
            }
        } catch (error) {
            console.log(error)
        }

        
    }, [video_id])
    

    useEffect(()=>{
        if (!playerState.isReady) return;
        if (playerState.videoStateLabel === "CUED") return;
        updateBackend(playerState)

    }, [playerState])

    return <>

   
    
    <div className="w-[50vw] mx-auto h-full px-5">
            <div id="video-container" className="relative w-full">
                <div className="relative w-full pt-[56.25%] bg-black">
                    <div id={playerElementId} className="absolute top-0 left-0 w-full h-full" />
                </div>
            </div>
        


    <h1>{playerState.videoData?.title} - {playerState?.isReady ? "Ready" : "Loading"}</h1>
    <div>{playerState && JSON.stringify(playerState)}</div>
    </div>
    

  
    </>
}