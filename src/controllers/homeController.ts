import {
    Controller,
    Get,
    Route
  } from "tsoa";


@Route('/')
export class HomeController extends Controller {

  @Get()
  public async home(): Promise<any> {

    let response = {
      "App": "Image Extractor",
      "Version" : "1.0.0",
      "Description" : "Returns the image from the given time seconds of a provided video"
    }

    return response;

  }

}