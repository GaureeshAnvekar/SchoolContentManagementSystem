/* This will handle events related to socket.io
 */

const { v4: uuidV4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("config");
const fs = require("fs");
const redis = require("redis");
const redisClient = redis.createClient(6379, "127.0.0.1");

// @desc     To create a new room by employee during online lecture. Students can join the rooms.
// @access   Public (Used by student and employee)
const socketConnection = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log("connection created" + process.pid);
      //console.log(socket);
      let token = socket.handshake.query.token;
      let scheduleId = socket.handshake.query.scheduleId;
      socket.on("create-room", (employeePeerId) => {
        try {
          let decoded = jwt.verify(token, config.get("jwtStudentPrivateKey"));
          console.log(employeePeerId);
          decoded = {
            userId: decoded.userId,
            userName: decoded.userName,
            schoolId: decoded.schoolId,
            token: token,
            loginType: decoded.loginType,
          };
          let lecturerSocketId = socket.id;
          let msgChatId = uuidV4();

          /*
          global.currentMeetings.set(
            decoded.schoolId,
            new Map().set(scheduleId, [lecturerSocketId, msgChatId])
          );*/


          //Store key-value pair in redis cache so that students in other processes can also find the same class
          objStrValue = "{\"lecturerSocketId\":" + "\""+ lecturerSocketId + "\"" + "," + "\"msgChatId\":" + "\"" + msgChatId + "\"" + "," + "\"studentCount\":" + "\"" + 1 + "\"}";
          redisClient.hset(decoded.schoolId, scheduleId, objStrValue);

          
        
          // create temp folder for file uploads of this meeting
          let dir = __dirname + "/../uploads/temp/" + scheduleId;
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }

          socket.join(msgChatId);
          console.log("room_created");
          socket.emit("room-created");

          console.log(process.pid);
          /*
          socket.on("repeat-room", (repeatDecodedObj) => {
            console.log("repeat");
            global.currentMeetings.set(
              repeatDecodedObj.schoolId,
              new Map().set(repeatDecodedObj.scheduleId, [repeatedDecodedObj.lecturerSocketId, repeatedDecodedObj.msgChatId])
            );
          });

          io.in(msgChatId).emit("repeat-room", decoded);*/
        } catch (err) {
          console.log(err);
         
        }
      });

      // for students
      socket.on("join-room", async (studentData) => {
        
        let token = socket.handshake.query.token;
        let scheduleId = socket.handshake.query.scheduleId;
        let decoded = jwt.verify(token, config.get("jwtStudentPrivateKey"));

        decoded = {
          userId: decoded.userId,
          userName: decoded.userName,
          schoolId: decoded.schoolId,
          token: token,
          loginType: decoded.loginType,
        };
        //let schoolId = global.currentMeetings.get(decoded.schoolId);
        let lecturerAndMsgChatIds;
        
        const redisPromise = () => {
          return new Promise((resolve, reject) => {
            redisClient.hget(decoded.schoolId, scheduleId, (err, value) => {
              if (err) reject(err);
              lecturerAndMsgChatIds = JSON.parse(value);
              resolve(value);
            });
          });
        }

        await redisPromise();

        /*
        await redisClient.hget(decoded.schoolId, scheduleId, (err, value) => {
          console.log(value);
          lecturerAndMsgChatIds = JSON.parse(value);
        });*/
        console.log(lecturerAndMsgChatIds);
        //let lecturerAndMsgChatIds;
        //console.log("schoolid");
        //console.log(decoded.schoolId);
        /*
        if (schoolId) {
          lecturerAndMsgChatIds = global.currentMeetings
            .get(decoded.schoolId)
            .get(scheduleId);
        }*/
        if (lecturerAndMsgChatIds) {
          let msgChatRoom = lecturerAndMsgChatIds.msgChatId;
          let lecturerSocketId = lecturerAndMsgChatIds.lecturerSocketId;
          console.log(lecturerAndMsgChatIds);
          console.log("joined " + msgChatRoom);
          socket.join(msgChatRoom); // join msg chat
          //let studentsConnected = io.sockets.adapter.rooms.get(msgChatRoom).size;
          lecturerAndMsgChatIds.studentCount = parseInt(lecturerAndMsgChatIds.studentCount) + 1;
          redisClient.hset(decoded.schoolId, scheduleId, JSON.stringify(lecturerAndMsgChatIds));
          studentsConnected = lecturerAndMsgChatIds.studentCount;

          if (studentData !== "Test") {
            io.to(lecturerSocketId).emit("student-connected", studentData.peerId);
          

            var fullName = studentData.firstName.charAt(0).toUpperCase() + studentData.firstName.slice(1) + " " + studentData.lastName.charAt(0).toUpperCase() + studentData.lastName.slice(1);
          }
          io.in(msgChatRoom).emit("student-connected-count", {
            count: studentsConnected,
            name: fullName,
          });

          console.log(process.pid);
        } else {
          socket.emit("no-room");
        }
        //socket.join(roomId);
        //socket.to(roomId).broadcast.emit("user-connected", userId);
      });

      //Listen for text messages
      socket.on("chat-message", (info) => {
        
        //let room = Object.keys(socket.rooms)[1];
        
        //let room = Object.keys(socket.rooms)[1];
        let set = socket.rooms;
        let room;
        set.forEach(function(value) {
          room = value;
        });
        io.in(room).emit("message", { message: info.message, name: info.name });
      });

      //upload files
      socket.on("file-upload", (data) => {
        
        let meetingId = data.meetingId;
        let link = "http://easyschool.academy/api/uploads/temp?meetingId=" + meetingId + "&fileName=";
        let allFileLinks = [];
        
        data.files.forEach((name) => {
          
            allFileLinks.push({link: encodeURI(link + name), name: name});
        });
        
        let room = Object.keys(socket.rooms)[1];

        io.in(room).emit("file-download", { fileData: allFileLinks, name: data.name });
        
      })

      socket.on("disconnecting", () => {
        console.log("disconnecting");
        let room = Object.keys(socket.rooms)[1];

        io.in(room).emit("decrement-active");
      });

      socket.on("end-lecture", (data) => {
        // Remove room
        global.currentMeetings.get(data.schoolId).set(data.meetingId, null);
        
        let room = Object.keys(socket.rooms)[1];

        io.in(room).emit("end-lecture");
      });
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = socketConnection;
