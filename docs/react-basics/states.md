---
sidebar_position: 1
---

# States in React

When we change the value of a regular variable, the changes don't reflect on the screen. The reason is that the component needs to be re-rendered to display the updated value. React state solves this problem by triggering re-renders whenever the state variable changes.

## The problem
In the below example when we click on the button we will observe name is changing but it's not updated on the screen.

```jsx title="StateProblem.js"
function StateProblem() {
  let name = "Guest";

  const handleClick = () => {
    name = "Alia";
    console.log(name);
  };
  return (
    <>
      <h2>{name}</h2>
      <button onClick={handleClick}>Update Name</button>
    </>
  );
}

export default StateProblem;
```

## The Solution

```jsx title="StateSolution.js"
import { useState } from "react";

function StateSolution() {
  const [name, setName] = useState("Guest");

  const handleClick = () => {
    setName("Alia");
    console.log(name);
  };
  return (
    <>
      <h2>{name}</h2>
      <button onClick={handleClick}>Update Name</button>
    </>
  );
}

export default StateSolution;
```

## State Variable
The state variable causes re-render of the component when the value changes.
- State variable stores data that can change over time
- It's local to the component, each component manage it's own state
- Mutable, unlike props we can change the value using `setState` method
- These are initialized
- Asynchronous, setState() calls are asynchronous, and React may batch multiple updates for performance reasons.
- Always use `setState` method to update the value and don't update directly
- React state can hold any type of data, including arrays, objects, booleans, strings, numbers

```jsx title="StateExample.js"
import { useState } from "react";

function StateExample() {
  let fruitsdata = [
    { name: "Apple", symbol: "🍏" },
    { name: "Mango", symbol: "🥭" },
    { name: "Banana", symbol: "🍌" },
  ];

  const [fruits, setFruits] = useState(fruitsdata);

  const filterFruits = () => {
    const filteredFruits = fruits.filter((fruit) => fruit.name.startsWith("A"));
    setFruits(filteredFruits);
  };

  return (
    <div>
      {fruits.map((fruit) => (
        <li key={fruit.name}>
          {fruit.name} {fruit.symbol}
        </li>
      ))}
      <button onClick={filterFruits}>Filter</button>
    </div>
  );
}

export default StateExample;
```

Refer for more info [https://react.dev/learn/state-a-components-memory](https://react.dev/learn/state-a-components-memory).
