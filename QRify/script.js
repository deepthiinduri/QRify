
let color = "#2a2aff";
let color2 = "#ff0000";
let color3 = "#2a2aff";
let color4 = "#ff0000";
let color5 = "#2a2aff";
let color6 = "#ff0000";
let data = "QRify";
let gradientType = "linear";
let style = id("style");
let selectGradient = all("#select-gradient");

let allhides = all(".hide");
const scrollableDiv = id("scroll");
let textinput = id("input_text");

selectGradient.forEach((select) => {
  select.addEventListener("change", (e) => {
    let controls = select.parentNode.parentNode.parentNode;
    let hideElement = controls.querySelectorAll(".hide");
    let hideColor = controls.querySelector("#hideColor");

    if (e.target.value == 2) {
      hideElement.forEach((element) => {
        element.style.display = "flex";
      });
      hideColor.style.display = "none";
    } else {
      hideElement.forEach((element) => {
        element.style.display = "none";
      });
      hideColor.style.display = "flex";
      checkActiveOfDot();
    }
  });
});

function checkActiveOfDot() {
  if (id("dots").classList.contains("active")) {
    resetDotsG();
  }
  if (id("corner-square").classList.contains("active")) {
    resetSquareG();
  }

  if (id("corner-dot").classList.contains("active")) {
    resetCornerG();
  }
}

function resetQR() {
  QRify.update({
    width: 200,
    height: 200,
    type: "svg",
    image: null,
    data: "QRify",
    margin: 10,
    dotsOptions: {
      color: "black",
      type: "square",
      gradient: false,
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
      gradient: false,
    },
    cornersDotOptions: {
      color: "black",
      type: "square",
      gradient: false,
    },
  });
  resetSelect()
  resetInputs()
  resetUrlandfile()
}

function full(){
  document.body.requestFullscreen()
}

function resetSelect() {
  const selecteds = all('select')
  selecteds.forEach(s => {
    s.value = s.options[0].value
  })

}
function resetInputs() {
  const inputElements = all('input')
  inputElements.forEach(e => {
    e.value = e.defaultValue
  })
}

function Height(e) {
  QRify.update({
    height: e.value,
  });
}
function Width(e) {
  QRify.update({
    width: e.value,
  });
}
function Margin(e) {
  QRify.update({
    margin: e.value,
  });
}

function ClearImage() {
  QRify.update({
    image: null,
  });
  resetUrlandfile()
}
function resetUrlandfile() {
  const inputs = all('input[type="url"], input[type="file"]');
  inputs.forEach(e => e.value = null)
}


let name1 = "QRify";
let extension1 = "png";
let mainQuality = 1000;

function updateName(e) {
  name1 = e.value;
}
function extension(e) {
  extension1 = e.value;
}

function updateurlImage(e) {
  QRify.update({
    image: e.value,
  });
}

