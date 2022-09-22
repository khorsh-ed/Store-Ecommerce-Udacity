import {promises as fs} from 'fs';
import path from 'path';
import sharp from 'sharp'

async function resizeImage(imgName: string , width:number , height:number) :Promise<string> {

    const imgLocation = path.resolve('./') + `/src/assets/full/${imgName}.jpg`;
    const resizedImageName = `${imgName}_${width}_${height}`;
    const imgResizedLocation = path.resolve('./') + `/src/assets/thumb/${resizedImageName}.jpg`;

    try
    {
      await sharp(imgLocation).resize({
        width: width,
        height: height
      })
      .toFile(imgResizedLocation);
    }
    catch(err) {
        throw new Error('could not resize the image')
      }

      return resizedImageName;
    
};

export default resizeImage;