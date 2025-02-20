"use client";

import { uploadProfilePicture } from "@/actions/user/upload-profile-picture";
import { useUser } from "@/components/UserStateProvider";
import { cropImage } from "@/lib/crop-image";
import { promiseToast } from "@/lib/lib";
import { UploadButton, UploadError, UploadSuccess } from "@/lib/uploadthing";
import styles from "@/styles/protected/settings/page.module.css";
import imageCompression from "browser-image-compression";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

const EditProfilePicture = () => {
  const user = useUser();
  const router = useRouter();
  const toastID = useRef<string | number>("");

  function uploadError(error: UploadError) {
    toast.error(error.message);
  }

  function uploadSuccess(file: UploadSuccess) {
    const promise = new Promise((resolve, reject) => {
      uploadProfilePicture(file[0].key).then((data) => {
        if (data.ok) resolve("Successfully updated profile picture");
        else reject("An unexpected error occurred, please try again");
      });
    });

    promiseToast(promise, {
      customProps: { id: toastID.current },
      successFunction: router.refresh,
    });
  }

  async function beforeUploadBegin(files: File[]) {
    const id = toast.loading("Loading...");
    toastID.current = id;

    return await Promise.all(
      files.map(async (file) => {
        const croppedFile = await cropImage(file);
        const compressedFile = await imageCompression(croppedFile, {
          maxIteration: 25,
        });
        return new File([compressedFile], `profile-picture-${user.id}.jpg`, {
          type: "image/jpeg",
        });
      })
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles["main-section"]}>
        <p className={styles["section-title"]}>Profile picture</p>
        <p className={styles["section-description"]}>
          Click on your profile picture to upload a new one
        </p>
        <UploadButton
          endpoint="uploadProfilePicture"
          onClientUploadComplete={uploadSuccess}
          onBeforeUploadBegin={beforeUploadBegin}
          onUploadError={uploadError}
          className={styles["upload-button"]}
        />
        <NextImage
          alt="Your profile picture"
          src={user.profilePicture}
          height={75}
          width={75}
          priority
          loading="eager"
        />
      </div>
      <hr />
      <div className={styles.footer}>
        <p>Your profile picture will be optimized for size and quality.</p>
      </div>
    </div>
  );
};

export default EditProfilePicture;
