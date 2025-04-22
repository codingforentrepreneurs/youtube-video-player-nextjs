export default function YouTubeUrlForm() {
  return (
    <div>
      <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
        YouTube Video
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">URL</div>
          <input
            id="url"
            name="url"
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
          
        </div>
      </div>
    </div>
  )
}