import {connectionDefinitions} from 'graphql-relay';
import GroupType from './GroupType';

export const {
  connectionType: GroupConnection,
  edgeType: GroupEdge
} = connectionDefinitions({
  name: 'Group',
  nodeType: GroupType,
});

