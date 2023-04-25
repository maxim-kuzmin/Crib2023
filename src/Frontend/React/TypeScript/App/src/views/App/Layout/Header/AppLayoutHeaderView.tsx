import React, { memo } from 'react';
import { SelectControl } from '../../../../controls';
import { TopicPathView } from '../../..';
import { getModule } from '../../../../app';
import { type SelectControlOption } from '../../../../common';
import '../../../../app/Localization/LocalizationSetup';
import styles from './AppLayoutHeaderView.module.css';

export const AppLayoutHeaderView: React.FC = memo(
function AppLayoutHeaderView () {
  const hooksOfLocalization = getModule().getLocalizationHooks();

  const serviceOfLocalization = hooksOfLocalization.useService();

  const languages: Array<{ label: string; value: string; }> = [];

  const supportedLanguages = serviceOfLocalization.getSupportedLanguages();

  supportedLanguages.forEach((value) => {
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
    serviceOfLocalization.setCurrentLanguage(value);
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
        defaultValue={serviceOfLocalization.getCurrentLanguage()}
        onChange={handleLanguageChange}
        options={languageOptions}
      />
    </div>
  );
});
