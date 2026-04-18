import DeliveryTrace3D from '../visualizations/DeliveryTrace3D';

export default function Slide7() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium">
          Case Study
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">Tracing One Delivery: A Chennai Case Study</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">From order placement to doorstep—the graph operations behind it</p>
      </div>

      <div className="space-y-4 mt-8">
        {/* Step 1 */}
        <div className="flex gap-4 pb-4 border-b border-slate-200">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">1</div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Order Placed — Graph Lookup</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Customer in Anna Nagar places order. Nearest dark store (Koyambedu) selected via Geohash lookup. Both nodes identified in city graph.
            </p>
            <div className="bg-blue-50 dark:bg-blue-500/10 rounded p-3 text-xs font-mono text-slate-600 dark:text-slate-300 border border-blue-200 dark:border-blue-500/30">
              <div>store_node = lookup_geohash(customer_location)</div>
              <div>customer_node = geocode(delivery_address)</div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">2</div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Initial Route Computation — Dijkstra Fires</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Bidirectional Dijkstra computes shortest path: store to customer. Result: 2.3 km, estimated 7 min via Inner Ring Road. Path cached in Redis.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 dark:bg-green-500/10 rounded p-3 text-xs border border-green-200 dark:border-green-500/30">
                <div className="font-bold text-green-700 dark:text-green-400 mb-1">Distance</div>
                <div className="text-slate-700 dark:text-slate-300">2.3 km</div>
              </div>
              <div className="bg-green-50 dark:bg-green-500/10 rounded p-3 text-xs border border-green-200 dark:border-green-500/30">
                <div className="font-bold text-green-700 dark:text-green-400 mb-1">Initial ETA</div>
                <div className="text-slate-700 dark:text-slate-300">7 minutes</div>
              </div>
              <div className="bg-green-50 dark:bg-green-500/10 rounded p-3 text-xs border border-green-200 dark:border-green-500/30">
                <div className="font-bold text-green-700 dark:text-green-400 mb-1">Route</div>
                <div className="text-slate-700 dark:text-slate-300">Inner Ring Road</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 text-white font-bold">3</div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Rider En Route — Live Graph Updates</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Rider GPS pings every 4 seconds. At minute 3, traffic data raises weight of one edge (road congestion). System detects detour is faster, triggers Dijkstra re-route.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-purple-50 dark:bg-purple-500/10 rounded p-3 text-xs border border-purple-200 dark:border-purple-500/30">
                <div className="font-bold text-purple-700 dark:text-purple-400 mb-1">Time Elapsed</div>
                <div className="text-slate-700 dark:text-slate-300">3 minutes</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-500/10 rounded p-3 text-xs border border-purple-200 dark:border-purple-500/30">
                <div className="font-bold text-purple-700 dark:text-purple-400 mb-1">Event</div>
                <div className="text-slate-700 dark:text-slate-300">Traffic spike detected</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-500/10 rounded p-3 text-xs border border-purple-200 dark:border-purple-500/30">
                <div className="font-bold text-purple-700 dark:text-purple-400 mb-1">New Path</div>
                <div className="text-slate-700 dark:text-slate-300">2.1 km via alternate route</div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs mt-2">Revised ETA: 6.5 minutes (0.5 min faster)</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-600 text-white font-bold">4</div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Delivery Completed — Feedback Loop</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
              Actual time: 8 minutes (1 min longer than revised ETA due to traffic spike). Actual time fed back into edge weight model via exponential moving average.
            </p>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-500/20 rounded p-4 border border-orange-200 dark:border-orange-500/30">
              <div className="font-bold text-slate-900 dark:text-white mb-2">Key Insight: The Graph Learns</div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Historical delivery times continuously refine edge weights. Next delivery on this route uses improved weights. The system becomes smarter with every delivery.
              </p>
              <div className="mt-3 text-xs font-mono text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded p-2 border border-orange-200 dark:border-orange-500/30">
                <div>weight_new = α * actual_time + (1-α) * weight_old</div>
                <div className="text-orange-600 mt-1">Exponential Moving Average</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Delivery Trace Visualization */}
        <DeliveryTrace3D />

        {/* Key Takeaways */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/20 rounded-lg p-4 border border-blue-200 dark:border-blue-500/30">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Real-Time Constraint</h4>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              Route recomputation must complete in less than 100ms to keep the rider app responsive. Contraction Hierarchies reduce query time to 1-5ms.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/20 rounded-lg p-4 border border-green-200 dark:border-green-500/30">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Continuous Optimization</h4>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              Algorithm is not used once—it forms a continuous feedback loop. Historical data continuously refines the graph, making it smarter over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
