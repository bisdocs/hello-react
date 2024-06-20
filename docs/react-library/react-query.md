---
sidebar_position: 1
---

# React Query

React Query is a **data fetching** library for web applications. It takes care of fetching, caching, synchronizing and updating server state in the web applications

## The Basics

**Install React Query**
- install react query `npm i @tanstack/react-query`
- In the `main.jsx` update the below
```jsx
const queryClient = new QueryClient();
<React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
</React.StrictMode>
```

**Basic Data Fetch**

Let's fetch the posts from an API and display the results.
```jsx
//Basic Query Component
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPosts } from "./api";

export default function BasicQuery() {
  const {
    data: postData,
    isLoading,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (isError) {
    return <p>There is an error..</p>;
  }
  //console.log(data, isLoading);

  return (
    <div>
      <h1>Data Fetching..</h1>
      {postData.map((post) => (
        <li>{post.title}</li>
      ))}
    </div>
  );
}

//Api file
export const fetchPosts = async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
}
```
- Why queryKey is an array, because if we want to pass some other parameters e.g if we want to pass pagination then `queryKey: ["posts", {page:1}]`

## React Developer Tools
We can use the react developer tools to analyze the queried data.
- Install the package `npm i @tanstack/react-query-devtools`
- Go to `main.jsx` file and update the below.
- When we run the app we will see, a yelow color icon is displayed towards bottom
- Click on the icon, it will open the react query dev tools.
```jsx
 <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} /> //add this line
    </QueryClientProvider>
  </React.StrictMode>
```

For more information refer [React Query Official](https://tanstack.com/query/latest/docs/framework/react/overview)
