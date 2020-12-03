var stream;

export const playVideoFromCamera = async () => {
  try {
    //const constraints = { video: { width: {min : 320}, height: {min: 240}}, audio: true };
    const constraints = { video: {width: 4096, height: 2160}};
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector("video#lectureVideo");
    videoElement.srcObject = stream;
    return stream;
  } catch (error) {
    console.error("Error opening video camera.", error);
  }
};


export const stopVideoFromCamera = async () => {
  stream.getTracks().forEach(track => track.stop());
};
