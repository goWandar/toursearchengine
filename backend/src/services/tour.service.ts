import { Request, Response } from 'express';
import { notFound, serverError, success } from '../utils/genericResponseHandler.js';

import { prisma } from '../db/prisma.js';
import { parseTourQueryParams } from '../utils/tourServices.utils.js';

export const TourService = {

  // Get tours by country ID
  async getToursByCountryId(req: Request, res: Response): Promise<Response> {
    try {
      const countryId = parseInt(req.params.countryId);
      const {
        page,
        limit,
        skip,
        accommodation,
        duration,
        budget,
        sortBy,
      } = parseTourQueryParams(req.query);

      // Build the where clause
      const where: any = {
        countryId,
        archived: false,
        ...(accommodation.length
          ? { accommodationType: { in: accommodation } }
          : {}),
        durationInDays: { gte: duration[0], lte: duration[1] },
        ...(budget
          ? {
            prices: {
              some: {
                pricePerPerson: {
                  gte: budget[0],
                  lte: budget[1],
                },
              },
            },
          }
          : {}),
      };

      // Determine orderBy
      let orderBy: any;
      switch (sortBy) {
        case 'duration':
          orderBy = { durationInDays: 'asc' }; // shortest to longest
          break;
        case 'relevance':
        default:
          orderBy = { dateCreated: 'asc' };
      }

      const [tours, total] = await Promise.all([
        prisma.tour.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            operator: { select: { id: true, name: true } },
            country: { select: { id: true, name: true } },
            images: true,
            prices: true,
            tourParks: {
              include: { park: { select: { id: true, name: true } } },
            },
          },
        }),
        prisma.tour.count({ where }),
      ]);

      if (!tours.length) return notFound(res, 'No tours found for this country');

      // Flatten parks array for each tour
      const formattedTours = tours.map(({ tourParks, ...rest }) => ({
        ...rest,
        parks: tourParks.map(tp => tp.park),
      }));

      return success(res, 'Tours fetched successfully', {
        tours: formattedTours,
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
        'Failed to fetch tours by country ID',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  },


  // Get tours by park ID
  async getToursByParkId(req: Request, res: Response): Promise<Response> {
    try {
      const parkId = parseInt(req.params.parkId);
      const {
        page,
        limit,
        skip,
        accommodation,
        duration,
        budget,
        sortBy,
      } = parseTourQueryParams(req.query);

      // Determine sorting logic
      let orderBy: any;
      switch (sortBy) {
        case 'duration':
          orderBy = { durationInDays: 'asc' }; // shortest to longest
          break;
        case 'relevance':
        default:
          orderBy = { dateCreated: 'asc' }; // default relevance
      }

      // Fetch tours + count in parallel
      const [tours, total] = await Promise.all([
        prisma.tour.findMany({
          where: {
            tourParks: { some: { parkId } },
            archived: false,
            ...(accommodation.length
              ? { accommodationType: { in: accommodation } }
              : {}),
            durationInDays: { gte: duration[0], lte: duration[1] },
            ...(budget
              ? {
                prices: {
                  some: {
                    pricePerPerson: {
                      gte: budget[0],
                      lte: budget[1],
                    },
                  },
                },
              }
              : {}),
          },
          skip,
          take: limit,
          orderBy, // ✅ use dynamic orderBy here
          include: {
            operator: { select: { id: true, name: true } },
            country: { select: { id: true, name: true } },
            images: true,
            prices: true,
            tourParks: {
              include: { park: { select: { id: true, name: true } } },
            },
          },
        }),

        prisma.tour.count({
          where: {
            tourParks: { some: { parkId } },
            archived: false,
            ...(accommodation.length
              ? { accommodationType: { in: accommodation } }
              : {}),
            durationInDays: { gte: duration[0], lte: duration[1] },
            ...(budget
              ? {
                prices: {
                  some: {
                    pricePerPerson: {
                      gte: budget[0],
                      lte: budget[1],
                    },
                  },
                },
              }
              : {}),
          },
        }),
      ]);

      if (!tours.length) return notFound(res, 'No tours found for this park');

      // Flatten parks and remove the one used for filtering
      const formattedTours = tours.map(({ tourParks, ...rest }) => ({
        ...rest,
        parks: tourParks
          .filter(tp => tp.park.id !== parkId)
          .map(tp => tp.park),
      }));

      return success(res, 'Tours fetched successfully', {
        tours: formattedTours,
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
        'Failed to fetch tours by park ID',
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
  }
};
