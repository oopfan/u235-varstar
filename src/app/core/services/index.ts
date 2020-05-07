import { VarStarOverviewService } from './varstar-overview/varstar-overview.service';
import { VarStarObservationsService } from './varstar-observations/varstar-observations.service';

export const services: any[] = [
    VarStarOverviewService,
    VarStarObservationsService
];

export * from './varstar-overview/varstar-overview.service';
export * from './varstar-observations/varstar-observations.service';
