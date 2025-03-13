import { Request, Response } from "express";
import {
  createTournamentSchema,
  getTournamentsSchema,
  tournamentIdSchema,
  updateTournamentSchema,
} from "../types/zod";
import { Tournament } from "../model/db";
import { Op } from "sequelize";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  response: ApiResponse<T>
) => {
  res.status(statusCode).json(response);
  return;
};

const handleError = (res: Response, error: unknown) => {
  console.error("Error:", error);
  const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
  
  sendResponse(res, 500, {
    success: false,
    error: errorMessage,
  });
  return;
};

export const getTournament = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = tournamentIdSchema.safeParse({id});
    if (!result.success) {
      sendResponse(res, 400, {
        success: false,
        error: "Invalid tournament ID",
      });
      return;
    }

    const tournament = await Tournament.findByPk(result.data.id);
    if (!tournament) {
      sendResponse(res, 404, {
        success: false,
        error: "Tournament not found",
      });
      return;
    }

    sendResponse(res, 200, {
      success: true,
      data: tournament,
    });
    return;
  } catch (error) {
    handleError(res, error);
    return;
  }
};

export const deleteTournament = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = tournamentIdSchema.safeParse({id});
    console.log(result.error)
    if (!result.success) {
      sendResponse(res, 400, {
        success: false,
        error: "Invalid tournament ID",
      });
      return;
    }

    const deletedCount = await Tournament.destroy({
      where: { id: result.data.id },
    });

    if (deletedCount === 0) {
      sendResponse(res, 404, {
        success: false,
        error: "Tournament not found",
      });
      return;
    }

    sendResponse(res, 200, {
      success: true,
      message: "Tournament deleted successfully",
    });
    return;
  } catch (error) {
    handleError(res, error);
    return;
  }
};

export const updateTournament = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const idResult = tournamentIdSchema.safeParse({id});

 
    const bodyResult = updateTournamentSchema.safeParse(req.body);

    console.log(bodyResult.error)

    if (!idResult.success || !bodyResult.success) {
      sendResponse(res, 400, {
        success: false,
        error: "Validation failed",
        data: {
          idErrors: !idResult.success ? idResult.error.format() : undefined,
          bodyErrors: !bodyResult.success ? bodyResult.error.format() : undefined,
        },
      });
      return;
    }

    const [updatedCount] = await Tournament.update(bodyResult.data, {
      where: { id: idResult.data.id },
    });

    if (updatedCount === 0) {
      sendResponse(res, 404, {
        success: false,
        error: "Tournament not updated",
      });
      return;
    }

    const updatedTournament = await Tournament.findByPk(idResult.data.id);
    
    sendResponse(res, 200, {
      success: true,
      message: "Tournament updated successfully",
      data: updatedTournament,
    });
    return;
  } catch (error) {
    handleError(res, error);
    return;
  }
};
export const createTournament = async (req: Request, res: Response) => {
  try {
    const result = createTournamentSchema.safeParse(req.body);
    console.log(result.error);
    if (!result.success) {
      sendResponse(res, 400, {
        success: false,
        error: "Validation failed",
        data: result.error.format(),
      });
      return;
    }

    const tournament = await Tournament.create(result.data);

    sendResponse(res, 201, {
      success: true,
      message: "Tournament created successfully",
      data: tournament,
    });
    return;
  } catch (error) {
    handleError(res, error);
    return;
  }
};

export const getAllTournament = async (req: Request, res: Response) => {
  try {
    
    const result = getTournamentsSchema.safeParse(req.query);
    if (!result.success) {
      sendResponse(res, 400, {
        success: false,
        error: "Invalid query parameters",
        data: result.error.format(),
      });
      return;
    }

    const { page, limit, title, city } = result.data;
    const offset = (page - 1) * limit;
    
    const whereClause: Record<string, unknown> = {};
    if (title) whereClause.title = { [Op.iLike]: `%${title}%` };
    if (city) whereClause.city = { [Op.iLike]: `%${city}%` };

    const { rows: tournaments, count: total } = await Tournament.findAndCountAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });

    if (total === 0) {
      sendResponse(res, 404, {
        success: false,
        error: "No tournaments found",
        data: { total: 0, tournaments: [] },
      });
      return;
    }

    sendResponse(res, 200, {
      success: true,
      data: {
        tournaments,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    });
    return;
  } catch (error) {
    handleError(res, error);
    return;
  }
};
