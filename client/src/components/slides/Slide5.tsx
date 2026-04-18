import LiveTracking3D from '../visualizations/LiveTracking3D';

export default function Slide5() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium">
          Real-Time Systems
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">Graph-Based Live Tracking Architecture</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Mapping GPS streams onto road networks and updating paths in real-time</p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Three Main Components */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/20 rounded-lg p-5 border border-blue-200 dark:border-blue-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">Map Matching</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Raw GPS coordinates are noisy and may fall off roads. A Hidden Markov Model (HMM) snaps each GPS ping to the most probable road segment.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono text-slate-600 dark:text-slate-300 border border-blue-200 dark:border-blue-500/30">
              <div className="text-blue-600 font-bold mb-1">Input:</div>
              <div>lat, lng, timestamp</div>
              <div className="text-blue-600 font-bold mt-2 mb-1">Output:</div>
              <div>Rider's current node</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/20 rounded-lg p-5 border border-purple-200 dark:border-purple-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">Incremental Re-routing</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              When rider deviates or traffic changes, only affected subgraph is reprocessed. Delta updates on priority queue instead of full restart.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono text-slate-600 dark:text-slate-300 border border-purple-200 dark:border-purple-500/30">
              <div className="text-purple-600 font-bold mb-1">Complexity:</div>
              <div>O(k log k) where k &lt;&lt; V</div>
              <div className="text-purple-600 font-bold mt-2 mb-1">vs Full Dijkstra:</div>
              <div>O((V+E) log V)</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/20 rounded-lg p-5 border border-green-200 dark:border-green-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">ETA Computation</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Estimated Time of Arrival = Sum of weights along remaining path. Updated every 5 seconds as GPS pings arrive.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono text-slate-600 dark:text-slate-300 border border-green-200 dark:border-green-500/30">
              <div className="text-green-600 font-bold mb-1">Formula:</div>
              <div>ETA = Σ w(e)</div>
              <div className="text-green-600 font-bold mt-2 mb-1">where w(e) =</div>
              <div>distance / speed(e)</div>
            </div>
          </div>
        </div>

        {/* 3D Live Tracking Visualization */}
        <LiveTracking3D />

        {/* System Flow */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-500/10 dark:to-indigo-500/20 rounded-lg p-6 border-2 border-indigo-300 dark:border-indigo-500/40">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Complete System Flow</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">GPS ping received</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Every 3-5 seconds from rider's phone</div>
              </div>
            </div>
            <div className="h-6 border-l-2 border-indigo-400 dark:border-indigo-500/50 ml-4"></div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">Map matching snaps to road segment</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">HMM Viterbi algorithm finds most likely road</div>
              </div>
            </div>
            <div className="h-6 border-l-2 border-indigo-400 ml-4"></div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">Dijkstra re-routes from current node to destination</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Incremental update, not full recomputation</div>
              </div>
            </div>
            <div className="h-6 border-l-2 border-indigo-400 ml-4"></div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">ETA recalculated based on remaining path</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Accounts for traffic, road type, historical performance</div>
              </div>
            </div>
            <div className="h-6 border-l-2 border-indigo-400 ml-4"></div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">Updated location and ETA pushed to customer app</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Via WebSocket for real-time updates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-500/20 rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Key Insight</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            The system doesn't compute routes once. Instead, it continuously updates paths as new GPS data arrives, creating a dynamic feedback loop that adapts to real-time traffic conditions and rider movements.
          </p>
        </div>
      </div>
    </div>
  );
}
