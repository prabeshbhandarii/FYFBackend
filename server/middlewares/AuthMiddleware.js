// const authMiddleware = (roles=[]) => (req, res, next) => {
//     const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
//         console.log("token", token)
//     try {
//         if(!token){
//             return res.status(401).json({ message: "Unauthorized! no token available" });
//         }

//         if(roles.length && !roles.includes(req.user.role)){
//             return res.status(403).json({
//                 message: "Access denied!"
//             })
//         }
//         next()
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         })
//     }
// }

// export default authMiddleware;