import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import common from './modules/common'
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        common //多个用,号隔开
    },
})
