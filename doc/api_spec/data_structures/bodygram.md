# Data Structures

## BodyGramStatus (enum)

### Members

- `requested` - Bodygram: `requested`.
- `pending` - Bodygram: `pendingAutomaticEstimation`
- `estimated` - Bodygram `completed`
- `completed` - Completed status of Offal fat estimation.

## BodyGramToken (object)

- `jwt_token`:   `token` (string, required) - JWT of BodyGram.
- `identity_id`: `id`    (string, required) - identity_id.

## BodyGramContent (object)

- `token` (BodyGramToken, fixed)

## BodyGramTokenResponse (object)

- `content` (BodyGramContent, fixed) - Content.
- `error`:  `[inspect error]` (string, optional) - Error message.

## BodyGramEstimationResponse (object)

- `id`:                  `1` (number, required)
- `uid`:                 `xxx` (string, required)
- `rid`:                 `aaa` (string, required)
- `status`               (BodyGramStatus, required)
- `waist_circumference`: `80.0` (number, required)
- `offal_fat`:           `20.0` (number, required)
- `wc_diff`:             `0.0` (number, required)
- `of_diff`:             `0.0` (number, required)
- `week`:                `1` (number, required)
- `created_at`:          `2019-11-13 18:34:52` (string, required)
- `updated_at`:          `2019-11-13 18:34:52` (string, required)

## NotifyEstimationRequest (object)

- `notification_type`: `ESTIMATION_CREATED` (string, required)
- `request`            (object, required) - Request data of BodyGram Estimation. Refer `BodyBank-SDK-JS` README.

## NotifyEstimationResponse (object)
