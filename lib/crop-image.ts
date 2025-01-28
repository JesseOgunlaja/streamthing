export function cropImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Failed to get canvas context");

      const cropSize = Math.min(img.width, img.height);
      const startX = (img.width - cropSize) / 2;
      const startY = (img.height - cropSize) / 2;

      canvas.width = cropSize;
      canvas.height = cropSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, Math.PI * 2);
      ctx.clip();

      ctx.drawImage(
        img,
        startX,
        startY,
        cropSize,
        cropSize,
        0,
        0,
        cropSize,
        cropSize
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], file.name, {
            type: "image/jpeg",
          });
          resolve(croppedFile);
        } else {
          reject("Failed to create blob from canvas");
        }
      }, "image/jpeg");
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
