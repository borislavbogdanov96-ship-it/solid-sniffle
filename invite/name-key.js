/*
 * name-key.js — shared by invite/index.html and invite/admin.html.
 *
 * Decision (Claude Docs audit, 2026-11-05): name matching ignores capital
 * letters and accepts a name typed in Cyrillic or Latin. Cyrillic is converted
 * with the official Bulgarian transliteration (Закон за транслитерацията, 2009).
 * Unofficial spellings (Christo, Jeliazko) and nicknames deliberately do NOT
 * match — those replies go to "Несвързани" for manual linking.
 */
(function (root) {
  'use strict';

  var SALT = 'bn-2027|';

  var MAP = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a',
    'ь': 'y', 'ю': 'yu', 'я': 'ya'
  };

  /** Official rule: "ия" at the end of a word is "ia" (Мария → Maria). */
  function transliterate(s) {
    s = s.replace(/ия(?=$|[^а-яё])/g, 'ia');
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      out += Object.prototype.hasOwnProperty.call(MAP, ch) ? MAP[ch] : ch;
    }
    return out;
  }

  /** "Иван  Петров-Колев" and "ivan petrov kolev" → "ivanpetrovkolev". */
  function normalizeName(raw) {
    var s = String(raw || '').normalize('NFC').toLowerCase().trim();
    s = transliterate(s);
    s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); // strip accents
    return s.replace(/[^a-z]/g, '');
  }

  /** Two or more words, each at least 2 letters. */
  function looksLikeFullName(raw) {
    var words = String(raw || '').trim().split(/[\s]+/).filter(function (w) {
      return w.replace(/[^\p{L}]/gu, '').length >= 2;
    });
    return words.length >= 2;
  }

  /** Hex SHA-256 of SALT + normalised name. Resolves null without WebCrypto. */
  function nameHash(raw) {
    var key = normalizeName(raw);
    var subtle = root.crypto && root.crypto.subtle;
    if (!key || !subtle) return Promise.resolve(null);
    var bytes = new TextEncoder().encode(SALT + key);
    return subtle.digest('SHA-256', bytes).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    });
  }

  var api = {
    normalizeName: normalizeName,
    looksLikeFullName: looksLikeFullName,
    nameHash: nameHash
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.NameKey = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
