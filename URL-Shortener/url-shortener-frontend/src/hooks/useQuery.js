import { useQuery } from "@tanstack/react-query"
import api from "../api/api"

export const useFetchMyShortUrls = (token, onError) => {
    // FIX: Using the single object signature required by TanStack Query v5
    return useQuery({
        queryKey: ["my-shortenurls", token],
        queryFn: async () => {
            return await api.get(
                "/api/url/myurls",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        select: (data) => {
            const sortedData = data.data.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
            return sortedData;
        },
        onError,
        staleTime: 5000
    });
};

export const useFetchTotalClicks = (token, startDate, endDate, onError) => {
    return useQuery({
        queryKey: ["url-totalclick", token, startDate, endDate],
        queryFn: async () => {
            return await api.get(
                `/api/url/totalclicks?startDate=${startDate}&endDate=${endDate}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        select: (response) => {
            const data = response.data;
            
            // SMART PARSING:
            // 1. If the backend already returns a list/array, just return it directly!
            if (Array.isArray(data)) {
                return data;
            }
            
            // 2. If the backend returns a Map/Object, convert it to an array
            if (typeof data === 'object' && data !== null) {
                 return Object.keys(data).map((key) => ({
                    clickDate: key,
                    count: data[key],
                }));
            }

            return []; // Fallback empty array
        },
        onError,
        staleTime: 5000
    });
};
