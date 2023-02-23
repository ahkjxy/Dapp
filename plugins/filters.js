import Vue from 'vue'

/**
 * @ 千分位
 * @param {String} num
 * @returns
 */
export function thousandSeparator(num) {
  return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}

const filters = {
  thousandSeparator,
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
export default filters
