import { GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import { auth} from "../../firebase/firebaseConfig";

const provider = new GoogleAuthProvider();
// provider.addScope('https://mail.google.com/');

export const loginUser= () => {

signInWithRedirect(auth, provider)
.then((result:any) => {
// console.log("auth result === === ",result)
}).catch((error) => {
// Handle Errors here.
// console.log("auth error  === ",error)

});

}


