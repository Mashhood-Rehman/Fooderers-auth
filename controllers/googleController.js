const { google } = require("googleapis")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET_ID,
    process.env.REDIRECT_URI
)
const dummyPassword = bcrypt.hashSync(crypto.randomUUID(), 10);

const redirectToGoogle = (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]
    });

    res.redirect(authUrl);
};


const googleCallbackController = async (req, res) => {
    const { code } = req.query
    try {

        const { tokens } = await oAuth2Client.getToken(code)

        oAuth2Client.setCredentials(tokens)
        const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client })
        const { data } = await oauth2.userinfo.get()
        if (!data) {
            res.redirect("/")
        }
        let user = await prisma.user.findUnique({ where: { email: data.email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: dummyPassword,
                    profileImg: data.picture
                }
            });
        }

        const token = jwt.sign(
            {
                id: user?.id,
                email: user.email,
                name: user.name,
                profileImg: user.profileImg
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            // secure: true,    // Uncomment this in production
            sameSite: 'strict', maxAge: 3600000 
        }); res.redirect("/");
        
 

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error", error })
    }
}

module.exports = { redirectToGoogle, googleCallbackController }   