import Vue from 'vue'
import Vuex from 'vuex'
import configure from './configure'
import user from './user'
import excercise from './exercise'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        configure,
        user,
        excercise
    }
})

export default store
