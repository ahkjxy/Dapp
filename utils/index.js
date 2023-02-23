export const urlBuilder = query => {
  return query
  ?
  (`${Object.keys(query)
        .filter(key => Boolean(query[key]) || query[key] === 0)
      .map(key => [].concat(query[key]).map(val =>
        `${key}=${encodeURIComponent(val)}`).join('&'))
      .join('&')
    }`.trim()) :
  ''
}

export default {
  urlBuilder,
}
