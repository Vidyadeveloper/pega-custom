/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import PegaExtensionsPhoneType from './index';
import { stateProps, configProps } from './mock';

const meta: Meta<typeof PegaExtensionsPhoneType> = {
  title: 'PegaExtensionsPhoneType',
  component: PegaExtensionsPhoneType,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsPhoneType>;

export const BasePegaExtensionsPhoneType: Story = (args: any) => {

  const props = {
    value: configProps.value,
    hasSuggestions: configProps.hasSuggestions,
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <PegaExtensionsPhoneType {...props} {...args} />
    </>
  );
};

BasePegaExtensionsPhoneType.args = {
  datasource: configProps.datasource,
  label: configProps.label,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage
};
