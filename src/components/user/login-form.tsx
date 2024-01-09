import {FC} from "react"
// import { getApp } from "firebase/app"
import { useAppContext } from "../../middleware/context-provider"

export const LoginForm: FC = () => {

    // return <p>{JSON.stringify(getApp())}</p>;

    const [state] = useAppContext();

    const onClick = () => {};
  
    return state.user ? (
        <> {state.user.displayName} </>
      ) : (
        <button onClick={onClick}>Login</button>
      );
}

// 