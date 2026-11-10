import type { Language } from "./content";

export interface ProjectClip {
  id: string;
  src: string;
  poster: string;
  duration: string;
  title: Record<Language, string>;
}

export const projectMedia: Partial<Record<string, ProjectClip[]>> = {
  robotics: [
    { id: "wastearm", src: "/media/wastearm-demo.mp4", poster: "/media/wastearm-demo.jpg", duration: "3:29", title: { zh: "WasteArm 完整演示", en: "WasteArm full demonstration" } },
  ],
  drone: [
    { id: "front-screen", src: "/media/drone-front-screen.mp4", poster: "/media/drone-front-screen.jpg", duration: "0:34", title: { zh: "前视控制界面", en: "Front-view interface" } },
    { id: "front", src: "/media/drone-front.mp4", poster: "/media/drone-front.jpg", duration: "0:25", title: { zh: "前视实拍", en: "Front-view recording" } },
    { id: "side-screen", src: "/media/drone-side-screen.mp4", poster: "/media/drone-side-screen.jpg", duration: "0:37", title: { zh: "侧视控制界面", en: "Side-view interface" } },
    { id: "side", src: "/media/drone-side.mp4", poster: "/media/drone-side.jpg", duration: "0:32", title: { zh: "侧视实拍", en: "Side-view recording" } },
    { id: "side-detail", src: "/media/drone-side-detail.mp4", poster: "/media/drone-side-detail.jpg", duration: "0:23", title: { zh: "侧视飞行记录", en: "Side flight recording" } },
  ],
};

export const projectRepositories: Partial<Record<string, string>> = {
  aigc: "https://github.com/rainbowsteins/LostHorizon",
};
