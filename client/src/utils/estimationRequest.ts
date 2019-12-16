export const blobToFile = (blob: Blob): File => {
  var b: any = blob
  b.lastModifiedDate = new Date()
  b.name = new Date().getTime()
  return blob as File
}

export const ageCalculator = (birthdayString: string) => {
  const today = new Date()
  const birthday = new Date(birthdayString.replace(/([1,2]\d\d\d)(\d\d)(\d\d)/, '$1/$2/$3'))
  const age = today.getFullYear() - birthday.getFullYear()
  const m = today.getMonth() - birthday.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) return age - 1
  return age
}
