import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tableData:[]
};

export default new Vuex.Store({
  state,
  mutations: {
    udtableData(state,payload){
      state.tableData = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
