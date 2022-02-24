import {
    Controller,
    Get,
    Query,
    Route
  } from "tsoa";

  import { FrameRequest } from "../interface/frameRequest";

  import { FfmpegService } from "../services/ffmpegService";

@Route('/ffmpeg')
export class FfmpegController extends Controller {

  @Get("/image")
  public async getImage( @Query() timestamp: string, @Query() url: string ): Promise<string> {

    let reqData: FrameRequest = {
        "timestamp": timestamp,
        "url": url
    }

    return  new FfmpegService().getFrame(reqData);

  }

}