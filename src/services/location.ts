import { supabase } from "../supabase-config";

interface LocationData {
    name: string;
    info: string;
    lat: string;
    long: string;
}

export const fetchLocations = async () => {
    const { data:fetchedData, error:errorFetch } = await supabase
        .from('locations')
        .select()
    
    if(fetchedData) {
        return fetchedData;
    } else {
        errorFetch && console.error("error fetching");
    }    
};

export const addLocation = async (formData:LocationData) => {
    try {
        const { error:insertError } = await supabase
            .from('locations')
            .insert(formData)

        insertError && console.error("error adding");
    } catch(e) {
        console.error("catch error in adding: ", e);
    }
};