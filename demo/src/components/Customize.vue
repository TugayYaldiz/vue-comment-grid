<template>
  <div class="app" @click.self="clearPickers()">
    <div class="wrapper"  @click.self="clearPickers()">
    <div class="innerWrapper" @click.self="clearPickers()">
    <transition 
      @enter="enter"
      @leave="leave"
      mode="out-in"
      :css="false">
      <div class="col colText" id="baseUrl" v-if="showBaseURLPicker" key="showBaseURLPicker">
        <span class="custom">Base url of your firebase app.</span>
        <span class="reminder">
          <span class="line"></span><span class="dot">•</span><span class="line"></span>
          <span class="reminderText">! Remember dont add " / " to end of your firebase url. See <a target="_blank" class="link" href="https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/get-base-url-api-key.md">docs.</a></span>
        </span>
      </div>
      <div class="col colText" id="apiKey" v-if="showaApiKeyPicker" key="showaApiKeyPicker">
        <span class="custom">API key of your Firebase app.</span>
        <span class="reminder">
          <span class="line"></span><span class="dot">•</span><span class="line"></span>
          <span class="reminderText"> You can find firebase API key in web setup under authentication menu from Firebase console. See <a target="_blank" class="link" href="https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/get-base-url-api-key.md">docs.</a></span>
        </span>
      </div>
      <div class="col colText" id="nodeName" v-if="showNodeNamePicker" key="showNodeNamePicker">
        <span class="custom">The node name you created in firebase.</span>
        <span class="reminder">
          <span class="line"></span><span class="dot">•</span><span class="line"></span>
          <span class="reminderText">See <a target="_blank" class="link" href="https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/creating-database-node-name.md">docs.</a></span>
        </span>
      </div>
      <div class="col colText" id="maxUserNameLength" v-if="showMaxUserNameLengthPicker" key="showMaxUserNameLengthPicker">
        <span class="custom">Set maximum user name length.</span>
        <input v-model.number="maxUserLen" type="number" step="1" ref="maxUserLen"/>
        <span class="reminder">
          <span class="line"></span><span class="dot">•</span><span class="line"></span>
          <span class="reminderText">! Remember if you change this value then you need to change values from firebase rules too. See <a target="_blank" class="link" href="https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/updating-name-or-comment-length.md">docs.</a></span>
        </span>
      </div>
      <div class="col colText" id="maxCommentLength" v-if="showaMaxCommentLengthPicker" key="showaMaxCommentLengthPicker">
        <span class="custom">Set maximum character length for comments.</span>
        <input v-model.number="maxCommentLen" type="number" step="1" ref="maxCommentLen"/>
        <span class="reminder">
          <span class="line"></span><span class="dot">•</span><span class="line"></span>
          <span class="reminderText">! Remember if you change this value then you need to change values from firebase rules too. See <a target="_blank" class="link" href="https://github.com/TugayYaldiz/vue-comment-grid/blob/master/docs/updating-name-or-comment-length.md">docs.</a></span>
        </span>
      </div>
      <div class="col colText" id="initialMessageLimit" v-if="showInitialMessageLimitPicker" key="showInitialMessageLimitPicker">
        <span class="custom">Set maximum message limit to shown at first load.</span>
        <input v-model.number="iniMesLim" type="number" step="1" ref="iniMesLim"/>
        <span class="reminder">
          <span class="line"></span><span class="dot">•</span><span class="line"></span>
          <span class="reminderText">! When 'Show more comment' is clicked, the number of comment impressions will increase by this number.</span>
        </span>
      </div>
      <div class="col colText" id="maxLineLimit" v-if="showMaxLineLimitPicker" key="showMaxLineLimitPicker">
        <span class="custom">Set line break limit.</span>
        <input v-model.number="maxLineLim" type="number" step="1" ref="maxLineLim"/>
        <span class="reminder">
          <span class="line"></span><span class="dot">•</span><span class="line"></span>
          <span class="reminderText">! Exceeded line breaks will be converted to spaces.</span>
        </span>
      </div>
      <div class="col colText" id="maxShowingDepth" v-if="showMaxShowingDepthPicker" key="showMaxShowingDepthPicker">
        <span class="custom">Set maximum reply depth to shown.</span>
        <input v-model.number="maxShowDep" type="number" step="1" ref="maxShowDep"/>
      </div>
      <chrome-picker class="col2" id="bgColor" :value="bgColor" @input="updateBg" v-if="showBgPicker" key="updateBg"></chrome-picker>
      <chrome-picker class="col2" id="commentBgColor" :value="commentBgColor" @input="updateCommentBg" v-if="showCommentBgPicker" key="commentBgColor"></chrome-picker>
      <chrome-picker class="col2" id="commentTxtColor" :value="commentTxtColor" @input="updateCommentTxt" v-if="showCommentTxtBgPicker" key="commentTxtColor"></chrome-picker>
      <chrome-picker class="col2" id="userNamColor" :value="userNamColor" @input="updateUserNamC" v-if="showNameBgPicker" key="userNamColor"></chrome-picker>
      <div class="col colText" id="copied" v-if="copied" key="copied">
        <span class="custom">Copied to the clipboard.</span>      
      </div>
    </transition>
    <div class="loader code" v-if="loading" style="width:335px !important; height:226px !important;">
      <svg width="150" height="150" id="loader">
        <circle fill="red">
          <animate attributeName="cx" values="15;135;15" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="r" values="15;7.5;2;7.5;15" keyTimes="0;0.25;0.5;0.75;1" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="135;15;135" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle fill="green">
          <animate attributeName="cx" values="135;15;135" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="r" values="15;7.5;2;7.5;15" keyTimes="0;0.25;0.5;0.75;1" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="15;135;15" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle fill="blue">
          <animate attributeName="cx" values="15;135;15" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="r" values="15;7.5;2;7.5;15" keyTimes="0;0.25;0.5;0.75;1" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="15;135;15" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle fill="orange">
          <animate attributeName="cx" values="135;15;135" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="r" values="15;7.5;2;7.5;15" keyTimes="0;0.25;0.5;0.75;1" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="135;15;135" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;" dur="6s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
    <pre class="code"  @click.self="clearPickers()" v-else ref="code">
    <span class="plain"><</span><span style="display:none">\</span><span class="tag">comment-grid</span>
        <span class="pickerWrapper" @click="show('sbup', !showBaseURLPicker)">baseURL=<span class="string">"{{baseURL}}"</span></span>
        <span class="pickerWrapper" @click="show('sap', !showaApiKeyPicker)">apiKey=<span class="string">"{{apiKey}}"</span></span>
        <span class="pickerWrapper" @click="show('snp', !showNodeNamePicker)">nodeName=<span class="string">"{{nodeName}}"</span></span>
        <span class="pickerWrapper" @click="show('smul', !showMaxUserNameLengthPicker)">maxUserNameLength=<span class="string">{{'"'+maxUserLen+'"'}}</span></span>
        <span class="pickerWrapper" @click="show('smclp', !showaMaxCommentLengthPicker)">maxCommentLength=<span class="string">{{'"'+maxCommentLen+'"'}}</span></span>
        <span class="pickerWrapper" @click="show('simp', !showInitialMessageLimitPicker)">initialMessageLimit=<span class="string">{{'"'+iniMesLim+'"'}}</span></span>
        <span class="pickerWrapper" @click="show('smlp', !showMaxLineLimitPicker)">maxLineLimit=<span class="string">{{'"'+maxLineLim+'"'}}</span></span>
        <span class="pickerWrapper" @click="show('smsp', !showMaxShowingDepthPicker)">maxShowingDepth=<span class="string">{{'"'+maxShowDep+'"'}}</span></span>
        <span class="pickerWrapper" @click="show('bgp', !showBgPicker)"><span class="littleBox" :style="{background: bgc}"></span>background=<span class="string">"{{bgc}}"</span></span>
        <span class="pickerWrapper" @click="show('ccp', !showCommentBgPicker)"><span class="littleBox" :style="{background: cbgc}"></span>commentBackgroundColor=<span class="string">"{{cbgc}}"</span></span>
        <span class="pickerWrapper" @click="show('ctcp', !showCommentTxtBgPicker)"><span class="littleBox" :style="{background: ctc}"></span>commentTextColor=<span class="string">"{{ctc}}"</span></span>
        <span class="pickerWrapper" @click="show('ncp', !showNameBgPicker)"><span class="littleBox" :style="{background: unc}"></span>userNameColor=<span class="string">"{{unc}}"</span><span class="plain">>
    </<span style="display:none">\</span><span class="tag">comment-grid</span><span class="plain">></span></span></span></pre>
      <div class="tip" v-if="!loading">Click props for changes, after changes you can just copy and paste the following code.</div>
      <div class="copy" v-if="!loading" @click="copy" @mouseenter="white = false" @mouseleave="white = true">
        <svg v-if="white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
        <g>
          <path style="fill:#FFFFFF;" d="M4.587,6.437C4.553,6.385,4.483,6.371,4.432,6.405L1.651,8.259C1.6,8.294,1.585,8.363,1.62,8.414
            c0.009,0.013,0.019,0.023,0.032,0.032L4.432,10.3c0.051,0.034,0.121,0.022,0.156-0.03c0.035-0.051,0.021-0.12-0.03-0.155
            c0-0.001-0.001-0.002-0.001-0.002l-2.641-1.76l2.641-1.761C4.608,6.558,4.623,6.488,4.587,6.437z"/>
          <path style="fill:#FFFFFF;" d="M19.994,6.66c-0.005-0.021-0.016-0.04-0.03-0.056l-3.272-3.272
            c-0.015-0.015-0.033-0.025-0.054-0.029C16.633,3.301,16.629,3.3,16.623,3.3c-0.004-0.001-0.009-0.002-0.013-0.004h-4.073
            L9.273,0.034h0C9.259,0.02,9.241,0.011,9.222,0.007c-0.005-0.001-0.01-0.002-0.015-0.003C9.203,0.002,9.198,0.002,9.193,0h-9.08
            C0.05,0,0,0.051,0,0.113l0,0v16.478c0,0.063,0.05,0.113,0.112,0.113c0,0,0,0,0,0h7.302v3.184C7.415,19.95,7.466,20,7.528,20
            c0,0,0,0,0,0h12.359C19.949,20,20,19.95,20,19.888l0,0V6.687c-0.002-0.007-0.003-0.013-0.004-0.019
            C19.995,6.665,19.995,6.663,19.994,6.66z M16.722,3.68l2.894,2.894h-2.894V3.68z M9.306,3.277V0.384l2.893,2.893H9.306z
            M0.225,16.479V0.226h8.856v3.07H7.528c-0.063,0-0.113,0.051-0.113,0.113l0,0v2.444l-2.459,4.92
            c-0.028,0.057-0.005,0.123,0.051,0.15c0.055,0.028,0.123,0.006,0.15-0.05l2.259-4.518v10.122H0.225z M7.64,19.774V3.521h8.857
            v3.165c0,0.062,0.049,0.111,0.111,0.111l0,0h3.166v12.977H7.64z"/>
          <path style="fill:#FFFFFF;" d="M15.567,9.701c-0.052-0.034-0.122-0.02-0.155,0.032s-0.02,0.12,0.03,0.155l2.642,1.759l-2.642,1.762
            c-0.052,0.033-0.065,0.103-0.032,0.155s0.104,0.066,0.156,0.032c0.001,0,0.001-0.001,0.001-0.001l2.781-1.854
            c0.051-0.035,0.065-0.104,0.03-0.156c-0.008-0.012-0.019-0.023-0.03-0.03L15.567,9.701z"/>
          <path style="fill:#FFFFFF;" d="M12.003,9.731c-0.034-0.051-0.104-0.065-0.155-0.03l0,0l-2.781,1.854
            c-0.051,0.034-0.065,0.103-0.031,0.154c0.008,0.013,0.019,0.024,0.031,0.032l2.781,1.854c0.051,0.034,0.121,0.021,0.155-0.029
            c0.036-0.052,0.022-0.122-0.029-0.157c-0.001,0-0.001,0-0.001,0l-2.641-1.762l2.641-1.759C12.023,9.854,12.037,9.783,12.003,9.731z
            "/>
          <path style="fill:#FFFFFF;" d="M14.994,9.077c-0.056-0.028-0.123-0.007-0.152,0.049l-2.472,4.943
            c-0.026,0.056-0.005,0.123,0.052,0.151c0.055,0.027,0.122,0.005,0.15-0.051l2.471-4.943C15.072,9.171,15.049,9.104,14.994,9.077z"
            />
        </g>
        </svg>
        <svg version="1.1" v-else id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
        <g>
          <g id="XMLID_1_">
            <g>
              <polygon style="fill:#FFFFFF;" points="9.31,0.38 12.2,3.28 9.31,3.28 			"/>
              <polygon style="fill:#FFFFFF;" points="19.62,6.57 16.72,6.57 16.72,3.68 			"/>
              <path style="fill:#FFFFFF;" d="M9.07,11.74l2.78,1.859C11.9,13.63,11.97,13.62,12,13.57c0.01-0.011,0.02-0.021,0.01-0.03
                l0.5,0.25l-0.14,0.28c-0.03,0.05,0,0.12,0.05,0.149c0.061,0.03,0.12,0.011,0.15-0.05l2.34-4.69l0.5,0.25
                c-0.03,0.06-0.021,0.12,0.03,0.16l2.64,1.76l-2.64,1.76c-0.051,0.03-0.061,0.1-0.03,0.149c0.03,0.061,0.1,0.07,0.16,0.04
                l2.779-1.859c0.03-0.021,0.051-0.05,0.051-0.09h1.369v8.119H7.64V11.65h1.38c0,0.02,0.01,0.04,0.02,0.06
                C9.04,11.72,9.05,11.73,9.07,11.74z"/>
              <path style="fill:#FFFFFF;" d="M11.97,13.41l-2.64-1.76l2.64-1.76c0.05-0.04,0.07-0.11,0.03-0.16c-0.03-0.05-0.1-0.06-0.15-0.03
                L9.07,11.56C9.04,11.58,9.02,11.61,9.02,11.65H7.64V3.52h8.86v3.17c0,0.06,0.05,0.11,0.11,0.11h3.159v4.851H18.4
                c0-0.021-0.011-0.04-0.021-0.061c-0.01-0.02-0.02-0.03-0.03-0.03L15.57,9.7c-0.051-0.03-0.12-0.02-0.16,0.03l-0.5-0.25l0.13-0.25
                c0.03-0.06,0.01-0.13-0.05-0.15c-0.05-0.03-0.12-0.01-0.15,0.05l-2.33,4.66l-0.5-0.25C12.03,13.48,12.02,13.43,11.97,13.41z"/>
              <path style="fill:#FFFFFF;" d="M4.56,6.59c0.05-0.03,0.06-0.1,0.03-0.15C4.55,6.38,4.48,6.37,4.43,6.41L1.65,8.26
                C1.6,8.29,1.59,8.36,1.62,8.41c0.01,0.02,0.02,0.03,0.03,0.04l2.78,1.85c0.05,0.03,0.12,0.02,0.16-0.03
                c0.03-0.05,0.02-0.12-0.03-0.16L1.92,8.35L4.56,6.59z M9.08,0.23V3.3H7.53c-0.06,0-0.11,0.05-0.11,0.11v2.44l-2.46,4.92
                c-0.03,0.06-0.01,0.13,0.05,0.15c0.05,0.03,0.12,0.01,0.15-0.05l2.26-4.51V16.48h-7.2V0.23H9.08z"/>
              <path d="M18.35,11.74L15.57,13.6c-0.061,0.03-0.13,0.021-0.16-0.04c-0.03-0.05-0.021-0.119,0.03-0.149l2.64-1.76l-2.64-1.76
                c-0.051-0.04-0.061-0.1-0.03-0.16c0.04-0.05,0.109-0.06,0.16-0.03l2.779,1.859c0.011,0,0.021,0.011,0.03,0.03
                c0.01,0.021,0.021,0.04,0.021,0.061C18.4,11.69,18.38,11.72,18.35,11.74z"/>
              <path d="M14.99,9.08c0.06,0.02,0.08,0.09,0.05,0.15l-0.13,0.25l-2.34,4.69c-0.03,0.061-0.09,0.08-0.15,0.05
                c-0.05-0.029-0.08-0.1-0.05-0.149l0.14-0.28l2.33-4.66C14.87,9.07,14.94,9.05,14.99,9.08z"/>
              <path d="M11.85,9.7C11.9,9.67,11.97,9.68,12,9.73c0.04,0.05,0.02,0.12-0.03,0.16l-2.64,1.76l2.64,1.76
                c0.05,0.02,0.061,0.07,0.04,0.13c0.01,0.01,0,0.02-0.01,0.03c-0.03,0.05-0.1,0.06-0.15,0.029L9.07,11.74
                c-0.02-0.01-0.03-0.021-0.03-0.03c-0.01-0.02-0.02-0.04-0.02-0.06c0-0.04,0.02-0.07,0.05-0.091L11.85,9.7z"/>
              <path d="M4.56,10.11c0.05,0.04,0.06,0.11,0.03,0.16c-0.04,0.05-0.11,0.06-0.16,0.03L1.65,8.45C1.64,8.44,1.63,8.43,1.62,8.41
                C1.59,8.36,1.6,8.29,1.65,8.26l2.78-1.85c0.05-0.04,0.12-0.03,0.16,0.03c0.03,0.05,0.02,0.12-0.03,0.15L1.92,8.35L4.56,10.11z"/>
              <path d="M19.62,6.57l-2.9-2.89v2.89H19.62z M9.08,3.3V0.23H0.22v16.25h7.2V6.36l-2.26,4.51c-0.03,0.06-0.1,0.08-0.15,0.05
                c-0.06-0.02-0.08-0.09-0.05-0.15l2.46-4.92V3.41c0-0.06,0.05-0.11,0.11-0.11H9.08z M16.5,3.52H7.64v8.13v8.119H19.77V11.65V6.8
                H16.61c-0.061,0-0.11-0.05-0.11-0.11V3.52z M9.31,3.28h2.89l-2.89-2.9V3.28z M9.27,0.03l3.27,3.27h4.07h0.01
                c0.01,0,0.01,0,0.02,0c0.021,0.01,0.04,0.02,0.051,0.03l3.27,3.27c0.021,0.02,0.03,0.04,0.03,0.06C20,6.66,20,6.67,20,6.67
                s0,0.01,0,0.02v13.2C20,19.95,19.95,20,19.89,20H7.53c-0.06,0-0.11-0.05-0.11-0.11V16.7H0.11C0.05,16.7,0,16.65,0,16.59V0.11
                C0,0.05,0.05,0,0.11,0h9.08C9.2,0,9.2,0,9.21,0l0.01,0.01C9.24,0.01,9.26,0.02,9.27,0.03z"/>
            </g>
            <g>
            </g>
          </g>
        </g>
        </svg>
      </div>
    </div>
    <comment-grid baseURL="https://vue-comment-grid.firebaseio.com" apiKey="AIzaSyBBRUAfEUhEnLpYJ5QlrE33ekUu7j20Yr0" nodeName="customize" :background="bgc" :commentBackgroundColor="cbgc" :commentTextColor="ctc" :userNameColor="unc" :initialMessageLimit="iniMesLim.toString()" :maxUserNameLength="maxUserLen.toString()" :maxCommentLength="maxCommentLen.toString()" :maxShowingDepth="maxShowDep.toString()" :maxLineLimit="maxLineLim.toString()" v-on:close-picker="clearPickers" :custom="true" v-on:loading-finished="loadingFinish"></comment-grid> <!-- bu v-onları'ı kaldır unutma-->
    </div>
  </div>
