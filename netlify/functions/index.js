const path = require('path');
const fs = require('fs');
const { Handler } = require('@netlify/functions');

const handler = async (event, context) => {
  try {
    // index.html 파일을 읽어오는 경로 설정
    const indexPath = path.join(__dirname, '..', 'index.html');
    const indexFile = fs.readFileSync(indexPath, 'utf8');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: indexFile,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};

exports.handler = handler;
