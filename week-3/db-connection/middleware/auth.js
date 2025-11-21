const isLoggedIn = true;
const isAdmin = true;
//route specific middleware
const authorize = (req, res, next) => {
  if (!isLoggedIn) {
    console.log("user is not logged in");
    return res.status(401).send("Unauthorized");
  }
  console.log("user is logged in");
  next();
};

const checkAdmin = (req, res, next) => {
  if (!isAdmin) {
    return res.status(403).send("Forbidden: Admins only");
  }
  console.log("user is admin and good to go");
  next();
};
module.exports = { authorize, checkAdmin };
