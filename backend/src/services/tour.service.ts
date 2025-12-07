import { Request, Response } from 'express';

import { prisma } from '../db/prisma.js';
import { buildWhereClause, fetchTours, parseTourQueryParams } from '../utils/tourServices.utils.js';
import { setResponse } from '../utils/genericResponseHandler.js';

import { Tour } from '../types/shared.types.js';

type GetToursResponse = {
  tours: Tour[];
  cursor: number | null;
};

export const TourService = {

  // Get tours by country ID (Search Results)
  async getToursByCountryId(req: Request, res: Response): Promise<Response> {
    try {
      const countryId = parseInt(req.params.countryId);

      // Parse tour query params
      const { page, limit, skip,
        accommodation, duration,
        budget, sortBy, persons } = parseTourQueryParams(req.query);

      // Build where clause
      const where = buildWhereClause.byCountryId({
        countryId,
        accommodation,
        duration,
        budget,
        persons
      });

      // Fetch tours and total count
      const { tours, total } = await fetchTours({
        prisma,
        where,
        sortBy,
        skip,
        limit,
      });

      return setResponse.success({
        res,
        message: "Tours fetched successfully",
        data: {
          tours,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasMore: page * limit < total,
          },
        },
      });
    } catch (error) {
      return setResponse.serverError({
        res,
        message: "Failed to fetch tours by country ID",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },

  // Get tours by park ID (Search Results)
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
        persons
      } = parseTourQueryParams(req.query);

      // Build where clause
      const where = buildWhereClause.byParkId({
        parkId,
        accommodation,
        duration,
        budget,
        persons
      });

      // Fetch tours and total count
      const { tours, total } = await fetchTours({
        prisma,
        where,
        sortBy,
        skip,
        limit,
      })


      return setResponse.success({
        res,
        message: "Tours fetched successfully",
        data: {
          tours,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasMore: page * limit < total,
          },
        }
      });

    } catch (error) {
      return setResponse.serverError({
        res,
        message: "Failed to fetch tours by park ID",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },

  // Get tours by experience ID (Search Results)
  async getToursByExperienceId(req: Request, res: Response): Promise<Response> {
    try {
      const experienceId = parseInt(req.params.experienceId);

      // Get Filters & Pagination params
      const {
        page,
        limit,
        skip,
        accommodation,
        duration,
        budget,
        sortBy,
        persons
      } = parseTourQueryParams(req.query);

      // Parse experience-specific params
      const destinationId = req.query.destinationId
        ? parseInt(req.query.destinationId as string)
        : 1;

      const destinationType = req.query.destinationType
        ? String(req.query.destinationType)
        : "country";

      // Build where clause
      const where = buildWhereClause.byExperienceId({
        experienceId,
        accommodation,
        destinationId,
        destinationType,
        duration,
        budget,
        persons
      });

      // Fetch tours and total count
      const { tours, total } = await fetchTours({
        prisma,
        where,
        sortBy,
        skip,
        limit,
      })


      return setResponse.success({
        res,
        message: "Tours fetched successfully",
        data: {
          tours,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasMore: page * limit < total,
          },
        }
      });

    } catch (error) {
      return setResponse.serverError({
        res,
        message: "Failed to fetch tours by experience ID",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },

  // Get parks and tours suggestions (Input Suggestions)
  async getSearchItems(req: Request, res: Response): Promise<Response> {
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

      // Fetch Experiences
      const experiences = await prisma.experience.findMany({
        where: {
          tourExperiences: {
            some: {}, // At least one related row in _TourExperiences
          },
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

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
      return setResponse.success({
        res,
        message: 'Parks and countries fetched successfully',
        data: {
          parks: parksWithType,
          countries: countriesWithType,
          popularParks,
          trendingSearches,
          experiences,
        }
      });
    } catch (error) {
      return setResponse.serverError({
        res,
        message: 'Failed to fetch parks and countries',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },

  // Get parks by country name (Search Results)
  async getParksByCountryName(req: Request, res: Response): Promise<Response> {
    try {
      const { countryName } = req.params;

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

      return setResponse.success({
        res,
        message: `Parks in ${countryName} fetched successfully`,
        data: {
          parks: parksWithType,
        }
      });

    } catch (error) {
      return setResponse.serverError({
        res,
        message: "Failed to fetch parks by country name",
        error: error instanceof Error ? error : new Error(String(error))
      });
    }
  },

  // Get experiences (Search Results)
  async getExperiences(req: Request, res: Response): Promise<Response> {
    try {

      const experiences = await prisma.experience.findMany({
        where: {
          tourExperiences: {
            some: {}, // At least one related row in _TourExperiences
          },
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      return setResponse.success({
        res,
        message: `Fetched experiences successfully`,
        data: {
          experiences,
        }
      });

    } catch (error) {
      return setResponse.serverError({
        res,
        message: "Failed to fetch parks by country name",
        error: error instanceof Error ? error : new Error(String(error))
      });
    }
  }
};
