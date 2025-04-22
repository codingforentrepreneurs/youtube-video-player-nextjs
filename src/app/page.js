import YouTubeUrlForm from "@/components/YouTubeUrlForm";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl px-4">
        <div className="mb-8 inline-flex space-x-2 items-center">
          <h1 className="text-6xl font-bold text-center bg-red-600 rounded-md p-3">
            <span className="text-white">YouTube</span>
   
          </h1>
          <h1 className="text-6xl font-bold text-center">
            <span className="text-gray-800"> Player</span>
          </h1>
        </div>
        <main className="w-full">
          <YouTubeUrlForm />
        </main>
      </div>
    </div>
  );
}