<template>
  <div class="comments">
    <div class="wrapper" @mouseenter="showHideBar = true; $emit('close-hide-bar',false);" @mouseleave="showHideBar = false; $emit('close-hide-bar',true);" >
      <div class="avatar" :style="styleShadow">
        <svg ref="svgAvatar"> </svg>
      </div>
      <div class="commentWrapper" v-if="hideMessage">
        <div class="nameWrapper">
          <div class="name" :style="{color: userNameColor}">{{name}}</div>
          <span class="dot">•</span>
          <a class="time" :title="getTime">{{getTimeDiff}}</a>
          <div v-show="showHideBar || wrapperSize < 1024" @click="hideMessage=false" class="expand">
            <span title="Show Comment">+</span>
          </div>
          <span v-show="!showHideBar && ! wrapperSize < 1024" style="width:22px;"></span>
        </div>
        <div class="hiddenMessage"><i>[ Message is hidden. ]</i></div>
      </div>
      <div class="commentWrapper" v-show="!hideMessage">
        <div class="nameWrapper" v-show="!beforeUpdate">
          <div class="name" :style="{color: userNameColor}">{{name}}</div>
          <span class="dot">•</span>
          <span class="time" :title="getTime">{{getTimeDiff}}</span>
          <div v-show="showHideBar || wrapperSize < 1024" @click="hideMessage=true" class="expand">
            <span title="Hide Comment">−</span>
          </div>
          <span v-show="!showHideBar && !wrapperSize < 1024" style="width:22px;"></span>
        </div>
        <div class="comment" v-show="!beforeUpdate" ref="comment" :style="{background: commentBackgroundColor, color: commentTextColor}">{{filteredComment}}</div>
        <div class="commentBox" key="commentBox" v-show="beforeUpdate">
          <div class="userName" :style="{color: userNameColor}">{{name}}</div>
          <textarea
            name="addUpdate"
            class="addComment" 
            ref="addUpdate" 
            placeholder="Update message"
            @keyup="resize($event,true)"
            v-model="updateMessage"
            :style="{background:commentBackgroundColor, color: commentTextColor, height: updateHeight+'px'}"
            spellcheck="false"
            aria-label="Add Comment"
          ></textarea>
          <button aria-label="Update" v-if="requestLoading"><div class="requestLoading"></div></button>
          <button @click="update" aria-label="Update" v-else>Update</button>
          <div class="remainingLetter" :style="{ background: remainigUpdateLetter<0 ? 'rgba(255, 82, 82,1)' :'rgba(42, 94, 190, 1)'}">
            <span>{{remainigUpdateLetter}}</span>
          </div>
          <transition name="fade">
            <div class="alert" v-if="alert" :class="alertClass" :key="alertClass" style="align-self:start; margin-top: -5px; margin-bottom: 7px;">
              <div>{{alertMessage}}</div>
            </div>
          </transition>
        </div>
        <div class="reply" v-show="beforeUpdate">
          <div @click="beforeUpdate = false" style="margin-top:-8px;">Newer mind</div>
        </div>
        <div class="reply" v-show="!beforeUpdate">
          <div @click="handleBeforeReply()">{{ beforeReply ? 'Newer mind' : 'Reply'}}</div>
          <span v-if="replys.length!=0" class="dot">•</span>
          <div v-if="replys.length!=0" @click="showReply">{{ showReplies ? 'Hide replies' : 'Show replies ['+replys.length+']'}}</div>
          <span v-if="userId==nodeUserId || isAdmin" class="dot">•</span>
          <div v-if="userId==nodeUserId || isAdmin" @click=" handleBeforeUpdate();">Update</div>
          <span v-if="userId==nodeUserId || isAdmin" class="dot">•</span>
          <div class="delete" v-if="userId==nodeUserId || isAdmin">
            <div @click="handleBeforeDelete();" class="deleteText">Delete</div>
            <transition name="popUp">
              <div class="deletePrompt" v-if="beforeDelete">
                <label>Are you sure?</label>
                <button aria-label="Update" v-if="requestDelete"><div class="requestLoading"></div></button>
                <button aria-label="Yes" class="yesPrompt" @click="deleteComment();" v-else>Yes</button>
                <button aria-label="No" class="noPrompt" v-if="requestDelete">No</button>
                <button aria-label="No" class="noPrompt" @click="beforeDelete=false" v-else>No</button>
              </div>
            </transition>
          </div>
        </div>
        <div v-show="beforeReply">
          <div class="addComment" key="addComment">
            <div class="avatar" :style="styleShadow">
              <svg ref="svgReplyAvatar"> </svg>
            </div>
            <div class="commentBox" key="commentBox" v-show="!showSignPanel && !auth || auth ">
              <div class="userName" :style="{color: userNameColor}">{{userName}}</div>
              <textarea 
                name="addReply" 
                class="addComment" 
                ref="addReply" 
                placeholder="Add new reply" 
                v-model="replyMessage"
                @keyup="resize($event)" 
                :style="{background:commentBackgroundColor, color: commentTextColor}"
                spellcheck="false"
                aria-label="Add Reply" 
              ></textarea>
              <button aria-label="Reply" v-if="requestLoading"><div class="requestLoading"></div></button>
              <button @click="reply" aria-label="Reply" v-else>Reply</button>
              <div class="remainingLetter" :style="{ background: remainigLetter<0 ? 'rgba(255, 82, 82,1)' :'rgba(42, 94, 190, 1)'}"><span>{{remainigLetter}}</span></div>        
              <transition name="fade">
                <div class="alert" v-if="alert" :class="alertClass" :key="alertClass" style="align-self:start; margin-top: -5px;">
                  <div>{{alertMessage}}</div>
                </div>
              </transition>
            </div>
            <sign-wrapper 
              v-if="showSignPanel && !auth" 
              :baseURL="baseURL" 
              :apiKey= "apiKey"
              :maxUserNameLength="maxUserNameLength" 
              v-on:sign-user="signUser"
            ></sign-wrapper>
          </div>
        </div>
        <transition-group 
          appear 
          name="fade" 
          mode="out-in"> 
          <app-wrapper 
            v-show="showReplies"
            v-for="(reply,index) in replys"
            v-if="index < limit"
            :baseURL="baseURL"
            :apiKey= "apiKey"
            :show="showProp"
            :deleted="deletedProp"
            :maxUserNameLength="maxUserNameLength"
            :maxCommentLength="maxCommentLength"
            :maxShowingDepth ="maxShowingDepth"
            :maxLineLimit="maxLineLimit"
            :id="reply.id"
            :timestamp="reply.timestamp"
            :lineCount="reply.lineCount"
            :nodeUserId="reply.user_id"
            :nodeName="nodeName" 
            :name="reply.name" 
            :comment="reply.comment" 
            :replies="reply.reply"
            :depth="reply.depth"
            :key="reply.id"
            v-on:delete-row="deleteFromParent(index)"
            v-on:sign-user="signUser"
            v-on:close-hide-bar="closeHideBar"
            :auth="auth"
            :userId="userId"
            :idToken="idToken"
            :isAdmin="isAdmin"
            :userName="userName"
            :commentBackgroundColor="commentBackgroundColor"
            :commentTextColor="commentTextColor"
            :userNameColor="userNameColor"
            :depthLength="depthLength+1"
            :wrapperSize="wrapperSize"
          ></app-wrapper>
        </transition-group>
        <div class="updateLimit" @click="updateLimit" v-if="limit < replys.length && showReplies">
          <span class="limit">Show more reply</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Sign from "./Sign.vue";

  export default {
    name: "app-wrapper",
    props: {
      baseURL: {
        type: String,
        required: true
      },
      apiKey: {
        type: String,
        required: true
      },
      nodeName: {
        type: String,
        required: true
      },
      initialMessageLimit: {
        type: String,
        default: "10"
      },
      maxLineLimit: {
        type: String,
        default: "40"
      },
      maxShowingDepth: {
        type: String,
        default: "5"
      },
      maxCommentLength: {
        type: String,
        default: "1000"
      },
      maxUserNameLength: {
        type: String,
        default: "30"
      },
      name: String,
      comment: String,
      replies: {
        type: Object,
        default: function() {
          return {};
        }
      },
      auth: Boolean,
      id: String,
      timestamp: String,
      lineCount: Number,
      depth: String,
      depthLength: Number,
      idToken: String,
      userId: String,
      isAdmin: {
        type: Boolean,
        default: false
      },
      userName: String,
      nodeUserId: String,
      commentBackgroundColor: {
        teype: String,
        default: "white"
      },
      commentTextColor: {
        teype: String,
        default: "#1d2129"
      },
      userNameColor: {
        teype: String,
        default: "rgb(6, 177, 183)"
      },
      show: {
        type: Boolean,
        default: false
      },
      deleted: {
        type: Boolean,
        default: false
      },
      wrapperSize: String
    },
    data() {
      return {
        showSignPanel: false,
        showReplies: false,
        showProp: this.show,
        showHideBar: false,
        deletedProp: this.deleted,
        replied: false,
        beforeReply: false,
        beforeUpdate: false,
        beforeDelete: false,
        filteredComment: "",
        updateHeight: 0,
        svgAvatarCheck: false,
        date: "",
        replyMessage: "",
        updateMessage: "",
        replys: [],
        mods: [],
        depthFromReplies: "",
        styleShadow: {
          boxShadow:
            "2px -2px rgba(" +
            Math.round(Math.random() * 244) +
            "," +
            Math.round(Math.random() * 244) +
            "," +
            Math.round(Math.random() * 244) +
            ",0.6)"
        },
        limit: parseInt(this.initialMessageLimit),
        alert: false,
        alertMessage: "",
        alertClass: "",
        hideMessage: false,
        outerWidth: 0,
        requestLoading: false,
        requestDelete: false,
        timeOutHolder: null
      };
    },
    methods: {
      signUser(data) {
        this.$emit("sign-user", data);
      },
      closeHideBar(bool) {
        this.showHideBar = bool;
      },
      updateLimit() {
        this.limit += parseInt(this.initialMessageLimit);
      },
      resize(event, from) {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
        if (from) {
          if (
            this.updateMessage == "" &&
            this.$refs.addUpdate.style.height != 32
          ) {
            this.$refs.addUpdate.style.height = 32 + "px";
          }
        } else {
          if (this.replyMessage == "" && this.$refs.addReply.style.height != 32) {
            this.$refs.addReply.style.height = 32 + "px";
          }
        }
      },
      handleBeforeReply() {
        this.clearAlert();
        this.beforeReply = !this.beforeReply;
        if (!this.svgAvatarCheck) {
          let a,
            b,
            c,
            d = 0;
          for (let i = 0; i < 10; i++) {
            a = Math.floor(Math.random() * (35 - 10)) + 10;
            b = Math.floor(Math.random() * (35 - 5)) + 5;
            c = Math.floor(Math.random() * (35 - 5)) + 5;
            d = Math.floor(Math.random() * (5 - 0)) + 0;
            this.$refs.svgReplyAvatar.innerHTML +=
              "<circle cx=" +
              (Math.floor(Math.random() * (35 - 5)) + 5) +
              " cy=" +
              (Math.floor(Math.random() * (35 - 5)) + 5) +
              " r='" +
              Math.round(Math.random() * 15) +
              "' fill='rgba(" +
              Math.round(Math.random() * 244) +
              "," +
              Math.round(Math.random() * 244) +
              "," +
              Math.round(Math.random() * 244) +
              "," +
              Math.random() +
              ")'> <animate  attributeName=cx attributeType=XML dur=" +
              (Math.floor(Math.random() * (7 - 3)) + 3) +
              "s values='" +
              a +
              " ; " +
              b +
              " ; " +
              a +
              " ; " +
              c +
              " ; " +
              a +
              "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' repeatCount=indefinite></animate><animate attributeName=cy attributeType=XML dur=" +
              (Math.floor(Math.random() * (7 - 3)) + 3) +
              "s values='" +
              c +
              "; " +
              a +
              "; " +
              b +
              " ; " +
              a +
              " ; " +
              c +
              "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' repeatCount=indefinite></animate><animate attributeName=r values='" +
              d +
              " ; " +
              Math.random() * 15 +
              " ; " +
              Math.random() * 15 +
              " ; " +
              Math.random() * 15 +
              " ; " +
              d +
              "' keyTimes='0 ; 0.25 ; 0.5 ; 0.75 ; 1' dur='" +
              (Math.floor(Math.random() * (7 - 3)) + 3) +
              "s' repeatCount=indefinite></animate></circle>";
          }
          this.svgAvatarCheck = true;
        }
        this.$nextTick(() => {
          this.$refs.addReply.focus();
        });
      },
      reply() {
        if (this.auth) {
          if (this.filterNewComment.length != 0) {
            this.requestLoading = true;
            let replyObj = {
              name: this.filterUserName,
              comment: this.filterNewComment,
              user_id: this.userId,
              timestamp: Date.now().toString(),
              lineCount: this.filterNewCommentLineCount
            };
            axios
              .post(
                this.baseURL +
                  "/commentsGrid/" +
                  this.nodeName +
                  "/replys/" +
                  this.id +
                  ".json" +
                  "?auth=" +
                  this.idToken,
                replyObj
              )
              .then(res => {
                replyObj.id = res.data.name;
                const mods = this.mods;
                const key = this.nodeUserId;
                let obj = {};
                obj[key] = true;
                for (let i = 0, len = mods.length; i < len; i++) {
                  for (let key in mods[i]) {
                    let key2 = key;
                    obj[key2] = true;
                  }
                }
                let repliedObj = {
                  replied: false,
                  user_id: this.userId,
                  mods: obj
                };
                axios
                  .put(
                    this.baseURL +
                      "/commentsGrid/" +
                      this.nodeName +
                      "/replys/" +
                      replyObj.id +
                      ".json" +
                      "?auth=" +
                      this.idToken,
                    repliedObj
                  )
                  .then(res => {
                    replyObj.depth =
                      "commentsGrid/" +
                      this.nodeName +
                      "/replys/" +
                      this.id +
                      "/" +
                      replyObj.id;
                    this.replys.splice(0, 0, replyObj);
                    this.replyMessage = "";
                    this.$refs.addReply.style.height = 32 + "px";
                    this.beforeReply = !this.beforeReply;
                    if (!this.replied) {
                      this.replied = true;
                      if (!this.showReplies) {
                        this.showReplies = !this.showReplies;
                      }
                    }
                    this.clearAlert();
                  })
                  .catch(err => this.setAlert("Unauthorized!\n", "fail"));
              })
              .catch(err => {
                this.setAlert("İnvalid comment or comment deleted!\n", "fail");
                setTimeout(() => {
                  this.$emit("delete-row");
                }, 5000);
              });
          } else {
            this.setAlert("You can't send empty comment!\n", "fail");
          }
        } else {
          this.showSignPanel = true;
        }
      },
      handleBeforeUpdate() {
        this.beforeReply = false;
        this.beforeUpdate = true;
        this.updateMessage = this.filteredComment;
        this.$refs.addUpdate.style.height = this.updateHeight + "px";
        this.$nextTick(() => {
          this.$refs.addUpdate.focus();
        });
      },
      update() {
        if (this.auth) {
          this.requestLoading = true;
          if (!this.isAdmin) {
            if (this.filterNewUpdate.length != 0) {
              let replyObj = {
                name: this.filterUserName,
                comment: this.filterNewUpdate,
                user_id: this.userId,
                lineCount: this.filterNewUpdateLineCount
              };
              axios
                .patch(
                  this.baseURL +
                    "/" +
                    this.depth +
                    ".json" +
                    "?auth=" +
                    this.idToken,
                  replyObj
                )
                .then(res => {
                  this.clearAlert();
                  this.filteredComment = this.filterNewUpdate;
                  this.afterUpdate();
                  setTimeout(() => {
                    this.updateMessage = "";
                  }, 3);
                  this.beforeUpdate = false;
                })
                .catch(err => {
                  this.setAlert("İnvalid comment or comment deleted!\n", "fail");
                  setTimeout(() => {
                    this.$emit("delete-row");
                  }, 5000);
                });
            } else {
              this.setAlert("You can't send empty comment!\n", "fail");
            }
          } else {
            if (this.filterNewUpdate.length != 0) {
              let replyObj = {
                comment: this.filterNewUpdate,
                lineCount: this.filterNewUpdateLineCount
              };
              axios
                .patch(
                  this.baseURL +
                    "/" +
                    this.depth +
                    ".json" +
                    "?auth=" +
                    this.idToken,
                  replyObj
                )
                .then(res => {
                  this.clearAlert();
                  this.filteredComment = this.filterNewUpdate;
                  this.afterUpdate();
                  setTimeout(() => {
                    this.updateMessage = "";
                  }, 3);
                  this.beforeUpdate = false;
                })
                .catch(err => {
                  this.setAlert("İnvalid comment or comment deleted!\n", "fail");
                  setTimeout(() => {
                    this.$emit("delete-row");
                  }, 5000);
                });
            } else {
              this.setAlert("You can't send empty comment!\n", "fail");
            }
          }
        } else {
          this.showSignPanel = true;
        }
      },
      showReply() {
        this.replied = false;
        this.showReplies = !this.showReplies;
        this.showProp = !this.showProp;
      },
      handleBeforeDelete() {
        clearTimeout(this.timeOutHolder);
        this.beforeDelete = !this.beforeDelete;
        this.timeOutHolder = setTimeout(() => {
          this.beforeDelete = false;
        }, 5000);
      },
      deleteComment() {
        this.requestDelete = true;
        this.deletedProp = true;
        const splt = this.depth.split("/");
        const changeDept1 =
          splt[0] + "/" + splt[1] + "/" + splt[2] + "/" + splt[splt.length - 1];
        axios
          .delete(
            this.baseURL + "/" + changeDept1 + ".json" + "?auth=" + this.idToken
          )
          .catch(err => console.log(err));
        const changedDepth2 = this.depth.replace("/comments/", "/replys/");
        axios
          .get(this.baseURL + "/" + changedDepth2 + ".json")
          .then(res => {
            const data = res.data;
            for (let key in data) {
              if (key.startsWith("-")) {
                axios
                  .delete(
                    this.baseURL +
                      "/commentsGrid/" +
                      this.nodeName +
                      "/replys/" +
                      key +
                      ".json" +
                      "?auth=" +
                      this.idToken
                  )
                  .catch(err => console.log(err));
              }
            }
          })
          .catch(err => console.log(err));
        axios
          .delete(
            this.baseURL + "/" + changedDepth2 + ".json" + "?auth=" + this.idToken
          )
          .then(res => {
            this.replys = [];
            this.$emit("delete-row");
          })
          .catch(err => console.log(err));
      },
      deleteFromParent(index) {
        this.replys.splice(index, 1);
      },
      setAlert(message, style, type) {
        type == "append"
          ? (this.alertMessage += message)
          : (this.alertMessage = message);
        this.alertClass = style;
        this.alert = true;
        this.requestLoading = false;
        setTimeout(() => {
          this.clearAlert();
        }, 5000);
      },
      clearAlert() {
        this.requestLoading = false;
        this.alertMessage = "";
        this.alertClass = "";
        this.alert = false;
      },
      afterUpdate() {
        if (this.filterNewUpdateLineCount > +this.maxLineLimit) {
          this.filteredComment = "";
          let splt = this.updateMessage.split("\n");
          for (let i = 0; i < splt.length; i++) {
            if (i < +this.maxLineLimit) {
              this.filteredComment += splt[i] + "\n";
            } else {
              this.filteredComment += splt[i] + " ";
            }
          }
        }
      }
    },
    computed: {
      viewWidth() {
        return this.outerWidth;
      },
      remainigLetter() {
        return +this.maxCommentLength - this.replyMessage.length;
      },
      remainigUpdateLetter() {
        return +this.maxCommentLength - this.updateMessage.length;
      },
      getTimeDiff() {
        const date1 = new Date(+this.timestamp);
        const date2 = new Date(Date.now());
        const yearDiff = Math.abs(date2.getFullYear() - date1.getFullYear());
        const monthDiff = Math.abs(date2.getMonth() - date1.getMonth());
        const dayDiff = Math.abs(date2.getDate() - date1.getDate());
        const hourDiff = Math.abs(date2.getHours() - date1.getHours());
        const minuteDiff = Math.abs(date2.getMinutes() - date1.getMinutes());

        return yearDiff != 0 && yearDiff == 1
          ? "a year ago"
          : yearDiff > 1
            ? yearDiff + " years ago"
            : monthDiff != 0 && monthDiff == 1
              ? "a month ago"
              : monthDiff > 1
                ? monthDiff + " months ago"
                : dayDiff != 0 && dayDiff == 1
                  ? "a day ago"
                  : dayDiff > 1
                    ? dayDiff + " days ago"
                    : hourDiff != 0 && hourDiff == 1
                      ? "a hour ago"
                      : hourDiff > 1
                        ? hourDiff + " hours ago"
                        : minuteDiff != 0 && minuteDiff == 1
                          ? "a minute ago"
                          : minuteDiff > 1
                            ? minuteDiff + " minutes ago"
                            : "seconds ago";
      },
      getTime() {
        const date = new Date(+this.timestamp);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        };
        return new Intl.DateTimeFormat("en-Us", options).format(date);
      },
      filterUserName() {
        return this.userName
          .replace(/^ +/g, "")
          .replace(/ +/g, " ")
          .replace(/ +$/g, "");
      },
      filterNewComment() {
        return this.replyMessage
          .replace(/^ +/g, "")
          .replace(/^\n+/g, "")
          .replace(/(\n{2,})+/g, "\n\n")
          .replace(/\n+$/g, "")
          .replace(/( {30,})+/g, " ")
          .replace(/ +$/g, "");
      },
      filterNewCommentLineCount() {
        return this.filterNewComment.split("\n").length;
      },
      filterNewUpdate() {
        return this.updateMessage
          .replace(/^ +/g, "")
          .replace(/^\n+/g, "")
          .replace(/(\n{2,})+/g, "\n\n")
          .replace(/\n+$/g, "")
          .replace(/( {30,})+/g, " ")
          .replace(/ +$/g, "");
      },
      filterNewUpdateLineCount() {
        return this.updateMessage.split("\n").length;
      }
    },
    watch: {
      show() {
        let updateHeight = this.$refs.comment.clientHeight;
        if (updateHeight != 0) {
          this.updateHeight = updateHeight + 14;
        }
      },
      deleted() {
        this.deletedProp = true;
        const splt = this.depth.split("/");
        const changeDept1 =
          splt[0] + "/" + splt[1] + "/" + splt[2] + "/" + splt[splt.length - 1];
        axios
          .get(this.baseURL + "/" + changeDept1 + ".json")
          .then(res => {
            const data = res.data;
            for (let key in data) {
              if (key.startsWith("-")) {
                axios
                  .delete(
                    this.baseURL +
                      "/commentsGrid/" +
                      this.nodeName +
                      "/replys/" +
                      key +
                      ".json" +
                      "?auth=" +
                      this.idToken
                  )
                  .then(res => {
                    this.$emit("delete-row");
                    this.replys = [];
                  })
                  .catch(err => console.log(err));
              }
            }
          })
          .catch(err => console.log(err));
      }
    },
    components: {
      signWrapper: Sign
    },
    created() {
      this.depthFromReplies = this.depth + "/" + this.id + "/reply";
      if (this.depthLength < +this.maxShowingDepth) {
        this.showReplies = true;
      }
      axios
        .get(
          this.baseURL +
            "/commentsGrid/" +
            this.nodeName +
            "/replys/" +
            this.id +
            ".json"
        )
        .then(res => {
          const data = res.data;
          for (let key in data) {
            if (key.startsWith("-")) {
              let reply = data[key];
              reply.id = key;
              reply.depth =
                "commentsGrid/" +
                this.nodeName +
                "/replys/" +
                this.id +
                "/" +
                reply.id;
              this.replys.unshift(reply);
            } else if (key.startsWith("mods")) {
              let mod = data[key];
              this.mods.push(mod);
            }
          }
        })
        .catch(err => console.log(err));
      if (
        this.lineCount > +this.maxLineLimit ||
        this.lineCount != this.comment.split("\n").length
      ) {
        let splt = this.comment.split("\n");
        for (let i = 0; i < splt.length; i++) {
          if (i < +this.maxLineLimit) {
            this.filteredComment += splt[i] + "\n";
          } else {
            this.filteredComment += splt[i] + " ";
          }
        }
      } else {
        this.filteredComment = this.comment;
      }
    },
    mounted() {
      this.$nextTick(() => {
        for (let i = 0; i < 10; i++) {
          this.$refs.svgAvatar.innerHTML +=
            "<circle cx=" +
            (Math.floor(Math.random() * (35 - 5)) + 5) +
            " cy=" +
            (Math.floor(Math.random() * (35 - 5)) + 5) +
            " r='" +
            Math.round(Math.random() * 15) +
            "' fill='rgba(" +
            Math.round(Math.random() * 244) +
            "," +
            Math.round(Math.random() * 244) +
            "," +
            Math.round(Math.random() * 244) +
            "," +
            Math.random() +
            ")'> </circle>";
        }
        let updateHeight = this.$refs.comment.clientHeight;
        if (updateHeight != 0) {
          this.updateHeight = updateHeight + 13;
        }
      });
    }
  };
