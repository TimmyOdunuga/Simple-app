const { Schema } = require('mongoose')

const UserSchema = new Schema(
  {
    userId: {
        type: String,
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

module.exports = UserSchema