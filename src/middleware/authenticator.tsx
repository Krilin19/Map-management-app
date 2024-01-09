import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAppContext } from "./context-provider";
import { useEffect,FC } from "react";

let authInitialized =false;

export const Authenticator : FC = () =>{
    const auth = getAuth();
    const dispatch = useAppContext()[1];

    const ListenToAuthChanges = () => {
        onAuthStateChanged(auth, (foundUser) => {
            const user = foundUser ? {...foundUser} : null;
            dispatch ({type: "UPDATE_USER", payload: user})


        });
    };

    useEffect(() => {
        if(!authInitialized){
            ListenToAuthChanges();
            authInitialized = true; 
        }
    }, []);

    return <></>;
};