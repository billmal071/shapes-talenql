import { LoginActionType, LoginStateType } from '../../defaultTypes'
import { loginActionType } from '../types'

const initialState: any[] = [];
const stored: string = localStorage.getItem("shapeState") as string;

export const initializer = (initialValue = initialState) =>
  JSON.parse(stored) || initialValue;

function loginReducer(state: LoginStateType, action: LoginActionType): LoginStateType {
  switch (action.type) {
    case loginActionType.loginSuccess:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
        loading: false
      }
    case loginActionType.loginError:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        error: action.payload,
        loading: false
      }
    case loginActionType.logout:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        error: null,
        loading: false
      }
    case loginActionType.loading:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}

export default loginReducer