</script>

<style scoped>
  .comments {
    font-family: "Roboto", sans-serif;
    overflow: hidden;
    border-radius: 4px;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .comments>>>.wrapper {
    display: grid;
    grid-template-columns: 0.001fr 1fr;
    grid-auto-rows: minmax(0, auto);
    grid-column-gap: 10px;
    padding-top: 15px;
  }
  .comments>>>.commentWrapper {
    display: grid;
    grid-auto-rows: minmax(0, auto);
    grid-auto-columns: minmax(-webkit-min-content, -webkit-max-content);
    grid-auto-columns: minmax(min-content, max-content);
    grid-auto-columns: minmax(-moz-min-content, -moz-max-content);
    grid-gap: 10px;
  }
  .comments>>>.hiddenMessage {
    color: #ffc107;
    word-break: break-word;
    font-size: 13px;
  }
  .comments>>>.nameWrapper {
    display: grid;
    grid-template-columns: repeat(4, 0.001fr);
    grid-auto-columns: minmax(0, auto);
    grid-column-gap: 5px;
    line-height: 13px;
    white-space: nowrap;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .comments>>>.nameWrapper > .name {
    color: rgb(6, 177, 183);
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
  .comments>>>.nameWrapper > .time {
    cursor: help;
    font-size: 13px;
    color: #92b1b3;
    white-space: nowrap;
    text-decoration: none;
  }
  .comments>>>.nameWrapper > .expand {
    cursor: pointer;
    display: grid;
    width: 22px;
    height: 13px;
    border-radius: 3px;
    color: #ccd4d8;
    box-shadow: inset 0 0 0 2px rgba(204, 212, 216, 1);
    transition: color linear 0.1s;
    -moz-transition: color linear 0.1s;
    -webkit-transition: color linear 0.1s;
  }
  .comments>>>.nameWrapper > .expand:hover {
    color: #2196f3;
  }
  .comments>>>.nameWrapper > .expand > span {
    align-self: center;
    justify-self: center;
    font-size: 20px;
  }
  .comments>>>.comment {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    background: #fff;
    color: #1d2129;
    font-size: 13px;
    line-height: 16px;
    font-kerning: normal;
    padding: 8px 10px;
    border-radius: 18px;
    border: 1px solid rgba(204, 212, 216, 0.8);
    min-width: -webkit-min-content;
    min-width: min-content;
    min-width: -moz-min-content;
    max-width: -webkit-max-content;
    max-width: max-content;
    max-width: -moz-max-content;
  }
  .comments>>>.reply {
    display: grid;
    grid-template-columns: repeat(7, 0.001fr);
    grid-auto-columns: minmax(0, auto);
    grid-auto-rows: minmax(0, auto);
    grid-column-gap: 5px;
    font-size: 13px;
    white-space: nowrap;
    color: #92b1b3;
    margin-top: -8px;
    margin-left: 10px;
    transition: color linear 0.1s;
    -moz-transition: color linear 0.1s;
    -webkit-transition: color linear 0.1s;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .comments>>>.reply > div {
    cursor: pointer;
  }
  .comments>>>.reply > div:hover {
    color: #2196f3;
  }
  .comments>>>.reply > .delete {
    display: grid;
    box-sizing: border-box;
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
  }
  .comments>>>.reply > .delete:hover {
    color: #ff5252;
  }
  .comments>>>.reply > .delete > .deleteText:hover {
    color: #ff5252;
  }
  .comments>>>.reply > .delete > .deletePrompt {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(0, auto);
    grid-gap: 3px;
    color: #ff5252;
    box-sizing: border-box;
    background-color: #fff;
    padding: 3px 13px;
    border-radius: 4px;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: max-content;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    border: 1px solid rgba(204, 212, 216, 0.8);
    margin-top: -60px;
    margin-left: -24px;
    z-index: 999;
  }
  .comments>>>.reply > .delete > .deletePrompt > label {
    grid-column: 1/3;
    grid-row: 2;
    font-weight: 700;
    margin-left: -7px;
  }
  .comments>>>.reply > .delete > .deletePrompt > button {
    grid-row: 1;
    font-size: 11px;
    font-family: "Roboto", sans-serif;
    background-color: rgba(42, 94, 190, 1);
    color: #fff;
    font-size: 12px;
    line-height: 15px;
    border-radius: 18px;
    border: none;
    cursor: pointer;
    outline: none;
    transition: linear 0.1s all;
    -moz-transition: linear 0.1s all;
    -webkit-transition: linear 0.1s all;
  }
  .comments>>>.reply > .delete > .deletePrompt > .yesPrompt {
    border: 1px solid rgba(42, 94, 190, 0.9);
    background-color: rgba(42, 94, 190, 0.9);
    color: fff;
  }
  .comments>>>.reply > .delete > .deletePrompt > .yesPrompt:hover {
    border: 1px solid #ff5252;
    background-color: #ff5252;
    color: #fff;
  }
  .comments>>>.reply > .delete > .deletePrompt > .noPrompt {
    border: 1px solid rgba(42, 94, 190, 0.9);
    background-color: #fff;
    color: rgba(42, 94, 190, 0.9);
  }
  .comments>>>.reply > .delete > .deletePrompt > .noPrompt:hover {
    border: 1px solid rgba(42, 94, 190, 0.9);
    background-color: rgba(42, 94, 190, 0.9);
    color: #fff;
  }
  .comments>>>.popUp-enter-active {
    animation: pop-up 0.2s ease-out forwards;
  }
  .comments>>>.popUp-leave-active {
    animation: pop-out 0.2s ease-out forwards;
  }
  @keyframes pop-up {
    from {
      margin-top: -45px;
      opacity: 0;
    }
    to {
      margin-top: -60px;
      opacity: 1;
    }
  }
  @keyframes pop-out {
    from {
      margin-top: -60px;
      opacity: 1;
    }
    to {
      opacity: 0;
      margin-top: -45px;
    }
  }
</style>
