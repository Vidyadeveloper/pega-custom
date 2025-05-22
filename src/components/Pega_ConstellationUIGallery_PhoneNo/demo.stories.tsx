/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import PegaConstellationUiGalleryPhoneNo from './index';
import { stateProps, configProps } from './mock';

const meta: Meta<typeof PegaConstellationUiGalleryPhoneNo> = {
  title: 'PegaConstellationUiGalleryPhoneNo',
  component: PegaConstellationUiGalleryPhoneNo,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaConstellationUiGalleryPhoneNo>;

export const BasePegaConstellationUiGalleryPhoneNo: Story = (args: any) => {
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
            updateFieldValue: () => {
              /* nothing */
            },
            triggerFieldChange: () => {
              /* nothing */
            }
          };
        },
        ignoreSuggestion: () => {
          /* nothing */
        },
        acceptSuggestion: () => {
          /* nothing */
        },
        setInheritedProps: () => {
          /* nothing */
        },
        resolveConfigProps: () => {
          /* nothing */
        }
      };
    }
  };

  return (
    <>
      <PegaConstellationUiGalleryPhoneNo {...props} {...args} />
    </>
  );
};

BasePegaConstellationUiGalleryPhoneNo.args = {
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
