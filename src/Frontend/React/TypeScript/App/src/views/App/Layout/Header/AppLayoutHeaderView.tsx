import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SelectControl } from '../../../../controls';
import { TopicPathView } from '../../..';
import styles from './AppLayoutHeaderView.module.css';
import { type SelectControlOption } from '../../../../common';
import '../../../../app/i18n';

export const AppLayoutHeaderView: React.FC = memo(
function AppLayoutHeaderView () {
  const { i18n } = useTranslation(['App']);

  const [searchParams, setSearchParams] = useSearchParams();

  const languages: Array<{ label: string; value: string; }> = [];

  const supportedLngs = i18n.options.supportedLngs as string[];

  supportedLngs.forEach((value) => {
    let label = '';

    switch (value) {
      case 'en':
        label = 'English';
        break;
      case 'ru':
        label = 'Русский';
        break;
      default:
        return;
    }

    languages.push({ label, value });
  });

  function handleLanguageChange (value: string): void {
    if (value !== i18n.language) {
      i18n.changeLanguage(value).then(() => {
        const { lookupQuerystring } = i18n.options.detection!;

        searchParams.set(lookupQuerystring!, value);

        setSearchParams(searchParams);
      });
    }
  }

  const languageOptions: SelectControlOption[] = languages.map((language) => {
    const { label, value } = language;

    return { label, value }
  });

  return (
    <div className={styles.root}>
      <TopicPathView/>
      <SelectControl
        className={styles.select}
        defaultValue={i18n.language}
        onChange={handleLanguageChange}
        options={languageOptions}
      />
    </div>
  );
});
