import { ApiProperty } from '@nestjs/swagger';

export class UserSessionValidateDto {
  @ApiProperty({ description: 'Session ID', example: '1234567890' })
  sessionId: string;
}
