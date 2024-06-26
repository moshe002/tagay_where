import { useState } from 'react';
import { Map } from "../components/Map";
import { FloatingSidebar } from "../components/FloatingSidebar";
import { LatLngExpression } from 'leaflet';

type MapPageProp = {
    user: {} | undefined,
    setUser: React.Dispatch<React.SetStateAction<{} | undefined>>,
};

export const MapPage = ({ user, setUser }: MapPageProp) => {

    const [formData, setFormData] = useState({
        name: "",
        info: "",
        coordinates: {
          lang: "",
          long: "",
        }
    });
    const [fetchedLocations, setFetchedLocations] = useState<any[] | undefined>();
    const [clickedPosition, setClickedPosition] = useState<LatLngExpression | null>(null);
    
    return (
        <div className="flex flex-col h-screen sm:flex-row items-center justify-center">
        <FloatingSidebar
            user={user}
            setUser={setUser}
            formData={formData}
            setFormData={setFormData} />
        <Map
            formData={formData}
            setFormData={setFormData}
            fetchedLocations={fetchedLocations}
            setFetchedLocations={setFetchedLocations}
            clickedPosition={clickedPosition}
            setClickedPosition={setClickedPosition} />    
        </div>
    )
};