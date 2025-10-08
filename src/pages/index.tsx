import { ImageCompressor } from '../components/ImageCompressor';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Image Compressor Tool
        </h1>
        <p className="text-lg text-center mb-8 text-gray-600">
          Compress your images to 500x500 pixels while maintaining aspect ratio
        </p>
        
        <ImageCompressor />
      </main>
    </div>
  )
}