const APP_ID = 'wx7cd92b4f59594222';
const APP_SECRET = '73693bd32185212e64a7ac4ae757bea0';
const axios = require('axios');
const Errors = require('../errors');
const redis = require('../services/redis_service');
const WECHAT_USER_ACCESS_TOKEN_BY_CODE_PREF = 'wechat_user_access_token_by_code:'
const WECHAT_USER_REFRESH_TOKEN_BY_CODE_PREF = 'wechat_user_refresh_token_by_code:'

async function getAccessTokenByCode(code) {
    if(!code) throw new Errors.ValidationError('code', 'code can not be empty');

    let tokenObj =  await getAccessTokenFromCache(code)

    if (!tokenObj) {
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`
        tokenObj = await axios.get(url)
            .then(r => {
                if (!r || !r.data) throw new Errors.WechatAPIError('invalid wechat api response')
                return r.data;
            })
            .catch(e => {
                console.log(e)
            })
    }
    await saveUserAccessToken(code, tokenObj)
    await saveRefreshToken(code, tokenObj)
    return tokenObj
}

async function saveRefreshToken(code, tokenObj) {
    if (!code) throw new Errors.ValidationError('code', 'code can not be empty');
    if (!tokenObj || !tokenObj.refreshToken) throw new Errors.ValidationError('access_token_obj', 'access_token can not be empty');
    await redis.set(WECHAT_USER_REFRESH_TOKEN_BY_CODE_PREF + code, tokenObj.refresh_token)
        .catch(e => {
            throw Errors.RedisError(`setting wechat user refresh token failed cause: ${e.message}`);
        });
    await redis.expire(WECHAT_USER_REFRESH_TOKEN_BY_CODE_PREF + code, 28 * 24 * 60 * 60)
        .catch(e => {
            throw Errors.RedisError(`expiring wechat user refresh token failed cause: ${e.message}`);
        });
}

async function refreshAccessToken(refreshToken) {
    const url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${APP_ID}&grant_type=refresh_token&refresh_token=${refreshToken}`
    const tokenObj = await axios.get(url)
        .then(r => {
            if (!r || !r.data) throw new Errors.WechatAPIError('invalid wechat api response')
            return r.data;
        })
    return tokenObj;
}

async function saveUserAccessToken(code, tokenObj) {
    if (!code) throw new Errors.ValidationError('code', 'code can not be empty');
    if (!tokenObj || !tokenObj.access_token) throw new Errors.ValidationError('access_token_obj', 'access_token can not be empty');
    await redis.set(WECHAT_USER_ACCESS_TOKEN_BY_CODE_PREF + code, tokenObj.access_token)
        .catch(e=>{
            throw Errors.RedisError(`setting wechat user access token failed cause: ${e.message}`);
        });
    await redis.expire(WECHAT_USER_ACCESS_TOKEN_BY_CODE_PREF + code, 7000)
        .catch(e => {
            throw Errors.RedisError(`expiring wechat user access token failed cause: ${e.message}`);
        });
}

async function getAccessTokenFromCache(code) {
    let accessToken = await redis.get(WECHAT_USER_ACCESS_TOKEN_BY_CODE_PREF + code)
        .catch(e => {
            throw Errors.RedisError(`getting wechat user access token failed cause: ${e.message}`);
        });

    if(!accessToken) {
        let refreshToken = await redis.get(WECHAT_USER_REFRESH_TOKEN_BY_CODE_PREF + code)
            .catch(e => {
                throw Errors.RedisError(`getting wechat user refresh token failed cause: ${e.message}`);
            });

        if (!refreshToken) return null;

        if (refreshToken) {
            const tokenObj = await refreshAccessToken(refreshToken)
            return tokenObj
        }
    }

    return {refreshToken, accessToken}
}

async function getUserInfoByAcessToken(openId, accessToken) {
    const url = `https://api.weixin.qq.com/sns/userinfo?acccess_token=${accessToken}&openid=${openId}&lang=zh_CN`;
    const user = await axios.get(url)
        .then(r => {
            if(!r || !r.data) throw new Errors.WechatAPIError('invalid wechat api response');
            return r.data;
        })
    return user;
}

async function getUserInfoByCode(code) {
    const tokenObj = await getAccessTokenByCode(code);
    const user = await getUserInfoByAcessToken(tokenObj.openid, tokenObj.access_token);
    return user
}

module.exports = {
    getAccessTokenByCode,
    getUserInfoByCode
}