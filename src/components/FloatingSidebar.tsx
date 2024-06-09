import React from 'react';
import { addLocation } from '../services/location';

type FloatingSidebarProps = {
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

export const FloatingSidebar = ({ formData, setFormData }: FloatingSidebarProps) => {

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
        })
    };

    return (
    <div className={`bg-yellow-100 p-3 rounded-md h-[20%] sm:h-screen w-screen sm:w-[30%]`}>
        <div className='flex flex-col justify-between h-full mt-3 text-center overflow-hidden sm:overflow-auto'>
            <h1 className="font-bold text-2xl text-orange-500">
                Tagay, Where?
            </h1>
            <form onSubmit={handleSubmitLocation} className="flex flex-col gap-10 mb-10">
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
                <button className="text-white font-bold rounded-md bg-green-400 p-2" type="submit">ADD LOCATION</button>
            </form>
        </div>
    </div>
  )
}
