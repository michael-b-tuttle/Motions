// Variable for capture device
let video;
// Previous Frame
let prevFrame;
// How different must a pixel be to be a "motion" pixel
let threshold = 20;

function setup() {
  createCanvas(640, 360);
  //pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(640, 360);
  video.hide();
  // Create an empty image the same size as the video
  prevFrame = createImage(video.width, video.height);
}

function draw() {
  //image(prevFrame, 0, 240);

  loadPixels();
  video.loadPixels();
  prevFrame.loadPixels();

  // Begin loop to walk through every pixel
  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {

      // Step 1, what is the location into the array
      var loc = (x + y * video.width) * 4;

      // Step 2, what is the previous color
      var r1 = prevFrame.pixels[loc   ];
      var g1 = prevFrame.pixels[loc + 1];
      var b1 = prevFrame.pixels[loc + 2];

      // Step 3, what is the current color
      var r2 = video.pixels[loc   ];
      var g2 = video.pixels[loc + 1];
      var b2 = video.pixels[loc + 2];

      // Step 4, compare colors (previous vs. current)
      var diff = distSq(r1, g1, b1, r2, g2, b2);

      // Step 5, How different are the colors?
      // If the color at that pixel has changed, then there is motion at that pixel.
      if (diff > threshold*threshold) {
        // If motion, display black
        pixels[loc] = 0;
        pixels[loc+1] = 0;
        pixels[loc+2] = 0;
        pixels[loc+3] = 255;
      } else {
        // If not, display white
        pixels[loc] = 255;
        pixels[loc+1] = 255;
        pixels[loc+2] = 255;
        pixels[loc+3] = 255;
      }
    }
  }
  updatePixels();

  // Save frame for the next cycle
  if (video.canvas) {
  prevFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height); // Before we read the new frame, we always save the previous frame for comparison!
  }
}

function distSq(x1, y1, z1, x2, y2, z2) {
  let dist = (x1 - x2) * (x1 - x2) + (y1 - y2)*(y1 - y2) + (z1 - z2)*(z1 - z2);
  return dist;
}
