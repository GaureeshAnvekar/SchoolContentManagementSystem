/* This will handle events related to socket.io
 */

const express = require("express");
const { v4: uuidV4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("config");
const fs = require('fs');

// @desc     To create a new room by employee during online lecture. Students can join the rooms.
// @access   Public (Used by student and employee)
const socketConnection = (io) => {
  try {
    io.on("connection", (socket) => {
     
      let token = socket.handshake.query.token;
      let scheduleId = socket.handshake.query.scheduleId;
      socket.on("create-room", (employeePeerId) => {
        try {
          let decoded = jwt.verify(token, config.get("jwtStudentPrivateKey"));

          decoded = {
            userId: decoded.userId,
            userName: decoded.userName,
            schoolId: decoded.schoolId,
            token: token,
            loginType: decoded.loginType,
          };
          let lecturerSocketId = socket.id;
          let msgChatId = uuidV4();

          global.currentMeetings.set(
            decoded.schoolId,
            new Map().set(scheduleId, [lecturerSocketId, msgChatId])
          );
        
          // create temp folder for file uploads of this meeting
          let dir = __dirname + "/../uploads/temp/" + scheduleId;
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }

          socket.join(msgChatId);
          socket.emit("room-created");
        } catch (err) {
          console.log(err);
         
        }
      });

      // for students
      socket.on("join-room", (studentData) => {
        console.log(studentData);
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
        let schoolId = global.currentMeetings.get(decoded.schoolId);
        let lecturerAndMsgChatIds;
        if (schoolId) {
          lecturerAndMsgChatIds = global.currentMeetings
            .get(decoded.schoolId)
            .get(scheduleId);
        }
        if (lecturerAndMsgChatIds) {
          let msgChatRoom = lecturerAndMsgChatIds[1];
          let lecturerSocketId = lecturerAndMsgChatIds[0];
          console.log(msgChatRoom);
          socket.join(msgChatRoom); // join msg chat
          let studentsConnected = io.sockets.adapter.rooms[msgChatRoom].length;
          
          io.to(lecturerSocketId).emit("student-connected", studentData.peerId);

          let fullName = studentData.firstName.charAt(0).toUpperCase() + studentData.firstName.slice(1) + " " + studentData.lastName.charAt(0).toUpperCase() + studentData.lastName.slice(1);
          
          io.in(msgChatRoom).emit("student-connected-count", {
            count: studentsConnected,
            name: fullName,
          });
        } else {
          socket.emit("no-room");
        }
        //socket.join(roomId);
        //socket.to(roomId).broadcast.emit("user-connected", userId);
      });

      //Listen for text messages
      socket.on("chat-message", (info) => {
        
        let room = Object.keys(socket.rooms)[1];

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
