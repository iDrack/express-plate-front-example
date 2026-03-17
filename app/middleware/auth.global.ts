/*Global middleware that :
    - If the requested route is the loin page or password reset page ==> accept the request
    - Check if authToken is stored in authStore
    - Request the api to verify if the authToken is still valid, if valid : accept the request
    - Refresh the authToken with /user/refresh
    - If the session is invalid : logout the user and redirect the user to the login page
    - If the session is valid : accept the request
*/