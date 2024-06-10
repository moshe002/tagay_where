import { supabase } from "../supabase-config";

type CreateUserProps = {
    email: string,
    password: string,
    username: string,
}

export const createUser = async (formData:CreateUserProps) => {
    const { data:signUpData, error:signUpError } = await supabase.auth.signUp(
        {
            email: formData.email,
            password: formData.password,
            options: {
                    data: {
                    username: formData.username,
                }
            }
        }
    );
    if(signUpData) {
        return signUpData;
        //console.log(signUpData);
    } else {
        console.error(signUpError);
    }
};

export const loginUser = async (email:string, password:string) => {
    const { data:loginData, error:loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if(loginData) {
        return loginData
        // console.log(loginData);
    } else {
        console.error(loginError);
    }
};

export const fetchUser = async () => {
    const { data: { user:userFetched } } = await supabase.auth.getUser();
    return userFetched;
};

export const logoutUser = async () => {
    const { error:logoutError } = await supabase.auth.signOut();
    
    logoutError && console.error(logoutError);
};