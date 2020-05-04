import { VstarOverviewService } from './vstar-overview/vstar-overview.service';
import { VstarObservationsService } from './vstar-observations/vstar-observations.service';

export const services: any[] = [
    VstarOverviewService,
    VstarObservationsService
];

export * from './vstar-overview/vstar-overview.service';
export * from './vstar-observations/vstar-observations.service';
