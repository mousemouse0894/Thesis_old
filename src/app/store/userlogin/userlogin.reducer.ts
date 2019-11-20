import { UserloginModel } from "../store.model";
import * as UserloginAction from "./userlogin.action";

const initialState: UserloginModel = {
  userData: null,
  apiToken: null,
  ipAddress: null
};

export function UserloginReducer(
  state: UserloginModel = initialState,
  action: UserloginAction.Actions
) {
  switch (action.type) {
    case UserloginAction.SET_USERLOGIN:
      return (state = action.payload);
    case UserloginAction.REMOVE_USERLOGIN:
      return (state = initialState);
    default:
      return state;
  }
}
