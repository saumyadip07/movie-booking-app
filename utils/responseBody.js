//error response body

export const errorResponseBody = { 
  err: {},
  data: {},
  message: "Something went wrong . cannot process the request",
  success: false,
}

//success response body

export const successResponseBody = {
  err: {},
  data: {},
  message: "Successfully processed the request",
  success: true,
}

//bad request response body
export const badRequestResponseBody = {
  success: false,
  err: "",
  data: {},
  message: "Malformed request | Missing required fields |BadRequest",
};