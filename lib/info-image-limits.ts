export const MIN_INFO_IMAGE_SIZE = 1024 * 1024; // 1 Mo (1024 Ko)
export const MAX_INFO_IMAGE_SIZE = 500 * 1024 * 1024; // 500 Mo

export const INFO_IMAGE_SIZE_HINT =
  "JPG, PNG ou WEBP — au moins 1 Mo (1024 Ko), maximum 500 Mo";

export function validateInfoImageFileSize(size: number): string | null {
  if (size < MIN_INFO_IMAGE_SIZE) {
    return "L'image doit faire au moins 1 Mo (1024 Ko).";
  }

  if (size > MAX_INFO_IMAGE_SIZE) {
    return "L'image ne doit pas dépasser 500 Mo.";
  }

  return null;
}
