# Rider Tracking Presentation - Slide Content

## Slide 1: Title Slide
**Title:** Implementing Rider Tracking on Quick Commerce Apps
**Subtitle:** An Overview on the Design and Analysis of Algorithms
**Tags:** Design & Analysis of Algorithms, Quick Commerce
**Description:** Explore how Dijkstra's algorithm and graph-based live tracking power real-time delivery experiences in apps like Blinkit and Zepto, enabling 10-15 minute grocery delivery.

---

## Slide 2: The Quick Commerce Problem
**Title:** The Quick Commerce Challenge
**Subtitle:** Why 10-minute delivery requires sophisticated algorithmic solutions
**Content:**
- Quick Commerce (Q-Commerce) promises 10-15 minute delivery of groceries and essentials
- Unlike traditional e-commerce with large centralized warehouses, Q-Commerce uses Dark Stores (micro-fulfillment centers) strategically placed 1-3 km from customers
- Dark stores are small (2,000-5,000 sq ft), carry limited SKUs (5,000-10,000 items), and are optimized for rapid picking and packing
- The core challenge: **Route optimization at scale** - with 5,000+ concurrent riders in a metro city, each needing real-time path updates every 5 seconds

**Key Metrics:**
- 500,000+ orders per city per day
- Peak hour: 230+ orders per second during flash sales
- 99%+ inventory accuracy required
- <100ms API response time (p99)
- 90% of orders delivered within 15 minutes

---

## Slide 3: Graph Representation of Road Networks
**Title:** Road Networks as Weighted Graphs
**Subtitle:** From city maps to mathematical structures
**Content:**
- A city's road network is a weighted directed graph G(V, E, W)
  - **V (Vertices):** Intersections and key locations (500,000+ nodes for a metro city)
  - **E (Edges):** Road segments connecting intersections
  - **W (Weights):** Travel time or distance; dynamically updated based on traffic
- Average degree per node: 3-5 roads per intersection (sparse graph)
- For Mumbai metro area: ~500,000 nodes with ~2 million edges
- Edge weights updated every 30-60 seconds using real-time traffic data from HERE Maps or Google Roads API

**Why This Matters:**
- Graph sparsity means Dijkstra's algorithm runs efficiently
- Dynamic weights require incremental re-routing, not full recomputation
- Spatial indexing (Geohash) enables fast lookup of nearby nodes

---

## Slide 4: Dijkstra's Algorithm Fundamentals
**Title:** Dijkstra's Algorithm: The Shortest Path Solution
**Subtitle:** Time complexity analysis and practical implementations
**Content:**
- **Algorithm Overview:** Finds the shortest path from a source node to all other nodes in a weighted graph
- **Time Complexity Analysis:**
  - Classic implementation (linear search): O(V²)
  - Binary min-heap: O((V + E) log V) ← **Production standard**
  - Fibonacci heap: O(E + V log V) ← Theoretical best
  - Bidirectional Dijkstra: ≈ O((V + E) log V / 2) ← **Used by Google Maps & Blinkit**

**Space Complexity:** O(V) for distance array and priority queue

**Why Binary Heap for Production:**
- Road networks are sparse (E ≈ 3-5V for typical cities)
- Binary heap gives O((V + E) log V) ≈ practical real-time performance
- For 500K nodes: ~10-50ms per query on modern hardware
- Bidirectional search halves the search space, enabling sub-millisecond queries on contracted graphs

**Implementation Details:**
- Initialize distance array with infinity, source with 0
- Use min-heap priority queue to always process nearest unvisited node
- Update distances to neighbors when shorter path found
- Terminate when destination is popped from queue (or all nodes visited)

---

## Slide 5: Graph-Based Live Tracking
**Title:** Graph-Based Live Tracking Architecture
**Subtitle:** Mapping GPS streams onto road networks and updating paths in real-time
**Content:**
- **Map Matching:** Raw GPS coordinates are noisy and may fall off roads. A Hidden Markov Model (HMM) snaps each GPS ping to the most probable road segment
  - Input: GPS ping (latitude, longitude, timestamp)
  - Process: Viterbi algorithm finds most likely road segment
  - Output: Rider's current node in the graph

