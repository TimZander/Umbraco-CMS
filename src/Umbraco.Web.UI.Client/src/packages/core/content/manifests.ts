import { manifests as conditionManifests } from './conditions/manifests.js';
import { manifests as dashboardManifests } from './dashboard/manifests.js';
import { manifests as workspaceManifests } from './workspace/manifests.js';

export const manifests = [...workspaceManifests, ...conditionManifests, ...dashboardManifests];
