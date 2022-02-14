import React from 'react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => <Button {...args} />;

export const DrumButton = Template.bind({});
DrumButton.args = {
  primary: true,
};

export const PowerButton = Template.bind({});
