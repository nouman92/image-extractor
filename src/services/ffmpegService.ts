import { FrameRequest } from "../interface/frameRequest";
import * as fs from 'fs';
import * as child from 'child_process';

const util = require('util');

const exec = util.promisify(child.exec);

export type FrameParams = Pick<FrameRequest, "timestamp" | "url">;

export class FfmpegService {

    public async getFrame(frameRequest: FrameParams): Promise<string> {

        let fileName = `${new Date().getTime()}_image.png`;

        try{
            const { stdout, stderr } = await exec(`ffmpeg -i ${frameRequest.url} -ss ${frameRequest.timestamp}  -vframes 1 -vcodec png -an -y  ${fileName}`);

            if (fs.existsSync(fileName)) {
                let output =  await fs.promises.readFile(fileName, {encoding: 'base64'});
    
                fs.unlinkSync(fileName);
                
                return output;
            }

        }catch( error ){
            console.error(error.message)
            return "Error while processing your request! check if parameters are correct";
        }
       
      }

}