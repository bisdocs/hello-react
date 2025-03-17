---
sidebar_position: 2
---

# Zustand
Zustand is a small, fast and scalable state management library
* It offers simple APIs to manage global state
* It's light weight unlike Redux/RTK which has boiler plate codes.
* Uses React hooks (`useStore`) for accessing and subscribing to the store.
* Performance is optimized to re-render the parts of the application that depends on the changed state.
* Built in middleware supports like persistence, logging, and devtools.
* zustand store is flexible, we can compose multiple stores or just one global store.


## Basic Example
Let's create a counter 
```jsx
import { create } from 'zustand';

interface Store {
  bears: number;
  increase: () => void;
  removeAll: () => void;
}

const useStore = create<Store>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  removeAll: () => set({ bears: 0 }),
}));

export default useStore;
```