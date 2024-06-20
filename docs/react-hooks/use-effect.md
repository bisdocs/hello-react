---
sidebar_position: 4
---

# Use Effect Hook

useEffect is a React Hook that lets you synchronize a component with an external system.
- Some components need to be synchronized with external systems
- E.g Fetching data from a server, sending analytics log when a component appears on the screen.
- Effects let us run some code after rendering so that we can synchronize our component with some system outside of React.

```jsx
function Component(props) {
  useEffect(() => {

    // Setup function
    // This is where we need to place the logic for component's effects

    // Cleanup function
    return () => {
      // This function is called when the component is unmounted or before
      // executing the setup function again. It's used to clean up any
      // resources or effects set up by the component.
    };

  }, [/* Dependencies */]);

  // Return JSX representing the component
  return <div>Hello, World!</div>;
}
```
## Parameters

**Setup Function**
- When component is added to the DOM then the setup function will run
- When the state variables in the dependency arrays change, react will re render the component
- React will first run the cleanup function (if provided) with old value 
- And then run the setup function with new value
- After the component is removed from the DOM, it will run the cleanup function.
- Please note in the dependency array if we provide regular variables then it won't run useEffect hook if the variable value changes. We need to have state variables in the dependency array.


**Dependencies**

- The dependency array can include props, state, variable, functions declared directly in the function (reactive values)
- The dependencies should have a constant list of elements like `[dep1, dep2]` etc 
- React will compare each dependency with its previous value using the `Object.is` comparison.
- So having a function in the dependency array won't be a good idea
- If we are using any value inside the setup function then that should be in the dependency array

Lets see what really happens during the exection

**Blank dependecy**

When the dependency array is blank the useEffect() will be called only once
- It will execute when the component first renders
- The subsequent re-renders it will not execute the useEffect
- Here `use effect called for..` will log only once
```jsx
function EffectDemo() {
  const [counter, setCounter] = useState(0);

  console.log("Component Loaded");

  useEffect(() => {
    console.log("use effect called for.." +counter);

    return () => {
      console.log("clean up is called.." +counter);
    };
  }, []);

  return <>
     <h1>Hello</h1>
     <button onClick={()=>setCounter(counter+1)}>Click</button>
  </>
}
```
**Dependency Array**

With dependency array the execution flow will be like below

First render
- Component Will load
- useEffect will be called once for 0

Re renders
- Then click on the button to increase the counter & trigger re render
- Component will load
- Cleanup function will be called for the previous value (i.e 0)
- useEffect setup function will be called for the current value (i.e 1)
- And this sequence continues

Component is removed
- The cleanup function will be called once

```jsx
import { useEffect, useState } from "react";

function EffectDemo() {
  const [counter, setCounter] = useState(0);

  console.log("Component Loaded");

  useEffect(() => {
    console.log("use effect called for.." +counter);

    return () => {
      console.log("clean up is called.." +counter);
    };
  }, [counter]);

  return <>
     <h1>Hello</h1>
     <button onClick={()=>setCounter(counter+1)}>Click</button>
  </>
}

export default EffectDemo;
```
**No dependencies**
- dependencies is optional, we can remove it alltogether
- If we remove this argument, the Effect will re-run after every re-render of the component.
```jsx
  useEffect(() => {
    console.log("use effect called for.." +counter);

    return () => {
      console.log("clean up is called.." +counter);
    };
  });
```

**Primitive Variable as Dependency**

Lets say we have a primitive variable like string, so will useEffect run if this value changes
- Changing the value of `greet` within `handleClick` doesn't cause a re-render of the component 
- Because React doesn't track changes to local variables directly.
- The useEffect hook is set up with a dependency array `[greet]`
- Means it will execute its function whenever `greet` changes between renders.
- However, since greet doesn't cause a re-render directly (as it's not a state variable or a prop)
- This effect will not be triggered when `greet` changes in `handleClick`
- We will have to make greet as state variable if we want to run effect when it changes.

