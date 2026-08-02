const TOTAL_FRAMES = 300;
const canvas = document.getElementById('scroll-canvas');
const ctx = canvas.getContext('2d');
const loaderOverlay = document.getElementById('loader-overlay');
const loaderProgress = document.getElementById('loader-progress');
const progressBar = document.getElementById('progress-bar');

const frames = [];
let loadedCount = 0;

let currentFrame = 0;
let targetFrame = 0;

// Setup high-DPI canvas canvas width & height
function resizeCanvas() {
  const dpr = Math.max(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  render();
}

function getFrameUrl(index) {
  const frameNumber = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${frameNumber}.jpg`;
}

function preloadFrames() {
  return new Promise((resolve) => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      
      img.onload = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        if (loaderProgress) loaderProgress.innerText = `${percent}%`;
        if (progressBar) progressBar.style.width = `${percent}%`;
        
        // Render first frame as soon as frame 1 loads
        if (i === 1) {
          render();
        }
        
        if (loadedCount === TOTAL_FRAMES) {
          resolve();
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) resolve();
      };

      frames[i - 1] = img;
    }
  });
}

function drawFrame(frameIndex) {
  const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameIndex)));
  const img = frames[index];

  if (!img || !img.complete || img.naturalWidth === 0) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Cover aspect ratio algorithm
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imgRatio;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

function updateTargetFrame() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
  
  if (maxScroll <= 0) return;
  
  const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
  targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
}

function render() {
  drawFrame(currentFrame);
}

// Smooth Animation Loop (Lerp)
function animationLoop() {
  // Smoothly interpolate current frame towards target frame
  const diff = targetFrame - currentFrame;
  
  // Acceleration lerp factor for butter-smooth scroll inertia
  currentFrame += diff * 0.12;

  // Render when close enough or moving
  if (Math.abs(diff) > 0.001) {
    render();
  }

  requestAnimationFrame(animationLoop);
}

window.addEventListener('scroll', updateTargetFrame, { passive: true });
window.addEventListener('resize', resizeCanvas);

// Initialize
async function init() {
  resizeCanvas();
  
  // Start preloading frames
  await preloadFrames();
  
  // Fade out loader smoothly
  if (loaderOverlay) {
    loaderOverlay.classList.add('hidden');
  }

  updateTargetFrame();
  currentFrame = targetFrame;
  render();
  
  // Start RAF loop
  requestAnimationFrame(animationLoop);
}

init();
