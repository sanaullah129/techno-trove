import prisma from '@/libs/prismadb'
import moment from 'moment'

interface AggregatedData {
    [day: string]: { day: string, date: string, totalAmount: number }
}

export default async function getGraphData() {
    try {
        //start and end date
        const startDate = moment().subtract(6, 'days').startOf('day');
        const endDate = moment().endOf('day');
        //getting data from database
        const graphData = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: { gte: startDate.toISOString(), lte: endDate.toISOString() },
                status: "completed",
            },
            _sum: { amount: true },
        });

        const aggregatedData: AggregatedData = {};
        const currentDate = startDate.clone();

        while (currentDate <= endDate) {
            const day = currentDate.format("dddd");

            aggregatedData[day] = {
                day,
                date: currentDate.format('YYYY-MM-DD'),
                totalAmount: 0
            };
            //adding the day
            currentDate.add(1, "day");
        };

        graphData.forEach((entry) => {
            const day = moment(entry.createDate).format("dddd");
            const amount = entry._sum.amount || 0;
            aggregatedData[day].totalAmount += amount;            
        });

        //making the aggregatted data as sorted array
        const formattedData = Object.values(aggregatedData).sort((a, b) => 
            moment(a.date).diff(moment(b.date))
        );

        return formattedData;
    } catch (error: any) {
        throw new Error(error);
    }
};