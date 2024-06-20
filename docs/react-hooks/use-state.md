---
sidebar_position: 2
---

# Use State Hook

useState is a built-in react hook that allows us to add **state** to a functional component.

- We need to import `useState` from `react` in the component
- The useState hook takes an initial state value as its argument and returns an array with two elements: the current state value and a function to update that state.
- We can use this function to update the state and trigger a re-render of the component.
- The naming convention for state variable is like [something, setSomething] using array destructuring.

```jsx
//Syntax
const [state, setState] = useState(initialState);
```

## Initial State

- The initial state is the value we want the state to hold initially.
- The value can be of any type, for functions there's a special behavior
- This argument is ignored after the initial render.

```jsx
function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [married, setMarried] = useState(false);
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

**The initializer function**

- If we pass a function as initialState, it will be treated as an initializer function.
- It should be pure, should take no arguments, and should return a value of any type.
- React will call your initializer function when initializing the component, and store its return value as the initial state.

```jsx
import React, { useState } from "react";

function InitializeDemo() {
  const setInitialMessage = () => {
    console.log("Initial message");
  };

  const [messageFunction, setMessageFunction] = useState(setInitialMessage);

  const messageHi = () => {
    console.log("Hi");
  };

  const messageHello = () => {
    console.log("Hello");
  };

  const updateMessage1 = () => {
    setMessageFunction(() => {
      console.log("Hey");
    });
  };

  const updateMessage2 = () => {
    setMessageFunction(messageHi);
  };

  const updateMessage3 = () => {
    setMessageFunction(messageHello);
  };

  return (
    <div>
      {messageFunction}
      <button onClick={updateMessage1}>Update Message1</button>
      <button onClick={updateMessage2}>Update Message2</button>
      <button onClick={updateMessage3}>Update Message3</button>
    </div>
  );
}

export default InitializeDemo;
```

**Avoid recreating the initial state**
- React saves the initial state once and ignores it on the next renders.
```jsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
```
- Although the result of `createInitialTodos()` is only used for the initial render, 
- we are still calling this function on every render.
- This can be wasteful if it’s creating large arrays or performing expensive calculations.
- To solve this, you may pass it as an initializer function to useState instead
```jsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
```
- Notice that we are passing `createInitialTodos`, which is the function itself, 
- and not `createInitialTodos()` which is the result of calling it.
- If you pass a function to useState, React will only call it during initialization.

```jsx

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}

//Arroach 1: Passing the initializer function
const [todos, setTodos] = useState(createInitialTodos);

//Approach 2: Passing the initial state directly
//This example does not pass the initializer function, 
//so the createInitialTodos function runs on every render, 
//such as when you type into the input.
//There is no observable difference in behavior, but this code is less efficient.
const [todos, setTodos] = useState(createInitialTodos());
```



## Return Values

useState returns an array with exactly two values

- The `current state`, during the first render the value will be the initialState
- The `set function` that lets uss to update the state to a different value and trigger a re-render.

```jsx
import { useState } from "react";

function Restaurants() {
  const restlist = ["Hilton", "Mariot", "Taj"];

  const rest = useState(restlist);

  console.log(rest);
  return (
    <>
      <p>{rest[0]}</p>
      <p>{console.log(rest[1])}</p>
    </>
  );
}

export default Restaurants;
```

- We will notice the useState returns array of hotel names and a function for the above example.


## Passing Next State
We can pass the next state to the `setState` function directly or a function that calculates the next state from the previous state.

```jsx
// Passing Next State directly
setCounter(counter+1);

//Passing next state as updater function
setCounter(prevCounter => prevCounter+1);
```

**Updating the next state directly**
- The state updates are asynchronous
- Means React will queue all the state updates and then it will update
- When we call `setCounter(counter+1)` three times, React will enqueue these state updates, scheduling them to be processed in the near future.
- During processing, React will perform the state updates one by one, but each update will use the initial state value at the time it was added to the queue.
- This means that each `setCounter` call will use the initial `counter` value, not the updated value from previous setCounter calls.
- Consequently, each `setCounter` call will increment the state value by 1 from the initial value.
- Therefore, the final state will be incremented by 1 and not by 3.

**Updating the next state updater function**
- When we pass a function as nextState that's considered as `updater function`
- It should be a pure function
- It takes only one argument i.e `previous state`
- And returns the `next state`
- React will put the updater function in a queue and re-render the component.
- During next render, React will calculate the next state by applying all of the queued updaters to the previous state. 
- When we use the updater function form of `setCounter`, it receives the previous state as an argument. 
- This ensures that each call to `setCounter` receives the latest state value as its starting point. 
- Therefore, even if the updates are batched together, each call will be based on the latest state
- As a result it will have correct increment i.e by 3

```jsx
import { useState } from "react";

