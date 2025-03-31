import { Request, Response, Router } from "express";
import { TourService } from "../services/tour.service";
import { responseHandler } from "../utils/responseHandler";
import { ServiceResponse } from "../types/types";
import { Tour } from "@prisma/client";

const router: Router = Router();

type Filters = {
  location: string | undefined;
  days: number | undefined;
};

function applyFilters(filters: Filters, tours: Tour[]): Tour[] {
  let filteredTours: Tour[] = tours;
  const { location, days } = filters;

  if (location !== undefined) {
    filteredTours = tours.filter((tour) => {
      const locationArray = tour.location.toLowerCase().split(", ");
      return locationArray.includes(location);
    });
  }

  return filteredTours;
}

router.get("/tours", async (req: Request, res: Response) => {
  let tours!: Tour[];
  let filteredTours!: Tour[];

  const { location, days } = req.query;

  let filters: Filters = {
    location: location as string,
    days: Number(days),
  };

  const result = await TourService.getAllTours();

  if (result.success === true) {
    tours = result.data;

    filteredTours = applyFilters(filters, tours);

    console.log(filteredTours.length);

    let response = { success: true, data: filteredTours };

    responseHandler(res, response, "GET");
  }
});

export default router;
