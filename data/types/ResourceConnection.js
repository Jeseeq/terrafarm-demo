import {connectionDefinitions} from 'graphql-relay';
import ResourceType from './ResourceType';

export const {
  connectionType: ResourceConnection,
  edgeType: ResourceEdge
} = connectionDefinitions({
  name: 'Resource',
  nodeType: ResourceType,
});

