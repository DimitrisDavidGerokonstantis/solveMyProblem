import Results from "../models/Results.js";

export const getStats = async (req, res) => {

    const results = await Results.find();
    console.log("Results fetched: ", results);

    const dategroupby= await Results.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    day: { $dayOfMonth: "$date" },
                    hour: { $hour: "$date" }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
                "_id.day": 1,
                "_id.hour": 1
            }
        },
        {
            $project: {
                _id: 0,
                date: {
                    $dateFromParts: {
                        year: "$_id.year",
                        month: "$_id.month",
                        day: "$_id.day",
                        hour: "$_id.hour"
                    }
                },
                count: 1
            }
        }
    ]);

    // Transform aggregation result to the required format
    const data1 = dategroupby.map(item => ({
        date: item.date.toISOString(),
        count: item.count
    }));

    const data2 = [["execTime"], ...results.map(result => [result.execTime])];

    const data = { data1, data2 };

    return res.status(200).json(data);
};