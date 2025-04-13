import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
// import {
//   ApiTags,
//   ApiBearerAuth,
//   ApiOperation,
//   ApiResponse,
// } from '@nestjs/swagger';

// @ApiTags('Reports')
@UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth('JWT-auth')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('monthly-sales')
  // @ApiOperation({ summary: 'Get monthly sales report' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Monthly sales report',
  // })
  async getMonthlySalesReport() {
    return this.reportService.getMonthlySalesReport();
  }

  @Get('user-orders')
  // @ApiOperation({ summary: 'Get user-wise order report' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User-wise order report',
  // })
  async getUserOrderReport() {
    return this.reportService.getUserOrderReport();
  }

  @Get('product-sales')
  // @ApiOperation({ summary: 'Get product-wise sales report' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Product-wise sales report',
  // })
  async getProductSalesReport() {
    return this.reportService.getProductSalesReport();
  }
}
