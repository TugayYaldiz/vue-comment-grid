## 6. Giving Yourself Admin Permission

First sign up as a normal user in the comment system then find yourself under `commentUsers` node in Firebase Database and add new child `Name: admin Value: true` there.

If you want to give more people admin permission just add them  `admin: true` child too.

![Admin](./img/admin-perm/admin.gif?raw=true)

---
[Previous Step](./database-rules.md) • [Next Step](./updating-name-or-comment-length.md)