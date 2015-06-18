canvasTest();

function canvasTest() {
 
    var canvas = document.getElementById("instagramImg");
    var context = canvas.getContext("2d");
    var img = document.getElementById("scream");
    context.drawImage(img, 0, 0);
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    // invert colors
    var i;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        imgData.data[i+3] = 255;
    }
    context.putImageData(imgData, 0, 0);


}


