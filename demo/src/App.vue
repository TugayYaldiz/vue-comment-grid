<template>
<div id="app">
  <div class="nav">
    <a><router-link class="link" to="/fullscreen" tag="div" active-class="active" exact><span>Fullscreen demo</span></router-link></a>      
    <span class="upperDot">•</span>
    <a><router-link class="link" to="/customize" tag="div" active-class="active"><span>Customize component</span></router-link></a>
    <span class="github-corner" aria-label="View source on Github">
      <svg ref="gitCorner" width="70" height="70" viewBox="0 0 250 250" style="fill:transparent; color:rgb(42, 94, 190);" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <a href="https://github.com/TugayYaldiz/vue-comment-grid" class="github-cornerBody" @mouseenter="scaleCorner(1.8)" @mouseleave="scaleCorner(1.4)">
        <g>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px; fill:#557ecb" class="octo-arm"></path>
          <path style="fill:#557ecb" d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
        </g>
        </a>
      </svg>
    </span>
  </div>
  <div class="routerView">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</div>
  
</template>

<script>
  export default {
    methods: {
      scaleCorner(to) {
        this.$refs.gitCorner.style.transform = "scale(" + to + ") rotate(-45deg)";
      }
    }
  };
</script>

<style>
  #app {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-radius: 4px;
  }
  .nav {
    box-sizing: border-box;
    height: 48px;
    line-height: 48px;
    position: sticky;
    top: 0;
    z-index: 108;
    display: grid;
    grid-template-columns: 1fr 0.001fr 1fr;
    grid-template-rows: 1fr 0px;
    grid-auto-rows: minmax(0, min-content);
    margin-top: 5px;
    grid-gap: 5px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  a > .link {
    display: grid;
    text-decoration: none;
    box-sizing: border-box;
    overflow: hidden;
    height: 48px;
    cursor: pointer;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    font-weight: 700;
    padding: 8px 10px;
    border-bottom: 3px solid rgba(204, 212, 216, 0.8);
    color: #92b1b3;
    transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }
  .link > span {
    align-self: center;
  }
  a > .link.active {
    color: rgba(42, 94, 190, 0.8);
    border-bottom: 3px solid rgba(42, 94, 190, 0.8);
  }
  a > .link:hover {
    color: rgba(42, 94, 190, 0.8);
    border-bottom: 3px solid rgba(42, 94, 190, 0.8);
  }
  .upperDot {
    align-self: end;
    font-size: 22px;
    margin-bottom: -10px;
    color: #c2c6cc;
  }
  .routerView {
    margin-top: 10px;
    height: auto;
  }
  .github-corner {
    width: 5px;
    grid-column: 2/4;
    margin-top: -42.9px;
    margin-left: -33.1px;
  }
  .github-corner > svg {
    pointer-events: none;
    backface-visibility: hidden;
    margin-top: 3px;
    transform: scale(1.4) rotate(-45deg);
    transition: all .1s linear;
    -moz-transition: all .1s linear;
    -webkit-transition: all .1s linear;
  }
  .github-cornerBody {
    pointer-events: all;
    cursor: pointer;
  }
  .github-cornerBody:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
  @keyframes octocat-wave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-25deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }
  @media (max-width: 500px) {
    .github-cornerBody:hover .octo-arm {
      animation: none;
    }
    .github-cornerBody .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
</style>
