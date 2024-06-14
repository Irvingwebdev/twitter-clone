//Defined the safe route functions and showing a message in the json format
export const singup=async (req,res)=>{
    res.json({
        data:"You hit the sign up endpoint"
    });
}

export const login=async (req,res)=>{
    res.json({
        data:"You hit the login up endpoint"
    });
}

export const logout=async (req,res)=>{
    res.json({
        data:"You hit the logout endpoint"
    });
}