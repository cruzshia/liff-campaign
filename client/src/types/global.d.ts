interface Window {
  liff: {
    init: (data: any) => Promise<any>
    login: any
    isLoggedIn: () => boolean
    getAccessToken: () => string
    getOS: () => string
  }

  BodyBankEnterprise: BodyGram
}

interface HTTPResponse<T> {
  data: T
  status: number
  error?: Error
}
