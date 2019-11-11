# Data Structures

## UserData (CreateUserRequestBody)

- `waist_circumference`: `71.03106` (number, optional) - Waist circumference.
- `offal_fat`:           `50` (number, optional) - Offal fat.
- `wc_graph_url`:        `https://aaaa` (string, optional) - Waist circumference graph image url.
- `of_graph_url`:        `https://aaaa` (string, optional) - Offal fat graph image url.

## CreateUserRequestBody (object)

- `id`:                  `user_id` (string, required) - User id.
- `gender`:              `male` (string, required) - Gender.
- `birthday`:            `19990101` (string, required) - Birthday.
- `height`:              `170` (number, required) - Height.
- `weight`:              `60` (number, required) - Weight.

## UpdateUserRequestBody (object)

- `height`:              `170` (number, optional) - Height.
- `weight`:              `60` (number, optional) - Weight.
- `waist_circumference`: `71.03106` (number, optional) - Waist circumference.
- `offal_fat`:           `50` (number, optional) - Offal fat.
- `wc_graph_url`:        `https://aaaa` (string, optional) - Waist circumference graph image url.
- `of_graph_url`:        `https://aaaa` (string, optional) - Offal fat graph image url.
