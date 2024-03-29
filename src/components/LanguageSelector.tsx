import { useRouter } from 'next/router';
import React from 'react';

const languages = ['en-US', 'en-GB', 'es-ES'];

export default function LanguageSelector(){
  const router = useRouter();
  const getFlagEmoji = (language: string) => {
    const flagEmojis: {[key: string]: string} = {
      "en-US": "🇺🇸",
      "en-GB": "🇬🇧",
      "es-ES": "🇪🇸",
    };

    return flagEmojis[language] || '';
  };

  async function setLanguage(language: string) {
    await fetch("/set-locale", {
      method: "POST",
      body: JSON.stringify({ locale: language }),
    });
    router.push(router.asPath, undefined, { locale: language });
  }

  return (
    <div>
      <select
        id="language-select"
        value={router.locale}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages?.map((language) => (
          <option key={language} value={language}>
            {getFlagEmoji(language)}
          </option>
        ))}
      </select>
    </div>
  );
};
