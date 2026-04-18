export default function Slide1() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="mb-6 flex gap-2 justify-center flex-wrap">
          <span className="px-3 py-1 bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
            Design & Analysis of Algorithms
          </span>
        </div>
        
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          Implementing Rider Tracking on Quick Commerce Apps
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
          An overview of algorithms and systems powering real-time delivery experiences in apps like Blinkit and Zepto
        </p>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg p-8 border border-blue-500/30 backdrop-blur-sm">
          <div className="flex gap-4 justify-center mt-6 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Harsh Dubey (RA2411033010002)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Mridula Manoj (RA2411033010012)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Abhiraj Bhowmick (RA2411033010013)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
