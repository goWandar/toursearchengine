import { Request, Response, Router } from "express";
import { TourService } from "../services/tour.service";
import { responseHandler } from "../utils/responseHandler";
import { Tour } from "@prisma/client";

const router: Router = Router();

type Filters = {
  location: string | null;
  daysMin: number | null;
  daysMax: number | null;
};

function applyFilters(filters: Filters, tours: Tour[]): Tour[] {
  let filteredTours: Tour[] = tours;

  const { location, daysMax, daysMin } = filters;

  if (location !== null) {
    filteredTours = filteredTours.filter((tour) => {
      const locationArray = tour.location.toLowerCase().split(", ");
      return locationArray.includes(location.toLowerCase());
    });
  }

  if (daysMin !== null && daysMax !== null) {
    filteredTours = filteredTours.filter((tours) => {
      return tours.durationInDays >= daysMin && tours.durationInDays <= daysMax;
    });
  }

  return filteredTours;
}

router.get("/tours", async (req: Request, res: Response) => {
  let tours!: Tour[];
  let filteredTours!: Tour[];

  const { location, daysMin, daysMax } = req.query;

  console.log(location, daysMax, daysMin);

  let filters: Filters = {
    location: location === undefined ? null : (location as string),
    daysMin: daysMin === undefined ? null : Number(daysMin),
    daysMax: daysMax === undefined ? null : Number(daysMax),
  };

  const result = await TourService.getAllTours();

  if (result.success === true) {
    tours = result.data;

    filteredTours = applyFilters(filters, tours);

    let response = { success: true, data: filteredTours };

    responseHandler(res, response, "GET");
  }
});

export default router;
