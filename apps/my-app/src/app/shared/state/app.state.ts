import { State, Action, StateContext, Selector } from '@ngxs/store';

// Actions
export class SetToken {
  static readonly type = '[Auth] Set Token';
  constructor(public token: string) {}
}

export class SetCurrentItem {
  static readonly type = '[Item] Set Current Item';
  constructor(public item: any) {}
}

// State Model
export interface AppStateModel {
  token: string;
  currentItem: any;
}

// Initial State
@State<AppStateModel>({
  name: 'app',
  defaults: {
    token: '',
    currentItem: null
  }
})
export class AppState {
  @Selector()
  static getToken(state: AppStateModel): string {
    return state.token;
  }

  @Selector()
  static getCurrentItem(state: AppStateModel): any {
    return state.currentItem;
  }

  @Action(SetToken)
  setToken(ctx: StateContext<AppStateModel>, action: SetToken) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      token: action.token
    });
  }

  @Action(SetCurrentItem)
  setCurrentItem(ctx: StateContext<AppStateModel>, action: SetCurrentItem) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentItem: action.item
    });
  }
}
