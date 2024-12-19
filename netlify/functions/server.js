// server.js
const { send } = require('@netlify/functions');
const inviteCodeService = require('./inviteCode'); // inviteCode.js 파일을 import

// 요청을 처리하는 함수
exports.handler = async (event, context) => {
    const method = event.httpMethod;

    // POST 메소드로 초대 코드 생성 요청을 처리
    if (method === 'POST' && event.path === '/generateInviteCode') {
        const response = await inviteCodeService.handler(event); // inviteCode.js에서 코드 생성
        return send({
            statusCode: response.statusCode,
            body: response.body
        });
    }

    // GET 메소드로 초대 코드 유효성 검사 요청을 처리
    if (method === 'GET' && event.path === '/checkInviteCode') {
        const { code } = event.queryStringParameters; // URL 쿼리 파라미터에서 코드 받기
        const response = await inviteCodeService.handler(event); // inviteCode.js에서 유효성 검사
        return send({
            statusCode: response.statusCode,
            body: response.body
        });
    }

    // 잘못된 요청에 대해 405 Method Not Allowed 반환
    return send({
        statusCode: 405,
        body: 'Method Not Allowed'
    });
};
