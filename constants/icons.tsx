import { JSX } from "react";
import { Settings, User } from "lucide-react";

type iconsProps = {
  [key: string]: JSX.Element;
};

export const ICONS: iconsProps = {
  Settings: <Settings />,
  User: <User />,
};
