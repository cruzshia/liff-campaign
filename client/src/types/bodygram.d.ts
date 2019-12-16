type BodygramGender = 'male' | 'female'

interface EstimationParameter {
  age: number
  heightInCm: number
  weightInKg: number
  gender: BodygramGender
  frontImage?: File
  sideImage?: File
  failOnAutomaticEstimationFailure: boolean
}

interface BodygramCbkRequest {
  id: string
  user_id: string
  frontImage?: {
    downloadableURL: string
  }
}

type BodyGramCallback = ({
  request,
  errors
}: {
  request: BodygramCbkRequest | BodygramCreateEstimation
  errors?: string[]
}) => void

interface GetEstimationProps {
  id: string
  callback: BodyGramCallback
}

interface CreateEstimationProps {
  estimationParameter: EstimationParameter
  callback: BodyGramCallback
}

interface BodyGram extends FunctionConstructor {
  new (...args: string[]): {
    initialize: (...props: any) => Promise<any>
    Gender: BodygramGender
    getDefaultTokenProvider: () => {
      restoreTokenBlock: () => Promise<any>
    }
    genBodyBankToken: (token: string, id: string) => any
    createEstimationRequest: (props: CreateEstimationProps) => any
    getEstimationRequest: (props: GetEstimationProps) => any
  }
}

export interface BodygramCreateEstimation {
  age: number
  createdAt: Date
  frontImage: any
  frontImageThumb: any
  gender: 'male' | 'female'
  height: number
  id: string
  result: undefined
  sideImage: any
  sideImageThumb: any
  status: string
  weight: number
}
