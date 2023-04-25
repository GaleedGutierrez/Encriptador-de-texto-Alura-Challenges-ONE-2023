/* eslint-disable padding-line-between-statements */
const $ = (selector: string) => document.querySelector(selector);

export const BTN_ENCRYPT = $('#btn-encrypt') as HTMLButtonElement;
export const BTN_DECRYPT = $('#btn-decrypt') as HTMLButtonElement;
export const BTN_COPY = $('#btn-copy') as HTMLButtonElement;
export const TEXTAREA = $('#textarea') as HTMLTextAreaElement;
export const CLARIFY_MESSAGE = $('#clarify-message') as HTMLParagraphElement;
export const EXCLAMATION_MARK_ICON = $(
	'#exclamation-mark-icon'
) as HTMLSpanElement;
export const RESULT_TEXT = $('#result-text') as HTMLHeadingElement;
export const RESULT_TEXT_CONTAINER = $(
	'#result-text-container'
) as HTMLHeadingElement;
export const INITIAL_BOX_RESULT = $('#initial-box-result') as HTMLElement;
export const MUNECO_IMG = $('#muneco-img') as HTMLImageElement;
