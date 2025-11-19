import { Request, Response } from 'express';
import { badRequest, serverError, success } from '../utils/genericResponseHandler.js';

import { prisma } from '../db/prisma.js';
import { buildWhereClause, fetchTours, parseTourQueryParams } from '../utils/tourServices.utils.js';

export const TourService = {

  // Get tours by country ID
  async getToursByCountryId(req: Request, res: Response): Promise<Response> {
    try {
      const countryId = parseInt(req.params.countryId);

      // Get Filters & Pagination params
      const {
        page,
        limit,
        skip,
        accommodation,
        duration,
        budget,
        sortBy,
      } = parseTourQueryParams(req.query);

      // Build where clause
      const where = buildWhereClause.byCountryId({
        countryId,
        accommodation,
        duration,
        budget
      });

      // Fetch tours and total count
      const { tours, total } = await fetchTours({
        prisma,
        where,
        sortBy,
        skip,
        limit,
      })

      return success(res, "Tours fetched successfully", {
        tours,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      });

    } catch (error) {
      return serverError(
        res,
        "Failed to fetch tours by country ID",
        error instanceof Error ? error : new Error(String(error))
      );
    }
  },

  // Get tours by park ID
  async getToursByParkId(req: Request, res: Response): Promise<Response> {
    try {
      const parkId = parseInt(req.params.parkId);

      // Get Filters & Pagination params
      const {
        page,
        limit,
        skip,
        accommodation,
        duration,
        budget,
        sortBy,
      } = parseTourQueryParams(req.query);

      // Build where clause
      const where = buildWhereClause.byParkId({
        parkId,
        accommodation,
        duration,
        budget,
      });

      // Fetch tours and total count
      const { tours, total } = await fetchTours({
        prisma,
        where,
        sortBy,
        skip,
        limit,
      })


      return success(res, "Tours fetched successfully", {
        tours,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      });

    } catch (error) {
      return serverError(
        res,
        "Failed to fetch tours by park ID",
        error instanceof Error ? error : new Error(String(error))
      );
    }
  },

  // Get parks and tours suggestions
  async getAllParksAndCountries(req: Request, res: Response): Promise<Response> {
    try {
      // Fetch parks
      const parks = await prisma.park.findMany({
        where: {
          tourParks: {
            some: {}, // At least one related TourPark record exists
          },
        },
        select: {
          id: true,
          name: true,
          country: true,
          keyword: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      const parksWithType = parks.map(park => ({
        ...park,
        type: 'park',
      }));

      // Fetch countries
      const countries = await prisma.country.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      const countriesWithType = countries.map(country => ({
        ...country,
        type: 'country',
      }));

      // Popular Parks hardcoded data(temporary)
      const popularParks = [
        { country: "Kenya", id: 66, keyword: "masai mara", name: "Masai Mara National Reserve", type: "park" },
        { country: "Tanzania", id: 105, keyword: "serengeti", name: "Serengeti National Park", type: "park" },
        { country: "Botswana", id: 118, keyword: "okavango", name: "Okavango Delta ", type: "park" },
        { country: "South Africa", id: 20, keyword: "kruger", name: "Kruger National Park", type: "park" },
      ];

      // Trending Searches hardcoded data(temporary)
      const trendingSearches = [
        { country: "Tanzania", id: 84, keyword: "arusha", name: "Arusha National Park", type: "park" },
        { id: 1, name: "Tanzania", type: "country" },
        { country: "Tanzania", id: 105, keyword: "serengeti", name: "Serengeti National Park", type: "park" },
        { country: "Tanzania", id: 90, keyword: "kilimanjaro", name: "Kilimanjaro National Park", type: "park" },
      ];

      // Return all in one response
      return success(res, 'Parks and countries fetched successfully', {
        parks: parksWithType,
        countries: countriesWithType,
        popularParks,
        trendingSearches,
      });
    } catch (error) {
      return serverError(
        res,
        'Failed to fetch parks and countries',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  },

  // Get parks by country name
  async getParksByCountryName(req: Request, res: Response): Promise<Response> {
    try {
      const { countryName } = req.params;

      if (!countryName) {
        return badRequest(res, "Country name is required");
      }

      const parks = await prisma.park.findMany({
        where: {
          country: {
            equals: countryName,
            mode: 'insensitive',
          },
          tourParks: {
            some: {},
          },
        },
        select: {
          id: true,
          name: true,
          type: true,
          country: true,
          keyword: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      const parksWithType = parks.map(p => ({
        ...p,
        type: "park",
      }));

      return success(res, `Parks in ${countryName} fetched successfully`, {
        parks: parksWithType,
      });
    } catch (error) {
      return serverError(
        res,
        "Failed to fetch parks by country name",
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }
};
