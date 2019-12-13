# Group EstimationLog

## EstimationLogs [/api/v1/estimation_logs]

### GetEstimationLogs [GET]

Retrieve own estimation logs.

- Request

    - Headers

            x-api-key: xxx
            authorization: user_token

- Response 200 (application/json)
  - Attributes (array[BodyGramEstimationResponse])
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)
- Response 404 (application/json)
  - Attributes (NotFound)
