import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { BiArrowBack } from "react-icons/bi";

type LoginRegisterPageProp = {
    setUser: React.Dispatch<React.SetStateAction<{} | undefined>>,
}

export const LoginRegisterPage = ({ setUser }: LoginRegisterPageProp) => {
    
    const nav = useNavigate();

    const [tab, setTab] = useState<string>('login');
    
    const TabToRender = () => {
        switch(tab) {
            case 'login':
                return <Login setUser={setUser} />
            case 'register':
                return <Register setUser={setUser} />
        };
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-orange-300">
            <div className="flex flex-col p-3 bg-white rounded-md">
                <div className="flex justify-evenly">
                    <button
                        className={`p-2 bg-gray-200 rounded-md ${tab == 'register' ? 'opacity-50' : 'opacity-100'}`}
                        type="button"
                        onClick={() => setTab('login')} >
                            Login
                    </button>
                    <button
                        className={`p-2 bg-gray-200 rounded-md ${tab == 'login' ? 'opacity-50' : 'opacity-100'}`}
                        type="button"
                        onClick={() => setTab('register')} >
                            Register
                    </button>
                </div>
                {
                    TabToRender()
                }
            </div>
            <button 
                onClick={() => nav('/')}
                type="button" 
                className="flex items-center text-white font-bold gap-3 w-auto mt-3 p-2 bg-blue-400 rounded-md">
                    <BiArrowBack />
                    Back to map
            </button>
        </div>
    )
};