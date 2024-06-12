import { useNavigate } from "react-router-dom"

export const UserNotLoggedIn = () => {
    
    const nav = useNavigate();

    return (
    <div className="flex flex-col h-full justify-around">
        <div className="flex flex-col gap-5 text-sm font-semibold">
            <p>
                Tagay, Where? is a web application that aims to help
                the public on locating pubs/drinking places for everyone
                to celebrate, unwind, chill and enjoy.
            </p>
            <p>
                A user must sign up/ login in order to place a location
                that he/she knows with its details and is willing to share to the public.
            </p>
            <p>
                Tagay, Where? is not connected or under any company and is made for
                entertainment and assistance purposes only.
            </p>
        </div>
        <button
            className="text-white font-bold rounded-md bg-blue-400 p-2" 
            onClick={() => nav('/login')} 
            type='button'>
                LOGIN TO ADD LOCATIONS
        </button>
    </div>
  )
}
