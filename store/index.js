import request from "~/utils/request";
import { API_LIST } from "~/const/api.config";

export const state = () => ({
  isCollapse: false,
})

export const mutations = {
  setMenuToggle(state, payload) {
    state.isCollapse = !state.isCollapse
  },
}

export const actions = {
  async nuxtServerInit({ commit }, context) {
  }
}