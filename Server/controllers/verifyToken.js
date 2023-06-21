
const jwt = require("jsonwebtoken");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const {OAuth2Client} = require('google-auth-library')






const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    console.log('first cookie is here',cookies)
    let tokenMatch
    let tok = null;

    if (cookies.indexOf('g_state={"i_l":0};') !== -1) {
      console.log("The string 'g_state={\"i_l\":0};' is present in the token.");
      const tokenRegex = /(?<=g_state={.*?}; )\w+=(\w+\..*)/;
      let tokenMatch = cookies.match(tokenRegex);
      if (tokenMatch) {
        tok = tokenMatch[1];
      }
    } else {
      const tokenMatch = cookies.split("=")[1]
      tok  = tokenMatch
    }

    // const token = cookies.split("=")[1];
    const token  = tok
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid TOken" });
      }
      console.log("VERIFYING TOKEN WITH :",user.id);
      req.id = user.id;
    });
    next();
  };

  const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hr",
      });
      console.log("Regenerated Token\n", token);
  
      res.cookie(String(user.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 36 * 100), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });
  
      req.id = user.id;
      next();
    });
  };

  ///googrl authentication

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyGoogletoken = async(token)=> {
  try {
    console.log("Hiii")
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}


  module.exports = {verifyToken,refreshToken,verifyGoogletoken}