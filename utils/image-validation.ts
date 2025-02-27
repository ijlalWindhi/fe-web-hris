const IMAGE_MAGIC_NUMBERS: Record<string, number[]> = {
  jpeg: [0xff, 0xd8, 0xff], // JPEG
  png: [0x89, 0x50, 0x4e, 0x47], // PNG
  jpg: [0xff, 0xd8, 0xff], // JPG
  webp: [0x52, 0x49, 0x46, 0x46, 0x57, 0x45, 0x42, 0x50], // WEBP
};

function getFileMagicNumber(buffer: ArrayBuffer): number[] {
  const uintArray = new Uint8Array(buffer);
  return Array.from(uintArray.slice(0, 8)); // Get first 8 bytes
}

export function isValidImageFile(buffer: ArrayBuffer): string | false {
  const magicNumber = getFileMagicNumber(buffer);
  for (const [format, signature] of Object.entries(IMAGE_MAGIC_NUMBERS)) {
    if (
      magicNumber.length >= signature.length &&
      signature.every((byte, idx) => magicNumber[idx] === byte)
    ) {
      return format; // Valid format image
    }
  }
  return false; // Invalid image
}
