---
sidebar_position: 3
---

# Use Context Hook

useContext hook allows functional components to consume context values globally, without prop drilling.

## The basic flow

- **Create Context** - First create a context 

to define the data we want to share across components.

```jsx
const userContext = createContext();
```

- **Create Context Provider** - Then create a context provider. 

Wrap the parent component(s) with a context provider and pass the data using the value prop.

```jsx
<UserContext.Provider value={user}>
    <App>
</UserContext.Provider>    
```

- **Accessing the context value** - Then access the context value in child components

The data can be accessed/consumed directly without prop drilling.

```jsx
const user = useContext(UserContext);
```

- **Update the context value** - We can also update the context

by modifying state in provider component(s), it triggers re renders in consuming components

```jsx
const [user, setUser] = useState("Kareena");
const updateUser = () => setUser("Priyanka");
<UserContext.Provider value={{ user, updateUser }}>
       ...
</UserContext.Provider>
```

## The problem

It's challenging to manage state without using a state management mechanism.

- Lets say we have a nested component tree like `A -> B -> C -> D`
- Now if we have a state in component A that we need in component D
- Then we will have to pass the states through each component to reach D
- So the intermediate nodes like B & C don't really need the state but they will have to accept and pass to the next
- This approach is called `prop drilling` 
- Whenever there's a change in state all the components will re render
- The component B & C also will re render even though they are not consuming it
- This leads to a performance issue
- Also in a complex application there will be hundreds of components, prop drilling will increase the complexity
- It becomes more complicated When the component D is under unrelated ancestors.

## The solution

Let's see a simple use case to manage state using `useContext`. Consider the scenario is like below
- We have a login page where we are entering the username and submitting it
- Once we submit the username it will update the user info in the user context
- Then we have another page called Profile where we will fetch the username from the user context and display it
- This is a very common use case, to display the username on various pages.

**1. Create the context**
```jsx title="userContext.js"
import { createContext } from "react";

const UserContext = createContext();

export default UserContext;
```
After creating the context, create a context provider


**2. Create the context provider**
```jsx title="UserContextProvider.js"
import { useState } from "react";
import UserContext from "./UserContext";

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
```
Now create the login component to update the user info in the context provider


**3. Create the login component**
```jsx title="Login.js"
import { useState, useContext } from "react";
import UserContext from "./UserContext";

function Login() {
  const [username, setUserName] = useState("Guest");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(username);
  };

  return (
    <form action="">
      <input
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default Login;
```

**4. Create the profile component**
```jsx title="Profile.js"
import { useContext } from "react";
import UserContext from "./UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>Profile</h1>
      <p>Hello {user}</p>
    </>
  );
}

export default Profile;
```
**5. Now wrap the components with context provider**

Now we need to wrap the components with the context provider so the global context can be accessed by all the components. 
Usually the context provider is wrapped around the `<App />` component.

```jsx title="App.js"
import Login from "./Login";
import Profile from "./Profile";
import UserContextProvider from "./UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <Login />
      <Profile />
    </UserContextProvider>
  );
}

export default App;
```

## Handling Theme
This is a common use case where we manage themes such as dark and light.

**1. Create the context**

Here we will create three things in one file
- The context
- Context provider
- And a custom hook to access/update the context

```jsx title="Theme.jsx"
import { createContext, useContext } from "react";

//Create theme context
export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

//Create theme provider
export const ThemeProvider = ThemeContext.Provider;

//Create a custom hook
export default function useTheme() {
  return useContext(ThemeContext);
}
```

**2. Create the theme button**

```jsx title="Theme.jsx"
import { useState } from "react";
import useTheme from "./Theme";

function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const [toggleDark, setToggleDark] = useState(false);

  const onChangebtn = () => {
    if (toggleDark) {
      darkTheme();
    } else {
      lightTheme();
    }

    setToggleDark(!toggleDark);
  };

  return (
    <>
      <button className="toggle-btn" onClick={onChangebtn}>
        {!toggleDark && <h1>&#x1F319;</h1>}
        {toggleDark && <h1>&#x1F31E;</h1>}
      </button>
    </>
  );
}

export default ThemeBtn;
```

**3. Create the Card component**
```jsx title="Card.jsx"
function Card() {
  return (
    <div className="disp-card">
      <h1>Greetings</h1>
    </div>
  );
}

export default Card;
```

**4. Create the Card component**
```jsx title="Card.jsx"
function Card() {
  return (
    <div className="disp-card">
      <h1>Greetings</h1>
    </div>
  );
}

export default Card;
```

**5. App component**
```jsx title="App.jsx"
import { useEffect, useState } from "react";
import { ThemeProvider } from "./Theme";
import "./Appx.css";
import ThemeBtn from "./ThemeButton";
import Card from "./Card";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <ThemeBtn />
      <Card />
    </ThemeProvider>
  );
}

export default App;
```
**6. App styles**
```jsx title="App.css"
.toggle-btn {
  cursor: pointer;
  background-color: transparent;
  border: none;
}
.disp-card {
  padding: 10px;
  border: 1px solid silver;
  width: 300px;
}

.dark {
  background-color: rgb(61, 54, 54);
  color: white;
}
```