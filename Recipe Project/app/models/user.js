//User Schema
const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({

    username: {
        type: String,

    },
    pwd: {
        type: String,

    },
    fname: {
        type: String,
    },
    lname: {
        type: String,

    },
    email: {
        type: String,
    },
    slug: {
        type: String,
        unique: true
    }
});
UserSchema.pre('save', function (next) {
    this.slug = slugify(this.email);
    next();
});
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = mongoose.model('User', UserSchema);