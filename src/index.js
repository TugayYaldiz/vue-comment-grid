import Comments from "./Comments.vue";

export default {
  install (Vue) {
    Vue.component('CommentGrid', Comments)
  }
}