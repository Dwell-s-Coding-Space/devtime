export const getS3ImageUrl = (url: string) => `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${url}`;
