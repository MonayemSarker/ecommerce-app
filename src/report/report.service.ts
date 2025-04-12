import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async getMonthlySalesReport() {
    return this.prisma.$queryRaw`
      SELECT
        TO_CHAR(o."createdAt", 'YYYY-MM') AS month,
        SUM(o."totalAmount") AS total_sales
      FROM
        "Order" o
      WHERE
        TO_CHAR(o."createdAt", 'YYYY-MM') != TO_CHAR(NOW(), 'YYYY-MM') AND  o."createdAt" >= NOW() - INTERVAL '6 months'
      GROUP BY
        TO_CHAR(o."createdAt", 'YYYY-MM')
      ORDER BY
        TO_CHAR(o."createdAt", 'YYYY-MM') DESC
    `;
  }
}
