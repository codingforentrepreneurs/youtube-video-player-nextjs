"use client"

import { useCallback, useEffect, useState, useRef } from "react";

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

const useYouTubePlayer = (videoId, elementId, startTime=200, interval=5000) => {
    const playerElementId = elementId || "video-player"
    const playerRef = useRef(null)
    const [playerState, setPlayerState] = useState({
        is_ready: false,
        current_time: 0,
        video_title: '',
        video_state_label: '',
        video_state_value: -10,
    })
    // load the youtube api script
    // embed youtube video player
    // track changes to video

    useEffect(()=>{
        // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        const videoOptions = {
            height: '390',
            width: '640',
            videoId: videoId,
            playerVars: {
                playsinline: 1,
                start: startTime,
            },
            events: {
                onReady: handleOnReady,
                onStateChange: handleOnStateChange
            }
        }
        playerRef.current = new window.YT.Player(playerElementId, videoOptions)
      }


    }, [videoId])

    useEffect(()=>{
        const internvalId = setInterval(()=>{
            handleOnStateChange()
        }, interval)

        return () => {
            clearInterval(internvalId)
        }

    }, [])

    const handleOnReady = useCallback((event) => {
        setPlayerState(prevState=>({...prevState, isReady: true}))
        handleOnStateChange()
    }, [])

    const handleOnStateChange = useCallback(
        () => {
            const YTPlayerStateObj = window.YT.PlayerState
            const playerInfo = playerRef.current.playerInfo
            const videoData = playerRef.current.getVideoData()
            const currentTimeSeconds = playerRef.current.getCurrentTime()
            const videoStateValue = playerInfo.playerState
            const videoStateLabel = getKeyByValue(YTPlayerStateObj, videoStateValue)
 
            // console.log(videoData, currentTime, videoStateLabel, videoStateValue)
            setPlayerState(prevState => ({
                ...prevState,
               
                video_title: videoData.title,
                current_time: currentTimeSeconds,
                video_state_label: videoStateLabel,
                video_state_value: videoStateValue,
            }))
        }, 
    [])


    return playerState
}

export default useYouTubePlayer;