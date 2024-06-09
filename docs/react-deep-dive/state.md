---
sidebar_position: 2
---

# The use state hook

Lets look into the internal working of use state hook.


## The setState function
- This function, dispatchSetState, is responsible for managing state updates in React's useState hook. Here's a simplified explanation of how it works internally:

- Argument Checking: The function checks if a second callback argument is passed to useState. If it finds one, it throws an error because useState doesn't support a second callback argument.

- Determining Update Lane: It determines the priority level (lane) of the update based on the fiber (component), which indicates when the update should be processed.

- Creating Update Object: It creates an update object containing the update action, lane, and other metadata.

- Handling Render Phase Update: If the update happens during the render phase, it enqueues the update to be processed later.

- Handling Non-Render Phase Update: If the update happens outside the render phase, it checks if there's a previous state reducer function. If found, it calls the reducer function to get the new state, then enqueues the update to be processed.

- Scheduling Update: It schedules the update to be processed by React's reconciler and marks the update for DevTools.
```jsx
function dispatchSetState(fiber, queue, action) {
  {
    if (typeof arguments[3] === "function") {
      error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback" 
        "argument. To execute a side effect after rendering, declare it in the component body"
        "with useEffect()."
      );
    }
  }
  var lane = requestUpdateLane(fiber);
  var update = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null,
  };
  if (isRenderPhaseUpdate(fiber)) {
    enqueueRenderPhaseUpdate(queue, update);
  } else {
    var alternate = fiber.alternate;
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      var lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        var prevDispatcher;
        {
          prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current =
            InvalidNestedHooksDispatcherOnUpdateInDEV;
        }
        try {
          var currentState = queue.lastRenderedState;
          var eagerState = lastRenderedReducer(currentState, action);
          update.hasEagerState = true;
          update.eagerState = eagerState;
          if (objectIs(eagerState, currentState)) {
            enqueueConcurrentHookUpdateAndEagerlyBailout(
              fiber,
              queue,
              update,
              lane
            );
            return;
          }
        } catch (error2) {
        } finally {
          {
            ReactCurrentDispatcher$1.current = prevDispatcher;
          }
        }
      }
    }
    var root2 = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
    if (root2 !== null) {
      var eventTime = requestEventTime();
      scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
      entangleTransitionUpdate(root2, queue, lane);
    }
  }
  markUpdateInDevTools(fiber, lane);
}
```
