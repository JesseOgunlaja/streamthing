import { utapi } from "@/app/api/uploadthing/core";
import { env } from "@/lib/env";
import { getContrast } from "polished";
import { UTFile } from "uploadthing/server";

export async function createProfilePicture(letter: string, id: string) {
  const size = 200;
  const svgContent = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${getRandomColor()}" />
    <text x="${size / 2}" y="${size / 2}" font-family="Arial" font-size="${size / 2}" font-weight="bold" fill="white" text-anchor="middle" dy=".35em">
      ${letter.toUpperCase()}
    </text>
  </svg>`;

  const svgBuffer = Buffer.from(svgContent);
  const fileName = `profile-picture-${id}.svg`;
  const fileOptions = { type: "image/svg+xml", customId: fileName };
  const file = new UTFile([svgBuffer], fileName, fileOptions);

  const { data } = await utapi.uploadFiles(file);
  return {
    imageURL: `https://${env.UPLOADTHING_APP_ID}.ufs.sh/f/${fileName}`,
    imageID: data!.key,
  };
}

export function getRandomColor(): string {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  const contrast = getContrast(randomColor, "white");

  return contrast >= 4.5 ? randomColor : getRandomColor();
}
