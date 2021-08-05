import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { assignmentsAPI } from "../../../studentBackendAPI";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import { playVideoFromCamera } from "../../../setupWebRTC";
import { Modal } from "react-bootstrap";
import {Progress} from 'reactstrap';
import axios from "axios";

const StudentBeginLecture = (props) => {
  
  const styles = props.location.styles;
  const token = localStorage.getItem("studenttoken");
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [displayProgress, setDisplayProgress] = useState(false);

  const [openExitPopup, setOpenExitPopup] = useState(false);

  if (!socket) {
    setSocket(window.io.connect(
      "http://joseph.easyschool.com:5000?token=" +
      token +
      "&scheduleId=" +
      props.location.meetingId,
      /*
      "http://easyschool.academy?token=" +
        token +
        "&scheduleId=" +
        props.location.meetingId,*/
      {
        path: "/api/sockets",
      }
    ));
    }


    var files;
  //const [activeCount, setActiveCount] = useState(0);

  const setupSocketConnection = (scheduleId) => {
    const peer = new window.Peer(undefined, {
      host: "localhost",
      port: 9000,
      path: "/peerJS",
    });

    peer.on("open", (studentPeerId) => {
      socket.emit("join-room", {
        peerId: studentPeerId,
        firstName: props.location.firstName,
        lastName: props.location.lastName,
      });

      // keep pinging until lecturer starts a lecture
      var timer = window.setInterval(() => {
        socket.emit("join-room", {
          peerId: studentPeerId,
          firstName: props.location.firstName,
          lastName: props.location.lastName,
        });
      }, 5000);

      socket.on("student-connected-count", (info) => {
        let activeCount = document.getElementById("active");
        activeCount.innerHTML = info.count + " " + "Active";
        outputMsgToDOM("has joined", info.name);
        clearInterval(timer);
      });

      socket.on("no-room", () => {
        console.log("no-room");
      });

      socket.on("message", (info) => {
        outputMsgToDOM(info.message, info.name);
      });

      socket.on("decrement-active", () => {
        let activeCount = document.getElementById("active");
        let prevCount = activeCount.innerHTML.split()[0];

        let activeLabel = document.getElementById("active");
        activeLabel.innerHTML = (parseInt(prevCount) - 1) + " " + "Active";
      });

      socket.on("file-download", (data) => {
        outputFileLinksToDOM(data.fileData, data.name);
      });

      socket.on("end-lecture", () => {
        peer.destroy();
        socket.close();
        props.history.goBack();
      })

      peer.on("call", (call) => {
        call.answer();
        call.on("stream", (stream) => {
          const videoElement = document.querySelector("video#lectureVideo");
          videoElement.srcObject = stream;
        });

      });
    });

    setPeer(peer);
  };

  const onSend = (e) => {
    e.preventDefault();

    const msg = document.getElementById("messageArea").value;

    let name = props.location.firstName.charAt(0).toUpperCase() + props.location.firstName.slice(1) + " " + 
                       props.location.lastName.charAt(0).toUpperCase() + props.location.lastName.slice(1);

    if (msg) {
      socket.emit("chat-message", { message: msg, name: name });
    }


    //If there are files, send them
    if (files) {
      sendAttachedFiles(files);
    }
  };


  const sendAttachedFiles = async (files) => {
    const data = new FormData();
    let fileNames = [];
    for(var x = 0; x < files.length; x++) {
        data.append('file', files[x]);
        
        fileNames.push(files[x].name);
    }

    const endPoint = "http://easyschool.academy/api/uploads";

    try {
      setDisplayProgress(true);
      const res = await axios.post(endPoint, data, {
        headers: {
          "meetingId" : props.location.meetingId
        }, onUploadProgress: ProgressEvent => {
          setLoaded( (ProgressEvent.loaded / ProgressEvent.total*100))
      } }, );

      let name = props.location.firstName.charAt(0).toUpperCase() + props.location.firstName.slice(1) + " " + 
                       props.location.lastName.charAt(0).toUpperCase() + props.location.lastName.slice(1);

      socket.emit("file-upload", {meetingId: props.location.meetingId, files: fileNames, name: name});

      setTimeout(() => {
        document.getElementById("fileCount").innerHTML = null;
        setDisplayProgress(false);
        setLoaded(null);
      }, 3000);
      
    } catch (err) {
      console.log(err);
    }

  }

  const outputFileLinksToDOM = (fileData, name) => {
    const p = document.createElement("p");
    p.classList.add("message");
    let anchors = "";

    for (var i = 0; i < fileData.length; i++) {
      let newLink = "<a href=" + fileData[i].link + " download" + " target=_blank>" + " " + fileData[i].name + "</a>";
      anchors = anchors + newLink;

      if (i > 0 && i < fileData.length - 1) anchors += " ,";
    }

    p.innerHTML = `<label><b>${name}: </b></label> ${anchors}`;
    document.querySelector("#chatBox").appendChild(p);

    document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight;
  };


  const outputMsgToDOM = (message, name) => {
    const p = document.createElement("p");
    p.classList.add("message");

    p.innerHTML = `<label><b>${name}: </b></label> ${message}`;
    document.querySelector("#chatBox").appendChild(p);

    document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight;
  };
  useEffect(() => {
    setupSocketConnection(props.location.meetingId);
  }, []);
  return (
    <div className='container-fluid' style={{ height: "inherit" }}>
    <div className='row' style={{ height: "inherit" }}>
      <div
        className='col-sm-8'
        style={{ height: "inherit", backgroundColor: "black" }}
      >
        <video
          id='lectureVideo'
          style={{ height: "100%", width: "100%" }}
          autoPlay
          playsInline
          controls={false}
          muted={true}
        ></video>
      </div>

      <div
        className='col-sm-4'
        style={{
          height: "inherit",
          backgroundColor: "rgb(223, 224, 228)",
          padding: "10px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        <div
          id='activeCount'
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "2px solid",
            borderColor: "rgb(229, 230, 233)",
            borderRadius: "10px",
            height: "5%",
            padding: "5px",
            paddingLeft: "8px",
            marginBottom: "3px",
          }}
        >
          <i class='fa fa-users fa-lg' aria-hidden='true'></i>
          {"  "}
          <label id="active" style={{ color: "green" }}>0 Active</label>
        </div>
        <div
          id='chatBox'
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "2px solid",
            borderColor: "rgb(229, 230, 233)",
            borderRadius: "10px",
            height: "62%",
            padding: "5px",
            maxHeight: "75%",
            overflowY: "scroll",
          }}
        ></div>
        <div
          id='typeMessageBox'
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "2px solid",
            borderColor: "rgb(229, 230, 233)",
            borderRadius: "10px",
            marginTop: "5px",
            height: "31%",
            padding: "10px",
            paddingBottom: "0px"
          }}
        >
          <textarea
            style={{
              width: "100%",
              height: "75%",
              border: "2px solid",
              borderColor: "rgb(229, 230, 233)",
            }}
            placeholder='Enter Message'
            id='messageArea'
          ></textarea>
          <div style={{ width: "100%", textAlign: "center" }}>
            <button
              type='submit'
              className='btn btn-primary btn-sm'
              style={{ ...styles, marginRight: "5px" }}
              onClick={(e) => onSend(e)}
            >
              <i class='fa fa-paper-plane'> </i> Send
            </button>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              multiple
              style={{...styles, marginRight: "5px"}}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("inputFile").value = "";
                document.getElementById("fileCount").innerHTML = null;
                document.getElementById("inputFile").click();
              }}
            >
              <i class='fa fa-paperclip'> </i> Attach a file
            </button>

            <button
                type='button'
                className='btn btn-primary btn-sm'
                multiple
                style={styles}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenExitPopup(true);
                }}
              >
                <i class='fa fa-sign-out'> </i> Exit
              </button> 
            
              {" "}
            <label id='fileCount'></label>
            <input id='inputFile' type='file' name='file' multiple style={{display: "none"}} onChange={(e) => {
              let word;
              let count = e.target.files.length;
              console.log(count);
              count > 1 ? word = "files" : word = "file";
              document.getElementById("fileCount").innerHTML = " " + count + " " + word; 
              files = e.target.files;
              
  
            }}></input>
          </div>
          
          <div class="form-group" style={{paddingTop: "2px"}}>
          { displayProgress ? 
          <Progress max="100" color="success" value={loaded} >{Math.round(loaded,2) }%</Progress>
              : null }
          </div>

          <Modal show={openExitPopup} onHide={() => setOpenExitPopup(false)}>
        <Modal.Header closeButton>
          Are you sure you want exit the room?
        </Modal.Header>
        <Modal.Footer>
          <button
            type='submit'
            className='btn btn-primary btn-sm'
            style={styles}
            onClick={(e) => {
              e.preventDefault();
            

              setOpenExitPopup(false);

              peer.destroy();
              socket.close();

              props.history.goBack();
  
              
            }}
          >
            Yes
          </button>
          <button
            type='submit'
            className='btn btn-primary btn-sm'
            style={styles}
            onClick={(e) => {
              e.preventDefault();
             setOpenExitPopup(false);
            }}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
    </div>
  </div>
  );
};

StudentBeginLecture.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default StudentBeginLecture;
