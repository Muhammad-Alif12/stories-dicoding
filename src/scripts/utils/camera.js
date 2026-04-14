export class CameraController {
  constructor(statusCamera) {
    this.streaming = false;
    this.cameraVideo = document.getElementById("camera-video");
    this.statusCamera = statusCamera;
  }

  async getStream() {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: true,
        // audio: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // async cameraTakePicture() {
  //   // TODO: draw video frame to canvas
  //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //   const track = stream.getVideoTracks()[0];
  //   const imageCapture = new ImageCapture(track);

  //   // const blob = await imageCapture.takePhoto();

  //   return imageCapture.toDataURL("image/png");

  //   // return blob; // blob
  // }

  async cameraTakePicture() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);

    const bitmap = await imageCapture.grabFrame();

    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        track.stop();
        resolve(blob);
      }, "image/png");
    });
  }

  cameraLaunch(stream) {
    this.cameraVideo.srcObject = stream;
    this.cameraVideo.play();
    this.streaming = true;
  }

  stopCamera() {
    let stream = this.cameraVideo.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      this.cameraVideo.srcObject = null;
      this.streaming = false;
    }
  }

  async init() {
    try {
      if (this.statusCamera) {
        const stream = await this.getStream();
        this.cameraLaunch(stream);
      } else {
        this.stopCamera();
      }
    } catch (error) {
      console.error(error);
      alert(`Error occured : ${error.message || error}`);
    }
  }
}
