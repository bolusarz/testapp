export interface Msg {
  message: String;
  status: MsgType;
}

export enum MsgType {
  true, false
}
