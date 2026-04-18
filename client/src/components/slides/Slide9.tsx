export default function Slide9() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
          Key Insights
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">Key Takeaways</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Why this matters beyond quick commerce</p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Six Key Takeaways */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/20 rounded-lg p-5 border-l-4 border-blue-500">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Road Network = Weighted Graph</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Every city map is a graph G(V, E). Intersections are nodes, roads are edges, travel time is weight. Dijkstra finds optimal paths.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/20 rounded-lg p-5 border-l-4 border-green-500">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">O((V + E) log V) is Tractable</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              With min-heap and bidirectional search, shortest paths across millions of nodes can be found in milliseconds.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/20 rounded-lg p-5 border-l-4 border-purple-500">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Graph Learning</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Historical delivery data continuously refines edge weights. Systems get smarter with scale and time.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-500/20 rounded-lg p-5 border-l-4 border-orange-500">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Spatial Data Matters</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Geohashing and spatial indexing enable fast lookups without scanning entire datasets.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-500/10 dark:to-pink-500/20 rounded-lg p-5 border-l-4 border-pink-500">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Real-Time Constraints Drive Design</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Less than 100ms recomputation requirement forces use of advanced techniques like Contraction Hierarchies.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-500/10 dark:to-cyan-500/20 rounded-lg p-5 border-l-4 border-cyan-500">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">Feedback Loops are Powerful</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Actual delivery times feed back into the model, creating a self-improving system.
            </p>
          </div>
        </div>

        {/* Beyond Quick Commerce */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-500/10 dark:to-indigo-500/20 rounded-lg p-6 border-2 border-indigo-300 dark:border-indigo-500/40">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Beyond Quick Commerce</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-indigo-200 dark:border-indigo-500/30">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Ride-Sharing</div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">Uber, Ola use identical rider tracking and ETA computation techniques</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-indigo-200 dark:border-indigo-500/30">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Food Delivery</div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">Swiggy, Zomato use same architecture for delivery partner tracking</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-indigo-200 dark:border-indigo-500/30">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Logistics Networks</div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">Package routing, fleet management, supply chain optimization</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-4 border border-indigo-200 dark:border-indigo-500/30">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Navigation Apps</div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">Google Maps, Apple Maps use these techniques at massive scale</p>
            </div>
          </div>
        </div>

        {/* Emerging Challenges */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-500/10 dark:to-amber-500/20 rounded-lg p-6 border border-amber-200 dark:border-amber-500/30">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Emerging Challenges</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-amber-200 dark:border-amber-500/30">
              <span className="text-amber-600 dark:text-amber-400 font-bold">⚡</span>
              <div>
                <div className="font-medium text-slate-900 dark:text-white text-sm">Electric Vehicles</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Battery constraints add another dimension to routing</p>
              </div>
            </div>
            <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-amber-200 dark:border-amber-500/30">
              <span className="text-amber-600 dark:text-amber-400 font-bold">🚌</span>
              <div>
                <div className="font-medium text-slate-900 dark:text-white text-sm">Multi-Modal Routing</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Combining roads, public transit, walking</p>
              </div>
            </div>
            <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-amber-200 dark:border-amber-500/30">
              <span className="text-amber-600 dark:text-amber-400 font-bold">🤖</span>
              <div>
                <div className="font-medium text-slate-900 dark:text-white text-sm">Predictive Routing</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Anticipating traffic before it happens using ML</p>
              </div>
            </div>
            <div className="flex gap-3 bg-white dark:bg-slate-800 rounded p-3 border border-amber-200 dark:border-amber-500/30">
              <span className="text-amber-600 dark:text-amber-400 font-bold">🚁</span>
              <div>
                <div className="font-medium text-slate-900 dark:text-white text-sm">Autonomous Delivery</div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Routing for drones and autonomous vehicles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
