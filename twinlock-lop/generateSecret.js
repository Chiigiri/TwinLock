const crypto = require("crypto");

const secret = crypto.randomBytes(32).toString("hex");
const hash = crypto.createHash("sha256").update(Buffer.from(secret, "hex")).digest("hex");

console.log("🔐 Secret:", secret);
console.log("🔗 Hashlock:", hash);
