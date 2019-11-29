interface Window {
  liff: {
    init: (data: any) => Promise<any>
    login: any
    isLoggedIn: () => boolean
    getAccessToken: () => string
  }
}
