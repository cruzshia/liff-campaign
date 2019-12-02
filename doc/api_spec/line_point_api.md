# Group LinePoint

## LinePoints [/api/v1/line_points]

### GetLinePoints [GET]

Retrieve own line points.

- Request

    - Headers

            x-api-key: xxx
            authorization: user_token

- Response 200 (application/json)
  - Attributes (array[LinePoint])
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)
- Response 404 (application/json)
  - Attributes (NotFound)
