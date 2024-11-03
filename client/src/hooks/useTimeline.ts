import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useRequest from "./useRequest";
import { useTimelineStore } from "@/store/timeline";

const useTimeline = () => {
  const {
    fetchAllTimelineData,
    fetchSingleTimeline,
    addTimeline,
    addBulkTimeline,
    deleteTimeline,
    deleteAllTimeline,
    deleteBulkTimeline,
    updateTimelineValue,
  } = useRequest();
  const {
    timelines,
    setTimelines,
    updateTimeline: updateStoreTimeline,
  } = useTimelineStore();

  const timelineQuery = useQuery({
    queryKey: ["timelines"],
    queryFn: fetchAllTimelineData,
  });

  useEffect(() => {
    if (timelineQuery.data) {
      setTimelines(timelineQuery.data);
    }
  }, [timelineQuery.data, setTimelines]); 

  const addTimelineMutation = useMutation({
    mutationFn: addTimeline,
    onSuccess: (newTimeline) => {
      if (newTimeline) useTimelineStore.getState().addTimeline(newTimeline);
    },
  });

  const deleteTimelineMutation = useMutation({
    mutationFn: deleteTimeline,
    onSuccess: (_, deletedId) => {
      useTimelineStore.getState().deleteTimeline(deletedId);
    },
  });

  const updateTimelineMutation = useMutation({
    mutationFn: (params: { id: string; value: number }) =>
      updateTimelineValue(params.id, params.value),
    onSuccess: (_, params) => {
      updateStoreTimeline(params.id, params.value);
    },
  });

  return {
    // Query result
    timelineData: timelines,
    isLoading: timelineQuery.isLoading,
    isError: timelineQuery.isError,
    error: timelineQuery.error,
    // Mutation methods
    addTimeline: addTimelineMutation.mutate,
    deleteTimeline: deleteTimelineMutation.mutate,
    updateTimeline: updateTimelineMutation.mutate,
    // Original methods
    fetchSingleTimeline,
    addBulkTimeline,
    deleteAllTimeline,
    deleteBulkTimeline,
  };
};

export default useTimeline;
