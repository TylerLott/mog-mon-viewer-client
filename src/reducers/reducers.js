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
