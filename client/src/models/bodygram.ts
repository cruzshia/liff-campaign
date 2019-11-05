export interface EstimationParameter {
  readonly age: number
  readonly heightInCm: number
  readonly weightInKg: number
  readonly gender: any
  readonly frontImage: File
  readonly sideImage: File
  readonly failOnAutomaticEstimationFailure: boolean
}
