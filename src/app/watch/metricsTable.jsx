"use client"
import useWatchSession from '@/hooks/useWatchSession'
import useSWR from 'swr'

const FASTAPI_ENDPOINT = "http://localhost:8002/api/video-events/"

export default function MetricsTable ({videoId}) {
    if (!videoId) {
        return 
    }
    const url = `${FASTAPI_ENDPOINT}${videoId}`
    const session_id = useWatchSession(videoId)
    const headers = {'Content-Type': 'application/json', 'X-Session-ID': session_id}

    const fetcher = (url) => fetch(url, {headers:headers}).then(res => res.json())


    const { data, error, isLoading } = useSWR(url, fetcher)
    
    
 
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    
    return <div>
         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Viewership</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Viewership</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Views</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
            {data.map((val, idx)=>(<tr className="hover:bg-gray-50" key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(val.time).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {val.total_events}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(val.max_viewership / 1000).toFixed(2)}s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(val.avg_viewership / 1000).toFixed(2)}s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {val.unique_views}
                </td>
            </tr>))}
        </tbody>
    </table>
    </div>
}