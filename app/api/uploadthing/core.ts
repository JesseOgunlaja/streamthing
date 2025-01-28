import { createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter: ({ message }) => {
    return {
      message:
        message === "Invalid config: FileSizeMismatch"
          ? "File too large"
          : message,
    };
  },
});

export const ourFileRouter = {
  uploadProfilePicture: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    () => {}
  ),
};

export type OurFileRouter = typeof ourFileRouter;
export const utapi = new UTApi();
