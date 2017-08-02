interface ISessionState {
  id: number;
  name: string;
}

interface IAppState {
  session?: ISessionState;
}

export { IAppState, ISessionState };
