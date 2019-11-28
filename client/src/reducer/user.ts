export default (state: any = { userid: '' }, action: any) => {
  switch (action.type) {
    case 'test':
      return {
        userid: 'abc'
      }
    default:
      return state
  }
}