function NextStateDemo() {
  const [counter, setCounter] = useState(0);

  const handleIncrement1 = () => {
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
  };

  const handleIncrement2 = () => {
    setCounter((prevCount) => prevCount + 1);
    setCounter((prevCount) => prevCount + 1);
    setCounter((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleIncrement1}>Click</button>
      <button onClick={handleIncrement2}>Click</button>
    </div>
  );
}

export default NextStateDemo;
```

## Adding State to component
We need to use useState at the top level of the component & can declare multiple state variables
```jsx
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
```
To update the state on the screen we need to call the setState method with the next state
```jsx
function handleClick() {
  setName('Robin');
}
``` 
React will store the next state and render the component again with the new value, then it will update the UI
- Calling the set function does not change the current state in the already executing code
```jsx
function handleClick() {
  setName('Robin');
  console.log(name); // Still "Taylor"!
}
```
- The state variable `name` will hold the updated value when useState will return the updated value in next render


## Updating Objects, Arrays in State
- The premitive types like string, number, boolean etc work same way
- We can put non primitive types like Objects & Arrays in state
- React state is considered read only, so we should replace it instead of mutating existing object
- So if we have a `form` object
```jsx
//Don't mutate an object in state like below
form.firstName='Ranbir'

//replace whole object by creating new
setForm({
  ...form,
  firstName: 'Bis'
})
```

**Nested Object**

The nested object values can be updated this way
```jsx
setPerson({
      ...person,
      address: {
        ...person.address,
        city: value,
      },
    });
```
The complete code is given below

```jsx
import { useState } from "react";

function NestedObjectState() {
  const initialData = {
    name: "Biswajit",
    address: {
      street: "10 Park street",
      city: "Bangalore",
      pin: "3211",
    },
  };

  const [person, setPerson] = useState(initialData);

  const handleNameChange = (value) => {
    setPerson({
      ...person,
      name: value,
    });
  };

  const handleCityChange = (value) => {
    setPerson({
      ...person,
      address: {
        ...person.address,
        city: value,
      },
    });
  };

  return (
    <>
      <h1>Name: {person.name}</h1>
      <h1>City:{person.address.city}</h1>
      <button onClick={() => handleNameChange("John")}>Change Name</button>
      <button onClick={() => handleCityChange("Mumbai")}>Change City</button>
    </>
  );
}

export default NestedObjectState;
```

**Array State**

We can update the state with array as below
```jsx
setTodos([
      ...todos,
      {
        id: 3,
        title: "Walk",
        done: false,
      },
    ]);
```
The complete code is given below
```jsx
import { useState } from "react";

function ArrayState() {
  const initialTodos = [
    { id: 0, title: "Buy milk", done: true },
    { id: 1, title: "Eat tacos", done: false },
    { id: 2, title: "Brew tea", done: false },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const todoHandler = () => {
    setTodos([
      ...todos,
      {
        id: 3,
        title: "Walk",
        done: false,
      },
    ]);
  };

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}

      <button onClick={todoHandler}>Add Todo</button>
    </div>
  );
}

export default ArrayState;
```
Now if we want to perform operations like delete, edit etc
```jsx
//delete the todo
 const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

//Change the todo
const changeTodoHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { id: id, title: "buy cheese",done: true};
        } else {
          return todo;
        }
      })
    );
  };
```

**With Immer.js**

If we feel the above approaches are tedious then we can use immer.js
- Immer under the hood does the same mutation
```jsx
import { useState } from 'react';
import { useImmer } from 'use-immer';

const [list, updateList] = useImmer(initialList);
```

Refer the official doc for more info


## Undefined State Problem
Most of the times when we have undefined state and access to any value it will throw error and we will see a blank page.
```jsx
import { useState } from "react";

function UndefinedState() {
  const [person, setPerson] = useState();

  return (
    <>
      <h1>Name is {person.name}</h1>
    </>
  );
}

export default UndefinedState;
```
**Solutions**

```jsx
//Use optional parameters
<h1>Name is {person?.name}</h1>

//Make it conditional
{person && <h1>Name is {person.name}</h1>}

//Initialize the state as blank
useState('');
useState({});
useState([]);
```


## Key Points
- useState is a hook so it can only be called at the top level of the component
- If we need to call it inside any condition/loop then move the state logic to another component and use.
- In strict mode, React will call the initializer function twice. This behaviour is only in dev environment and doesn't impact production. Since the initializer function needs to be pure, this shouldn't affect the behaviour. The result from one of the two calls will be ignored.
- useState hook executes in the same order
```jsx
useState() -- executes first
useState()
useState() -- executes last
```


## More Info
- [The useState hook](https://react.dev/reference/react/useState)
- [React State](https://react.dev/learn/state-a-components-memory)
- [Updating objects in state](https://react.dev/learn/updating-objects-in-state)
- [updating arrays in state](https://react.dev/learn/updating-arrays-in-state)
