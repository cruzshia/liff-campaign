# Data Structures

## BodyGramStatus (enum)

### Members

- `requested` - Bodygram: `requested`.
- `pending` - Bodygram: `pendingAutomaticEstimation`
- `completed` - Bodygram `completed`

## BodyGramToken (object)

- `jwt_token`:   `token` (string, required) - JWT of BodyGram.
- `identity_id`: `id`    (string, required) - identity_id.

## BodyGramContent (object)

- `token` (BodyGramToken, fixed)

## BodyGramTokenResponse (object)

- `content` (BodyGramContent, fixed) - Content.
- `error`:  `[inspect error]` (string, optional) - Error message.

## BodyGramEstimationResponse (object)

- `id`:                  `1` (number, required) - id.
- `uid`:                 `xxx` (string, required) - user id.
- `rid`:                 `aaa` (string, required) - bodygram estimation request id.
- `status`               (BodyGramStatus, required) - estimation status. If status changed `completed`, `waist_circumference` and `offal_fat` are set.
- `waist_circumference`: `80.0` (number, optional) - Nullable. Estimated waist circumference.
- `offal_fat`:           `20.0` (number, optional) - Nullable. Estimated offal fat.
- `wc_diff`:             `0.0` (number, optional) - Nullable.
- `of_diff`:             `0.0` (number, optional) - Nullable.
- `week`:                `1` (number, required) - times of estimation.
- `created_at`:          `2019-11-13 18:34:52` (string, required)
- `updated_at`:          `2019-11-13 18:34:52` (string, required)

## NotifyEstimationRequest (object)

- `notification_type`: `ESTIMATION_CREATED` (string, required)
- `request`            (object, required) - Request data of BodyGram Estimation. Refer `BodyBank-SDK-JS` README.

## NotifyEstimationResponse (object)
