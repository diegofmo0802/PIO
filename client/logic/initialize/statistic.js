import { Api } from "../Api/Api.js";
import Statistics from "../components/Statistics.js";

export const statistics = new Statistics();

export async function updateStatistics() {
    try {
        const response = await Api.getStatistics();
        console.log("statistics query", response);
        statistics.updateStatistics(response);
    } catch (error) {
        console.log("error", error);
    }
}

updateStatistics();