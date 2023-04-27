import '../styles/styles.scss';
import '../styles/tablet.scss';
import '../styles/desktop.scss';

import { EVowels } from './enums.mjs';
import {
	BTN_COPY,
	BTN_DECRYPT,
	BTN_ENCRYPT,
	CLARIFY_MESSAGE,
	EXCLAMATION_MARK_ICON,
	INITIAL_BOX_RESULT,
	MUNECO_IMG,
	RESULT_TEXT,
	RESULT_TEXT_CONTAINER,
	TEXTAREA,
} from './nodes.mjs';

function toggleWrongStyles(event: KeyboardEvent): void {
	const TARGET = event.target as HTMLTextAreaElement;
	const SENTENCE = TARGET.value;
	const IS_SENTENCE_OK = REGEX_ACCEPT.test(SENTENCE);
	const IS_SENTENCE_EMPTY = isSentenceEmpty(SENTENCE);

	if (IS_SENTENCE_OK || IS_SENTENCE_EMPTY) {
		TEXTAREA.classList.remove('a-encrypt-box--wrong');
		CLARIFY_MESSAGE.classList.remove('m-clarify-message--wrong');
		EXCLAMATION_MARK_ICON.classList.remove(
			'a-exclamation-mark-icon--wrong'
		);
	} else {
		TEXTAREA.classList.add('a-encrypt-box--wrong');
		CLARIFY_MESSAGE.classList.add('m-clarify-message--wrong');
		EXCLAMATION_MARK_ICON.classList.add('a-exclamation-mark-icon--wrong');
	}
}

function toggleMuneco(): void {
	const DESKTOP_SCREEN = 1024;
	const WIDTH = window.innerWidth;

	if (WIDTH >= DESKTOP_SCREEN) {
		MUNECO_IMG.classList.remove('hidden');
	} else {
		MUNECO_IMG.classList.add('hidden');
	}
}

const isSentenceEmpty = (sentence: string): boolean => sentence.length === 0;

function toggleResultBox(sentence: string): void {
	const IS_SENTENCE_EMPTY = isSentenceEmpty(sentence);
	const IS_SENTENCE_OK = REGEX_ACCEPT.test(sentence);

	if (IS_SENTENCE_EMPTY || !IS_SENTENCE_OK) {
		INITIAL_BOX_RESULT.classList.remove('hidden');
		RESULT_TEXT_CONTAINER.classList.add('hidden');
	} else {
		INITIAL_BOX_RESULT.classList.add('hidden');
		RESULT_TEXT_CONTAINER.classList.remove('hidden');
	}
}

function validateSentence(sentence: string): boolean {
	const IS_SENTENCE_EMPTY = isSentenceEmpty(sentence);
	const IS_SENTENCE_OK = REGEX_ACCEPT.test(sentence);

	if (IS_SENTENCE_EMPTY || !IS_SENTENCE_OK) {
		toggleResultBox(sentence);

		return true;
	}

	return false;
}

function toggleError(event: KeyboardEvent): void {
	const TARGET = event.target as HTMLTextAreaElement;
	const SENTENCE = TARGET.value;
	const IS_SENTENCE_OK = REGEX_ACCEPT.test(SENTENCE);
	const IS_SENTENCE_EMPTY = isSentenceEmpty(SENTENCE);

	TEXTAREA.classList.remove('animation-wrong');
	CLARIFY_MESSAGE.classList.remove('animation-wrong');

	if (!IS_SENTENCE_OK && !IS_SENTENCE_EMPTY) {
		TEXTAREA.classList.add('animation-wrong');
		CLARIFY_MESSAGE.classList.add('animation-wrong');

		return;
	}
}

function encrypt(): void {
	const SENTENCE = TEXTAREA.value;
	const IS_WRONG = validateSentence(SENTENCE);

	if (IS_WRONG) return;

	let newSentence = '';

	for (const LETTER of SENTENCE) {
		const IS_VOWEL = ARRAY_VOWELS.includes(LETTER);

		newSentence += IS_VOWEL
			? ENCRYPT_VOWELS[LETTER as keyof typeof ENCRYPT_VOWELS]
			: LETTER;
	}

	toggleResultBox(SENTENCE);
	RESULT_TEXT.innerText = newSentence;
}

function decrypt(): void {
	const SENTENCE = TEXTAREA.value;
	const IS_WRONG = validateSentence(SENTENCE);

	if (IS_WRONG) return;

	let newSentence = '';

	for (let i = 0; i < SENTENCE.length; i++) {
		const LETTER = SENTENCE[i];
		const IS_VOWEL = ARRAY_VOWELS.includes(LETTER);

		if (!IS_VOWEL) {
			newSentence += LETTER;

			continue;
		}

		let encryptWord = '';
		const IS_I_O_U = VOWELS_I_O_U.includes(LETTER);

		if (IS_I_O_U) {
			encryptWord = LETTER + SENTENCE.slice(i + 1, i + 4);
			i += 3;
		} else if (LETTER === EVowels.A) {
			encryptWord = LETTER + SENTENCE[i + 1];
			i++;
		} else if (LETTER === EVowels.E) {
			encryptWord = LETTER + SENTENCE.slice(i + 1, i + 5);
			i += 4;
		}

		const VOWEL =
			DECRYPT_VOWELS[encryptWord as keyof typeof DECRYPT_VOWELS];

		newSentence += VOWEL;
	}

	toggleResultBox(SENTENCE);
	RESULT_TEXT.innerText = newSentence;
}

function copy() {
	navigator.clipboard.writeText(RESULT_TEXT.innerText);
}

const ENCRYPT_VOWELS = {
	a: 'ai',
	e: 'enter',
	i: 'imes',
	o: 'ober',
	u: 'ufat',
};
const DECRYPT_VOWELS = {
	ai: 'a',
	enter: 'e',
	imes: 'i',
	ober: 'o',
	ufat: 'u',
};
const ARRAY_VOWELS = Object.keys(ENCRYPT_VOWELS);
const VOWELS_I_O_U = ARRAY_VOWELS.slice(2, 5);
const REGEX_ACCEPT = new RegExp('^[a-z\\n ]+$');

TEXTAREA.addEventListener('keyup', toggleWrongStyles);
TEXTAREA.addEventListener('keyup', toggleError);
BTN_ENCRYPT.addEventListener('click', encrypt);
BTN_DECRYPT.addEventListener('click', decrypt);
BTN_COPY.addEventListener('click', copy);
window.addEventListener('resize', toggleMuneco);
window.addEventListener('load', toggleMuneco);
