import { Request, Response, Router } from "express";
import tournamentRouter from "./tournaments";
import { Tournament } from "../model/db";
import { completeTournamentData } from "../model/seed";

const router: Router = Router();

router.use("/tournaments", tournamentRouter);
router.get("/seed", async (req: Request, res: Response) => {
  try {
    const result = await Tournament.bulkCreate(completeTournamentData);
    if (!result) {
      res.status(400).json({ success: false, error: "Failed to seed data" });
      return;
    }
  
    res.status(200).json({success: true, message: "Data seeded successfully", count: result.length});
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({success: false, error: "Internal server error while seeding data"});
  }
});

export default router;
