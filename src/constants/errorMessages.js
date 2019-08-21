import {
  NETWORK_ERROR,
  SOME_ERROR,
  INVALID_ROUTE,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  GATEWAY_TIMEOUT
} from "@/constants/errorCode";

export default {
  [NETWORK_ERROR]: "Network Error",
  [SOME_ERROR]: "Some Error",
  [INVALID_ROUTE]: "Invalid Route",
  [FORBIDDEN]: "Forbidden",
  [NOT_FOUND]: "Not Found",
  [INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [GATEWAY_TIMEOUT]: "Gateway Timeout"
};
