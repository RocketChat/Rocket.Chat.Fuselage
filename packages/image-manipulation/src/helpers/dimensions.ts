export const getDimensions = (
  originalWidth: number,
  originalHeight: number,
  limits: { width: number; height: number }
): { width: number; height: number } => {
  console.log(originalWidth, originalHeight, limits);
  const widthRatio = originalWidth / (limits.width - 4);
  const heightRatio = originalHeight / limits.height;

  if (widthRatio > heightRatio) {
    const width = Math.min(originalWidth, limits.width - 4);
    return { width, height: (width / originalWidth) * originalHeight };
  }

  const height = Math.min(originalHeight, limits.height);
  return { width: (height / originalHeight) * originalWidth, height };
};
