import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { UploadThingError } from "uploadthing/server";
import { ClientUploadedFileData } from "uploadthing/types";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export type UploadError = UploadThingError<{ message: string }>;
export type UploadSuccess = ClientUploadedFileData<unknown>[];
