---
sidebar_position: 2
---

# React Fiber

Fiber is react's new reconciliation algorithm introduced in React 16

- It is a complete rewrite of the previous reconciliation mechanism.
- There was no name given to the previous reconcilation algorithm but we can call it as `stack reconcilation`
- Fiber is designed to improve the performance and responsiveness of React applications
- This helps especially the large and complex component trees.

**Incremental Rendering**

- Fiber enables React to break down the rendering work into smaller units, or "fibers"
- and prioritize which units to work on first.
- This allows React to spread out the rendering work over multiple frames
- making UI updates more incremental and responsive.

**Priority scheduling**

- Fiber introduces the concept of priority levels for different types of updates.
- React can pause, abort, or defer work on lower-priority updates in favor of higher-priority ones.
- This prioritization helps ensure that important updates, such as user interactions or animations, are processed more quickly.
- Low priority updates are like fetching data from server

**Reconciliation phases**

- Fiber breaks the reconciliation process into phases, such as "reconciliation," "commit," and "mutation."
- Each phase has its own priorities and responsibilities,
- This allows React to efficiently manage updates and avoid blocking the main thread.

**Time Slicing**

- Fiber allows react to interrupt long running tasks
- and prioritize prioritize rendering updates based on the available CPU resources.

The sudo code of how conceptually the algorithm works.

```jsx
// Incremental rendering
function performUnitOfWork(fiber) {
  // Do work for the current fiber
  // e.g., update props, state, etc.
  // Perform side effects
  // Update Fiber's state to reflect work done
  const nextUnitOfWork = /* find the next fiber to work on */;
  return nextUnitOfWork;
}

function workLoop(deadline) {
  let nextUnitOfWork = /* get the next unit of work */;
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
}

// Priority scheduling
function scheduleWork(component, priorityLevel) {
  // Determine the priority of the work based on priorityLevel
  // Add component to the queue with the appropriate priority
  // e.g., using a priority queue or similar data structure
}

// Reconciliation phases
function reconcile(fiber) {
  // Perform the reconciliation phase for the given fiber
  // e.g., determine which parts of the component tree need to be updated
}

function commitWork(fiber) {
  // Perform the commit phase for the given fiber
  // e.g., apply updates to the actual DOM
}

// Time-slicing
function workLoopWithTimeSlicing(deadline) {
  let nextUnitOfWork = /* get the next unit of work */;
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    if (deadline.timeRemaining() <= 1) {
      requestIdleCallback(workLoopWithTimeSlicing);
    }
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoopWithTimeSlicing);
  }
}
```

## Fiber

The fiber method works like this

```jsx
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null; // Fiber

  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;
  this.mode = mode; // Effects

  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;
  this.lanes = NoLanes;
  this.childLanes = NoLanes;
  this.alternate = null;

  {
    // Note: The following is done to avoid a v8 performance cliff.
    //
    // Initializing the fields below to smis and later updating them with
    // double values will cause Fibers to end up having separate shapes.
    // This behavior/bug has something to do with Object.preventExtension().
    // Fortunately this only impacts DEV builds.
    // Unfortunately it makes React unusably slow for some applications.
    // To work around this, initialize the fields below with doubles.
    //
    // Learn more about this here:
    // https://github.com/facebook/react/issues/14365
    // https://bugs.chromium.org/p/v8/issues/detail?id=8538
    this.actualDuration = Number.NaN;
    this.actualStartTime = Number.NaN;
    this.selfBaseDuration = Number.NaN;
    this.treeBaseDuration = Number.NaN;
    // It's okay to replace the initial doubles with smis after initialization.
    // This won't trigger the performance cliff mentioned above,
    // and it simplifies other profiler code (including DevTools).

    this.actualDuration = 0;
    this.actualStartTime = -1;
    this.selfBaseDuration = 0;
    this.treeBaseDuration = 0;
  }

  {
    // This isn't directly used but is handy for debugging internals:
    this._debugSource = null;
    this._debugOwner = null;
    this._debugNeedsRemount = false;
    this._debugHookTypes = null;

    if (!hasBadMapPolyfill && typeof Object.preventExtensions === "function") {
      Object.preventExtensions(this);
    }
  }
} // This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.

var createFiber = function (tag, pendingProps, key, mode) {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
};
```

## Virtual DOM & Fiber

**Virtual DOM**
- Handles the representation of the UI in memory.
- Represents the entire UI structure as a tree of lightweight JavaScript objects.
- Allows React to efficiently compare the current UI state with the new state to identify changes.

**Fiber**
- Handles the reconciliation and rendering process.
- Breaks down the rendering work into smaller units called "fibers."
- Prioritizes and schedules the rendering work based on its priority levels.
- Manages the sequence of updates and commits them to the actual DOM.

**How they work together**

- When changes occur in a React component (e.g., state or props update)
- React creates a new Virtual DOM representation of the updated UI.
- React then compares this new Virtual DOM with the previous one to identify the differences (reconciliation).
- Fiber takes over to process these differences incrementally, prioritizing and scheduling the rendering work.
- Fiber reconciles the changes by updating the Virtual DOM and determining the minimal set of changes needed to update the actual DOM.
- Finally, Fiber commits these changes to the actual DOM, resulting in the updated UI being rendered to the user.


## Reference
- [Fiber React Conf](https://www.youtube.com/watch?v=ZCuYPiUIONs)
- [Scaler React Fiber](https://www.scaler.com/topics/react/react-fiber/)
- [acdlite react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)