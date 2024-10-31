import { useToast } from "@/components/Toast";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useRequest from "./useRequest";

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

  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const timelineQuery = useQuery({
    queryKey: ["timelines"],
    queryFn: fetchAllTimelineData,
  });

  const addTimelineMutation = useMutation({
    mutationFn: addTimeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      addToast("Timeline added successfully", "success");
    },
  });

  const deleteTimelineMutation = useMutation({
    mutationFn: deleteTimeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      addToast("Timeline deleted successfully", "success");
    },
  });

  const updateTimelineMutation = useMutation({
    mutationFn: (params: { id: string; value: number }) =>
      updateTimelineValue(params.id, params.value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      addToast("Timeline updated successfully", "success");
    },
  });

  return {
    // Query result
    timelineData: timelineQuery.data ?? [],
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
