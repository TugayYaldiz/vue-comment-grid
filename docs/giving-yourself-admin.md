## 6. Giving Yourself Admin Permission

First sign up as a normal user in the comment system then find yourself under `commentUsers` node in Firebase Database and add new child `Name: admin Value: true` there.

If you want to give more people admin permission just add them  `admin: true` child too.

![Admin](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/img/admin-perm/admin.gif?raw=true)

---
[Previous Step](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/database-rules.md) • [Next Step](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/updating-name-or-comment-length.md)