</template>


<script>
  import Comments from './comments/Comments.vue'
  import { Chrome } from 'vue-color'
  let defaultBg = {
    hex: '#ffffff',
    hsl: {
      h: 0,
      s: 0,
      l: 100,
      a: 1
    },
    hsv: {
      h: 0,
      s: 0,
      v: 100,
      a: 1
    },
    rgba: {
      r: 255,
      g: 255,
      b: 255,
      a: 0
    },
    a: 1
  }
  let defaultCommentBg = {
    hex: '#ffffff',
    hsl: {
      h: 0,
      s: 0,
      l: 100,
      a: 1
    },
    hsv: {
      h: 0,
      s: 0,
      v: 100,
      a: 1
    },
    rgba: {
      r: 255,
      g: 255,
      b: 255,
      a: 1
    },
    a: 1
  }
  let defaultCommentTxt = {
    hex: '#1d2129',
    hsl: {
      h: 220,
      s: 17,
      l: 14,
      a: 1
    },
    hsv: {
      h: 220,
      s: 29,
      v: 16,
      a: 1
    },
    rgba: {
      r: 29,
      g: 33,
      b: 41,
      a: 1
    },
    a: 1
  }
  let defaultUserName = {
    hex: '#06b1b7',
    hsl: {
      h: 182,
      s: 94,
      l: 37,
      a: 1
    },
    hsv: {
      h: 182,
      s: 97,
      v: 72,
      a: 1
    },
    rgba: {
      r: 6,
      g: 177,
      b: 183,
      a: 1
    },
    a: 1
  }
  export default {
    name: 'app',
    data() {
      return {
        bgColor: defaultBg,
        commentBgColor: defaultCommentBg,
        commentTxtColor: defaultCommentTxt,
        userNamColor: defaultUserName,
        baseURL: 'https://your-app.firebaseio.com',
        apiKey: 'your-api-key',
        nodeName: 'nodeNameThatYouCreated',
        maxUserNameLength: '30',
        maxCommentLength: '1000',
        initialMessageLimit: '11',
        maxLineLimit: '40',
        maxShowingDepth: '5',
        background: '',
        commentBackgroundColor: '',
        commentTextColor: '',
        userNameColor: '',
        showBaseURLPicker: false,
        showaApiKeyPicker: false,
        showNodeNamePicker: false,
        showMaxUserNameLengthPicker: false,
        showaMaxCommentLengthPicker: false,
        showInitialMessageLimitPicker: false,
        showMaxLineLimitPicker: false,
        showMaxShowingDepthPicker: false,
        showBgPicker: false,
        showCommentBgPicker: false,
        showCommentTxtBgPicker: false,
        showNameBgPicker: false,
        loading: true,
        notClicked: true,
        maxUserLen: 30,
        maxCommentLen: 1000,
        iniMesLim: 11,
        maxLineLim: 40,
        maxShowDep: 5,
        white: true,
        copied: false
      }
    },
    methods: {
      show(from, val) {
        this.clearPickers()
        this.notClicked = false
        if (from == 'sbup') {
          this.showBaseURLPicker = val
        } else if (from == 'sap') {
          this.showaApiKeyPicker = val
        } else if (from == 'snp') {
          this.showNodeNamePicker = val
        } else if (from == 'smul') {
          this.showMaxUserNameLengthPicker = val
          if (val) {
            setTimeout(() => {
              this.$refs.maxUserLen.focus()
            }, 180);
          }
        } else if (from == 'smclp') {
          this.showaMaxCommentLengthPicker = val
          if (val) {
            setTimeout(() => {
              this.$refs.maxCommentLen.focus()
            }, 180);
          }
        } else if (from == 'simp') {
          this.showInitialMessageLimitPicker = val
          if (val) {
            setTimeout(() => {
              this.$refs.iniMesLim.focus()
            }, 180);
          }
        } else if (from == 'smlp') {
          this.showMaxLineLimitPicker = val
          if (val) {
            setTimeout(() => {
              this.$refs.maxLineLim.focus()
            }, 180);
          }
        } else if (from == 'smsp') {
          this.showMaxShowingDepthPicker = val
          if (val) {
            setTimeout(() => {
              this.$refs.maxShowDep.focus()
            }, 180);
          }
        } else if (from == 'bgp') {
          this.showBgPicker = val
        } else if (from == 'ccp') {
          this.showCommentBgPicker = val
        } else if (from == 'ctcp') {
          this.showCommentTxtBgPicker = val
        } else {
          this.showNameBgPicker = val
        }
      },
      updateBg(value) {
        this.bgColor = value
      },
      updateCommentBg(value) {
        this.commentBgColor = value
      },
      updateCommentTxt(value) {
        this.commentTxtColor = value
      },
      updateUserNamC(value) {
        this.userNamColor = value
      },
      clearPickers() {
        this.showBaseURLPicker = false
        this.showaApiKeyPicker = false
        this.showNodeNamePicker = false
        this.showMaxUserNameLengthPicker = false
        this.showaMaxCommentLengthPicker = false
        this.showInitialMessageLimitPicker = false
        this.showMaxLineLimitPicker = false
        this.showMaxShowingDepthPicker = false
        this.showBgPicker = false
        this.showCommentBgPicker = false
        this.showCommentTxtBgPicker = false
        this.showNameBgPicker = false
      },
      loadingFinish() {
        this.loading = false
      },
      enter(el, done) {
        let timing = 1;
        el.style.opacity = 0;
        const p = el;
        let style = parseInt((p.currentStyle || window.getComputedStyle(p)).marginTop);
        const interval = setInterval(() => {
          el.style.marginTop = style + 1 + "px";
          el.style.opacity = parseFloat(el.style.opacity) + 0.07;
          style++
          timing++;
          if (timing > 15) {
            clearInterval(interval);
            done();
          }
        }, 10);
      },
      leave(el, done) {
        let timing = 1;
        const p = el;
        let style = parseInt((p.currentStyle || window.getComputedStyle(p)).marginTop);
        el.style.opacity = 1;
        const interval = setInterval(() => {
          el.style.marginTop = style - 1 + "px";
          el.style.opacity = parseFloat(el.style.opacity) - 0.07;
          style--
          timing++;
          if (timing > 15) {
            clearInterval(interval);
            done();
          }
        }, 10);
      },
      copy() {
        const range = document.createRange();
        range.selectNodeContents(this.$refs.code);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand("Copy");
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
        // alert('coppied');
      }
    },
    computed: {
      bgc() {
        return 'rgba(' + this.bgColor.rgba.r + ', ' + this.bgColor.rgba.g + ', ' + this.bgColor.rgba.b + ', ' + this.bgColor.rgba.a + ')'
      },
      cbgc() {
        return 'rgba(' + this.commentBgColor.rgba.r + ', ' + this.commentBgColor.rgba.g + ', ' + this.commentBgColor.rgba.b + ', ' + this.commentBgColor.rgba.a + ')'
      },
      ctc() {
        return 'rgba(' + this.commentTxtColor.rgba.r + ', ' + this.commentTxtColor.rgba.g + ', ' + this.commentTxtColor.rgba.b + ', ' + this.commentTxtColor.rgba.a + ')'
      },
      unc() {
        return 'rgba(' + this.userNamColor.rgba.r + ', ' + this.userNamColor.rgba.g + ', ' + this.userNamColor.rgba.b + ', ' + this.userNamColor.rgba.a + ')'
      }

    },
    watch: {
      maxUserLen(newValue, oldValue) {
        this.maxUserLen < 1 ? this.maxUserLen = 1 : this.maxUserLen
      },
      maxCommentLen(newValue, oldValue) {
        this.maxCommentLen < 1 ? this.maxCommentLen = 1 : this.maxCommentLen
      },
      iniMesLim(newValue, oldValue) {
        this.iniMesLim < 1 ? this.iniMesLim = 1 : this.iniMesLim
      },
      maxLineLim(newValue, oldValue) {
        this.maxLineLim < 1 ? this.maxLineLim = 1 : this.maxLineLim
      },
      maxShowDep(newValue, oldValue) {
        this.maxShowDep < 1 ? this.maxShowDep = 1 : this.maxShowDep
      }
    },
    components: {
      commentGrid: Comments,
      chromePicker: Chrome
    }
  }
