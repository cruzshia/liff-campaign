# Group Users

## Users [/api/users]

### Create [POST]

Register own user data.  

- Request

    - Headers

            Content-Type: application/json
            x-api-key: fgJxmvnLtz511hWFJeKia3jUmevOIVau8F37cYm2

    - Attributes (CreateUserRequestBody)
- Response 201 (application/json)
  - Attributes (UserData)
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)

## User [/api/v1/users/me]

### Show [GET]

Retrieve own user data.

- Request

    - Headers

            x-api-key: xxx
            token: user_token

- Response 200 (application/json)
  - Attributes (UserData)
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)
- Response 404 (application/json)
  - Attributes (NotFound)

### Update [PUT]

Update own user data.

- Request

    - Headers

            Content-Type: application/json
            x-api-key: xxx
            token: user_token

    - Attributes (UpdateUserRequestBody)

- Response 200 (application/json)
  - Attributes (UserData)
- Response 400 (application/json)
  - Attributes (BadRequest)
- Response 401 (application/json)
  - Attributes (UnAuthorized)
- Response 404 (application/json)
  - Attributes (NotFound)
