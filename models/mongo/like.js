const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Errors = require('../../errors');
const logger = require('../../utils/logger');
const {ObjectId} = Schema.Types;

const LikeSchema = Schema({
    attachedId: {type: ObjectId, required: true, index: true},
    userId: {type: ObjectId, required: true, index: true},
    type: {type: String, enum: ['topic', 'reply', 'user'], required: true},
    ts: {type: Number, default: Date.now().valueOf()},
})

LikeSchema.index({userId: 1, attachedId: 1})

const LikeModel = mongoose.model('like', LikeSchema)

module.exports = {
    model: LikeModel,
}