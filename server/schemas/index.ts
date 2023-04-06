import { Schema, model } from 'mongoose';

export interface PressInfoInterface {
  pid: string;
  pname: string;
  newMainLogo: string;
  newMainLightLogo: string;
  newMainDarkLogo: string;
  thumbnailValid: boolean;
  valid: boolean;
}
export interface PressInterface {
  [key: string]: PressInfoInterface;
}
export interface SectionInterface {
  id: string;
  pressId: string;
  lastEdited: string;
  articles: ArticleInterface[];
}
export interface ArticleInterface {
  id: { type: String; required: true };
  title: string;
  img: string;
  link: string;
}
export interface UserInterface {
  id: string;
  subscribingPressIds: PressInterface[];
}

const SectionShema = new Schema<SectionInterface>({
  id: { type: String, required: true },
  pressId: { type: String, required: true },
  lastEdited: { type: String, required: true },
  articles: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      img: { type: String, required: false },
      link: { type: String, required: false },
    },
  ],
});

export const SectionModel = model<SectionInterface>('Sections', SectionShema);
