import { VarStarOverviewService } from './varstar-overview/varstar-overview.service';
import { VarStarDetailsService } from './varstar-details/varstar-details.service';

export const services: any[] = [
    VarStarOverviewService,
    VarStarDetailsService
];

export * from './varstar-overview/varstar-overview.service';
export * from './varstar-details/varstar-details.service';
