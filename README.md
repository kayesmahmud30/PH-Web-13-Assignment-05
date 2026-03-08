# 📑 Answer to the associated questions with ❝Assignment-05❞

---

## 1️⃣ Answer To The Question No 1:

### 🎯 The difference between ``var``, ``let``, and ``const``:
`var`, `let`, and `const` are used to declare variables in JavaScript, but they behave differently.
`var` is **function-scoped**, can be **redeclared**, and is **hoisted**, which can sometimes cause unexpected bugs.
`let` is **block-scoped**, cannot be redeclared in the same scope, but its value **can be reassigned**.
`const` is also **block-scoped**, cannot be **redeclared or reassigned**, making it ideal for values that should stay constant.

**As a developer we always need to use const and let. We shouldn't use var anywhere.**