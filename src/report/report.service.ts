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

  async getUserOrderReport() {
    return this.prisma.$queryRaw<any[]>`
      SELECT
        u.name AS user_name,
        u.id AS user_id,
        TO_CHAR(o."createdAt", 'YYYY-MM') AS month,
        COUNT(o.id)::INTEGER AS total_orders,
        ROUND(SUM("totalAmount")::numeric, 2) AS total_sales
      FROM
        "User" u
      LEFT JOIN
        "Order" o ON u.id = o."userId"
      GROUP BY
        u.name, u.id, TO_CHAR(o."createdAt", 'YYYY-MM')
      ORDER BY
       	u.name, TO_CHAR(o."createdAt", 'YYYY-MM') DESC
        `;
  }
}
