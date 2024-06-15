import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie= (userId, res) => {  //Function to generation a token based on the UserId
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { //JWT_SECRET is the secret used to generate the token
        expiresIn: "15d",    //The token will expire in after one day
    });

    res.cookie("jwt" , token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //Days, hour per day, minute per hour, second per minute, and millisecond per second
        httpOnly:true, // Prevents the cookie from being accessed via JavaScript, helping to mitigate XSS attacks
        sameSite:"strict",  // Prevents the browser from sending the cookie along with cross-site requests, helping to prevent CSRF attacks
        secure:process.env.NODE_ENV === "production"  // Ensures the cookie is only sent over HTTPS when in production environment
    })

}



