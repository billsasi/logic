import { And, Or, Not, Switch } from './circuitElements/components';

export const getNewShape = (shapes, ctx, name) => {
  if (name === 'and') return new And(shapes, ctx, 0, 0);
  if (name === 'or') return new Or(shapes, ctx, 0, 0);
  if (name === 'not') return new Not(shapes, ctx, 0, 0);
  if (name === 'sw') return new Switch(shapes, ctx, 0, 0);
};
