import { TimelineData } from "@/validation/timeline.validation";
import axiosInstance from "@/libs/instance";
import { Response } from "@/validation/response.validation";
import { useToast } from "@/components/Toast";

const useRequest = () => {
  const { addToast } = useToast();

  const fetchAllTimelineData = async (): Promise<TimelineData[]> => {
    try {
      const response = await axiosInstance.get<Response<TimelineData[]>>(
        "/timeline"
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      addToast("Failed to fetch timeline data", "error");
      return [];
    }
  };

  const fetchSingleTimeline = async (
    id: string
  ): Promise<TimelineData | null> => {
    try {
      const response: Response<TimelineData> = await axiosInstance.get(
        `/timeline/${id}`
      );
      return response.data;
    } catch (error) {
      addToast("Failed to fetch timeline entry", "error");
      return null;
    }
  };

  const addTimeline = async (
    data: TimelineData
  ): Promise<TimelineData | null> => {
    try {
      const response: Response<TimelineData> = await axiosInstance.post(
        "/timeline",
        data
      );
      addToast("Timeline added successfully", "success");
      return response.data;
    } catch (error) {
      addToast("Failed to add timeline", "error");
      return null;
    }
  };

  const addBulkTimeline = async (data: TimelineData[]) => {
    try {
      const resp = await axiosInstance.post("/timeline/bulk", data);
      addToast("Bulk timeline entries added successfully", "success");
      return resp;
    } catch (error) {
      addToast("Failed to add bulk timeline entries", "error");
    }
  };

  const deleteTimeline = async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/timeline/${id}`);
      addToast("Timeline deleted successfully", "success");
      return true;
    } catch (error) {
      addToast("Failed to delete timeline", "error");
      return false;
    }
  };

  const deleteBulkTimeline = async (ids: string[]): Promise<boolean> => {
    try {
      const resp = (
        await axiosInstance.delete<Response<any>>("/timeline/bulk", {
          data: { ids },
        })
      ).data;
      addToast(resp.message, resp.success ? "success" : "error");
      return true;
    } catch (error) {
      addToast("Failed to delete bulk timeline entries", "error");
      return false;
    }
  };

  const deleteAllTimeline = async (): Promise<boolean> => {
    try {
      const resp = (
        await axiosInstance.delete<Response<any>>("/timeline/bulk")
      ).data;
      addToast(resp.message, resp.success ? "success" : "error");
      return true;
    } catch (error) {
      addToast("Failed to delete bulk timeline entries", "error");
      return false;
    }
  };

  const updateTimelineValue = async (
    id: string,
    value: number
  ): Promise<TimelineData | null> => {
    try {
      const response: Response<TimelineData> = await axiosInstance.patch(
        `/timeline/${id}`,
        { value }
      );
      addToast("Timeline value updated successfully", "success");
      return response.data;
    } catch (error) {
      addToast("Failed to update timeline value", "error");
      return null;
    }
  };

  return {
    fetchAllTimelineData,
    fetchSingleTimeline,
    addTimeline,
    addBulkTimeline,
    deleteTimeline,
    deleteAllTimeline,
    deleteBulkTimeline,
    updateTimelineValue,
  };
};

export default useRequest;
