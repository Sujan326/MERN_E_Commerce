import jwt from "jsonwebtoken";

// Authorize Admin for doing admin related works.
const adminAuth = async (req, res, next) => {
  try {
    const adminToken = req.headers.admintoken;

    // check for the adminToken
    if (!adminToken) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }
    // decode the received token
    const adminTokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);

    // we have created the adminToken using admin email and password, so while decoding check whether the email and password are matching
    if (
      adminTokenDecode.email !== process.env.ADMIN_EMAIL ||
      adminTokenDecode.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
