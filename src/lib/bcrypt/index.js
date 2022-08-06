const bcyrpt = require("bcryptjs");

const hash = (value) => bcyrpt.hashSync(value);
const compare = (value, hash) => bcyrpt.compareSync(value, hash);

module.exports = { hash, compare };
