import Graph3D from '../visualizations/Graph3D';

export default function Slide3() {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium border border-green-500/30">
          Graph Theory
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">Road Networks as Weighted Graphs</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">From city maps to mathematical structures</p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Graph Definition */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-lg p-8 border-2 border-green-500/30">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">Graph Representation: G(V, E, W)</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-200 dark:bg-slate-800 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">V</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Vertices</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Intersections and key locations. Mumbai metro: ~500,000+ nodes</p>
            </div>
            <div className="bg-slate-200 dark:bg-slate-800 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">E</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Edges</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Road segments connecting intersections. ~2 million edges for metro</p>
            </div>
            <div className="bg-slate-200 dark:bg-slate-800 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">W</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Weights</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Travel time or distance. Updated every 30-60 seconds with traffic data</p>
            </div>
          </div>
        </div>

        {/* 3D Graph Visualization */}
        <Graph3D />

        {/* Graph Properties */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 rounded-lg p-6 border border-blue-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Sparsity Characteristics</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">→</span>
                <span>Average degree per node: <strong>3-5</strong> roads per intersection</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">→</span>
                <span>Sparse graph means <strong>E ≈ 3-5V</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">→</span>
                <span>Dijkstra runs <strong>efficiently</strong> on sparse graphs</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20 rounded-lg p-6 border border-purple-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Dynamic Updates</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">→</span>
                <span>Edge weights updated via <strong>HERE Maps</strong> or <strong>Google Roads API</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">→</span>
                <span>Congested roads get <strong>higher weights</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">→</span>
                <span>Requires <strong>incremental re-routing</strong>, not full recomputation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-lg p-6 border-l-4 border-orange-400">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Why This Matters</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Graph sparsity enables efficient shortest path algorithms. Spatial indexing allows fast lookup of nearby nodes without scanning entire datasets. Dynamic weights require smart incremental updates rather than full recomputation, making real-time tracking feasible at scale.
          </p>
        </div>
      </div>
    </div>
  );
}
