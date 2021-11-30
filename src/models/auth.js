const mongoose = require("mongoose");

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

// userSchema.virtual("password")
//   .get(() => this._password) // this points to global object
//   .set(val => {
//     this._password = val; // this points to global object
//     console.log("setting: ", val);
//     this.passwordHash = "test";
//   });

userSchema.virtual('save', function(next) {
  if (this.isModified('password')) { //only if password is modified then hash
    return bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash; //save hash in UserSchema.password in database
      next();
    });
  }
  next();
});



const User = mongoose.model("User", userSchema);

exports.User = User;
