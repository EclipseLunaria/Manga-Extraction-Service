import { Router } from "express";
import { chapterExtraction } from "./controllers";
const router = Router();


router.get('/manga-:mangaId/chapter-:chapterId', chapterExtraction);

export default router;