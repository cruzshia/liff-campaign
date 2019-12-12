import { Users } from '../../src/db/models/users'

export const getOffalFat = (user: Users, waist: number): number | null => {
  if (!user.weight) {
    return null
  }
  const age = getAge(user.birthday)
  const bmi = (user.weight / (user.height * user.height)) * 10000
  if (user.gender === 'male') {
    return -319.339 + 0.110 * age + 0.210 * bmi + 4.725 * waist
  } else {
    return -180.842 + 0.030 * age + 0.905 * bmi + 2.696 * waist
  }
}

export const getAge = (birthday: string) => {
  const yourBirthDay = {
    year: parseInt(birthday.substr(0, 4), 10),
    month: parseInt(birthday.substr(4, 2), 10),
    date: parseInt(birthday.substr(6, 2), 10),
  }

  const birthDate = new Date(yourBirthDay.year, yourBirthDay.month - 1, yourBirthDay.date);

  const y2 = birthDate.getFullYear().toString().padStart(4, '0')
  const m2 = (birthDate.getMonth() + 1).toString().padStart(2, '0')
  const d2 = birthDate.getDate().toString().padStart(2, '0')

  const today = new Date()
  const y1 = today.getFullYear().toString().padStart(4, '0')
  const m1 = (today.getMonth() + 1).toString().padStart(2, '0')
  const d1 = today.getDate().toString().padStart(2, '0')

  const age = Math.floor((Number(y1 + m1 + d1) - Number(y2 + m2 + d2)) / 10000)
  return age
}
