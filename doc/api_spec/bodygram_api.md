# Group BodyGram

## Token [/api/bodygram/token]

### GetToken [GET]

Get user token.  

- Request

    - Headers

            Content-Type: application/json
            x-api-key: xxx
            token: user_token

- Response 200 (application/json)
  - Attributes (BodyGramTokenResponse)
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)

## Bodygram [/api/bodygram/estimation{?rid}]

- Parameters
  - `rid`: `d69b5155-beba-42c9-b3cd-c17068c3c642` (string, required)

### GetBodyGramEstimation [GET]

Retrieve own estimation result.

- Request

    - Headers

            x-api-key: xxx
            token: user_token

- Response 200 (application/json)
  - Attributes (BodyGramEstimationResponse)
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)
- Response 404 (application/json)
  - Attributes (NotFound)

## Estimation [/api/notify_estimation]

### NotifyEstimation [POST]

For BodyGram webhook API.

- Request

    - Headers

            Content-Type: application/json
            x-api-key: fgJxmvnLtz511hWFJeKia3jUmevOIVau8F37cYm2

    - Attributes (NotifyEstimationRequest)
- Response 200 (application/json)
  - Attributes (NotifyEstimationResponse)
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)
