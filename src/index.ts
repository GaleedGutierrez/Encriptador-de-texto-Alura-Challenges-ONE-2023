import '../styles/styles.scss';
import '../styles/tablet.scss';
import '../styles/desktop.scss';

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

function toggleWrongStyles(event: KeyboardEvent) {
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

function toggleMuneco() {
	const DESKTOP_SCREEN = 1024;
	const WIDTH = window.innerWidth;

	if (WIDTH >= DESKTOP_SCREEN) {
		MUNECO_IMG.classList.remove('hidden');
	} else {
		MUNECO_IMG.classList.add('hidden');
	}
}

const isSentenceEmpty = (sentence: string) => sentence.length === 0;

function toggleResultBox(sentence: string) {
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

function encrypt() {
	const SENTENCE = TEXTAREA.value;
	const IS_SENTENCE_EMPTY = isSentenceEmpty(SENTENCE);
	const IS_SENTENCE_OK = REGEX_ACCEPT.test(SENTENCE);

	if (IS_SENTENCE_EMPTY || !IS_SENTENCE_OK) {
		toggleResultBox(SENTENCE);

		return;
	}

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

function decrypt() {
	const SENTENCE = TEXTAREA.value;
	const IS_SENTENCE_EMPTY = isSentenceEmpty(SENTENCE);
	const IS_SENTENCE_OK = REGEX_ACCEPT.test(SENTENCE);

	if (IS_SENTENCE_EMPTY || !IS_SENTENCE_OK) {
		toggleResultBox(SENTENCE);

		return;
	}

	let newSentence = '';

	const VOWELS_I_O_U = ['i', 'o', 'u'];

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
		} else if (LETTER === 'a') {
			encryptWord = LETTER + SENTENCE[i + 1];
			i++;
		} else if (LETTER === 'e') {
			encryptWord = LETTER + SENTENCE.slice(i + 1, i + 5);
			i += 4;
		}

		const VOWEL =
			DECRYPT_VOWELS[encryptWord as keyof typeof DECRYPT_VOWELS];

		if (VOWEL === undefined) return;

		newSentence += VOWEL;
	}

	toggleResultBox(SENTENCE);
	RESULT_TEXT.innerText = newSentence;
}

function copy() {
	TEXTAREA.value = RESULT_TEXT.innerText;
}

function toggleError(event: KeyboardEvent) {
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
const REGEX_ACCEPT = new RegExp('^[a-z\\n ]+$');

TEXTAREA.addEventListener('keyup', toggleWrongStyles);
TEXTAREA.addEventListener('keyup', toggleError);
window.addEventListener('resize', toggleMuneco);
window.addEventListener('load', toggleMuneco);
BTN_ENCRYPT.addEventListener('click', encrypt);
BTN_DECRYPT.addEventListener('click', decrypt);
BTN_COPY.addEventListener('click', copy);
