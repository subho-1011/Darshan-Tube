export const DOMAIN = process.env.DOMAIN!;

export const API_URL = `${DOMAIN}/api/`;

export const MAXIMUM_THUMBNAIL_SIZE =
    1024 * 1024 * parseInt(process.env.MAXIMUM_THUMBNAIL_SIZE!);

export const MAXIMUM_VIDEO_SIZE =
    1024 * 1024 * parseInt(process.env.MAXIMUM_VIDEO_SIZE!);