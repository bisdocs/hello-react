---
sidebar_position: 2
---

# React Hooks

React hooks are like utility functions that allows functional components to use state, lifecycle methods.

- Previously, only class components could manage state and other life cycle methods.
- Hooks are introduced in React 16.8 to give super powers to functional components
- Now functional components can manage state, have access to life cycle methods.

## Internals

The hooks come from [react](https://unpkg.com/react@18.3.1/umd/react.development.js) library.

## Rules of Hooks
- Functions whose names start with `use` are called Hooks in React.
- Call them at the top level in the body of the component.
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```
- Call them at the top level in the body of custom hooks
```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  // ...
}
```

## Avoid the mistakes

**Do not call Hooks inside conditions or loops**
- To fix this, move the hook outside of the if condition/for loop
```jsx
function Component() {
  if (condition) {
    const theme = useContext(ThemeContext);
  }
  // ...
}
```
```jsx
function Component() {
  for (let i = 0; i < 10; i++) {
    const theme = useContext(ThemeContext);
  }
  // ...
}
```
**Do not call Hooks after a conditional return statement.**
- To fix, move it before the return.
```jsx
function Component() {
  if (condition) {
    return;
  }
  const theme = useContext(ThemeContext);
  // ...
}
```

**Do not call Hooks in event handlers.**
- To fix, move it outside.
```jsx
function Component() {
  function handleClick() {
    const theme = useContext(ThemeContext);
  }
  // ...
}
```

**Do not call Hooks in class components.**
- Hooks are meant for only functional components.
- To fix, write a function component instead of a class!
```jsx
class MyComponent extends React.Component {
  render() {
    useEffect(() => {})
    // ...
  }
}
```
**Do not call Hooks inside functions passed to useMemo, useReducer, or useEffect.**
- To fix, move it outside!
```jsx
function Bad() {
  const style = useMemo(() => {
    const theme = useContext(ThemeContext);
    return createStyle(theme);
  });
  // ...
}
```



## Hooks Error
Reasons to see this error - Hooks can only be called inside of the body of a function component

- We get this error when we have mismatched version of `react` & `react-dom`
- or have more than one copy of React in the same app (means different react versions in same app)
- If we go to react-dom package then we will observe all hooks return `throwInvalidHookError`

```jsx
var ContextOnlyDispatcher = {
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useState: throwInvalidHookError,
};
```

and the `throwInvalidHookError` returns the error

```jsx
function throwInvalidHookError() {
  throw new Error(
    "Invalid hook call. Hooks can only be called inside of the body of a function component." 
      "This could happen for one of the following reasons:\n" 
      "1. You might have mismatching versions of React and the renderer (such as React DOM)\n" 
      "2. You might be breaking the Rules of Hooks\n" 
      "3. You might have more than one copy of React in the same app\n" 
      "See https://reactjs.org/link/invalid-hook-call for tips about\n" 
      "how to debug and fix this problem."
  );
}
```

## Strict Mode
* React calls the initializer function twice in order to help to find accidental impurities
* This is a `development` env specific feature & doesn't impact production.
* Also since the initializer function is pure (as it should be), this should not affect the behavior. 
* The result from one of the calls will be ignored.

## Reference
* Refer for more info [React Hook Rules](https://react.dev/warnings/invalid-hook-call-warning).
