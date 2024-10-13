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


## Connecting to an external system

Some components need to be connected to external systems (such as different network, browser API, third party library) while they are displayed on the page. The systems are not controlled by react so called as external systems.

**Chat Room Example**
- When the `ChatRoom` component gets added to the page, it will connect to the chat room with the initial `serverUrl` and `roomId`
- If the user picks a different chat room (in a dropdown) then the `serverUrl` or `roomId` will change and trigger a re render of the component. 
- The changes in the effect dependency will rerun the effect. First it will disconnect from the previous room, and then connect to the next one.
- When the ChatRoom component is removed from the page, the Effect will disconnect one last time.
```jsx
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
  	const connection = createConnection(serverUrl, roomId);
    connection.connect();
  	return () => {
      connection.disconnect();
  	};
  }, [serverUrl, roomId]);
  // ...
}
```
- It has two parameters
   - `Setup` function (that connects to a system), also the `cleanup` function that disconnects from the system
   - List of `dependencies` (every value from component that's used inside the effect function)
- The execution flow
    - React calls the setup function when the component is added to the page(mounts)
    - After every re render of the component when the dependencies change
        - First the cleanup code runs with old props and state
        - Then the setup function runs with new props and state
    - The cleanup code runs one final time when the component is removed from the page.

**Key Points**
- Effect helps us to keep the component synchronized with external system.
- The external system means these are not controlled by react
- A timer managed with `setInterval()` and `clearInterval()`
- An event subscription using `window.addEventListener()` and `window.removeEventListener()`
- A third-party animation library with an API like `animation.start()` and `animation.reset().`

**The Chat App**

```jsx
import React, { useState } from "react";
import ChatRoom from "./ChatRoom";

function ChatApp() {
  const [roomId, setRoomId] = useState("general");
  const [show, setShow] = useState(false);

  return (
    <div>
      <label>
        Choose the chat room:{" "}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>

      <button onClick={() => setShow(!show)}>
        {show ? "Close chat" : "Open chat"}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </div>
  );
}

export default ChatApp;
```

```jsx
import React, { useState } from "react";
import { useEffect } from "react";
import { createConnection } from "./chat";

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
    <div>
      <label htmlFor="">Server URL</label>
      <input
        type="text"
        value={serverUrl}
        onChange={(e) => setServerUrl(e.target.value)}
      />
    </div>
  );
}

export default ChatRoom;
```

```jsx
export function createConnection(serverUrl, roomId) {
  return {
    connect() {
      console.log(
        '✅ Connecting to "' + roomId + '" room at ' + serverUrl + "..."
      );
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    },
  };
}
```

**Window Listener**
```jsx
import React, { useState } from "react";
import { useWindowListener } from "./useWindowListener";

function WindowApp() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowListener("pointermove", (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "pink",
        borderRadius: "50%",
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: "none",
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  );
}

export default WindowApp;
```

```jsx
import { useEffect } from "react";

export function useWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
}
```

**Trigerring Animation**
- Here the external system is animation library `animation.js`
- Refresh the page to see the animation loads

```jsx
export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  start(duration) {
    this.duration = duration;
    if (this.duration === 0) {
      // Jump to end immediately
      this.onProgress(1);
    } else {
      this.onProgress(0);
      // Start animating
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // We still have more frames to paint
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
```

```jsx
import React, { useEffect, useRef } from "react";
import { FadeInAnimation } from "./Animation";

function AniApp() {
  const ref = useRef(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(3000);

    return () => {
      animation.stop();
    };
  }, []);
  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: "white",
        padding: 50,
        textAlign: "center",
        fontSize: 50,
        backgroundImage:
          "radial-gradient(circle, rgba(30, 30, 30, 1) 0%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      Welcome
    </h1>
  );
}

export default AniApp;
```

**Modal Dialog**
- Here the external system is the browser DOM
- Uses effect to synchronize the `isOpen` prop with `showModal` & `close`

```jsx
import React, { useEffect, useRef } from "react";
import './ModalDialog.css';

function ModalDialog({ isOpen, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog.showModal();

    return () => {
      dialog.close();
    };
  }, [isOpen]);
  return <dialog className="modal" ref={ref}>{children}</dialog>;
}

export default ModalDialog;
```

```jsx
import React, { useState } from "react";
import ModalDialog from "./ModalDialog";

function ModalApp() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Open Dialog</button>
      <h1>Hello World</h1>
      <ModalDialog isOpen={show}>
        Hello There!
        <br />
        <button onClick={() => setShow(false)}>Close</button>
      </ModalDialog>
    </>
  );
}

export default ModalApp;
```

**Element Visibility**
- Here the external system is browser DOM
- When we scroll the page and the Box is fully in the view port, it changes the background color to black. If we scroll more and the box goes out of the view it changes to white.
- Box component uses an effect to manage `IntersectionObserver` the browser API notifies when the DOM element is visible in the view port.
```jsx
import { useRef, useEffect } from "react";

export default function Box() {
  const ref = useRef(null);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          document.body.style.backgroundColor = "black";
          document.body.style.color = "white";
        } else {
          document.body.style.backgroundColor = "white";
          document.body.style.color = "black";
        }
      },
      {
        threshold: 1.0,
      }
    );
    observer.observe(div);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        border: "2px solid black",
      }}
    >
      <h1>Next Article</h1>
    </div>
  );
}
```
```jsx
import React from "react";
import Box from "./Box";

function VisibleApp() {
  return (
    <>
      <LongSection />
      <Box />
      <LongSection />
      <Box />
      <LongSection />
    </>
  );
}

function LongSection() {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

  const items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<li key={i}>{text}</li>);
  }
  return <ul>{items}</ul>;
}

export default VisibleApp;
```


## Effect as custom hook
- When we write Effect more often then it's better to use as custom hook

```jsx
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);
}

//in app.jsx call like this
 useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
```

## Controlling non-React widget
- Sometimes we want to keep an external system synchronized to some prop in our component
- For example, the zoom prop in our component can zoom in/out the actual map widget
- For below example install `leaflet`, `react-leaflet`
- Here cleanup function is not required, as the map widget works on a dom node. Once the component is removed from the DOM, the dom node will be removed also.

```jsx
//Map widget
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

export class MapWidget {
  constructor(domNode) {
    this.map = L.map(domNode, {
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      zoomAnimation: false,
      touchZoom: false,
      zoomSnap: 0.1,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);
    this.map.setView([0, 0], 0);
  }
  setZoom(level) {
    this.map.setZoom(level);
  }
}
```
```jsx
//Map component
import React, { useEffect, useRef } from 'react';
import { MapWidget } from './map-widget';

function MapComponent({ zoomLevel }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }

    const map = mapRef.current;
    map.setZoom(zoomLevel);
  }, [zoomLevel]);

  return (
    <div
      style={{ width: 600, height: 600 }}
      ref={containerRef}
    />
  );
}

export default MapComponent;
```
```jsx
import React, { useState } from 'react'
import MapComponent from './MapComponent';

function MapApp() {
    const [zoomLevel, setZoomLevel] = useState(0);
    return (
      <>
        Zoom level: {zoomLevel}x
        <button onClick={() => setZoomLevel(zoomLevel + 1)}>+</button>
        <button onClick={() => setZoomLevel(zoomLevel - 1)}>-</button>
        <hr />
        <MapComponent zoomLevel={zoomLevel} />
      </>
    );
}

export default MapApp
```

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

## Reactive dependency
- We shouldn't `choose` the dependencies of the Effect. 
- Every reactive value used by the Effect's code must be declared as a dependency. 
- If either `serverUrl` or `roomId` change, the Effect will reconnect to the chat using the new values.
- Reactive values include props and all variables and functions declared directly inside of your component.

```jsx
function ChatRoom({ roomId }) { // This is a reactive value
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); 
  // This is a reactive value too

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); 
    // This Effect reads these reactive values
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]); 
  // ✅ So you must specify them as dependencies of your Effect
  // ...
}
```
- If we correctly setup the linter then it will flag errors if we remove the reactive dependency.
- If we want to remove from the dependency then we will have to prove to the linter that it's not reactive (won't change on re-renders)
```jsx
const serverUrl = 'https://localhost:1234'; // Not a reactive value anymore
```
- If we remove all the dependencies, an effect with empty dependencies doesn’t re-run when any of the component's props or state change.
- Sometimes we might see comments that suppresses the linter, which is not a good practice 
```jsx
useEffect(() => {
  // ...
  // 🔴 Avoid suppressing the linter like this:
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, []);
```
**Having Dependency Array**

