import Vue from 'nativescript-vue';
import Home from './components/Home';
import Vuex from 'vuex';

Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView)

Vue.use(Vuex)

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
