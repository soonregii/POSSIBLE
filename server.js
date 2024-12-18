const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 초대 코드 목록 (예시)
let validInviteCodes = ['1234', 'abcd', '5678'];  // 기본 초대 코드

// 클라이언트에 정적 파일 제공 (예: 이미지, CSS, JS 파일 등)
app.use(express.static('public'));

// 초대 코드 설정을 위한 라우트
app.use(express.json());  // JSON 요청을 처리할 수 있도록 설정

app.post('/setInviteCode', (req, res) => {
    const { inviteCode } = req.body;
    if (inviteCode && !validInviteCodes.includes(inviteCode)) {
        validInviteCodes.push(inviteCode);
        return res.json({ success: true, message: '초대 코드가 성공적으로 추가되었습니다.' });
    }
    res.status(400).json({ success: false, message: '초대 코드가 잘못되었거나 이미 존재합니다.' });
});

// 소켓 연결 처리
io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    // 초대 코드 확인
    socket.on('checkInviteCode', (inviteCode, callback) => {
        if (validInviteCodes.includes(inviteCode)) {
            callback({ success: true });
        } else {
            callback({ success: false, message: '잘못된 초대 코드입니다.' });
        }
    });

    // 이미지 업로드 처리
    socket.on('uploadImage', (data) => {
        socket.broadcast.emit('newImage', data);
    });

    socket.on('disconnect', () => {
        console.log('사용자가 연결을 끊었습니다.');
    });
});

// 서버 실행
server.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
