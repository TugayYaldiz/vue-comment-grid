<template>
  <div>
    <comment-grid baseURL="https://vizyon-vue-spa-app.firebaseio.com" apiKey="AIzaSyBbQXOx3AfiEJe2vD06Brp5F_wIMUDVYjY" nodeName="topic1"></comment-grid> 
  </div>
</template>

<script>
  import Comments from "./comments/Comments.vue";
  export default {
    name: "fullscreenDemo",
    components: {
      CommentGrid: Comments
    }
  };
</script>

<style>

</style>