function updateQulity(e) {
  mainQuality = e.value;
}
function download() {
  const svg = document.querySelector('svg');
  const width = mainQuality;
  const height = mainQuality;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const images = svg.querySelectorAll('image');
  const imagePromises = [];
  images.forEach((image) => {
    const p = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
          const base64data = reader.result;
          image.setAttribute('href', base64data);
          resolve();
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', image.getAttribute('href'));
      xhr.responseType = 'blob';
      xhr.send();
    });
    imagePromises.push(p);
  });

  Promise.all(imagePromises).then(() => {

    const svgUrl = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(svgUrl);
    img.onload = function() {
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 1.0;
      let pngUrl = canvas.toDataURL(`image/${extension1}`, quality);
      while (pngUrl.length < 40000) {
        quality -= 0.05;
        pngUrl = canvas.toDataURL(`image/${extension1}`, quality);
      }

      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${name1}.${extension1}`;
      changeIcon()
      downloadLink.click();
    };
  });
}
function changeIcon(){
  let dwn = document.querySelector('#dwn')
  let dwn2 = document.querySelector('#dwn2')
 dwn.innerText = "downloading"
 dwn2.innerText = "downloading"
  setTimeout(()=>{
     dwn.innerText = "download"
 dwn2.innerText = "download"
  },2000)
}

function resetSquareG() {
  QRify.update({
    cornersSquareOptions: {
      gradient: false,
    },
  });
}
function resetCornerG() {
  QRify.update({
    cornersDotOptions: {
      gradient: false,
    },
  });
}

function updateAllColor(e) {
  let ccl = e.value;
  QRify.update({
    dotsOptions: {
      color: ccl,
    },
    cornersSquareOptions: {
      color: ccl,
    },
    cornersDotOptions: {
      color: ccl,
    },
  });
}
function resetDotsG() {
  QRify.update({
    dotsOptions: {
      gradient: false,
    },
  });
}

function updateBringFront(e) {
  if (e.checked) {
    QRify.update({
      imageOptions: {
        hideBackgroundDots: false,
      },
    });
  } else {
    QRify.update({
      imageOptions: {
        hideBackgroundDots: true,
      },
    });
  }
}

function ErrorCorrection(e) {
  QRify.update({
    qrOptions: {
      errorCorrectionLevel: e.value,
    },
  });
}

function updateImageMargin(e) {
  QRify.update({
    imageOptions: {
      margin: e.value,
    },
  });
}
function updateimageSize(e) {
  if (e.value > 0.5) {
    alert("image size should below 0.5");
  }
  QRify.update({
    imageOptions: {
      imageSize: e.value,
    },
  });
}
let image;
let imageUrl;
function updateImage(e) {
  image = e.files[0];
  imageUrl = URL.createObjectURL(image);
  QRify.update({
    image: imageUrl,
  });
}
function updateBackgroundColor(e) {
  QRify.update({
    backgroundOptions: {
      color: e.value,
    },
  });
}

function updatecornerdotsGtype(e) {
  QRify.update({
    cornersDotOptions: {
      gradient: {
        type: e.value,
        colorStops: [
          { offset: 0, color: color5 },
          { offset: 1, color: color6 },
        ],
      },
    },
  });
}

function updatecornerdotsGtype1(e) {
  QRify.update({
    cornersDotOptions: {
      gradient: {
        type: gradientType,
        colorStops: [
          { offset: 0, color: color5 },
          { offset: 1, color: color6 },
        ],
      },
    },
  });
}
function updatecornerdotsColor1(e) {
  color5 = e.value;
  QRify.update({
    cornersDotOptions: {
      gradient: {
        colorStops: [{ offset: 1, color: color5 }],
      },
    },
  });
  updatecornertimeout();
}
function updatecornerdotsColor2(e) {
  color6 = e.value;
  QRify.update({
    cornersDotOptions: {
      gradient: {
        colorStops: [{ offset: 0, color: color5 }],
      },
    },
  });
  updatecornertimeout();
}

function updateDotColor(e) {
  QRify.update({
    cornersDotOptions: {
      color: e.value,
    },
  });
}
function updatedot(e) {
  QRify.update({
    cornersDotOptions: {
      type: e.value,
    },
  });
}
function updateConrnerSquareGColor1(e) {
  color3 = e.value;
  QRify.update({
    gradient: {
      colorStops: [{ offset: 0, color: color3 }],
    },
  });
  setGradientSquare();
}

function updateConrnerSquareGColor2(e) {
  color4 = e.value;
  QRify.update({
    gradient: {
      colorStops: [{ offset: 1, color: color4 }],
    },
  });
  setGradientSquare();
}

function updateConrnerSquareType(e) {
  QRify.update({
    cornersSquareOptions: {
      type: e.value,
    },
  });
}

function updateConrnerSquareGtype1() {
  QRify.update({
    cornersSquareOptions: {
      gradient: {
        type: gradientType,
        colorStops: [
          { offset: 0, color: color3 },
          { offset: 1, color: color4 },
        ],
      },
    },
  });
}
function updateConrnerSquareColor(e) {
  QRify.update({
    cornersSquareOptions: {
      color: e.value,
    },
  });
}

let info;
textinput.addEventListener("input", () => {
  info = textinput.value;
  QRify.update({
    data: textinput.value,
  });
});


function updateDotsGradienttype1() {
  QRify.update({
    dotsOptions: {
      gradient: {
        type: gradientType,
        colorStops: [
          { offset: 0, color: color },
          { offset: 1, color: color2 },
        ],
      },
    },
  });
  document.getElementById("col1").value = color;
  document.getElementById("col2").value = color2;
}

function updateDotsGradientColor1(e) {
  color = e.value;
  QRify.update({
    dotsOptions: {
      colorStops: [{ offset: 1, color: color }],
    },
  });
  setGradientAfter();
}
function updateDotsGradientColor2(e) {
  color2 = e.value;
  QRify.update({
    dotsOptions: {
      colorStops: [{ offset: 0, color: color2 }, ,],
    },
  });
  setGradientAfter();
}
function updatecornertimeout() {
  setTimeout(() => {
    updatecornerdotsGtype1();
  }, 300);
}

function setGradientAfter() {
  setTimeout(() => {
    updateDotsGradienttype1();
  }, 100);
}
function setGradientSquare() {
  setTimeout(() => {
    updateConrnerSquareGtype1();
  }, 300);
}

function updateDotsOption(e) {
  QRify.update({
    dotsOptions: {
      type: e.value,
    },
  });
}
function updateDotsOptionColor(e) {
  QRify.update({
    dotsOptions: {
      color: e.value,
    },
  });
}

function resetQr() {
  QRify.update({
    dotsOptions: {
      gradient: false,
    },
  });
}
function next() {
  scrollableDiv.scrollLeft += 100;
}
function prev() {
  scrollableDiv.scrollLeft -= 100;
}
function all(e) {
  return document.querySelectorAll(e);
}
function id(e) {
  return document.getElementById(e);
}
function qs(e) {
  return document.querySelector(e);
}

function DefaultHide() {
  allhides.forEach((s) => {
    s.style.display = "none";
  });
}

function handelmouseWheel() {
  scrollableDiv.addEventListener("wheel", function(event) {
    event.preventDefault();
    scrollableDiv.scrollLeft += event.deltaY;
  });
}

function handelTabs() {
  const tabs = all("[data-tabs]");
  const tabContents = all("[data-content]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      let target = document.querySelector(tab.dataset.tabs);
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      target.classList.add("active");
      tab.classList.add("active");
      checkActiveOfStyle();
    });
  });
}

function makeGradientdisplaynone() {
  allhides.forEach((s, i) => {
    s.style.display = "none";
  });
  dotscolor.forEach((d) => {
    d.style.display = "block";
  });
}
handelTabs();
handelmouseWheel();
DefaultHide();
