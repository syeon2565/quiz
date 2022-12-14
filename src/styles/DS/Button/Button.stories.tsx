import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const story = Template.bind({});
story.args = {
  children: "Button",
};

story.storyName = "Button";