If we specify the dependencies, the Effect runs after the initial render and after re-renders with changed dependencies.
```jsx
//Dependency Array
useEffect(() => {
  // ...
}, [a, b]); // Runs again if a or b are different
```

**Empty Dependency**

If the Effect truly doesn’t use any reactive values, it will only run after the initial render.
```jsx
//Empty dependency array
useEffect(() => {
  // ...
}, []); // Does not run again (except once in development)
```

**No Dependency**

If we pass no dependency array at all, the Effect runs after every single render (and re-render) of the component.
```jsx
useEffect(() => {
  // ...
}); // Always runs again
```

**Update State Based on previous state from Effect**
- If we use `setCounter(counter+1)` & use the `counter` in the dependency array  then we might run into a problem
- When we specify the counter as dependency it resets the interval
- The correct approach is to use the updater function and remove the counter dependency.
```jsx
import React, { useEffect, useState } from "react";

function CounterApp() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(prevCounter => prevCounter+1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div>
      <h1> {counter}</h1>
    </div>
  );
}

export default CounterApp;
```
**Removing Object Dependency**
- Don't specify the object as dependency
- Every re-render the object is created from scratch and it will run the effect
```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = { // 🚩 This object is created from scratch on every re-render
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options); // It's used inside the Effect
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // 🚩 As a result, these dependencies are always different on a re-render
  // ...
```
- Instead create the object inside the useEffect
```jsx
useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
```
**Removing unnecessary function dependencies**
- Don't use functions as dependency as it might run too often
- Here the effect reconnects after every render because the `createOptions` function is different for every render
```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() { // 🚩 This function is created from scratch on every re-render
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions(); // It's used inside the Effect
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🚩 As a result, these dependencies are always different on a re-render
  // ...
```
- Instead create the function inside useEffect
```jsx
  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
```

## Further Reading
- useEffectEvent
- Displaying different content on the server and the client 
- [You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Official docs](https://react.dev/reference/react/useEffect)