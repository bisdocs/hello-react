---
sidebar_position: 5
---

# Use Ref Hook

When we need component to `remember` some information but don't want to trigger re-render we can use `ref`
- useRef is used to persist values across renders without causing re-renders.
- Commonly used to reference and interact with DOM elements directly.
- Returns a mutable ref object with a `.current` property that holds the value.
- We can set an initial value with `useRef(initialValue)`, and .current starts with that value.

```jsx
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```
- We can point ref to anything like String, Number, Object, function etc
```jsx
let ref = useRef(0);
function handleClick() {
  ref.current = ref.current + 1;
}
```
- We can build a stop watch using this

```jsx
 const intervalRef = useRef(null);

 function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

 function handleStop() {
    clearInterval(intervalRef.current);
  } 
```

## Differences between refs and state
There are difference between refs and state
- useRef(initialValue) returns `{current: initialValue}`
but useState(initialValue) returns `[value, setValue]`
- useRef doesn't trigger re-render when changes but useState triggers re-render
- In useRef we can modify the value directly (mutable)
- States are immutable, we must use the state setting function to change.
```jsx
//It will not re-render the component, so updated value will not display
//If we add a alert / console log under handle click we can see the value change
let countRef = useRef(0);

  function handleClick() {
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>
      You clicked {countRef.current} times
    </button>
  );
```

## When to use refs
- Accessing or manipulating DOM elements (to focus, measure size)
- Storing ids for interval/timeouts and clear them on unmount (e.g the stop watch)
- When we need to store a value that doesn't trigger a re-render upon change (e.g if a effect has run)
- To keep values across renders without causing re-renders. 

## Best Practices
- Refs are useful with external library/ browser API however our app flows shouldn't rely on it too much
- Don't read or write `ref.current` and use the state instead. Becuase React doesn't know when the ref.current changes
- States are like the snapshot of every render and it doesn't update synchronously
- However when we update the value of ref it updates immediately.

## Refs and the DOM
- The most common use case of useRef is to point to a DOM element
- `<div ref={myRef}>` React puts this element as myRef.current
- Once the element is removed from the DOM, it updates `myRef.current = null`

# Manipulating the DOM with Refs
Sometimes we need to access the DOM elements directly like to focus on an element, scroll into view, measure size etc. There's no built in way to achieve this.

```jsx
// Syntax
import { useRef } from 'react';
const myRef = useRef(null); //initialize
<div ref={myRef}>
myRef.current.scrollIntoView();
```

### Focus on element using ref
```jsx
import { useRef } from "react";

function MyComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Access DOM element directly
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```
### Forward Ref
- We can't create ref to our components directly like this `<MyInput ref={inputRef} />`
- To achieve this we will have to use forward ref
- Here the actual reference is used inside `MyInput` component
- And we are manipulating the reference in another component that's `Form`
```jsx
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```
### When React attaches the refs
- React updates are basically split into two
- During render phase it decides what needs to be on the screen
- During commit it applies changes to the DOM
- During the render, DOMs are not created yet, so ref.current will be null
- React sets the ref.current during commit phase
- Usually we call refs in event handlers, if there's no event then we will use effect.

### Best practices for DOM manipulation with refs
- Use Refs to handle usecases outside of React flow like scrolling, focus etc
- If we use it to modify the DOM manually it will conflict with React's updates
- For example remove a button from the DOM will lead to a crash
```jsx
<button
    onClick={() => {
          ref.current.remove();
  }}>
```

### More Info
- [Flushing state updates synchronously with flushSync](https://react.dev/learn/manipulating-the-dom-with-refs#flushing-state-updates-synchronously-with-flush-sync)

