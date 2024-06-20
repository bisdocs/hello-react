"use strict";(self.webpackChunklearnreact=self.webpackChunklearnreact||[]).push([[687],{4596:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>a});var s=o(4848),t=o(8453);const i={sidebar_position:1},r="React Hooks",l={id:"react-hooks/hooks-intro",title:"React Hooks",description:"React hooks are like utility functions that allows functional components to use state, lifecycle methods.",source:"@site/docs/react-hooks/hooks-intro.md",sourceDirName:"react-hooks",slug:"/react-hooks/hooks-intro",permalink:"/hello-react/react-hooks/hooks-intro",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"React - Hooks",permalink:"/hello-react/category/react---hooks"},next:{title:"Use State Hook",permalink:"/hello-react/react-hooks/use-state"}},c={},a=[{value:"Basics",id:"basics",level:2},{value:"Rules of Hooks",id:"rules-of-hooks",level:2},{value:"Avoid the mistakes",id:"avoid-the-mistakes",level:2},{value:"Hooks Error",id:"hooks-error",level:2},{value:"Internals",id:"internals",level:2},{value:"Strict Mode",id:"strict-mode",level:2},{value:"Reference",id:"reference",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"react-hooks",children:"React Hooks"}),"\n",(0,s.jsx)(n.p,{children:"React hooks are like utility functions that allows functional components to use state, lifecycle methods."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Previously, only class components could manage state and other life cycle methods."}),"\n",(0,s.jsx)(n.li,{children:"Hooks are introduced in React 16.8 to give super powers to functional components"}),"\n",(0,s.jsx)(n.li,{children:"Now functional components can manage state, have access to life cycle methods."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"basics",children:"Basics"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Hooks helps us to use different React features from the components"}),"\n",(0,s.jsxs)(n.li,{children:["We can either use ",(0,s.jsx)(n.code,{children:"built in"})," hooks or create custom hooks"]}),"\n",(0,s.jsx)(n.li,{children:"It simplifies when we have complex stateful logic or reuse logic between different components."}),"\n",(0,s.jsx)(n.li,{children:"Hooks are nothing but special functions (can be stateful, manage side effects)"}),"\n",(0,s.jsx)(n.li,{children:"It's clean, reusable, easy to test and small bundle size(boosts performance)"}),"\n",(0,s.jsxs)(n.li,{children:["If we want to know all the available hooks ",(0,s.jsx)(n.code,{children:"console.log(React)"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Built in Hooks"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"State Hooks - useState & useReducer"}),"\n",(0,s.jsx)(n.li,{children:"Context Hooks - useContext"}),"\n",(0,s.jsx)(n.li,{children:"Ref Hooks - useRef, useImperativeHandle"}),"\n",(0,s.jsx)(n.li,{children:"Effect Hooks - useEffect, useLayoutEffect, useInsertionEffect"}),"\n",(0,s.jsx)(n.li,{children:"Performance Hooks - useMemo, useCallback, useTransition, useDeferredValue"}),"\n",(0,s.jsx)(n.li,{children:"Other hooks - useDebugValue, useId, useSyncExternalStore, useActionState"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"rules-of-hooks",children:"Rules of Hooks"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Functions whose names start with ",(0,s.jsx)(n.code,{children:"use"})," are called Hooks in React."]}),"\n",(0,s.jsx)(n.li,{children:"Call them at the top level in the body of the component."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"function Counter() {\n  const [count, setCount] = useState(0);\n  // ...\n}\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Call them at the top level in the body of custom hooks"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"function useWindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  // ...\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"avoid-the-mistakes",children:"Avoid the mistakes"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Do not call Hooks inside conditions or loops"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"To fix this, move the hook outside of the if condition/for loop"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  if (condition) {\n    const theme = useContext(ThemeContext);\n  }\n  // ...\n}\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  for (let i = 0; i < 10; i++) {\n    const theme = useContext(ThemeContext);\n  }\n  // ...\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Do not call Hooks after a conditional return statement."})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"To fix, move it before the return."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  if (condition) {\n    return;\n  }\n  const theme = useContext(ThemeContext);\n  // ...\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Do not call Hooks in event handlers."})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"To fix, move it outside."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  function handleClick() {\n    const theme = useContext(ThemeContext);\n  }\n  // ...\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Do not call Hooks in class components."})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Hooks are meant for only functional components."}),"\n",(0,s.jsx)(n.li,{children:"To fix, write a function component instead of a class!"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"class MyComponent extends React.Component {\n  render() {\n    useEffect(() => {})\n    // ...\n  }\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Do not call Hooks inside functions passed to useMemo, useReducer, or useEffect."})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"To fix, move it outside!"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"function Bad() {\n  const style = useMemo(() => {\n    const theme = useContext(ThemeContext);\n    return createStyle(theme);\n  });\n  // ...\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"hooks-error",children:"Hooks Error"}),"\n",(0,s.jsx)(n.p,{children:"Reasons to see this error - Hooks can only be called inside of the body of a function component"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["We get this error when we have mismatched version of ",(0,s.jsx)(n.code,{children:"react"})," & ",(0,s.jsx)(n.code,{children:"react-dom"})]}),"\n",(0,s.jsx)(n.li,{children:"or have more than one copy of React in the same app (means different react versions in same app)"}),"\n",(0,s.jsxs)(n.li,{children:["If we go to react-dom package then we will observe all hooks return ",(0,s.jsx)(n.code,{children:"throwInvalidHookError"})]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"var ContextOnlyDispatcher = {\n  useContext: throwInvalidHookError,\n  useEffect: throwInvalidHookError,\n  useState: throwInvalidHookError,\n};\n"})}),"\n",(0,s.jsxs)(n.p,{children:["and the ",(0,s.jsx)(n.code,{children:"throwInvalidHookError"})," returns the error"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'function throwInvalidHookError() {\n  throw new Error(\n    "Invalid hook call. Hooks can only be called inside of the body of a function component." \n      "This could happen for one of the following reasons:\\n" \n      "1. You might have mismatching versions of React and the renderer (such as React DOM)\\n" \n      "2. You might be breaking the Rules of Hooks\\n" \n      "3. You might have more than one copy of React in the same app\\n" \n      "See https://reactjs.org/link/invalid-hook-call for tips about\\n" \n      "how to debug and fix this problem."\n  );\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"internals",children:"Internals"}),"\n",(0,s.jsxs)(n.p,{children:["The hooks come from ",(0,s.jsx)(n.a,{href:"https://unpkg.com/react@18.3.1/umd/react.development.js",children:"react"})," library."]}),"\n",(0,s.jsx)(n.h2,{id:"strict-mode",children:"Strict Mode"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"React calls the initializer function twice in order to help to find accidental impurities"}),"\n",(0,s.jsxs)(n.li,{children:["This is a ",(0,s.jsx)(n.code,{children:"development"})," env specific feature & doesn't impact production."]}),"\n",(0,s.jsx)(n.li,{children:"Also since the initializer function is pure (as it should be), this should not affect the behavior."}),"\n",(0,s.jsx)(n.li,{children:"The result from one of the calls will be ignored."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Refer for more info ",(0,s.jsx)(n.a,{href:"https://react.dev/warnings/invalid-hook-call-warning",children:"React Hook Rules"}),"."]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>l});var s=o(6540);const t={},i=s.createContext(t);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);