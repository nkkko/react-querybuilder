import type {
  DefaultCombinatorName,
  RuleGroupTypeAny,
  ValueProcessorByRule,
  ValueProcessorLegacy,
  ValueProcessorOptions,
} from '../../types/index.noReact';
import { joinWith, splitBy, toArray } from '../arrayUtils';
import { isRuleGroup } from '../isRuleGroup';
import { numericRegex } from '../misc';
import { parseNumber } from '../parseNumber';

export const mapSQLOperator = (op: string): string => {
  switch (op.toLowerCase()) {
    case 'null':
      return 'is null';
    case 'notnull':
      return 'is not null';
    case 'notin':
      return 'not in';
    case 'notbetween':
      return 'not between';
    case 'contains':
    case 'beginswith':
    case 'endswith':
      return 'like';
    case 'doesnotcontain':
    case 'doesnotbeginwith':
    case 'doesnotendwith':
      return 'not like';
    default:
      return op;
  }
};

export const mongoOperators = {
  '=': '$eq',
  '!=': '$ne',
  '<': '$lt',
  '<=': '$lte',
  '>': '$gt',
  '>=': '$gte',
  in: '$in',
  notIn: '$nin',
};

export const celCombinatorMap: {
  and: '&&';
  or: '||';
} = {
  and: '&&',
  or: '||',
} satisfies Record<DefaultCombinatorName, '&&' | '||'>;

/**
 * Register these operators with `jsonLogic` before applying the result
 * of `formatQuery(query, 'jsonlogic')`.
 *
 * @example
 * ```
 * for (const [op, func] of Object.entries(jsonLogicAdditionalOperators)) {
 *   jsonLogic.add_operation(op, func);
 * }
 * jsonLogic.apply({ "startsWith": [{ "var": "firstName" }, "Stev"] }, data);
 * ```
 */
export const jsonLogicAdditionalOperators: Record<
  'startsWith' | 'endsWith',
  (a: string, b: string) => boolean
> = {
  startsWith: (a: string, b: string) => typeof a === 'string' && a.startsWith(b),
  endsWith: (a: string, b: string) => typeof a === 'string' && a.endsWith(b),
};

export const numerifyValues = (rg: RuleGroupTypeAny): RuleGroupTypeAny => ({
  ...rg,
  // @ts-expect-error TS doesn't keep track of odd/even indexes here
  rules: rg.rules.map(r => {
    if (typeof r === 'string') {
      return r;
    }

    if (isRuleGroup(r)) {
      return numerifyValues(r);
    }

    if (Array.isArray(r.value)) {
      return { ...r, value: r.value.map(v => parseNumber(v, { parseNumbers: true })) };
    }

    const valAsArray = toArray(r.value, { retainEmptyStrings: true }).map(v =>
      parseNumber(v, { parseNumbers: true })
    );
    if (valAsArray.every(v => typeof v === 'number')) {
      // istanbul ignore else
      if (valAsArray.length > 1) {
        return { ...r, value: valAsArray };
      } else if (valAsArray.length === 1) {
        return { ...r, value: valAsArray[0] };
      }
    }

    return r;
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidValue = (v: any): boolean =>
  (typeof v === 'string' && v.length > 0) ||
  (typeof v === 'number' && !isNaN(v)) ||
  (typeof v !== 'string' && typeof v !== 'number');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shouldRenderAsNumber = (v: any, parseNumbers?: boolean): boolean | undefined =>
  parseNumbers &&
  (typeof v === 'number' ||
    typeof v === 'bigint' ||
    (typeof v === 'string' && numericRegex.test(v)));

export const isValueProcessorLegacy = (
  vp: ValueProcessorLegacy | ValueProcessorByRule
): vp is ValueProcessorLegacy => vp.length >= 3;

export const quoteFieldNamesWithArray = (
  quoteFieldNamesWith: null | string | [string, string] = ['', '']
): [string, string] =>
  Array.isArray(quoteFieldNamesWith)
    ? quoteFieldNamesWith
    : typeof quoteFieldNamesWith === 'string'
      ? [quoteFieldNamesWith, quoteFieldNamesWith]
      : (quoteFieldNamesWith ?? ['', '']);

export const quoteFieldName = (
  f: string,
  { quoteFieldNamesWith, fieldIdentifierSeparator }: ValueProcessorOptions
): string => {
  const [qPre, qPost] = quoteFieldNamesWithArray(quoteFieldNamesWith);
  return typeof fieldIdentifierSeparator === 'string' && fieldIdentifierSeparator.length > 0
    ? joinWith(
        splitBy(f, fieldIdentifierSeparator).map(part => `${qPre}${part}${qPost}`),
        fieldIdentifierSeparator
      )
    : `${qPre}${f}${qPost}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nullOrUndefinedOrEmpty = (v: any): boolean =>
  v === null || typeof v === 'undefined' || v === '';
