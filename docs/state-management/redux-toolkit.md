---
sidebar_position: 1
---

# Redux Toolkit
Redux Toolkit is a state management library that is used in React applications.

- Earlier, Redux required a significant amount of boilerplate code (actions, action creators, reducers, etc.).
- Redux Toolkit (RTK) is the modern, recommended approach to using Redux.
It simplifies state management by providing built-in functions like createSlice, createAsyncThunk, etc.

## The problem
React applications often have nested components at multiple levels.
- Components can pass state as props either from `parent to child` or from `child to parent`.
- However, state cannot bypass intermediate components; it must be passed through each level.
- This process is known as prop drilling, where state is passed through multiple layers of components.
- Prop drilling can be inefficient because:
    - When the state changes, it triggers a re-render of all components that rely on that state, even if they don't directly need the change.
    - This can lead to unnecessary re-renders and impact performance.
- So in this example if we have to pass anything from D to H then we will have to pass `D -> B -> A -> C -> F -> H`
- Anything from D to E (siblings) then `D-> B -> E`
```bash
                         A
                    /          \
                 B              C
              /    \           /    \
           D        E      F        G
                          /   \
                       H       I

```
## The Solution
The solution is a global state management library. In this case, we are using Redux, though other options like Zustand are also available.

- Redux Toolkit creates a global store to manage the application's state.
- The state can be centrally managed in this store.
- Any component can connect to the store to access or manipulate the state.

