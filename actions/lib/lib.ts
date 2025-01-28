import { utapi } from "@/app/api/uploadthing/core";
import { getContrast } from "polished";
import sharp from "sharp";

export async function createProfilePicture(letter: string, id: string) {
  const imageBuffer = await sharp({
    create: {
      width: 100,
      height: 100,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="${getRandomColor()}" />
            <text x="50" y="50" font-family="Arial" font-size="45" fill="white" text-anchor="middle" dy=".35em">
              ${letter.toUpperCase()}
            </text>
          </svg>`
        ),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  const fileName = `profile-picture-${id}.png`;
  const fileOptions = { type: "image/png" };
  const file = new File([imageBuffer], fileName, fileOptions);

  const { data } = await utapi.uploadFiles(file);

  return { imageURL: data!.url, imageID: data!.key };
}

export function getRandomColor(): string {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  const contrast = getContrast(randomColor, "white");

  return contrast >= 4.5 ? randomColor : getRandomColor();
}
