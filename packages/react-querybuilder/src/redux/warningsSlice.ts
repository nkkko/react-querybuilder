import type { PayloadAction, Slice, SliceSelectors } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { messages } from '../messages';

type ValuesAsKeys<T> =
  T extends Record<infer _K, infer V>
    ? [V] extends [string]
      ? { [Key in V]: boolean }
      : never
    : never;
type ValuesType<T> =
  T extends Record<infer _K, infer V> ? ([V] extends [string] ? V : never) : never;
export type WarningsSliceState = ValuesAsKeys<typeof messages>;
export type Messages = ValuesType<typeof messages>;
export const initialState: WarningsSliceState = {
  [messages.errorInvalidIndependentCombinatorsProp]: false,
  [messages.errorUnnecessaryIndependentCombinatorsProp]: false,
  [messages.errorDeprecatedRuleGroupProps]: false,
  [messages.errorDeprecatedRuleProps]: false,
  [messages.errorBothQueryDefaultQuery]: false,
  [messages.errorUncontrolledToControlled]: false,
  [messages.errorControlledToUncontrolled]: false,
  [messages.errorEnabledDndWithoutReactDnD]: false,
};

// export type WarningsSliceState = Record<keyof typeof messages, boolean>;
// export const initialState = Object.fromEntries(
//   Object.keys(messages).map(key => [key, false])
// ) as WarningsSliceState;

export const warningsSlice: Slice<
  {
    [messages.errorInvalidIndependentCombinatorsProp]: boolean;
    [messages.errorUnnecessaryIndependentCombinatorsProp]: boolean;
    [messages.errorDeprecatedRuleGroupProps]: boolean;
    [messages.errorDeprecatedRuleProps]: boolean;
    [messages.errorBothQueryDefaultQuery]: boolean;
    [messages.errorUncontrolledToControlled]: boolean;
    [messages.errorControlledToUncontrolled]: boolean;
    [messages.errorEnabledDndWithoutReactDnD]: boolean;
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rqbWarn: (state: any, { payload }: PayloadAction<Messages>) => void;
  },
  string,
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SliceSelectors<any>
> = createSlice({
  name: 'warnings',
  initialState,
  reducers: {
    rqbWarn: (state, { payload }: PayloadAction<Messages>) => {
      if (!state[payload]) {
        console.error(payload);
        state[payload] = true;
      }
    },
  },
}) satisfies Slice;
