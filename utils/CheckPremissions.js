import { UnAuthenticatedError } from "../errors/index.js";

const CheckPremissions = (requestUser, resourceUserId) => {
  if (requestUser.isAdmin === true) return; //so we proceeed updating user
  if (requestUser.userId === resourceUserId.toString()) return; //so we proceeed updating user

  throw new UnAuthenticatedError("Not authorized to access this route");
  //   return
};

export default CheckPremissions;
