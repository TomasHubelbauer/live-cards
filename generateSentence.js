import words from './words.js';

export default function generateSentence(/** @type {number} */ wordCount) {
  const sentence = [];
  for (let index = 0; index < wordCount; index++) {
    sentence.push(words[Math.random() * words.length | 0]);
  }

  sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);
  return sentence.join(' ');
}
