# Data Structures

## UserData (CreateUserRequestBody)

- `uid`:                 `xxx` (string, required)
- `waist_circumference`: `71.03106` (number, optional) - Waist circumference.
- `offal_fat`:           `50` (number, optional) - Offal fat.
- `bodygram_id`:         `xxxx` (string, optional) - Bodygram `identity_id`.
- `rank`:                `1` (number, optional) - User rank of offal fat ranking.

## CreateUserRequestBody (object)

- `gender`:              `male` (string, required) - Gender.
- `birthday`:            `19990101` (string, required) - Birthday.
- `height`:              `170` (number, required) - Height.
- `weight`:              `60` (number, required) - Weight.
- `is_entry_contest`:    `true` (boolean, required) - Entry offal fat contest(`true`) or not(`false`).

## UpdateUserRequestBody (CreateUserRequestBody)

- `waist_circumference`: `71.03106` (number, optional) - Waist circumference.
- `offal_fat`:           `50` (number, optional) - Offal fat.
