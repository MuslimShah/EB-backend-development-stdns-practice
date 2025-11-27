const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
}

function userIsAdmin(req, res, next) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Forbidden, admin only" });
  }
  next();
}

module.exports = { auth, userIsAdmin };
