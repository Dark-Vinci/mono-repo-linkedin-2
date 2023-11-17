interface DummyData {
  name: string;
  action: string;
  activate: boolean;
}

const dummyData: DummyData = {
  name: '',
  action: '',
  activate: false,
};

const ACTIVATE = 'ACTIVATE';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Action<PType extends object = any> {
  readonly type: string;
  readonly payload?: PType;
}

export function dummyReducer(
  state: DummyData = dummyData,
  action: Action,
): unknown {
  switch (action.type) {
    case ACTIVATE:
      return {
        ...state,
        activate: true,
      };
    default:
      return state;
  }
}
