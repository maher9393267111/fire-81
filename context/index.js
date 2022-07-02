import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendSignInLinkToEmail,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
  where,
  FieldPath,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import {  } from "../store/index";
import {toast} from 'react-toastify';
const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentuser, setUser] = useState({});
  const [userinfo, setUserinfo] = useState({});
  const [groupid_upate, setGroupid_update] = useState("");
  const dispatch = useDispatch();

  const signUp = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);

    console.log("signUp--------->⚡⚡⚡⚡", email, password, name);

    await updateProfile(auth.currentUser, {
      displayName: name,

      photoURL:
        "https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-256.png",
    });

    await setDoc(doc(db, "usmaher", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: password,
      history: [],

      cart: [],
    
      totalprice: 0,
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {

      toast.success("Successfully Signed In");
    })
    .catch(error => {
      toast.error(error.message);
    })
  };

  //------- reguister and login

  //--- Sign in with google ---

  // sign with google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    // add the user to the users collection

    await setDoc(doc(db, "usmaher", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: "",

      cart: [],
      rezerv: [],
      totalprice: 0,
    });
  };

  // signout

  const logout = () => {
    console.log("logout");
    setUser({});
    setUserinfo({});
    signOut(auth);
  };

  //------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const fetchuser = async () => {
          const userinfo = await getDoc(doc(db, "usmaher", user.email));
          setUserinfo({ id: userinfo.id, ...userinfo.data() });
        };

        fetchuser();
      }
    });

    return unsubscribe;
  }, [auth]);

  // ----modal




  const ProductsBY = async (orderby) => {
    // startAt(startAtParam), endAt(endAtParam)




    onSnapshot(
      query(
        collection(db, "Pro3"),
        orderBy( orderby, "desc"),
        limit(12)
        // startAt(startat)
      ),
      (snapshot) => {
        const productsArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

       // dispatch(fechBestsellers(productsArr));
console.log("🔰🔰🔰🔰🔰🔰",productsArr);
        return productsArr;
      }
    );
  };



  const RealatedProducts = async (prod, subid) => {
    //console.log("productid 🚀🚀🚀🚀🚀🚀",prod, '-------',);
    //console.log("sUbi 🔴🔴" ,'-------',subid);
    // startAt(startAtParam), endAt(endAtParam)

    onSnapshot(
      query(
        collection(db, "Pro3"),
      //  where("subid", "==", `${subid}`),
        where("name", "!=", prod)
        // orderBy("id", "desc")
        // ,
        // limit(3),
        // startAt(startat)
      ),
      (snapshot) => {
        const productsArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      //  dispatch(relatedproductsfetch(productsArr));
        return productsArr;
      }
    );
  };











  const value = {
  
    currentuser,
    userinfo,
    signUp,
    signIn,
    logout,
    RealatedProducts,
    ProductsBY,
    //BestSellersProducts,
 
  
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;