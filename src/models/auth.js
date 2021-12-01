const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    userName: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

// userSchema.virtual('fullName')
//   .get(function() {
//     return `${this.firstName} ${this.lastName} ${this.userName}`;
//   });

// userSchema.virtual("password").set(function (password) {
//   this._password = password;
// });

// userSchema.pre("save", function (next) {
//   if (this.password) {
//     this.password = hashPassword(this.password);
//   }
//   next();
// });

// userSchema.virtual("password")
//   .get(function() {
//       return this._password;
//   })
//   .set(function(val) {
//     this._password = val;
//     console.log("setting: ", val);
//     this.passwordHash = "test";
//   });

// userSchema.pre("password")
//   .get(() => this._password) // this points to global object
//   .set(() => {schema.pre('save', async function save(next) {
//   if (!this.isModified('password')) return next();
//   try {
//     const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//     this.password = await bcrypt.hash(this.password, salt);
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// schema.methods.validatePassword = async function validatePassword(data) {
//   return bcrypt.compare(data, this.password);
// };
//     this._password = val; // this points to global object
//     console.log("setting: ", val);
//     this.passwordHash = "test";
//   });

// userSchema.pre('save', function(next) {
//   if (this.isModified('password')) { //only if password is modified then hash
//     return bcrypt.hash(this.password, 8, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       this.password = hash; //save hash in UserSchema.password in database
//       next();
//     });
//   }
//   next();
// });

// userSchema.pre('save', function(next) {
//   var myuser = this;
//   var SALT_FACTOR = 5;

//   if (!myuser.isModified('password')) return next();

//   bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(myuser.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       myuser.password = hash;
//       next();
//     });
//   });
// });

// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };



userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});
   
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


const User = mongoose.model("User", userSchema);

exports.User = User;
