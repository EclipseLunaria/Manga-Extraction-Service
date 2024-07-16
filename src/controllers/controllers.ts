import { Request, Response } from "express";
import { extractChapter } from "../services";

export const chapterExtraction = async (req: Request, res: Response) => {
  const { mangaId, chapterId } = req.params;
  try {
    const urls = await extractChapter(mangaId, chapterId);
    console.log(urls);
    res.send(urls);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while extracting the chapter");
  }
};
