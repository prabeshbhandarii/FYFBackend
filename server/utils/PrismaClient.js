import { PrismaClient } from '../generated/prisma/client.js'

const prismaClientSingleton = () => {
    return new PrismaClient();
};

globalThis.prismaGlobal = globalThis.prismaGlobal || prismaClientSingleton();

const prisma = globalThis.prismaGlobal;

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
