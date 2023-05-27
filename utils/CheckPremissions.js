import { UnAuthenticatedError } from "../errors/index.js";

const CheckPremissions = (requestUser, resourceUserId) => {
  // if(requestUser.userId )
  console.log("1");
  if (requestUser.isAdmin === true) return; //so we proceeed updating user
  console.log("2");
  if (requestUser.userId === resourceUserId.toString()) return; //so we proceeed updating user

  throw new UnAuthenticatedError("Not authorized to access this route");
  //   return
};

export default CheckPremissions;
