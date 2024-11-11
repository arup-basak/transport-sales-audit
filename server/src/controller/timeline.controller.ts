import { Request, Response } from "express";
import TimelineDataSchema from "../validations/timeline.validation";
import prisma from "../libs/prisma";

export class TimelineController {
  async addTimeline(req: Request, res: Response) {
    try {
      const timelineData = TimelineDataSchema.parse(req.body);
      const newTimeline = await prisma.timeline.create({
        data: timelineData,
      });
      res.status(201).json({ success: true, data: newTimeline });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async addBulkTimeline(req: Request, res: Response) {
    try {
      const timelineEntries = TimelineDataSchema.array().parse(req.body);

      if (!Array.isArray(timelineEntries)) {
        res.status(400).json({
          error: "Invalid input: expected an array of timeline entries",
        });
        return;
      }

      const createdEntries = await prisma.timeline.createMany({
        data: timelineEntries.map((entry) => ({
          date: new Date(entry.date),
          actual: entry.actual,
          forecast: entry.forecast,
          value: entry.value,
        })),
      });

      res.status(201).json({
        message: `${createdEntries.count} timeline entries added successfully`,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async removeTimeline(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        await prisma.timeline.delete({
          where: { id },
        });
        res
          .status(200)
          .json({ message: "Timeline entry removed successfully" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteTimelines(req: Request, res: Response) {
    try {
      if (!req.body || !req.body.ids) {
        const deletedEntries = await prisma.timeline.deleteMany();
        res.status(200).json({
          message: `All timeline entries deleted successfully. Total deleted: ${deletedEntries.count}`,
        });
        return;
      }

      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        res.status(400).json({
          error: "Invalid input: expected an array of timeline entry IDs",
        });
        return;
      }

      const deletedEntries = await prisma.timeline.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      res.status(200).json({
        message: `${deletedEntries.count} timeline entries deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateTimelineValue(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const data = await prisma.timeline.update({
        where: { id },
        data: { paidValue: value },
      });
      res.status(200).json({ data, message: "Updated Successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getAllTimelines(_: Request, res: Response) {
    try {
      const data = await prisma.timeline.findMany();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getSingleTimeline(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const timeline = await prisma.timeline.findUnique({
        where: { id },
      });
      if (timeline) {
        res.status(200).json(timeline);
      } else {
        res.status(404).json({ error: "Timeline entry not found" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
