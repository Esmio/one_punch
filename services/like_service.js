const User = require('../models/mongo/user');
const Topic = require('../models/mongo/topic');
const Like = require('../model/mongo/like');
const {ObjectId} = require('mongoose').Types;

async function likeTopic (userId, attachedId) {
    await User.incrPoints(ObjectId(userId), 10)
    await Topic.likeATopic(attachedId)
    return true
}

async function likeReply (userId, attachedId) {

}

async function dislikeTopic (userId, attachedId) {

}

async function dislikeReply (userId, attachedId) {

}

module.exports = {
    likeReply,
    likeTopic,
    dislikeTopic,
    dislikeReply,
}