</script>

<style scoped>
  .app {
    font-family: "Roboto", sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    border-radius: 4px;
  }
  .loader {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(150px, auto);
    padding: 5px;
  }
  #loader {
    justify-self: center;
    align-self: center;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 10px;
  }
  .innerWrapper {
    display: grid;
    grid-row: 1;
    grid-column: 1;
  }
  .col {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: start;
    color: #1d2129;
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 6px;
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .col2 {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: start;
    color: #1d2129;
    background-color: #fff;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: max-content;
  }
  .colText {
    box-sizing: border-box;
    width: 225px;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 10px;
    margin-left: -100px;
    text-align: center;
    z-index: 9999;
    box-shadow: 0px 0px 2px 0px #333;
  }
  .custom {
    font-weight: 700;
  }
  .colText > input {
    justify-self: center;
    width: 54px;
    color: #1d2129;
    font-size: 14px;
    line-height: 14px;
    padding: 3px 5px;
  }
  .reminder {
    display: grid;
    grid-template-columns: 1fr 0.001fr 1fr;
    grid-column-gap: 3px;
    padding-top: 3px;
    margin-top: 3px;
  }
  .line {
    border-top: 1px solid rgba(204, 212, 216, 0.8);
  }
  .dot {
    align-self: start;
    font-size: 15px;
    margin-top: -5.6px;
    color: #c2c6cc;
  }
  .reminderText {
    grid-column: 1/4;
    color: #92b1b3;
  }
  .link {
    display: inline-block;
    line-height: 11.9px;
    text-decoration: none;
    border-bottom: 1px solid #551a8b;
  }
  #baseUrl {
    margin-top: 72px;
  }
  #apiKey {
    margin-top: 88px;
  }
  #nodeName {
    margin-top: 104px;
  }
  #maxUserNameLength {
    margin-top: 120px;
  }
  #maxCommentLength {
    margin-top: 136px;
  }
  #initialMessageLimit {
    margin-top: 152px;
  }
  #maxLineLimit {
    margin-top: 168px;
  }
  #maxShowingDepth {
    margin-top: 184px;
  }
  #copied {
    margin-top: 63px;
    box-sizing: border-box;
    width: min-content;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 10px;
    margin-left: 276px;
    text-align: center;
    z-index: 9999;
    box-shadow: 0px 0px 2px 0px #333;
  }
  .tip {
    grid-column: 1;
    grid-row: 1;
    color: #92b1b3;
    justify-self: center;
    align-self: start;
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: 3px;
    margin-left: 3px;
  }
  #bgColor {
    margin-top: 198px;
    margin-left: -100px;
  }
  #commentBgColor {
    margin-top: 216px;
    margin-left: -100px;
  }
  #commentTxtColor {
    margin-top: 232px;
    margin-left: -100px;
  }
  #userNamColor {
    margin-top: 248px;
    margin-left: -100px;
  }
  .code {
    font-family: "Roboto", sans-serif;
    grid-row: 1;
    grid-column: 1;
    justify-self: center;
    align-self: start;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    min-width: 345.27px;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: max-content;
    padding: 8px 5px;
    font-kerning: normal;
    white-space: pre-wrap;
    color: #cd984d;
    background: #282c34;
    font-size: 13px;
    line-height: 16px;
    font-weight: 700;
    border-radius: 4px;
    margin: 0;
    margin-top: 45px;
    margin-right: 5px;
  }
  .tag {
    color: #e84c55;
  }
  .plain {
    color: #aaa8a5;
  }
  .string {
    color: #79c55a;
  }
  .pickerWrapper {
    cursor: pointer;
  }
  .littleBox {
    display: inline-block;
    cursor: pointer;
    width: 10px;
    height: 10px;
    /* border: 0.1px solid rgba(204, 212, 216, 0.8); */
    box-shadow: 0px 0px 0.1px 0px rgba(204, 212, 216, 0.8);
    margin-right: 4px;
    margin-top: -1px;
    line-height: 13px;
    background-color: #fff;
    vertical-align: middle;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .copy {
    cursor: pointer;
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: start;
    color: #fff;
    margin-top: 52px;
    margin-left: 308px;
    transform: scale(1.2);
  }
  ::selection {
    background: #92b1b3;
  }
  ::-moz-selection {
    background: #92b1b3;
  }
</style>
