import Results from "../models/Results.js";
import axios from "axios";

const RABBITMQ_USER = "guest";
const RABBITMQ_PASS = "guest";
const RABBITMQ_HOST = "rabbitmq";
const QUEUE_NAME = "ProxyQueue";

const getQueueLength = async () => {
  try {
    const response = await axios.get(
      `http://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:15672/api/queues/%2F/${QUEUE_NAME}`
    );
    const queueInfo = response.data;
    console.log(`Queue Length: ${queueInfo.messages}`);
    return queueInfo.messages;
  } catch (error) {
    console.error("Error fetching queue length:", error);
    throw error;
  }
};

const countAll = async () => {
  try {
    const count = await Results.countDocuments();
    console.log(`Total documents in the Results collection: ${count}`);
    return count; // Return the count to use in getStats
  } catch (error) {
    console.error("Error counting documents:", error);
    throw error;
  }
};

const countTodays = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const count = await Results.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });
    console.log(`Total documents with today's date: ${count}`);
    return count; // Return the count to use in getStats
  } catch (error) {
    console.error("Error counting documents:", error);
    throw error;
  }
};

const findAvgExecTime = async () => {
  try {
    const result = await Results.aggregate([
      {
        $group: {
          _id: null,
          averageExecTime: { $avg: "$execTime" },
        },
      },
    ]);

    const averageExecTime =
      result.length > 0 ? parseFloat(result[0].averageExecTime.toFixed(3)) : 0;
    console.log(`Average execTime: ${averageExecTime}`);
    return averageExecTime; // Return the average to use in getStats
  } catch (error) {
    console.error("Error calculating average execTime:", error);
    throw error;
  }
};

const query1 = async () => {
  try {
    const datagroupby = await Results.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            hour: { $hour: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
          "_id.hour": 1,
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day",
          },
          counts: {
            $push: {
              hour: "$_id.hour",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          counts: 1,
          avg: { $avg: "$counts.count" },
        },
      },
    ]);

    const header = [
      "Date",
      "00:00-01:00",
      "01:00-02:00",
      "02:00-03:00",
      "03:00-04:00",
      "04:00-05:00",
      "05:00-06:00",
      "06:00-07:00",
      "07:00-08:00",
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
      "19:00-20:00",
      "20:00-21:00",
      "21:00-22:00",
      "22:00-23:00",
      "23:00-00:00",
      "Avg",
    ];

    const datawithAvg = datagroupby.map((result) => {
      const dateStr = result.date
        .toISOString()
        .split("T")[0]
        .split("-")
        .slice(1)
        .join("-");
      const countsArray = Array(24).fill(0);

      result.counts.forEach((item) => {
        countsArray[item.hour] = item.count;
      });

      return [dateStr, ...countsArray, result.avg];
    });

    return [header, ...datawithAvg];
  } catch (error) {
    console.error("Error calculating query 1", error);
    throw error;
  }
};

const query2 = async () => {
  try {
    const results = await Results.find();
    return [["execTime"], ...results.map((result) => [result.execTime])];
  } catch (error) {
    console.error("Error calculating query 2", error);
    throw error;
  }
};

export const getStats = async (req, res) => {
  try {
    const [totalSubmissions, todaysSubmissions, avgExecTime, data1, data2] =
      await Promise.all([
        countAll(),
        countTodays(),
        findAvgExecTime(),
        query1(),
        query2(),
      ]);

    const data = {
      totalSubmissions,
      todaysSubmissions,
      avgExecTime,
      data1,
      data2,
    };

    console.log("Data sent to frontend: ", data);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in getStats:", error);
    return res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
