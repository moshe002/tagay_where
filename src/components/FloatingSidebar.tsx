import React, { useState, useEffect } from 'react';
import { addLocation } from '../services/location';
import { logoutUser, fetchUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FloatingSidebarProps = {
    user: {} | undefined,
    setUser: React.Dispatch<React.SetStateAction<{} | undefined>>,
    formData: {
        name: string;
        info: string;
        coordinates: {
            lang: string;
            long: string;
        };
    },
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        info: string;
        coordinates: {
            lang: string;
            long: string;
        };
    }>>
};

export const FloatingSidebar = ({ 
    user,
    setUser,
    formData, 
    setFormData }: FloatingSidebarProps) => {

    const nav = useNavigate();

    const [retrieveUser, setRetrieveUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        };
    }, [])

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'lang' || name === 'long') {
            setFormData({
              ...formData,
              coordinates: {
                ...formData.coordinates,
                [name]: value,
              },
            });
          } else {
            setFormData({
              ...formData,
              [name]: value,
            });
          }
    };

    const handleSubmitLocation = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const dataToSend = {
            name: formData.name,
            info: formData.info,
            lat: formData.coordinates.lang.toString(),
            long: formData.coordinates.long.toString(),
        };
        await addLocation(dataToSend);

        setFormData({
            name: "",
            info: "",
            coordinates: {
                lang: "",
                long: "",
            }
        });
        setLoading(false);
    };

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem('user');
        setUser({});
        location.reload();
    };

    const fetchedUser = fetchUser();
    fetchedUser.then(res => setRetrieveUser(res?.user_metadata.username));

    return (
    <div className={`bg-yellow-100 p-5 rounded-md h-[20%] sm:h-screen w-screen sm:w-[30%]`}>
        <div className='flex flex-col justify-between h-full text-center overflow-hidden sm:overflow-auto'>
            <h1 className="font-bold text-2xl text-orange-500">
                Tagay, Where?
            </h1>
            {
                !user ? 
                <button
                    className="text-white font-bold rounded-md bg-blue-400 p-2 mb-5" 
                    onClick={() => nav('/login')} 
                    type='button'>
                        LOGIN TO ADD LOCATIONS
                </button>
                :
                <form onSubmit={handleSubmitLocation} className="flex flex-col items-center gap-5 mb-5">
                    <div className='flex flex-col'>
                        <label htmlFor="name">Name of area</label>
                        <input
                            className='text-center text-lg outline-none'
                            value={formData.name}
                            onChange={handleInputChange} 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder=""
                            required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="info">Additional Info</label>
                        <textarea 
                            className='text-center text-lg outline-none' 
                            value={formData.info}
                            onChange={handleInputChange}
                            name="info" 
                            id="info" 
                            cols={30}
                            rows={5}
                            placeholder=''
                            required ></textarea>
                    </div>
                    <div>
                        <h1>Coordinates</h1>
                        <div className='flex gap-2'>
                            <div>
                                <label className='text-sm' htmlFor="lang">Langitude</label>
                                <input
                                    className='w-28 text-center text-lg outline-none'
                                    value={formData.coordinates.lang}
                                    onChange={handleInputChange} 
                                    type="number" 
                                    id="lang" 
                                    name="lang" 
                                    placeholder=""
                                    required />
                            </div>
                            <div>
                                <label className='text-sm' htmlFor="long">Longitude</label>
                                <input
                                    className='w-28 text-center text-lg outline-none'
                                    value={formData.coordinates.long}
                                    onChange={handleInputChange}  
                                    type="number" 
                                    id="long" 
                                    name="long" 
                                    placeholder=""
                                    required />
                            </div>
                        </div>
                    </div>
                    <button className="text-white font-bold rounded-md bg-green-400 p-2" type="submit">
                        {
                            loading ?
                            <p className='animate-spin text-2xl'>
                                <AiOutlineLoading3Quarters />
                            </p>
                            :
                            'ADD LOCATION'
                        }
                    </button>
                    <button
                        onClick={handleLogout} 
                        className="text-white font-bold rounded-md bg-red-400 p-2" 
                        type='button'>
                            {`LOGOUT ${retrieveUser}`}
                    </button>
                </form>
            }
        </div>
    </div>
  )
}
