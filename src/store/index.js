import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tableData:[],
  dc01_bgp_pd: [152.40, 172.45, 174.84, 184.36, 190.90, 191.67, 174.42].map((item)=>{
    return item *2
  }),
};

export default new Vuex.Store({
  state,
  mutations: {
    udtableData(state,payload){
      state.tableData = payload
    },
    udXaxis(state,payload){
      console.log(payload);
      state.bgp_pd_xAxis = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
