const crypto = require("crypto");

exports.handler = async (event) => {
    const method = event.httpMethod;

    if (method === "POST") {
        const inviteCode = crypto.randomBytes(3).toString("hex");
        return {
            statusCode: 200,
            body: JSON.stringify({ inviteCode }),
        };
    }

    if (method === "GET") {
        const { code } = event.queryStringParameters;
        // 초대코드 유효성 검사를 수행하세요 (현재는 예시로 무조건 유효)
        const isValid = code ? true : false;
        return {
            statusCode: 200,
            body: JSON.stringify({ isValid }),
        };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
