import { Controller } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/guards';

@UseGuards(AuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getData() {
    return this.analyticsService.getData();
  }
}
