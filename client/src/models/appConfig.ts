export interface AppConfig {
  readonly image: AppConfigImage
  readonly taxRate: number
}

interface AppConfigImage {
  readonly priceRanges: ReadonlyArray<AppConfigImageItem>
}

interface AppConfigImageItem {
  readonly name: string
  readonly value: number
}
