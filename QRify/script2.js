const QRify = new QRCodeStyling({
  width: 200,
  height: 200,
  type: "svg",
  data: "Hello",
  margin: 10,
  dotsOptions: {
    color: "black",
    type: "square",
  },
  qrOptions: {
    typeNumber: 0,
    errorCorrectionLevel: "H",
  },
  backgroundOptions: {
    color: "#fff",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 0,
  },
  cornersSquareOptions: {
    color: "black",
    type: "square",
  },
  cornersDotOptions: {
    color: "black",
    type: "square",
  }
});

QRify.append(document.getElementById("canvas"));
