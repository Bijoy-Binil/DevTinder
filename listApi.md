## Auth
[x]POST- /signup
[x]POST- /login
[x]POST- /logout

## profile
[x]GET   - /profile
[x]PATCH - /profile/edit
[x]PATCH - /profile/reset-password

## ConnectionRequest
[x]-POST /request/send/:status/:userId
[x]-POST /request/review/:status/:requestId

## User
[x]GET - /user/requests
[x]GET - /user/connections
   GET - /user/feed

Status: Ignored, Interested, Accepted, Rejected