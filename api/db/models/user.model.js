const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { resolve } = require("path");
const { reject } = require("lodash");
/* jwt secret */
const jwtSecret = "nsr6rws75yo92gfcz1y1w690obbg4yp52km0vgzk";
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlenghth: 1,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlenghth: 8,
    },
    sessions: {
        token: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Number,
            required: true,
        },
    },
});
/* Instance methods */

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    /* return the document except the password and sessions (these shouldn't be available) */
    return _.onit(userObject, ["password", "sessions"]);
};

UserSchema.methods.generateAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        /* Create the JSON web token and return that */
        jwt.sign({ _id: user._id.toHexString() },
            jwtSecret, { expireIn: "15m" },
            (err, token) => {
                if (!err) {
                    resolve(token);
                } else {
                    /* there is an error */
                    reject();
                }
            }
        );
    });
};

UserSchema.methods.generateRefreshAuthToken = function() {
    /* this method simply generates a 64bit hex string - it doesn't save it to the databse. saveSessionToDatabase() does that. */
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (!err) {
                let token = buf.toString("hex");
                return resolve(token);
            }
        });
    });
};
let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshAuthTokenExpiryTime();
        user.sessions.push({ 'token': refreshToken, expiresAt });
    })
}

let generateRefreshAuthTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire)
}