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
import {setProducts,     setName  } from "../store/index";
import {toast} from 'react-toastify';
const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  const [currentuser, setUser] = useState({});
  const [userinfo, setUserinfo] = useState({});
  const [groupid_upate, setGroupid_update] = useState("");
  const [productsNew, setProductsNew] = useState([]);
  const [related, setRelated] = useState([]);
  const [searchedproducts, setSearchedproducts] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
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






  const RealatedProducts2 = async (prod, subid) => {
    //console.log("productid 🚀🚀🚀🚀🚀🚀",prod, '-------',);
    //console.log("sUbi 🔴🔴" ,'-------',subid);
    // startAt(startAtParam), endAt(endAtParam)

    onSnapshot(
      query(
        collection(db, "Pro3"),
        where("categoryid", "==", `${subid}`),
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
console.log("⏺⏺⏺⏺⏺",productsArr);
       // dispatch((setProducts(productsArr)));

        return productsArr;
      }
    );
  };


  
  const RealatedProducts = async (prod, subid) => {
 
    // console.log(" price data is is--- 🔴🔴", "-------", categories);
   
   
     onSnapshot(
       query(
         collection(db, "Pro3"),
         where("categoryid", "==", `${subid}`),
         where("name", "!=", prod)
        
         //  where('name', '!=' , prod   ),
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
   
      //   dispatch(fetchsearchedproducts(productsArr));
   //console.log("Products issssssssss---->",productsArr);
   //(productsArr);
   console.log("---->💠💠💠",productsArr);
   setRelated(productsArr);
         return productsArr;
       }
     );
   };
   









 const ProductsBY= (orderby) => {
  return getDocs(query(collection(db, "Pro3"),    
  orderBy(orderby, "desc"))).then((querySnapshot) => {

    var data = [];
    querySnapshot.forEach((doc) => {
   
        console.log("proucts is exist");
        
        data.push({ ...doc.data(),id: doc.id  })
      
    });
  //  setProductsNew(data);

    return  data;
  });
}



const Categories= () => {
  return getDocs(query(collection(db, "Categories3"),    
  //orderBy('orderby', "desc")
  )).then((querySnapshot) => {

    var data = [];
    querySnapshot.forEach((doc) => {
   
        console.log("cats is exist");
        
        data.push({ ...doc.data(),id: doc.id  })
      
    });
  //  setProductsNew(data);
console.log("categories",data);
    return  data;
  });
}



const AllProducts= (pro) => {
  console.log("💡💡💡💡",pro);
  return getDocs(query(collection(db, "Pro3"),limit(pro),    
  //orderBy('orderby', "desc")
  )).then((querySnapshot) => {

    var data = [];
    querySnapshot.forEach((doc) => {
   
       // console.log("cats is exist");
        
        data.push({ ...doc.data(),id: doc.id  })
      
    });

    setAllProducts(data);

    return  data;
  });
}







const ProductsBySelectedCategories = async (categories) => {
 
 // console.log(" price data is is--- 🔴🔴", "-------", categories);


  onSnapshot(
    query(
      collection(db, "Pro3"),
      where("categoryid", "in", categories),
     
      //  where('name', '!=' , prod   ),
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

   //   dispatch(fetchsearchedproducts(productsArr));
//console.log("Products issssssssss---->",productsArr);
setSearchedproducts(productsArr);
console.log("---->💠💠💠",searchedproducts);
      return productsArr;
    }
  );
};


 // search products  by price  max and min


 const ProductsByPrice = async (price) => {
 
  console.log(" price data is is--- 🔴🔴", "-------", price);


  onSnapshot(
    query(
      collection(db, "Pro3"),
      where("price", ">=", price[0]),
      where("price", "<=", price[1])
      //  where('name', '!=' , prod   ),
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

      setSearchedproducts(productsArr);
      //dispatch(fetchsearchedproducts(productsArr));

      return productsArr;
    }
  );
};



useEffect(() => {

  AllProducts()
}, [searchedproducts]);





const SearchbyText = async (text) => {

  console.log("sub id is--- 🔴🔴🚀🚀🚀🚀🚀🚀", "-------", text);
  // startAt(startAtParam), endAt(endAtParam)

  // search with text  regexp

  const regex = new RegExp(text, "i");




const filterproducts = products.filter((product) => {
return product.name.match(regex);
});

console.log("filter🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥", filterproducts);
setSearchedproducts(filterproducts);

//dispatch(fetchsearchedproducts(filterproducts));



};







  const value = {
  
    currentuser,
    userinfo,
    signUp,
    signIn,
    logout,
    RealatedProducts,
    ProductsBY,
    setProductsNew,
    productsNew,
    Categories,
    ProductsBySelectedCategories,
    AllProducts,
    searchedproducts,
    setSearchedproducts,
    ProductsByPrice,
    SearchbyText,
    setAllProducts,
    products,
    setSearchText,
    searchText,
    SearchbyText,
    RealatedProducts,
    setRelated,
    related,
   
 
  
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;