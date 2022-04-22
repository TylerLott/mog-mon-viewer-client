export const changeCount = (state, action) => {
  switch (action.type) {
    case "update-count":
      return { ...state, [action.team]: action.count }
    case "add-team":
      return { ...state, [action.team]: 0 }
    case "remove-team":
      let { [action.team]: val, ...s } = state
      return s
    default:
      throw new Error()
  }
}

export const appendHist = (state, action) => {
  switch (action.type) {
    case "append":
      let arr = state[action.team]
      arr.push(action.newCount)
      if (arr.length > 120) {
        arr.shift()
      }
      return { ...state, [action.team]: arr }
    case "add-team":
      return {
        ...state,
        [action.team]: Array.apply(null, Array(120)).map(() => {
          return { p: 0, thresh: action.thresh }
        }),
      }
    case "remove-team":
      let { [action.team]: val, ...s } = state
      return s
    default:
      throw new Error()
  }
}
