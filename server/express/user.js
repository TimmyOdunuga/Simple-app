const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("../mongodb/schema/User");

const router = express.Router();

const User = mongoose.model("User", UserSchema);

const { v4: uuidv4 } = require("uuid");

// router.get('/', async (req, res, next) => {
//     try {
//         let user = new User({
//             userId:uuidv4(),
//             name:'Fatima Mahaam',
//             address:'2389 Washer street, Newton, MA 02119'
//         })

//        const dd = await user.save()
//        console.log(dd)
//       return res.status(200).send({ msg: 'Users retrieved successfully' })
//     } catch (err) {
//       next(err)
//     }
// })

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await User.find({ name });
    console.log(req.body)
    if (!user || user?.length === 0) return res.status(404).send({ error: "Cannot find the user" });
    return res
      .status(200)
      .send({ msg: "User retrieved successfully", data: user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
