"use strict";(self.webpackChunklearnreact=self.webpackChunklearnreact||[]).push([[110],{9237:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var a=n(4848),r=n(8453);const s={sidebar_position:2},i="The use state hook",o={id:"react-deep-dive/state",title:"The use state hook",description:"Lets look into the internal working of use state hook.",source:"@site/docs/react-deep-dive/state.md",sourceDirName:"react-deep-dive",slug:"/react-deep-dive/state",permalink:"/hello-react/react-deep-dive/state",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"React Fiber",permalink:"/hello-react/react-deep-dive/fiber"},next:{title:"React - Library",permalink:"/hello-react/category/react---library"}},c={},d=[{value:"The setState function",id:"the-setstate-function",level:2}];function u(e){const t={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"the-use-state-hook",children:"The use state hook"}),"\n",(0,a.jsx)(t.p,{children:"Lets look into the internal working of use state hook."}),"\n",(0,a.jsx)(t.h2,{id:"the-setstate-function",children:"The setState function"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"This function, dispatchSetState, is responsible for managing state updates in React's useState hook. Here's a simplified explanation of how it works internally:"}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Argument Checking: The function checks if a second callback argument is passed to useState. If it finds one, it throws an error because useState doesn't support a second callback argument."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Determining Update Lane: It determines the priority level (lane) of the update based on the fiber (component), which indicates when the update should be processed."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Creating Update Object: It creates an update object containing the update action, lane, and other metadata."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Handling Render Phase Update: If the update happens during the render phase, it enqueues the update to be processed later."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Handling Non-Render Phase Update: If the update happens outside the render phase, it checks if there's a previous state reducer function. If found, it calls the reducer function to get the new state, then enqueues the update to be processed."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Scheduling Update: It schedules the update to be processed by React's reconciler and marks the update for DevTools."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",children:'function dispatchSetState(fiber, queue, action) {\n  {\n    if (typeof arguments[3] === "function") {\n      error(\n        "State updates from the useState() and useReducer() Hooks don\'t support the second callback" \n        "argument. To execute a side effect after rendering, declare it in the component body"\n        "with useEffect()."\n      );\n    }\n  }\n  var lane = requestUpdateLane(fiber);\n  var update = {\n    lane,\n    action,\n    hasEagerState: false,\n    eagerState: null,\n    next: null,\n  };\n  if (isRenderPhaseUpdate(fiber)) {\n    enqueueRenderPhaseUpdate(queue, update);\n  } else {\n    var alternate = fiber.alternate;\n    if (\n      fiber.lanes === NoLanes &&\n      (alternate === null || alternate.lanes === NoLanes)\n    ) {\n      var lastRenderedReducer = queue.lastRenderedReducer;\n      if (lastRenderedReducer !== null) {\n        var prevDispatcher;\n        {\n          prevDispatcher = ReactCurrentDispatcher$1.current;\n          ReactCurrentDispatcher$1.current =\n            InvalidNestedHooksDispatcherOnUpdateInDEV;\n        }\n        try {\n          var currentState = queue.lastRenderedState;\n          var eagerState = lastRenderedReducer(currentState, action);\n          update.hasEagerState = true;\n          update.eagerState = eagerState;\n          if (objectIs(eagerState, currentState)) {\n            enqueueConcurrentHookUpdateAndEagerlyBailout(\n              fiber,\n              queue,\n              update,\n              lane\n            );\n            return;\n          }\n        } catch (error2) {\n        } finally {\n          {\n            ReactCurrentDispatcher$1.current = prevDispatcher;\n          }\n        }\n      }\n    }\n    var root2 = enqueueConcurrentHookUpdate(fiber, queue, update, lane);\n    if (root2 !== null) {\n      var eventTime = requestEventTime();\n      scheduleUpdateOnFiber(root2, fiber, lane, eventTime);\n      entangleTransitionUpdate(root2, queue, lane);\n    }\n  }\n  markUpdateInDevTools(fiber, lane);\n}\n'})})]})}function l(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>o});var a=n(6540);const r={},s=a.createContext(r);function i(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);