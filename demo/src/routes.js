import FullScreen from './components/FullScreen.vue';
import Customize from './components/Customize.vue';
import App from './App.vue';

export const routes = [
  {
    path: '/fullscreen', components: {
      default: FullScreen,
      'fullscreen': FullScreen
    }
  },
  {
    path: '/customize', components: {
      default: Customize,
      'customize': Customize
    }
  },
  {
    path: '/', redirect: '/fullscreen'
  },
  { path: '*', redirect: '/' }
];
