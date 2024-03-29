const container = document.querySelector('.container');

const colorPickerCanvas = document.querySelector('.colorPickerCanvas');

const wrapper = document.querySelector('.wrapper')

const colorSlider = document.querySelector('.colorSlider');

const marker = document.createElement('div');
marker.classList.add('marker');
marker.setAttribute('draggable', true);
wrapper.appendChild(marker)


//ADD 2D CONTEXT TO COLOR PICKER CANVAS
let colorPickerCtx = colorPickerCanvas.getContext('2d');

var zoomLevel = getComputedStyle(document.body).zoom

var colorPickerCanvasPerimeter = colorPickerCanvas.getBoundingClientRect();
var color = 'blue';
var dragging = false;

//CREATE A HORIZONTAL GRADIENT ON THE CANVAS
let horizontalGradient = colorPickerCtx.createLinearGradient(0, 0, 300, 0);

horizontalGradient.addColorStop(0, 'white');
horizontalGradient.addColorStop(1, color);
colorPickerCtx.fillStyle = horizontalGradient;
colorPickerCtx.fillRect(0, 0, 300, 300);

//CREATE A VERTICAL GRADIENT ON THE CANVAS
let verticalGradient = colorPickerCtx.createLinearGradient(0, 0, 0, 300);

verticalGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
verticalGradient.addColorStop(1, 'black');
colorPickerCtx.fillStyle = verticalGradient;
colorPickerCtx.fillRect(0, 0, 300, 300);

colorPickerCanvas.addEventListener('click', (event) => {
  event.preventDefault()

  //GET THE COORDINATES OF CLICKED PIXEL
  let xCoordinates = event.offsetX;
  let yCoordinates = event.offsetY;
  console.log('X coordinates are: ' + xCoordinates + ' and Y coordinates are: ' + yCoordinates);

  //GET RGB VALUES OF CLICKED PIXEL
  let imgData = colorPickerCtx.getImageData(xCoordinates, yCoordinates, 1, 1);
  ctxR = imgData.data[0];
  ctxG = imgData.data[1];
  ctxB = imgData.data[2];

  //PLACE MARKER WHERE MOUSE IS CLICKED ON CANVAS
  marker.style.top =  event.offsetY - 8 + 'px';
  marker.style.left = event.offsetX - 8 + 'px';

  document.body.style.backgroundColor = `rgb(${ctxR}, ${ctxG}, ${ctxB})`;
});

marker.addEventListener('dragstart', () => {
    dragging = true;
});

colorPickerCanvas.addEventListener('dragover', (event) => {
    event.preventDefault();
    if (dragging) {
        //GET COORDINATES OF MARKER WHILE BEING DRAGGED
        let xCoordinates = event.offsetX;
        let yCoordinates = event.offsetY;

        //CHANGE THE BACKGROUND COLOR WHILE MARKER IS DRAGGED
        let imgData = colorPickerCtx.getImageData(xCoordinates, yCoordinates, 1, 1);
        ctxR = imgData.data[0];
        ctxG = imgData.data[1];
        ctxB = imgData.data[2];

        document.body.style.backgroundColor = `rgb(${ctxR}, ${ctxG}, ${ctxB})`;
    };
});

marker.addEventListener('dragend', (event) => {
    dragging = false;
});

colorPickerCanvas.addEventListener('drop', (event) => {
  marker.style.top = event.offsetY - 8 + 'px';
  marker.style.left = event.offsetX - 8 + 'px';
});


//ADD 2D CONTEXT TO COLOR SLIDER
let colorSliderCtx = colorSlider.getContext('2d');

//CREATE A VERTICAL GRADIENT ON THE COLOR SLIDER
let sliderGradient = colorSliderCtx.createLinearGradient(0, 0, 0, 300);
sliderGradient.addColorStop(0, 'red');
sliderGradient.addColorStop(0.1, 'orange');
sliderGradient.addColorStop(0.2, 'yellow');
sliderGradient.addColorStop(0.4, 'lime');
sliderGradient.addColorStop(0.5, 'skyblue');
sliderGradient.addColorStop(0.7, 'blue');
sliderGradient.addColorStop(0.9, 'magenta');
sliderGradient.addColorStop(1, 'red');
colorSliderCtx.fillStyle = sliderGradient;
colorSliderCtx.fillRect(0, 0, 40, 300);

colorSlider.addEventListener('click', (event) => {

  //GET THE COORDINATES OF CLICKED PIXEL
  let sliderX = event.offsetX;
  let sliderY = event.offsetY;

  //GET RGB VALUES OF CLICKED PIXEL
  let sliderImgData = colorSliderCtx.getImageData(sliderX, sliderY, 1, 1);
  sliderR = sliderImgData.data[0];
  sliderG = sliderImgData.data[1];
  sliderB = sliderImgData.data[2];
  let color = `rgb(${sliderR}, ${sliderG}, ${sliderB})`;

  //CREATE A HORIZONTAL GRADIENT ON THE CANVAS
  let horizontalGradient = colorPickerCtx.createLinearGradient(0, 0, 300, 0);
  
  horizontalGradient.addColorStop(0, 'white');
  horizontalGradient.addColorStop(1, color);
  colorPickerCtx.fillStyle = horizontalGradient;
  colorPickerCtx.fillRect(0, 0, 300, 300);

  //CREATE A VERTICAL GRADIENT ON THE CANVAS
  let verticalGradient = colorPickerCtx.createLinearGradient(0, 0, 0, 300);

  verticalGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  verticalGradient.addColorStop(1, 'black');
  colorPickerCtx.fillStyle = verticalGradient;
  colorPickerCtx.fillRect(0, 0, 300, 300);

  //PLACE MARKER WHERE MOUSE IS CLICKED ON SLIDER

});
