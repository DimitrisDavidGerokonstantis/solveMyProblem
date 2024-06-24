import Results from "../models/Results.js";

export const getStats = async (req, res) => {

    const results = await Results.find();
    console.log("Results fetched: ", results);

    const datagroupby = await Results.aggregate([
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
            $group: {
                _id: {
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day"
                },
                counts: {
                    $push: {
                        hour: "$_id.hour",
                        count: "$count"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                date: {
                    $dateFromParts: {
                        year: "$_id.year",
                        month: "$_id.month",
                        day: "$_id.day"
                    }
                },
                counts: 1,
                avg: { $avg: "$counts.count" }
            }
        }
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
        "Avg"
    ];
    
    const datawithAvg = datagroupby.map(result => {
        const dateStr = result.date.toISOString().split('T')[0].split('-').slice(1).join('-');
        const countsArray = Array(24).fill(0);

        result.counts.forEach(item => {
            countsArray[item.hour] = item.count;
        });

        return [dateStr, ...countsArray, result.avg];
    });

    const data1 = [header, ...datawithAvg];
    
    const data2 = [["execTime"], ...results.map(result => [result.execTime])];

    const data = { data1, data2 };

    console.log("Data sent to frontend: ", data);

    return res.status(200).json(data);
};