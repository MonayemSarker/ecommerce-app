import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Reports')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('monthly-sales')
  @ApiOperation({ summary: 'Get monthly sales report' })
  @ApiResponse({
    status: 200,
    description: 'Monthly sales report retrieved',
  })
  async getMonthlySalesReport() {
    return this.reportService.getMonthlySalesReport();
  }
}
