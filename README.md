# 📑 Answer to the associated questions with ❝Assignment-05❞

---

## 1️⃣ Answer To The Question No 1:

### 🎯 The difference between `var`, `let`, and `const`:

**`var`, `let`, and `const` are used to declare variables in JavaScript, but they behave differently.**

- `var` is **function-scoped**, can be **redeclared**, and is **hoisted**, which can sometimes cause unexpected bugs.

- `let` is **block-scoped**, cannot be redeclared in the same scope, but its value **can be reassigned**.

- `const` is also **block-scoped**, cannot be **redeclared or reassigned**, making it ideal for values that should stay constant.

**As a developer we always need to use `const` and `let`. We shouldn't use `var` anywhere.**

---

## 2️⃣ Answer To The Question No 2:

### 🎯 Summarization of the spread operator (...):

The **spread operator (`...`)** in JavaScript is used to **expand or unpack elements** from an array, object, or iterable into individual elements. It helps copy, merge, or pass values easily without modifying the original data.

**Here is the code-snap to understand their syntax**

```js
// Spread operator with Array.
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Spread operator with Object.
const user = { name: "Mahmud", age: 22 };
const updatedUser = { ...user, city: "Dhaka" }; // {name: "Mahmud", age: 22, city: "Dhaka" }
```

It is commonly used for **copying arrays/objects, merging them, or passing multiple values to functions**.

---

## 3️⃣ Answer To The Question No 3:

### 🎯 The difference between map(), filter(), and forEach():

- **`forEach()`** Simply **loops through the array to perform actions**, but **does not return a new array**.

- **`map()`** Creates a **new array** by transforming each element of the original array.

- **`filter()`** Creates a **new array with only the elements that pass a condition**.

**Here is the code-snap to understand their syntax**

```js
// forEach()
arr.forEach((item) => console.log(item));

// map()
arr.map((item) => item * 2);

// filter()
arr.filter((item) => item > 5);
```

---

## 4️⃣ Answer To The Question No 4:

### 🎯 An arrow function:

An **arrow function** is a shorter syntax for writing functions in JavaScript. It uses the `=>` symbol and provides a cleaner, more concise way to define functions.

**Here is the code-snap to understand its syntax**

```js
const add = (a, b) => console.log(a + b);
add(10, 20); //30
```

---

## 5️⃣ Answer To The Question No 5:

### 🎯 Template literals:

**Template literals** are a way to create strings in JavaScript using **backticks (`` ` ``)** instead of quotes. They allow **embedding variables and expressions** inside a string using **`${}`**, making string formatting easier.

**Here is the code-snap to understand its syntax**

```js
const name = "Mahmud";
const msg = `Hello, ${name}!`;
```
