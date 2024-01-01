import prisma from '@/libs/prismadb';

export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
};

export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params;
        let searchString = searchTerm;
        if (!searchTerm) { searchString = '' };

        let query: any = {};
        if (category) { query.category = category };

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [{
                    name: { contains: searchString, mode: 'insensitive' },
                    description: { contains: searchString, mode: 'insensitive' }
                }]
            },
            include: {
                review: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                },
            }
        });
console.log('products',products);
        return products;
    } catch (error: any) {
        console.log('Error: ',error);
        throw new Error(error);
    }
};