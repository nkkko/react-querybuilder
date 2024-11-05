import * as React from 'react';
import { Provider } from 'react-redux';
import { QueryBuilderStateContext } from '../redux';
import { queryBuilderStore } from '../redux/index.debug';

/**
 * Context provider for the `{@link QueryBuilder}` state store.
 */
export const QueryBuilderStateProvider = (props: {
  children: React.ReactNode;
}): React.JSX.Element => (
  <Provider context={QueryBuilderStateContext} store={queryBuilderStore}>
    {props.children}
  </Provider>
);
