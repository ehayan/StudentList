import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        serverUrl: 'http://127.0.0.1:5001/student-test001/asia-northeast3',
        user: null,
        token: null,
    },
    mutations: {//state 변경Ï
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
    },
    actions: {//비동기
        async setAuth({commit}, data) {
            commit('setToken', data)
        }
    }
})
