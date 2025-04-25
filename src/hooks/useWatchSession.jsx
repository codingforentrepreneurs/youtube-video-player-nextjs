"use client"

import { useCallback, useEffect, useState } from "react"

const FASTAPI_ENDPOINT = "http://localhost:8002/api/watch-sessions/"
const API_WATCH_SESSION_STORAGE_KEY = "watch_session"

export default function useWatchSession (video_id) {
    const [sessionId, setSessionId] = useState(null)

    const createSession = useCallback(async () => {
        const headers = {'Content-Type': 'application/json'}
        try {
            const response = await fetch(FASTAPI_ENDPOINT, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({video_id: video_id ? video_id : ''})
            })
            if (!response.ok) {
                console.log(await response.text())
                console.log("error with watch session")
            } else {
                const responseData = await response.json()
                sessionStorage.setItem(API_WATCH_SESSION_STORAGE_KEY, JSON.stringify(responseData))
                const {watch_session_id} = responseData
                setSessionId(watch_session_id)
            }
        } catch (error) {
            console.log(error)
        }

        
    }, [video_id])
    

    useEffect(()=>{
        const storedWatchSessionData = sessionStorage.getItem(API_WATCH_SESSION_STORAGE_KEY)
        let loadedWatchSessionId
        try {
            const {watch_session_id} = JSON.parse(storedWatchSessionData)
            loadedWatchSessionId = watch_session_id
        } catch (error) {
            
        }
        if (loadedWatchSessionId) {
            setSessionId(loadedWatchSessionId)
            return 
        } 
        createSession()
    }, [])

    return sessionId
}