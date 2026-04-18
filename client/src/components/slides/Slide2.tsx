export default function Slide2() {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 p-12">
      <div className="mb-6">
        <span className="px-3 py-1 bg-orange-500/20 dark:bg-orange-500/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
          The Challenge
        </span>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">The Quick Commerce Challenge</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Why 10-minute delivery requires sophisticated algorithmic solutions</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 rounded-lg p-6 border border-blue-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">What is Quick Commerce?</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Q-Commerce promises 10-15 minute delivery of groceries and essentials. Unlike traditional e-commerce with large centralized warehouses, Q-Commerce uses Dark Stores (micro-fulfillment centers) strategically placed 1-3 km from customers.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 dark:from-indigo-500/20 dark:to-indigo-600/20 rounded-lg p-6 border border-indigo-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">Dark Store Characteristics</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Size:</strong> 2,000-5,000 sq ft per store</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>SKUs:</strong> 5,000-10,000 high-velocity items</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Coverage:</strong> 1-3 km delivery radius</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20 rounded-lg p-6 border border-purple-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">The Core Challenge</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              <strong>Route optimization at scale</strong> — With 5,000+ concurrent riders in a metro city, each needing real-time path updates every 5 seconds.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Every second of delay in route computation translates to missed delivery windows and customer dissatisfaction.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 dark:from-pink-500/20 dark:to-pink-600/20 rounded-lg p-6 border border-pink-500/30">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">Scale Metrics</h3>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex justify-between"><span>Orders per city/day:</span> <strong>500,000+</strong></div>
              <div className="flex justify-between"><span>Peak hour rate:</span> <strong>230+ orders/sec</strong></div>
              <div className="flex justify-between"><span>Inventory accuracy:</span> <strong>99%+</strong></div>
              <div className="flex justify-between"><span>API response time (p99):</span> <strong>&lt;100ms</strong></div>
              <div className="flex justify-between"><span>On-time delivery SLA:</span> <strong>90% within 15 min</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
