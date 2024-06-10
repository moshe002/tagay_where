import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type LoginProps = {
    email: string,
    password: string,
};

type LoginUserProp = {
    setUser: React.Dispatch<React.SetStateAction<{} | undefined>>,
};

export const Login = ({ setUser }: LoginUserProp) => {
  
    const nav = useNavigate();

    const [login, setLogin] = useState<LoginProps>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
            setLogin({
                ...login,
                [name]: value,
            });
    };

    const handleSubmitLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userLoggedIn = await loginUser(login.email, login.password);
            setUser(userLoggedIn);
            localStorage.setItem('user', JSON.stringify(userLoggedIn));
            nav('/');
        } catch(e) {
            console.error('error loggin in: ', e);
        }
        // console.log(typeof userLoggedIn);
        // console.log("user logged in: ", userLoggedIn);

        setLogin({
            email: "",
            password: "",
        })
        setLoading(false);
    };
  
    return (
        <div className="p-5">
            <form className='flex flex-col items-center gap-5' onSubmit={handleSubmitLogin}>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input
                        className='text-center text-lg outline-none border-2 rounded-md'
                        onChange={handleInputChange}
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="" 
                        required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input
                        className='text-center text-lg outline-none border-2 rounded-md'
                        onChange={handleInputChange}
                        id="password"
                        name="password" 
                        type="password" 
                        placeholder="" 
                        required />
                </div>
                <button 
                    className={`text-white font-bold rounded-md bg-green-400 p-2`} 
                    type="submit">
                    {
                        loading ?
                        <p className='animate-spin text-2xl'>
                            <AiOutlineLoading3Quarters />
                        </p>
                        :
                        'LOGIN'
                    }
                </button>
            </form>
            <p className='text-xs mt-3 italic opacity-80 text-gray-500'>No account? go to the register tab and sign up.</p>
        </div>
  )
};
