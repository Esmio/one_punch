const mongose = require('mongoose');
const Schema = mongoose.Schema;
const Errors = require('../../errors');
const logger = require('../../utils/logger').logger;
const {ObjectId} = Schema.Types;

const PointsOpSchema = Schema({
    userId: {type: ObjectId, require: true, index: true},
    points: {type: Number, require: true},
    ts: {type: Number, default: Date.now.valueOf()},
    type: {type: String}
})

const PointsOpModel = mongoose.model('pointsOp', PointsOpSchema)

module.exports = {
    model: PointsOpModel,
}