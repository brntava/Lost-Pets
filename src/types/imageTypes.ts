export interface ImageType {
  assetId: string;
  base64: null | string;
  duration: null;
  exif: null;
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
}

export interface PostImageType {
  url: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
