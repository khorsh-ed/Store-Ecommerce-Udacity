import { promises as fs } from 'fs';
import path from 'path';

async function getFileNames(thumb: boolean): Promise<string[]> {
  const imgNames: string[] = [];
  const folderName = thumb ? 'thumb' : 'full';
  const filePath = path.resolve('./.') + `/src/assets/${folderName}`;

  try {
    const filenames = await fs.readdir(filePath);
    for (const filename of filenames) {
      imgNames.push(filename.slice(0, -4));
    }
  } catch (err) {
    console.error(err);
  }
  return imgNames;
}

export default getFileNames;
