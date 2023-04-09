export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if(userStr){
        user = JSON.parse(userStr);
    }

    if(user && user.jwtToken){
        return {Authorization: "Bearer "+ user.jwtToken};
    }else {
        return {Authorization: ""};
    }
}