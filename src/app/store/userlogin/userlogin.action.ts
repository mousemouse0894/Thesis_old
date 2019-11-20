import { UserloginModel } from "../store.model";
import { Action } from "@ngrx/store";

export const SET_USERLOGIN = "SET_USERLOGIN";
export const REMOVE_USERLOGIN = "REMOVE_USERLOGIN";

export class SetUserlogin implements Action {
  readonly type = SET_USERLOGIN;

  constructor(public payload: UserloginModel) {}
}

export class RemoveUserlogin implements Action {
  readonly type = REMOVE_USERLOGIN;

  constructor() {}
}

export type Actions = SetUserlogin | RemoveUserlogin;
