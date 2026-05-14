## Auth
POST- /signup
POST- /login
POST- /logout

## profile
GET - /profile
PATCH - /profile/edit
PATCH - /profile/reset-password

## ConnectionRequest
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/send/rejected/:requestId

## User
GET - /user/SendconnectionRequest
GET - /user/requests
GET - /user/feed

Status: Ignored, Interested, Accepted, Rejected