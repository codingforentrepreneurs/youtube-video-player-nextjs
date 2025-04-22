export default function extractYouTubeInfo(url) {
    // Extract video ID
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    
    // Extract time parameter (in seconds)
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const time = timeMatch ? parseInt(timeMatch[1]) : 0;
    
    return {
      videoId,
      time
    };
  }