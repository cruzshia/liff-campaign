const ACCEPT_OS = ['ios', 'android']
export const isValidAgent = () => {
  const os = window.liff.getOS()
  return ACCEPT_OS.some(accept => accept === os)
}
