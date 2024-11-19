import type { RulesLogic } from 'json-logic-js';
import type { RQBJsonLogic } from 'react-querybuilder';

export interface RQBJsonLogicDateBetween {
  dateBetween: [RQBJsonLogic, RQBJsonLogic, RQBJsonLogic];
}
export interface RQBJsonLogicDateNotBetween {
  dateNotBetween: [RQBJsonLogic, RQBJsonLogic, RQBJsonLogic];
}
export interface RQBJsonLogicDateIn {
  dateIn: [RQBJsonLogic, RQBJsonLogic[]];
}
export interface RQBJsonLogicDateNotIn {
  dateNotIn: [RQBJsonLogic, RQBJsonLogic[]];
}
export interface RQBJsonLogicDateBefore {
  dateBefore: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}
export interface RQBJsonLogicDateOnOrBefore {
  dateOnOrBefore: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}
export interface RQBJsonLogicDateOn {
  dateOn: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}
export interface RQBJsonLogicDateNotOn {
  dateNotOn: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}
export interface RQBJsonLogicDateAfter {
  dateAfter: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}
export interface RQBJsonLogicDateOnOrAfter {
  dateOnOrAfter: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}

/**
 * JsonLogic rule object with additional operators generated by {@link formatQuery}
 * and accepted by {@link parseJsonLogic}.
 */
export type RQBDateTimeJsonLogic =
  | RQBJsonLogic
  | RulesLogic<
      | RQBJsonLogicDateAfter
      | RQBJsonLogicDateBefore
      | RQBJsonLogicDateBetween
      | RQBJsonLogicDateIn
      | RQBJsonLogicDateNotBetween
      | RQBJsonLogicDateNotIn
      | RQBJsonLogicDateNotOn
      | RQBJsonLogicDateOn
      | RQBJsonLogicDateOnOrAfter
      | RQBJsonLogicDateOnOrBefore
    >;
