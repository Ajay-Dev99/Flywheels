const multer = require('multer');

// set storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/vehicles/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
})


//Upload Setting
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/gif' ||
            file.mimetype == 'image/webp'

        ) {
            cb(null, true)
        }
        else {
            cb(null, false);
            cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
        }
    }
})

module.exports = upload;