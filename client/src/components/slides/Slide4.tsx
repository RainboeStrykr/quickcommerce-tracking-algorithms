import Dijkstra3D from '../visualizations/Dijkstra3D';

export default function Slide4() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium">
          Core Algorithm
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">Dijkstra's Algorithm: The Shortest Path Solution</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Time complexity analysis and practical implementations</p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Algorithm Overview */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-500/10 dark:to-purple-500/10 rounded-lg p-6 border border-violet-200 dark:border-violet-500/30">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Algorithm Overview</h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph. It works by maintaining a priority queue of unvisited nodes and always processing the node with the smallest known distance.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded p-4 font-mono text-sm text-slate-700 dark:text-slate-300 border border-violet-200 dark:border-violet-500/30 overflow-x-auto">
            <div>1. Initialize distance[source] = 0, all others = ∞</div>
            <div>2. Add source to priority queue</div>
            <div>3. While queue not empty:</div>
            <div className="ml-4">a. Extract node with minimum distance</div>
            <div className="ml-4">b. For each neighbor, update distance if shorter path found</div>
            <div className="ml-4">c. Add updated neighbors to queue</div>
          </div>
        </div>

        {/* 3D Dijkstra Visualization */}
        <Dijkstra3D />

        {/* Complexity Analysis */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10 rounded-lg p-6 border border-cyan-200 dark:border-cyan-500/30">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Time Complexity Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded p-3 border border-cyan-200 dark:border-cyan-500/30">
              <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 min-w-fit">O(V²)</div>
              <div>
                <div className="font-medium text-slate-900 dark:text-white">Classic implementation (linear search)</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Suitable for dense graphs only</div>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded p-3 border-2 border-green-400 dark:border-green-500/50">
              <div className="font-mono font-bold text-green-600 dark:text-green-400 min-w-fit">O((V + E) log V)</div>
              <div>
                <div className="font-medium text-slate-900 dark:text-white">Binary min-heap ⭐ Production Standard</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Ideal for sparse graphs like road networks</div>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded p-3 border border-cyan-200 dark:border-cyan-500/30">
              <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 min-w-fit">O(E + V log V)</div>
              <div>
                <div className="font-medium text-slate-900 dark:text-white">Fibonacci heap</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Theoretical best, rarely used in practice</div>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded p-3 border-2 border-blue-400 dark:border-blue-500/50">
              <div className="font-mono font-bold text-blue-600 dark:text-blue-400 min-w-fit">≈ O((V + E) log V / 2)</div>
              <div>
                <div className="font-medium text-slate-900 dark:text-white">Bidirectional Dijkstra ⭐ Google Maps & Blinkit</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Two simultaneous searches meeting in the middle</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Binary Heap */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg p-6 border border-green-200 dark:border-green-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Why Binary Heap for Production?</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Road networks are <strong>sparse</strong> (E ≈ 3-5V)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Gives <strong>practical real-time</strong> performance</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>For 500K nodes: <strong>10-50ms</strong> per query</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Simple to implement and debug</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-lg p-6 border border-blue-200 dark:border-blue-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Bidirectional Optimization</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Start searches from <strong>both source and destination</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Meet in the <strong>middle</strong> of the graph</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Roughly <strong>halves search space</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>Enables <strong>sub-millisecond</strong> queries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-4 border-l-4 border-amber-500">
          <div className="font-medium text-slate-900 dark:text-white mb-1">Space Complexity: O(V)</div>
          <p className="text-slate-700 dark:text-slate-300 text-sm">Requires distance array and priority queue, both linear in number of vertices</p>
        </div>
      </div>
    </div>
  );
}
