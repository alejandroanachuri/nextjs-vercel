import {useState, useEffect,useContext, createContext} from "react";
import firebase from './firebase';
import { getAuth, onAuthStateChanged, GithubAuthProvider, signInWithPopup, signOut  } from "firebase/auth";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext)
}


function useProvideAuth() {
  const [user, setUser] = useState(null)
  const titulo = "Titulo"
  
  const signinWithGitHub = () => {
    const auth = getAuth();
    return signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => {
        setUser(response.user)
        return response.user
      });
  };

  const signout = () => {
    const auth = getAuth();
    return signOut(auth)
      .then(()=> {
        setUser(false)
        return false
      })
  }

  useEffect(()=>{
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
        if(user){
          setUser(user)
        } else {
          setUser(false)
        }
      })

      return ()=> unsubscribe
  }, [])



  return {user, titulo, signinWithGitHub, signout }
}


