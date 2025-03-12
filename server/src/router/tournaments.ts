import { Router, RequestHandler } from "express";
import {
  getAllTournament,
  createTournament,
  updateTournament,
  getTournament,
  deleteTournament,
} from "../controller/tournament";


const router: Router = Router();

router.get("/", getAllTournament as RequestHandler);
router.post("/", createTournament as RequestHandler);
router.get("/:id", getTournament as RequestHandler);
router.put("/:id", updateTournament as RequestHandler);
router.delete("/:id", deleteTournament as RequestHandler);


export default router;
