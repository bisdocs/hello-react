---
sidebar_position: 1
---

# Handling Forms

Handling forms is all about how we interact with form elements like input boxes, dropdowns, and buttons. The fundamental actions involve:

- Tracking value changes with the `onChange` event.
- Monitoring the displayed value using the `value` property.
- Initiating form submission with the `<form onSubmit={handleSubmit}>` syntax.

## Create basic form with React

```jsx title="myForm.js"
import { useState } from "react";

function MyForm() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    age: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```

## Submitting the form

When we submit the form we need to use `event.preventDefault()` else the form inputs will be cleared on clicking submit button.

```jsx title="myForm.js"
const handleSubmit = (event) => {
  event.preventDefault();
  console.log(formData);
};

 <form onSubmit={handleSubmit}>
```

## Reset the form

To reset the form we can add a reset button or in the submit handler add our logic. We can simply set the state to the initial data.

```jsx title="myForm.js"
const resetHandler = () => {
  setFormData(initialFormData);
};

<button onClick={resetHandler}>Reset</button>;
```

## Controlled Component
When the form data is handled by the react state it's called controlled component
- The value of the input field is controlled by React
- and any changes to the input field trigger a change in the state, which in turn updates the UI.
```jsx title="controlledForm.js"
import React, { useState } from 'react';

function ControlledForm() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledForm;
```

## UnControlled Component
When the form data is handled by DOM it's called uncontrolled component
- React does not control the input field's value directly 
- instead, it relies on the DOM to store and manage the input value.
```jsx title="UncontrolledForm.js"
import React, { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
```

## Fetching the submitted data
When we submit the data, usually we want to do something with it. Let's say we want to display the submitted data in another component
- So basically there are 3 components `App.js`, `myForm.js` `displayData.js`
- We will mantian a state `submittedFormData` in app.js
- We will pass a method to `myForm.js` from App.js that will trigger when the form is submitted.
- When the form is submitted, this function updates the data in `App.js`
- Finally, we pass the updated `submittedFormData` from App.js to the DisplayData component
```jsx title="App.js"
import React, { useState } from 'react';
import MyForm from './MyForm';
import DisplayData from './DisplayData';

function Apps() {
  const [submittedFormData, setSubmittedFormData] = useState([]);

  const handleFormSubmit = (data) => {
    setSubmittedFormData([...submittedFormData, data]);
  };

  return (
    <div>
      <MyForm onSubmit={handleFormSubmit} />
      <DisplayData submittedData={submittedFormData} />
    </div>
  );
}

export default Apps;
```
```jsx title="MyForm.js"
import React, { useState } from 'react';

function MyForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter data..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```
```jsx title="DisplayData.js"
import React from 'react';

function DisplayData({ submittedData }) {
  return (
    <div>
      <h2>Submitted Data</h2>
      <ul>
        {submittedData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayData;
```

## External Libraries
Some commonly used libraries to handle forms are  [formik](https://formik.org/) & [react-hook-form](https://react-hook-form.com/)



The source code is available at [Form Handling](https://github.com/biswajitsundara/hello-react/tree/master/src/01%20Form%20Handling)

Refer React official site for more info [https://react.dev/reference/react-dom/components/form](https://react.dev/reference/react-dom/components/form).
