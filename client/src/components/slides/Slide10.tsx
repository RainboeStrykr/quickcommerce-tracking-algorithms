export default function Slide10() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-12">
      <div className="mb-8">
        <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Conclusion</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300">The intersection of algorithms and real-world systems</p>
      </div>

      <div className="space-y-8 mt-8">
        {/* Main Insight */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">The Big Picture</h3>
          <p className="text-lg leading-relaxed mb-4">
            Rider tracking in quick commerce is a beautiful example of applied computer science. Textbook algorithms (Dijkstra) form the foundation, but production systems require deep optimization, real-time constraints, and continuous learning.
          </p>
          <p className="text-lg leading-relaxed">
            Graph theory, spatial indexing, real-time systems, and machine learning converge to create seamless user experiences that feel instant and reliable.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border-t-4 border-green-500">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Algorithmic Excellence</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Dijkstra's algorithm, bidirectional search, and Contraction Hierarchies provide the computational foundation.
            </p>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-700 p-3 rounded">
              O((V+E) log V) → O(1) with optimization
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border-t-4 border-purple-500">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">System Design</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Real-time systems, caching, spatial indexing, and event-driven architecture enable scale.
            </p>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-700 p-3 rounded">
              5,000 riders → 1,000 queries/sec
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border-t-4 border-orange-500">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Continuous Learning</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Feedback loops from actual delivery times continuously refine the system.
            </p>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-700 p-3 rounded">
              Exponential moving average weights
            </div>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg p-8 border-l-4 border-green-500">
          <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-3">The Competitive Advantage</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            As quick commerce scales, algorithmic efficiency becomes a competitive advantage. Companies that invest in optimizing their routing algorithms can deliver faster, serve more customers with fewer riders, and reduce operational costs. The difference between a 7-minute ETA and a 10-minute ETA can determine market share in a hyper-competitive space.
          </p>
        </div>

        {/* Final Thought */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-3">Final Thought</h3>
          <p className="text-lg leading-relaxed">
            The next time you order groceries and see a rider approaching on a live map, remember: behind that smooth experience is decades of research in graph theory, real-time systems, and optimization algorithms—all working together to deliver your order in 10 minutes.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-300 dark:border-slate-700 text-center text-slate-600 dark:text-slate-400">
        <p className="text-sm">Thank you for watching.</p>
      </div>
    </div>
  );
}
