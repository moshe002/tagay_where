import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/auth';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type RegisterProps = {
    email: string,
    password: string,
    username: string,
};

type RegisterUserProp = {
    setUser: React.Dispatch<React.SetStateAction<{} | undefined>>,
};

export const Register = ({ setUser }: RegisterUserProp) => {
  
    const nav = useNavigate();
    
    const [register, setRegister] = useState<RegisterProps>({
        email: "",
        password: "",
        username: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
            setRegister({
                ...register,
                [name]: value,
            });
    };

    const handleSubmitLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const registeredUser = await createUser(register);
            setUser(registeredUser);
            localStorage.setItem('user', JSON.stringify(registeredUser));
            nav('/');
        } catch(e) {
            console.error("error registering: ", e);
        }

        setRegister({
            email: "",
            password: "",
            username: "",
        });
        setLoading(false);
    };
  
    return (
        <div className="p-5">
            <form className='flex flex-col items-center gap-5' onSubmit={handleSubmitLogin}>
                <div className='flex flex-col'>
                    <label htmlFor="username">Username</label>
                    <input
                        className='text-center text-lg outline-none border-2 rounded-md'
                        onChange={handleInputChange}
                        id="username"
                        name="username" 
                        type="username" 
                        placeholder="" 
                        required />
                </div>
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
                <button className="text-white font-bold rounded-md bg-green-400 p-2" type="submit">
                    {
                        loading ?
                        <p className='animate-spin text-2xl'>
                            <AiOutlineLoading3Quarters />
                        </p>
                        :
                        'REGISTER'
                    }
                </button>
            </form>
        </div>
  )
};