- **Incremental Re-routing:** When rider deviates or traffic changes, only affected subgraph is reprocessed
  - Delta updates on priority queue instead of full Dijkstra restart
  - Reduces computation from O((V + E) log V) to O(k log k) where k << V

- **ETA Computation:** Estimated Time of Arrival = Σ w(e) along remaining path
  - w(e) = distance / current_speed(e)
  - Updated every ~5 seconds as GPS pings arrive
  - Accounts for traffic, road type, and historical performance

**System Flow:**
1. GPS ping received (every 3-5 seconds)
2. Map matching snaps to road segment
3. Dijkstra re-routes from current node to destination
4. ETA recalculated based on remaining path
5. Updated location and ETA pushed to customer app via WebSocket

---

## Slide 6: Real-World Application in Blinkit & Zepto
**Title:** How Blinkit and Zepto Implement Rider Tracking
**Subtitle:** Translating textbook algorithms into production systems
**Content:**
- **Dark Store as Graph Source:** Every Blinkit dark store is a fixed node in the city graph. When an order is placed, Dijkstra runs from store node to customer's geocoded address node

- **Rider App as Graph Sensor:** Rider's phone sends GPS pings every 3-5 seconds. Each ping updates rider's current node, triggering Dijkstra re-evaluation of remaining subpath

- **Dynamic Edge Weights:** Traffic data from HERE Maps or Google Roads API updates edge weights. Congested roads get higher weights and are deprioritized

- **Spatial Indexing with Geohash:** Riders and stores indexed using Geohash—a spatial grid enabling quick lookup of closest rider to new order without scanning all riders

- **Scale Handling:** Zepto handles 5,000+ concurrent riders in a metro city
  - Each rider's path recomputed every ~5 seconds
  - At this scale, Dijkstra runs on pre-processed contracted graphs (Contraction Hierarchies)
  - Enables sub-millisecond query times even at massive scale

**Optimization Techniques:**
- **Contraction Hierarchies:** Preprocessing technique that creates a hierarchy of nodes, enabling faster queries
- **Bidirectional Search:** Two simultaneous searches from source and destination, meeting in the middle
- **Caching:** Recent paths cached to avoid redundant computations

---

## Slide 7: Case Study - Single Delivery in Chennai
**Title:** Tracing One Delivery: A Chennai Case Study
**Subtitle:** From order placement to doorstep—the graph operations behind it
**Content:**

**Step 1: Order Placed — Graph Lookup**
- Customer in Anna Nagar places order
- Nearest dark store (Koyambedu) selected via Geohash lookup
- Both nodes identified in city graph

**Step 2: Initial Route Computation — Dijkstra Fires**
- Bidirectional Dijkstra computes shortest path: store → customer
- Result: 2.3 km, estimated 7 min via Inner Ring Road
- Path cached in Redis for quick updates

**Step 3: Rider En Route — Live Graph Updates**
- Rider GPS pings every 4 seconds
- At minute 3, traffic data raises weight of one edge (road congestion)
- System detects detour is faster, triggers Dijkstra re-route
- New path: 2.1 km via alternative route, revised ETA: 6.5 min

**Step 4: Delivery Completed — Feedback Loop**
- Actual time: 8 minutes (1 min longer than revised ETA due to traffic spike)
- Actual time fed back into edge weight model via exponential moving average
- Graph learns—next delivery on this route uses improved weights

**Key Insights:**
- Algorithm is not used once—it forms a continuous feedback loop
- Historical delivery times continuously refine edge weights
- Graph becomes smarter over time as more deliveries complete
- Real-time constraint: Route recomputation must complete in <100ms
- Contraction Hierarchies reduce query time to 1-5ms on city-scale graphs

