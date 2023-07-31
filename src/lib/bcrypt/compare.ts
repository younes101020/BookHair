const bcrypt = require("bcryptjs");

export default function isSamePass(unHashPass: string, hashPass: string) {
    return bcrypt.compare(unHashPass, hashPass).then(function(result: boolean) {
        return result;
    })
};


