import React, { memo } from 'react';
import { TopicPathView } from '../../..';
import { useAppInstance } from '../../../../app';
import { type SelectControlOption } from '../../../../common';
import styles from './AppLayoutHeaderView.module.css';

export const AppLayoutHeaderView: React.FC = memo(
function AppLayoutHeaderView (): React.ReactElement | null {
  const { controls, hooks } = useAppInstance();

  const serviceOfLocalization = hooks.Features.Localization.useService();

  const languages: Array<{ label: string; value: string; }> = [];

  const supportedLanguages = serviceOfLocalization.getSupportedLanguages();

  supportedLanguages.forEach((value) => {
    let label = '';

    switch (String(value)) {
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
    serviceOfLocalization.setCurrentLanguage(value);
  }

  const languageOptions: SelectControlOption[] = languages.map((language) => {
    const { label, value } = language;

    return { label, value }
  });

  return (
    <div className={styles.root}>
      <TopicPathView/>
      <controls.Select
        className={styles.select}
        defaultValue={serviceOfLocalization.getCurrentLanguage()}
        onChange={handleLanguageChange}
        options={languageOptions}
      />
    </div>
  );
});
