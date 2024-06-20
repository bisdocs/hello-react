---
sidebar_position: 1
---

# Higher Order Components

## The Concept
Before looking into the react components, lets see the core concept.

Higher Order Function (HOF) usually takes a function as an argument and returns an function to execute.

```jsx
function operate(func, x, y) {
    return func(x, y);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

console.log(operate(add,2,3)) //prints 5
```

## Usage In React

Higher-order component is a function that takes a component and returns a new component.
- It's not a react featute and more of a design pattern/technique
- This emerges from compositional nature & increases reusability
- higher-order component transforms a component into another component.
```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
``` 