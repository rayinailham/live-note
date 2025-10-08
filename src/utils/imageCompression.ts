/**
 * Compresses an image to 500x500 pixels while maintaining aspect ratio
 * Empty spaces are filled with white pixels
 */
export interface CompressedImageResult {
  canvas: HTMLCanvasElement;
  blob: Blob;
  dataUrl: string;
}

export const compressImageTo500x500 = (
  file: File
): Promise<CompressedImageResult> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const handleImageLoad = () => {
      // Set canvas size to 500x500
      canvas.width = 500;
      canvas.height = 500;

      // Fill canvas with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 500, 500);

      // Calculate aspect ratio and new dimensions
      const originalWidth = img.width;
      const originalHeight = img.height;
      const aspectRatio = originalWidth / originalHeight;

      let newWidth: number;
      let newHeight: number;

      // Determine which dimension should be 500px (the limiting factor)
      if (aspectRatio > 1) {
        // Image is wider than tall - width becomes 500
        newWidth = 500;
        newHeight = 500 / aspectRatio;
      } else {
        // Image is taller than wide - height becomes 500
        newHeight = 500;
        newWidth = 500 * aspectRatio;
      }

      // Calculate position to center the image
      const x = (500 - newWidth) / 2;
      const y = (500 - newHeight) / 2;

      // Draw the resized image centered on the white canvas
      ctx.drawImage(img, x, y, newWidth, newHeight);

      // Convert canvas to blob and data URL
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Could not create blob from canvas'));
            return;
          }

          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

          resolve({
            canvas,
            blob,
            dataUrl,
          });
        },
        'image/jpeg',
        0.8 // Quality: 80%
      );
    };

    img.onload = handleImageLoad;
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Create object URL and load image
    const imageUrl = URL.createObjectURL(file);
    img.src = imageUrl;

    // Clean up object URL after image loads or errors
    const cleanup = () => {
      URL.revokeObjectURL(imageUrl);
    };

    img.addEventListener('load', cleanup);
    img.addEventListener('error', cleanup);
  });
};

/**
 * Validates if a file is an image
 */
export const isValidImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Gets image dimensions without loading the full image
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for dimension calculation'));
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  });
};