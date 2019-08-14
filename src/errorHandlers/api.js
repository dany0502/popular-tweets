import router from "@/router";
import { NETWORK_ERROR } from "@/constants/errorCode";
import { ERROR } from "@/constants/route";

export default error => {
  const { status = NETWORK_ERROR } = error.response || error;
  router.push({
    name: ERROR.name,
    params: { errorCode: status }
  });
};
