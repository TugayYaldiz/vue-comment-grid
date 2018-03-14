## 5. Setting Up Database Rules

Just copy and paste this to your database rules section.

```json
{
  "rules": {
    "commentsGrid": {
      ".read": "true",
      ".write": "auth !== null && !data.exists() && newData.exists()",
       "$nodes": { 
         ".validate" : "root.child('commentsGrid/'+$nodes).exists()",
         ".write": "auth !== null && !data.exists() && newData.exists()",
         "comments": {
           ".validate" : "root.child('commentsGrid/'+$nodes).exists()",
            ".write": "auth !== null && 
                       root.child('commentsGrid/'+$nodes).exists() && 
                       (data.child('user_id').val() === auth.uid 
                       ? true 
                       : !data.exists() && newData.exists())",
           "$uid": {
             ".validate": "newData.child('user_id').exists() &&
                           newData.child('timestamp').exists() && 
                           newData.child('comment').exists() && 
                           newData.child('name').exists() && 
                           newData.child('lineCount').exists() &&
                           root.child('commentsGrid/'+$nodes).exists()",
             ".write": "auth != null && 
                        root.child('commentsGrid/'+$nodes).exists() && 
                        (data.child('user_id').val() === auth.uid
                        || root.child('commentUsers/'+ auth.uid +'/admin').exists()
                        ? true 
                        : !data.exists() && newData.exists())",
             "name": {
              ".validate": "newData.isString() &&
                            newData.val().length > 0 &&
                            newData.val().length <= 30 &&
                            !newData.val().matches(/^ /) &&
                            !newData.val().matches(/ +$/) &&
                            !newData.val().matches(/ {2,}+/)"
             },  
             "comment": {
               ".validate": "newData.isString() &&
                             newData.val().length > 0 &&
                             newData.val().length <= 1000 &&
                             !newData.val().matches(/ {30,}+/) &&
                             !newData.val().matches(/ +$/)"
             },
             "timestamp": { ".validate": "newData.isString() && 
                                          newData.val().length > 0 && 
                                          newData.val().length <= 13" },
             "user_id": {
                ".read":"true",
                ".write": "auth !== null && !data.exists() && newData.exists()",
              },
              "lineCount" : {
                 ".validate": "newData.isNumber()",
                 ".write": "auth !== null && !data.exists() && newData.exists()"
             },
             "$other": { ".validate": false }
           }
         },
         "replys": {
           ".read":"true",
           ".validate" : "root.child('commentsGrid/'+$nodes).exists()",
           ".write": "auth !== null && 
                     root.child('commentsGrid/'+$nodes).exists() && 
                     (data.child('user_id').val() === auth.uid 
                     ? true 
                     : !data.exists() && newData.exists())",
          "$uidd": {
             ".read":"true",
             ".validate": "newData.child('user_id').exists()",
             ".write": "auth !== null && 
                        root.child('commentsGrid/'+$nodes).exists() && 
                        (data.child('user_id').val() === auth.uid
                        || root.child('commentsGrid/'+$nodes+'/replys/'+$uidd+'/mods/'+auth.uid).exists()
                        || root.child('commentUsers/'+ auth.uid +'/admin').exists()
                        ? true 
                        : !data.exists() && newData.exists())",
             "replied": {
               ".read":"true",
               ".write": "auth !== null && newData.exists()",
              },
              "user_id": {
                ".read":"true",
                ".write": "auth !== null && !data.exists() && newData.exists()",
              },
              "mods": {
                ".read":"true",
                ".write": "auth !== null && 
                           root.child('commentsGrid/'+$nodes+'/replys/'+$uidd+'/user_id').val() === auth.uid",
              },
            "$uid": {
               ".read":"true",
               ".validate": "newData.child('user_id').exists() && 
                             newData.child('timestamp').exists() && 
                             newData.child('comment').exists() && 
                             newData.child('name').exists() && 
                             newData.child('lineCount').exists() &&
                             root.child('commentsGrid/'+$nodes).exists() &&
                             root.child('commentsGrid/'+$nodes+'/replys/'+$uidd).exists()",
               ".write": "auth != null && 
                          root.child('commentsGrid/'+$nodes).exists() && 
                          (data.child('user_id').val() === auth.uid 
                          || root.child('commentsGrid/'+$nodes+'/replys/'+$uid+'/mods/'+auth.uid).exists()
                          || root.child('commentUsers/'+ auth.uid +'/admin').exists()
                          ? true 
                          : !data.exists() && newData.exists())",
               "name": {
                ".validate": "newData.isString() &&
                              newData.val().length > 0 &&
                              newData.val().length <= 30 &&
                              !newData.val().matches(/^ /) &&
                              !newData.val().matches(/ +$/) &&
                              !newData.val().matches(/ {2,}+/)"
                },  
               "comment": {
                 ".validate": "newData.isString() &&
                               newData.val().length > 0 &&
                               newData.val().length <= 1000 &&
                               !newData.val().matches(/ {30,}+/) &&
                               !newData.val().matches(/ +$/)"
            	},
              "timestamp": { ".validate": "newData.isString() && 
                                           newData.val().length > 0 && 
                                           newData.val().length <= 13" 
              },
              "user_id": {
                ".read":"true",
                ".write": "auth !== null && !data.exists() && newData.exists()",
              },
              "lineCount" : {
                ".validate": "newData.isNumber()",
                ".write": "auth !== null && !data.exists() && newData.exists()"
              },
              "$other": { ".validate": false } 
              }
            }                  
         },
        "active":  { ".validate": false },
        "$other": { ".validate": false } 
    	}
    },
    "commentUsers": {
      "$uid": {        
      	".read": "auth != null && auth.uid == $uid",        
        ".validate": "newData.child('name').exists() && 
                      newData.child('email').exists() &&
                      newData.child('user_id').exists()",
        ".write": "auth != null && (auth.uid == $uid || data.child('user_id').val() === auth.uid)",
        "name": {
          ".validate": "newData.isString() &&
                        newData.val().length > 0 &&
                        newData.val().length <= 30 && 
                        !newData.val().matches(/^ /) &&
                        !newData.val().matches(/ {2,}+/)"
        },
        "email": {
          ".validate": "newData.isString() && 
                        newData.val().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/i) && 
                        newData.val().length > 0"
        },
        "user_id": {
          ".validate": "newData.isString() &&
                        newData.val()==$uid"
        },
      	"$other": { ".validate": false }, 
      }
    },
    "$other": { ".validate": false }, 
  }
}
```
## Changing Name or Comment Length Props
If you change default name length prop value you need to change all 
```
    "name": {
      ...
      newData.val().length <= 30 && --> this values wherever you see change it
      ... 
    }
``` 
fields too. The same goes for comment length. See it [here](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/updating-name-or-comment-length.md) in detail.

## How do you change the rules?

If you don't know how to change database rules see detailed  [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/database-rules-tutorial.md)

---
[Previous Step](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/creating-database-node-name.md) • [Next Step](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/giving-yourself-admin.md)
