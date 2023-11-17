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

interface Action<PType extends {} = any> {
  readonly type: string;
  readonly payload?: PType;
}

export function dummyReducer(
  state: DummyData = dummyData,
  action: Action,
): any {
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
