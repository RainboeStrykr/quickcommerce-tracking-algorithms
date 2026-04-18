import ProductionSystem3D from '../visualizations/ProductionSystem3D';

export default function Slide6() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
          Production Systems
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">How Blinkit and Zepto Implement Rider Tracking</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Translating textbook algorithms into production systems</p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Four Implementation Strategies */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/20 rounded-lg p-5 border border-blue-200 dark:border-blue-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Dark Store as Graph Source</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Every Blinkit dark store is a fixed node in the city graph. When an order is placed, Dijkstra runs from store node to customer address node.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/20 rounded-lg p-5 border border-purple-200 dark:border-purple-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Rider App as Graph Sensor</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Rider phone sends GPS pings every 3-5 seconds. Each ping updates rider current node, triggering Dijkstra re-evaluation of remaining subpath.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/20 rounded-lg p-5 border border-green-200 dark:border-green-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Dynamic Edge Weights</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Traffic data from HERE Maps or Google Roads API updates edge weights. Congested roads get higher weights and are deprioritized.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-500/20 rounded-lg p-5 border border-orange-200 dark:border-orange-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Spatial Indexing with Geohash</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Riders and stores indexed using Geohash—a spatial grid enabling quick lookup of closest rider to new order.
            </p>
          </div>
        </div>

        {/* 3D Production System Visualization */}
        <ProductionSystem3D />

        {/* Scale Challenge */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-500/10 dark:to-pink-500/10 rounded-lg p-6 border-2 border-red-300 dark:border-red-500/40">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">Scale Challenge at Zepto</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-red-200 dark:border-red-500/30">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">5,000+</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Concurrent riders in metro city</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-red-200 dark:border-red-500/30">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">~5 sec</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Path recomputation interval</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-red-200 dark:border-red-500/30">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">1,000+ q/s</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Total queries per second</div>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            At this scale, Dijkstra runs on pre-processed contracted graphs (Contraction Hierarchies) for sub-millisecond query times. Without optimization, the system would be unable to handle the computational load.
          </p>
        </div>

        {/* Optimization Techniques */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-500/10 dark:to-indigo-500/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-500/30">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Optimization Techniques</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-indigo-200 dark:border-indigo-500/30">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Contraction Hierarchies</div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Preprocessing creates node hierarchy. Queries skip unimportant nodes, reducing search space by 99%+</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-indigo-200 dark:border-indigo-500/30">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Bidirectional Search</div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Two simultaneous searches from source and destination meeting in the middle</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-indigo-200 dark:border-indigo-500/30">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Caching</div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Recent paths cached to avoid redundant computations</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-500/10 dark:to-cyan-500/20 rounded-lg p-6 border-l-4 border-cyan-500">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Performance Metrics</h3>
          <div className="grid grid-cols-4 gap-3 text-sm">
            <div className="bg-white dark:bg-slate-800 rounded p-3 border border-cyan-200 dark:border-cyan-500/30">
              <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400">1-5ms</div>
              <div className="text-slate-700 dark:text-slate-300">Query time per rider</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-3 border border-cyan-200 dark:border-cyan-500/30">
              <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400">1,000 q/s</div>
              <div className="text-slate-700 dark:text-slate-300">5,000 riders x 1 query/5s</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-3 border border-cyan-200 dark:border-cyan-500/30">
              <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400">5-25s CPU</div>
              <div className="text-slate-700 dark:text-slate-300">Per second of wall time</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-3 border border-cyan-200 dark:border-cyan-500/30">
              <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400">Parallelizable</div>
              <div className="text-slate-700 dark:text-slate-300">Across multiple cores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
