# Data Structures

## BodyGramToken (object)

- `jwt_token`:   `token` (string, required) - JWT of BodyGram.
- `identity_id`: `id`    (string, required) - identity_id.

## BodyGramContent (object)

- `token` (BodyGramToken, fixed)

## BodyGramTokenResponse (object)

- `content` (BodyGramContent, fixed) - Content.
- `error`:  `[inspect error]` (string, optional) - Error message.

## NotifyEstimationRequest (object)

- `notification_type`: `ESTIMATION_CREATED` (string, required)
- `request`            (object, required) - Request data of BodyGram Estimation. Refer `BodyBank-SDK-JS` README.

## NotifyEstimationResponse (object)
