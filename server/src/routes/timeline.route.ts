import express from 'express';
import { TimelineController } from '../controller/timeline.controller';
import { validateResponse } from '../middlewares/validate.middleware';

const router = express.Router();
const timelineController = new TimelineController();

router.use(validateResponse);

router.post('/', timelineController.addTimeline);

// Add multiple timeline entries
router.post('/bulk', timelineController.addBulkTimeline);

// Remove multiple timeline entries
router.delete('/bulk', timelineController.deleteTimelines);

// Remove a single timeline entry
router.delete('/:id', timelineController.removeTimeline);

// Update a timeline entry's value
router.patch('/:id', timelineController.updateTimelineValue);

// Get all timeline entries
router.get('/', timelineController.getAllTimelines);

// Get a single timeline entry
router.get('/:id', timelineController.getSingleTimeline);

export default router;