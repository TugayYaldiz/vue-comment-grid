# Vue.js Comment Grid

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Downloading Plugin](#downloading-plugin)
    - [Dependencies](#dependencies)
    - [Include Plugin](#include-plugin)
  - [Creating Firebase Project](#creating-firebase-project)
  - [Setting Up Sign-In Method](#setting-up-sign-in-method)
  - [Getting Base URL and API Key](#getting-base-url-and-api-key)
  - [Creating Database Node Name](#creating-database-node-name)
  - [Setting Up Database Rules](#setting-up-database-rules)
  - [Giving Yourself Admin Permission](#giving-yourself-admin-permission)
  - [Changing Name or Comment Length Props](#changing-name-or-comment-length-props)
- [Usage](#usage)
  - [Default settings with Dark Backgrounds](#default-settings-with-dark-backgrounds)
  - [Default settings with Light Backgrounds](#default-settings-with-light-backgrounds)
- [Props](#props)
- [Customizing](#customizing)
- [TODO](#todo)
- [Why i did this plugin?](#why-i-did-this-plugin)
- [License](#license)

## Introduction

💬 Vue.js Comment Grid and [Demo](https://tugayyaldiz.github.io/vue-comment-grid) built with full CSS Grid and Firebase REST API + Authentication.

Basically you can just create [Firebase Project](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/creating-database.md), [enable Email/Password sign-in method](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/set-sign-methods.md) and pass [database URL](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/get-base-url-api-key.md), [API Key](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/get-base-url-api-key.md) and [node name](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/creating-database-node-name.md) you created in database as component props and set database rules to [this.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/database-rules.md) Thats all.

## Installation

### Downloading Plugin

```bash
npm install --save vue-comment-grid
```
#### Dependencies

- Axios - For HTTP requests.

> If you already use Axios in your project then no dependencies at all. 🤗
#### Include Plugin

Include plugin in your `main.js` file.

```js
import Vue from 'vue'
import CommentGrid from 'vue-comment-grid'

Vue.use(CommentGrid)
```
️️⚠️ **The following steps are important please read all.**

Most steps will only performing once.

Believe me, i wanted zero config usage for you but for **security reasons** some steps need to be setting up manually by you.

### Creating Firebase Project

Create new project in firebase console.

If you don't know how to create new project see detailed [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/creating-database.md)

### Setting Up Sign-In Method

Enable Email/Password method under Firebase Authentication menu.

If you don't know how to enable Email/Password sign-in method see detailed [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/set-sign-methods.md)

### Getting Base URL and API Key

Get databaseURL and apiKey from Firebase.

You can find Firebase databaseURL and apiKey in web setup under authentication menu from Firebase console.

If you don't know how to get there see detailed [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/get-base-url-api-key.md)

### Creating Database Node Name

For **security reasons** you need to create node names manually by yourself. Before passing new nodeName for different pages be sure you created that node name in database.

If you adding your first node name add `Name: commentsGrid/nodeNameYouWant/active Value: true ` under Realtime Database Root.

For other node names that you will create add `Name: nodeNameYouWant/active Value: true` under `commentsGrid` .

If you don't know how to do this see detailed [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/creating-database-node-name.md)

### Setting Up Database Rules

Set Realtime Database Rules to [this.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/database-rules.md)

If you don't know how to change database rules see detailed  [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/database-rules-tutorial.md)

### Giving Yourself Admin Permission

After setting up database rules, you have everything that you need. Pass required values as props to component and run system.

First sign up as a normal user in the comment system then find yourself under `commentUsers` node in Firebase Database and add new child `Name: admin Value: true` there.

If you want to give more people admin permission just add them  `admin: true` child too.

If you don't know how to do this see detailed [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/giving-yourself-admin.md)

### Changing Name or Comment Length Props

The default max user name length is "30" and default max comment length is "1000" character long. If you want change this values then you need to change values from Firebase Rules too. See detailed [here.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/updating-name-or-comment-length.md)

## Usage

```vue
<comment-grid
  baseURL="https://your-app.firebaseio.com"
  apiKey="your-api-key"
  nodeName="nodeNameThatYouCreated">
</comment-grid>
```
The above code is default required settings.

### Default settings with Dark Backgrounds

![Default Dark Background](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/img/default_black.png?raw=true)

### Default settings with Light Backgrounds

![Default White Background](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/img/default_white.png?raw=true)


## Props

| Name       | Type     | Default   | Description       | Required |
| ---        | ---      | ---       | ---               | --- |
| baseURL    | String   | null      | databaseURL of your Firebase Project | True |
| apiKey     | String   | null      | apiKey of your Firebase Project | True |
| nodeName   | String   | null      | node name that you created in Firebase Realtime Database | True |
| maxUserNameLength   | String   | "30"      | The name of the user must be below this value when sign-up. If you change this value then you need to change values from Firebase Rules too. See [docs.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/updating-name-or-comment-length.md#changing-name-length) | Optional |
| maxCommentLength   | String   | "1000"      | The character limit of comments. If you change this value then you need to change values from Firebase Rules too. See [docs.](https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/updating-name-or-comment-length.md#changing-comment-length)| Optional |
| initialMessageLimit   | String   | "10"      | Sets maximum message limit to shown at first load. When 'Show more comment' is clicked, the number of comment impressions will increase by this number.| Optional |
| maxLineLimit   | String   | "40"      | Sets line break limit. This is for prevent users from creating too many lines. Exceeded line breaks will be converted to spaces. Lines number are stored in database, so under this limit comments show directly without any operation.| Optional |
| maxShowingDepth   | String   | "5"      | Sets maximum reply depth to shown. This is not a maximum reply depth limit. Just for showing and hiding. There is no limit for depth. | Optional |
| background   | String   | "transparent"      | This is for customizing the background color of component. You can pass HEX, RGB, RGBA, HSL, HSV and even Gradient values. | Optional |
| commentBackgroundColor   | String   | "white"      | This is for customizing the  color of comment box. You can pass HEX, RGB, etc. like the ones above. | Optional |
| commentTextColor   | String   | "#1d2129"      | This is for customizing the color of comments. You can pass HEX, RGB, etc. like the ones above. | Optional |
| userNameColor   | String   | "rgb(6, 177, 183)"      | This is for customizing the color of user names. You can pass HEX, RGB, etc. like the ones above. | Optional |

## Customizing

If you want to customizing component props take a look at [here.](https://tugayyaldiz.github.io/vue-comment-grid/#/customize)

## TODO

- [ ] Add different languages support.
- [ ] Add ranking and sorting system for comments.


## Why i did this plugin?

I wanted to learn the CSS Grid and combine it with the technologies i already know. So i came up with this idea. I loved CSS Grid so much and definitely recommend you to use it.

Demo: https://tugayyaldiz.github.io/vue-comment-grid

Demo Video: https://www.youtube.com/watch?v=hp8AMCitHT0

## License

MIT
