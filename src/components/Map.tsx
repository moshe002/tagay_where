import { useEffect } from 'react';
import { 
    MapContainer, 
    Popup, 
    TileLayer, 
    Marker,
    useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, Icon } from 'leaflet';
import { fetchLocations } from '../services/location';

type MapProps = {
    fetchedLocations: any[] | undefined,
    setFetchedLocations: React.Dispatch<React.SetStateAction<any[] | undefined>>,
    clickedPosition: LatLngExpression | null,
    setClickedPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>,
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
    }>>,
};

export const Map = ({ 
    fetchedLocations,
    setFetchedLocations,
    clickedPosition,
    setClickedPosition,
    formData,
    setFormData,
}:MapProps) => {
    
    //10.333332 123.749997 my coords
    // 10.298822 123.895966 cebu coords
    useEffect(() => {
        fetchDataFromDb();
    }, [formData, setClickedPosition])

    const fetchDataFromDb = async () => {
        setFetchedLocations(await fetchLocations());
    };

    const handleMapClick = (e:any) => {
        // console.log(e.latlng.lat);
        // console.log(e.latlng.lng);
        setFormData({
            ...formData,
            coordinates: {
                ...formData.coordinates,
                lang: e.latlng.lat,
                long: e.latlng.lng,
            }
        });
        setClickedPosition(e.latlng);
    };

    // for the map skins
    const MAP_ACCESS_TOKEN:string = import.meta.env.VITE_MAP_ACCESS_TOKEN;

    // var Jawg_Streets = L.tileLayer('https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	// attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	// minZoom: 0,
	// maxZoom: 22,
	// accessToken: '<your accessToken>'
    // });

    // const markers = [
    //     {
    //       geocode: [48.86, 2.3522],
    //       popUp: "Hello, I am pop up 1"
    //     },
    //     {
    //       geocode: [48.85, 2.3522],
    //       popUp: "Hello, I am pop up 2"
    //     },
    //     {
    //       geocode: [48.855, 2.34],
    //       popUp: "Hello, I am pop up 3"
    //     }
    //   ];

    const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: './icon/beer.png',
    iconSize: [38, 38] // size of the icon
    });

    const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick
        });

        return clickedPosition === null ? null : (
            <Marker position={clickedPosition} icon={customIcon}>
                <Popup position={clickedPosition}>
                    {
                        //<h1>You clicked at {clickedPosition.toString()}</h1>
                    }
                    <h1>If you think you can drink/tagay here, add the location.</h1>
                </Popup>
            </Marker>
        );
    };

    return (
        <MapContainer center={[10.298822, 123.895966]} zoom={17} scrollWheelZoom={true}>
            <TileLayer
                attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${MAP_ACCESS_TOKEN}`}
            />
            {
                // <Marker position={clickedPosition} icon={customIcon}>
                //     <Popup>
                //         A pretty CSS3 popup. <br /> Easily customizable.
                //     </Popup>
                // </Marker>
            }
            <MapClickHandler />
            {
                fetchedLocations?.map((location, index) => {

                    return (
                        <Marker key={index} position={[location.lat, location.long]} icon={customIcon}>
                            <Popup position={[location.lat, location.long]}>
                                <div className='flex flex-col items-center text-center'>
                                    <div>
                                        <h1 className='font-bold text-lg text-orange-500'>Name of place:</h1>
                                        <h1 className='text-lg font-bold'>{location.name}</h1>  
                                    </div>
                                    <div>
                                        <h1 className='font-bold text-lg text-orange-500'>Info:</h1>
                                        <p className='font-bold'>{location.info}</p>
                                    </div>
                                    <div className='flex gap-10'>
                                        <p>Lat: {location.lat}</p>
                                        <p>Long: {location.long}</p>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })
            }
        </MapContainer>
    )
}