```jsx
function Demo() {
  let greet = "Hello";

  const handleClick = () => {
    greet = "hi";
    console.log(greet);
  };

  useEffect(() => {
    console.log(greet);
  }, [greet]);
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```
## Key Points
- useEffect is a function and it returns `undefined`
- It's a hook, so declare at the top level and this can't be used in loops/if-else etc.
- If we are not trying to synchronize with external system then probably we don't need an effect
- In strict mode react will run the useEffect twice - first setup+cleanup function to check if the cleanup function undoes/stops whatever the setup function is doing. It happens only in dev environment.
- If the dependencies are objects/functions defined in the component, it will cause useEffect to run more often than needed. So remove the unnecessary functions & objects from dependencies.
- React prioritizes the effects caused by user interactions (e.g click) otherwise it will paint the updated screen first and then run the effect.
- If the effect is doing something on the UI(e.g positioning a tooltip) and the delay is visible(flickers) then make use of `useLayoutEffect` instead of useEffect
- Effects only run on the client. They don’t run during server rendering.

## Interaction & Effects

**Interaction-Based Effects**
- When an effect is triggered by user interactions, like a button click (onClick), React typically prioritizes executing the effect immediately after the interaction event handler finishes. 
- React may run your Effect before the browser paints the updated screen. This ensures that the result of the Effect can be observed by the event system.
- In other words it ensures that any side effects triggered by user actions (like updating state, fetching data, or navigating) happen promptly in response to user input.
- Usually, this works as expected. However, if you must defer the work until after paint, such as an alert(), you can use setTimeout. 
- Even if the Effect was caused by an interaction (like a click), React may allow the browser to repaint the screen before processing the state updates inside your Effect.
- However, if you must block the browser from repainting the screen, you need to replace useEffect with useLayoutEffect.

**Non-Interaction-Based Effects**
-  In contrast, if an effect is not directly tied to a user interaction event (such as a timer, data fetching on component mount, or state change)
- React tends to delay running these effects until after the browser has finished painting the updated screen. 
- This delay allows React to optimize rendering performance by batching updates and avoiding unnecessary re-renders caused by effects that don't affect the current visible UI immediately.
- For effects not triggered by user interactions, React will typically wait until after it has finished updating the DOM with the latest changes before running the effect. 
- This approach ensures that the user sees the most up-to-date UI without interruptions caused by ongoing background tasks or updates.

## Fetching Data
We can use an effect to fetch data for the component
- If we are using any framework then fetching data using the framework mechanism is better than writing effect manually
- The `ignore` variable initialized to `false` and set to `true` during cleanup. This is to prevent the code from race conditions as network responses may arrive in a different order than we have sent.
- Writing the data fetch in the effect makes it difficult for performance optimization. So better to make it as custom hook or use some other library


```jsx
import { useEffect, useState } from "react";

function DataFetch() {
  const [person, setPerson] = useState("john");
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);

    async function fetchBio() {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${person}`
      );
      const result = await response.json();
      if (!ignore) {
        setBio(result.users[0]);
      }
    }

    fetchBio();

    return () => {
      ignore = true;
    };
  }, [person]);

  return (
    <div>
      <button onClick={() => setPerson("Michael")}>Next User</button>
      <pre>{JSON.stringify(bio, null, 2)}</pre>
    </div>
  );
}

export default DataFetch;
```
**Cons of fetching data directly**

This is a very popular way of fetching data however has significant downsides
- Effects don't run on the server, so server rendered HTML will include loading state & no data. 
The client computer need to download all JS & render the app only to discover it needs to load the data.
- We render the parent component, it fetches some data, renders the child components and they start fetching their data. It creates a network waterfall. If the network is not fast, it's significantly slower process compared to fetching all data in parallel.
- Fetching data directly means we are not caching the data, so if the component unmounts & mounts, data needs to be fetched again
- Morden react frameworks (e.g NextJS) has built in data fetching mechanism, prefer to use the same.
- Otherwise consider using client side cache React Query, React Router etc. We can build our own solution too.
