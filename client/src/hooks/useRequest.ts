import { TimelineData } from "@/validation/timeline.validation";
import axiosInstance from "@/libs/instance";
import { Response } from "@/validation/response.validation";
import { useToast } from "@/components/Toast";

const useRequest = () => {
  const { addToast } = useToast();

  const responseParserData = <T>(
    data: Response<T>,
    onSuccessToast: boolean = false
  ): T => {
    if (onSuccessToast || !data.success)
      addToast(data.message, data.success ? "success" : "error");
    return data.data;
  };

  const fetchAllTimelineData = async (): Promise<TimelineData[]> => {
    try {
      const response = await axiosInstance.get<Response<TimelineData[]>>(
        "/timeline"
      );
      return responseParserData(response.data);
    } catch (error) {
      addToast("Failed to fetch timeline data", "error");
      return [];
    }
  };

  const fetchSingleTimeline = async (
    id: string
  ): Promise<TimelineData | null> => {
    try {
      const response = await axiosInstance.get<Response<TimelineData>>(
        `/timeline/${id}`
      );
      return responseParserData<TimelineData>(response.data);
    } catch (error) {
      addToast("Failed to fetch timeline entry", "error");
      return null;
    }
  };

  const addTimeline = async (
    data: TimelineData
  ): Promise<TimelineData | null> => {
    try {
      const response = await axiosInstance.post<Response<TimelineData>>(
        "/timeline",
        data
      );
      return responseParserData(response.data, true);
    } catch (error) {
      addToast("Failed to add timeline", "error");
      return null;
    }
  };

  const addBulkTimeline = async (data: TimelineData[]) => {
    try {
      const resp = await axiosInstance.post("/timeline/bulk", data);
      return responseParserData(resp.data, true);
    } catch (error) {
      addToast("Failed to add bulk timeline entries", "error");
    }
  };

  const deleteTimeline = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/timeline/${id}`);
      return responseParserData(response.data, true);
    } catch (error) {
      addToast("Failed to delete timeline", "error");
    }
  };

  const deleteBulkTimeline = async (ids: string[]) => {
    try {
      const resp = await axiosInstance.delete<Response<any>>("/timeline/bulk", {
        data: { ids },
      });
      return responseParserData(resp.data, true);
    } catch (error) {
      addToast("Failed to delete bulk timeline entries", "error");
      return false;
    }
  };

  const deleteAllTimeline = async () => {
    try {
      const resp = (await axiosInstance.delete<Response<any>>("/timeline/bulk"))
        .data;
      return responseParserData(resp, true);
    } catch (error) {
      addToast("Failed to delete bulk timeline entries", "error");
    }
  };

  const updateTimelineValue = async (id: string, value: number) => {
    try {
      const response = await axiosInstance.patch<Response<TimelineData>>(
        `/timeline/${id}`,
        { value }
      );
      return responseParserData<any>(response.data, true);
    } catch (error) {
      addToast("Failed to update timeline value", "error");
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
