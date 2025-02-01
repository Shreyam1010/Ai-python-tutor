import React, { useState } from "react";

const Tutorial = () => {
  const [activeVideo, setActiveVideo] = useState(null); 

  const videos = [
    {
      title: "Python Functions - Tutorial 1",
      url: "https://www.youtube.com/embed/9Os0o3wzS_I", 
      thumbnail: "https://img.youtube.com/vi/9Os0o3wzS_I/0.jpg"
    },
    {
      title: "Python Loops - Tutorial 2",
      url: "https://www.youtube.com/embed/6iF8Xb7Z3wQ", 
      thumbnail: "https://img.youtube.com/vi/6iF8Xb7Z3wQ/0.jpg"
    },
    {
      title: "Python Lists - Tutorial 3",
      url: "https://www.youtube.com/embed/ohCDWZgNIU0", 
      thumbnail: "https://img.youtube.com/vi/ohCDWZgNIU0/0.jpg"
    },
    {
      title: "Python Dictionaries - Tutorial 4",
      url: "https://www.youtube.com/embed/daefaLgNkw0", 
      thumbnail: "https://img.youtube.com/vi/daefaLgNkw0/0.jpg"
    },
    {
      title: "Python String Manipulation - Tutorial 5",
      url: "https://www.youtube.com/embed/RSl87lqOXDE", 
      thumbnail: "https://img.youtube.com/vi/RSl87lqOXDE/0.jpg"
    },      
  ];

  return (
    <div className="space-y-6">
      {/* Video Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="relative">
              {/* Video Thumbnail */}
              {activeVideo === video.url ? (
                <iframe
                  width="100%"
                  height="250"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              ) : (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-56 object-cover rounded-lg cursor-pointer"
                  onClick={() => setActiveVideo(video.url)} 
                />
              )}
              {}
              {activeVideo !== video.url && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5,3 19,12 5,21 5,3" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className="text-md font-semibold mt-2 text-center text-gray-800">
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
