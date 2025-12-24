const { PrismaClient } = require('../lib/p');

const prisma = new PrismaClient();

module.exports = prisma;