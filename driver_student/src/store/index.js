import Vue from 'vue'
import Vuex from 'vuex'
import configure from './configure'
import user from './user'
import paper from './paper'
import video from './video'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        configure,
        user,
        paper,
        video
    }
})

export default store
