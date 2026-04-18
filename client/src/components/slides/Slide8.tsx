import AdvancedTech3D from '../visualizations/AdvancedTech3D';

export default function Slide8() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
          Advanced Techniques
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">Advanced Techniques for Production Scale</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">From algorithms to systems handling millions of deliveries</p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Advanced Techniques Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/20 rounded-lg p-5 border border-blue-200 dark:border-blue-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Contraction Hierarchies (CH)</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Preprocessing creates node hierarchy based on importance. Queries skip unimportant nodes, reducing search space by 99%+.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs font-mono text-slate-600 dark:text-slate-300 border border-blue-200 dark:border-blue-500/30">
              <div className="text-blue-600 font-bold mb-1">Benefit:</div>
              <div>Query time: O(log V) instead of O((V+E) log V)</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/20 rounded-lg p-5 border border-purple-200 dark:border-purple-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Hub Labels</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Pre-compute shortest paths between important hub nodes. Query becomes simple lookup instead of graph traversal.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs font-mono text-slate-600 dark:text-slate-300 border border-purple-200 dark:border-purple-500/30">
              <div className="text-purple-600 font-bold mb-1">Benefit:</div>
              <div>Constant-time queries after preprocessing</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/20 rounded-lg p-5 border border-green-200 dark:border-green-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Time-Dependent Routing</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Edge weights vary by time of day. Morning rush hour has different weights than evening. Algorithms account for temporal dimension.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs font-mono text-slate-600 dark:text-slate-300 border border-green-200 dark:border-green-500/30">
              <div className="text-green-600 font-bold mb-1">Example:</div>
              <div>w(road, 8am) != w(road, 6pm)</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-500/20 rounded-lg p-5 border border-orange-200 dark:border-orange-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Batching Orders</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              During peak hours, single rider delivers 2-3 orders in same direction. Optimization problem: find order sequence minimizing total time.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs font-mono text-slate-600 dark:text-slate-300 border border-orange-200 dark:border-orange-500/30">
              <div className="text-orange-600 font-bold mb-1">Constraint:</div>
              <div>All orders must meet SLA</div>
            </div>
          </div>
        </div>

        {/* 3D Advanced Techniques Visualization */}
        <AdvancedTech3D />

        {/* System Architecture */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-500/10 dark:to-indigo-500/20 rounded-lg p-6 border-2 border-indigo-300 dark:border-indigo-500/40">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">System Architecture Components</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-indigo-200 dark:border-indigo-500/30">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">Redis Pub/Sub</div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">Location broadcasts to all interested services</p>
              </div>
              <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-indigo-200 dark:border-indigo-500/30">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">WebSocket</div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">Real-time updates to customer app</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-indigo-200 dark:border-indigo-500/30">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">Kafka Events</div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">Order status, delivery completion for analytics</p>
              </div>
              <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-indigo-200 dark:border-indigo-500/30">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">Caching Layer</div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">Recent paths, traffic patterns, performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-500/10 dark:to-teal-500/20 rounded-lg p-6 border border-teal-200 dark:border-teal-500/30">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Performance Breakdown at Scale</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded p-3 border border-teal-200 dark:border-teal-500/30">
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 min-w-fit">1-5ms</div>
              <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">Query time per rider with Contraction Hierarchies</div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded p-3 border border-teal-200 dark:border-teal-500/30">
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 min-w-fit">5,000 riders</div>
              <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">Concurrent active riders in metro city</div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded p-3 border border-teal-200 dark:border-teal-500/30">
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 min-w-fit">1 query/5s</div>
              <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">Path recomputation interval per rider</div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded p-3 border-2 border-teal-400 dark:border-teal-500/50">
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 min-w-fit">1,000 q/s</div>
              <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">Total queries per second (5,000 riders / 5s)</div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded p-3 border border-teal-200 dark:border-teal-500/30">
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 min-w-fit">5-25s CPU</div>
              <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">Per second of wall time (parallelizable across cores)</div>
            </div>
          </div>
        </div>

        {/* Geofencing */}
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-500/10 dark:to-pink-500/20 rounded-lg p-6 border-l-4 border-pink-500">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Geofencing & Arrival Detection</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            When rider enters delivery zone (geofence), system automatically detects arrival, triggers notification, and prepares next assignment. This reduces manual steps and improves delivery speed.
          </p>
        </div>
      </div>
    </div>
  );
}