---

## Slide 8: Advanced Optimizations & Scalability
**Title:** Advanced Techniques for Production Scale
**Subtitle:** From algorithms to systems handling millions of deliveries
**Content:**
- **Contraction Hierarchies (CH):** Preprocessing creates node hierarchy based on importance. Queries skip unimportant nodes, reducing search space by 99%+

- **Hub Labels:** Pre-compute shortest paths between important hub nodes. Query becomes simple lookup instead of graph traversal

- **Time-Dependent Routing:** Edge weights vary by time of day. Morning rush hour has different weights than evening. Algorithms account for temporal dimension

- **Batching Orders:** During peak hours, single rider delivers 2-3 orders in same direction. Optimization problem becomes: find order sequence minimizing total time while meeting all SLAs

- **Geofencing & Arrival Detection:** When rider enters delivery zone (geofence), system automatically detects arrival, triggers notification, and prepares next assignment

**System Architecture:**
- **Redis Pub/Sub:** Location broadcasts to all interested services (customer app, dispatch system, analytics)
- **WebSocket:** Real-time updates to customer app (location, ETA)
- **Kafka Events:** Order status changes, delivery completion events for analytics
- **Caching Layer:** Recent paths, traffic patterns, historical performance cached

**Performance Metrics:**
- Query time: 1-5ms per rider per update (Contraction Hierarchies)
- 5,000 riders × 1 query per 5 seconds = 1,000 queries/sec
- Total compute: ~5-25 seconds of CPU time per second of wall time (parallelizable)

---

## Slide 9: Key Takeaways & Implications
**Title:** Key Takeaways
**Subtitle:** Why this matters beyond quick commerce
**Content:**
- **Road Network = Weighted Graph:** Every city map is a graph G(V, E). Intersections are nodes, roads are edges, travel time is weight. Dijkstra finds optimal paths on this structure

- **O((V + E) log V) is Tractable:** With min-heap and bidirectional search, shortest paths across millions of nodes can be found in milliseconds—enabling real-time tracking

- **Graph Learning:** Historical delivery data continuously refines edge weights. Systems get smarter with scale and time

- **Spatial Data Matters:** Geohashing and spatial indexing enable fast lookups without scanning entire datasets

- **Real-Time Constraints Drive Design:** <100ms recomputation requirement forces use of advanced techniques (Contraction Hierarchies, bidirectional search, caching)

- **Feedback Loops are Powerful:** Actual delivery times feed back into the model, creating a self-improving system

**Beyond Quick Commerce:**
- Ride-sharing (Uber, Ola): Similar rider tracking and ETA computation
- Food delivery (Swiggy, Zomato): Identical architecture for delivery partner tracking
- Logistics networks: Package routing, fleet management
- Navigation apps: Google Maps, Apple Maps use these techniques at scale

**Emerging Challenges:**
- **Electric vehicles:** Battery constraints add another dimension to routing
- **Multi-modal routing:** Combining roads, public transit, walking
- **Predictive routing:** Anticipating traffic before it happens using ML
- **Autonomous delivery:** Routing for drones and autonomous vehicles

---

## Slide 10: Conclusion & Future Directions
**Title:** Conclusion
**Subtitle:** The intersection of algorithms and real-world systems
**Content:**
- Rider tracking in quick commerce is a beautiful example of applied computer science
- Textbook algorithms (Dijkstra) form the foundation, but production systems require deep optimization
- Graph theory, spatial indexing, real-time systems, and machine learning converge to create seamless user experiences
- As quick commerce scales, algorithmic efficiency becomes a competitive advantage
- The techniques discussed apply broadly: navigation, logistics, ride-sharing, and beyond

**Questions for Further Exploration:**
- How would you handle multiple delivery destinations (TSP variant)?
- What happens when graph structure changes (new roads, closures)?
- How do you balance ETA accuracy with computational cost?
- How would autonomous vehicles change the routing problem?

---
