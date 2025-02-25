import React, { useState } from 'react'
import guitar from '../assets/guitar.png'
import google from '../assets/google.png'
import phone from '../assets/phone.png'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Login = ({ setLoginPop, setUser }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState("login")

    const register = async ()=>{
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(result.user, {
            displayName: email.split("@")[0]
          });
          setUser(result.user);
          setLoginPop(false);
          toast.success("Registered and logged in successfully!");
          navigate("/");
        } catch(error){
          console.error(error);
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email is already registered. Try logging in.");
          }else{
            toast.error("Failed to register. Please try again.");
          }
        }
      };      

    const emailSignin = async ()=>{
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          setUser(result.user);
          setLoginPop(false);
          toast.success("Logged in successfully!");
          navigate("/");
        } catch(error){
          console.error(error);
          toast.error("Failed to log in. Please check your credentials.");
        }
      };

    const googleSignin = async()=>{
        try {
            const result = await signInWithPopup(auth, googleProvider)
            setUser(result.user)
            setLoginPop(false)
            toast.success("Logged in successfully!");
            navigate("/")
        } catch(error){
            console.log(error)
            toast.error("Failed to log in. Please try again.");
        }
    }

  return (
    <>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="flex justify-end">
                                <h1 onClick={()=>setLoginPop(false)} className='cursor-pointer font-semibold text-3xl'>X</h1>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="mt-2">
                                        <img src={guitar} className='w-20 h-20 ml-32'/>
                                        <p className="text-base font-medium mt-5 text-center">Help us to become one of the safest places <br />to buy and sell</p>

                                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mt-4"/>
                                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mt-2"/>
                                        {mode === "login" ? (
                                            <>
                                                <button onClick={emailSignin} className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded">
                                                    Login with Email
                                                </button>
                                                <p className="mt-2 text-sm">
                                                    Don't have an account?{" "}
                                                    <span onClick={() => setMode("register")} className="text-blue-600 underline cursor-pointer">
                                                        Register here
                                                    </span>
                                                </p>
                                            </>
                                            ) : (
                                            <>
                                                <button onClick={register} className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded">
                                                    Register with Email
                                                </button>
                                                <p className="mt-2 text-sm">
                                                    Already have an account?{" "}
                                                    <span onClick={() => setMode("login")} className="text-blue-600 underline cursor-pointer">
                                                        Login here
                                                    </span>
                                                </p>
                                            </>
                                        )}

                                        <div onClick={googleSignin} className='flex border border-gray-300 p-2 rounded-md mt-4 cursor-pointer'>
                                            <img src={google} className='w-6 h-6'/>
                                            <h1 className='font-semibold ml-12'>Continue with Google</h1>
                                        </div>
                                        <h1 className='text-center mt-28 text-xs'>All your personal details are safe with us.</h1>
                                        <h1 className='text-center mt-4 text-xs'>If you continue, you are accepting <span className='text-blue-600'>OLX Terms and <br />Conditions and Privacy Policy</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default Login
