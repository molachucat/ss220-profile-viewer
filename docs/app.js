document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const infoCard = document.getElementById("infoCard");
  const canvasCard = document.getElementById("canvasCard");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const captionText = document.getElementById("captionText");
  const dropZone = document.querySelector(".drop-zone");

  const nameEl = document.getElementById("name");
  const speciesEl = document.getElementById("species");
  const ageEl = document.getElementById("age");
  const genderEl = document.getElementById("gender");
  const sexEl = document.getElementById("sex");

  let currentPixels = [];
  let imgWidth = 0;
  let imgHeight = 0;

  // --- Скрываем drop-zone на мобильных устройствах ---
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if(isMobile){
    dropZone.style.display = "none";
  }

  function handleFile(file){
    if(!file) return;
    let filename = file.name;
    if(!filename.endsWith(".yml")) filename += ".yml";

    const reader = new FileReader();
    reader.onload = function(event){
      try{
        const text = event.target.result;

        const pixelsMatch = text.match(/pixels:\s*\n([\s\S]*?)\n\s+\w+:/);
        if(!pixelsMatch){
          captionText.textContent = "Нет подписи...";
          captionText.style.display = "block";
          canvasCard.classList.remove("hidden");
          return;
        }

        const pixelsText = pixelsMatch[1].split("\n").map(line => parseInt(line.replace(/[-\s]/g, ""),10));
        currentPixels = pixelsText;

        const widthMatch = text.match(/width:\s*(\d+)/);
        const heightMatch = text.match(/height:\s*(\d+)/);
        if(!widthMatch || !heightMatch){
          status.textContent = "Не указаны размеры изображения.";
          return;
        }
        imgWidth = parseInt(widthMatch[1],10);
        imgHeight = parseInt(heightMatch[1],10);

        if(currentPixels.length !== imgWidth * imgHeight){
          status.textContent = "Неверное количество пикселей!";
        } else {
          status.textContent = "Файл загружен!";
        }

        const nameMatch = text.match(/name:\s*(.+)/);
        const speciesMatch = text.match(/species:\s*(.+)/);
        const ageMatch = text.match(/age:\s*(.+)/);
        const genderMatch = text.match(/gender:\s*(.+)/);
        const sexMatch = text.match(/sex:\s*(.+)/);

        nameEl.textContent = nameMatch ? nameMatch[1] : "Нет данных";
        speciesEl.textContent = speciesMatch ? speciesMatch[1] : "Нет данных";
        ageEl.textContent = ageMatch ? ageMatch[1] : "Нет данных";
        genderEl.textContent = genderMatch ? genderMatch[1] : "Нет данных";
        sexEl.textContent = sexMatch ? sexMatch[1] : "Нет данных";

        infoCard.classList.remove("hidden");
        canvasCard.classList.remove("hidden");
        captionText.style.display = "none"; // скрываем "Нет подписи..."

        // плавная анимация
        infoCard.style.opacity = 0;
        canvasCard.style.opacity = 0;
        setTimeout(()=>{
          infoCard.style.opacity = 1;
          canvasCard.style.opacity = 1;
        },50);

        drawCanvas();

      } catch(err){
        console.error(err);
        status.textContent = "Ошибка при обработке файла.";
      }
    };
    reader.readAsText(file);
  }

  fileInput.addEventListener("change",(e)=> handleFile(e.target.files[0]));

  // DAD: перетаскивание
  dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave",(e)=>{
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });

  function drawCanvas(){
    if(!currentPixels.length) return;
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    const imageData = ctx.createImageData(imgWidth,imgHeight);
    for(let i=0;i<currentPixels.length;i++){
      const val = currentPixels[i] ? 0 : 255;
      imageData.data[i*4+0] = val;
      imageData.data[i*4+1] = val;
      imageData.data[i*4+2] = val;
      imageData.data[i*4+3] = 255;
    }
    ctx.putImageData(imageData,0,0);

    const maxWidth = Math.min(window.innerWidth - 60, imgWidth*2);
    const scale = maxWidth/imgWidth;
    canvas.style.width = imgWidth*scale+"px";
    canvas.style.height = imgHeight*scale+"px";
  }

  window.addEventListener("resize",drawCanvas);
});
