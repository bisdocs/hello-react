---
sidebar_position: 1
---

# Foundations

## The Javascript Way

Before we start with React, lets see how does it work in Java Script
- Lets say we want to display `Hello World` on a page
- The `document`, `innerText`, `getElementById` are working as those are recognized by the browser.
- The browser has a javascript engine and the above functions, variables are understood to the javascript compiler
- Just go to browser console and type `document` or `document.createElement`

```jsx
<html>
  <head>
    <title>Simulating React</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const heading = document.createElement("h1");
      heading.innerText = "Hello World";

      const root = document.getElementById("root");
      root.appendChild(heading);
    </script>
  </body>
</html>
```

## The React way
- Add the two cdn links **react** & **react-dom** to the header
- Go to browser console and type **React / ReactDOM**
- Here the `createElement` is creating the h1 element with text
- Then we are creating the **root element** and then **rendering** the element on the root.

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
    <title>React Fundamentals</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const heading = React.createElement("h1", {}, "Hello React");
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(heading);
    </script>
  </body>
</html>
```
- The `React` library is the core library & provides functionality for defining react components, JSX, state management, life cycle methods, hooks.
- The `ReactDOM` library is to manipulate the DOM and includes **ReactDOM.render()** to render the component & **ReactDOM.hydrate()** for server side rendering.
- There are two files and not combined into one because the React library is also used in React native