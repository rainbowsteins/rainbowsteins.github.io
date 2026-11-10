"use client";

import { useId, useState } from "react";
import { projectMedia } from "@/lib/project-media";
import type { Language } from "@/lib/content";

export function pauseProjectVideos(except?: HTMLVideoElement) {
  document.querySelectorAll("video").forEach(video => {
    if (video !== except) video.pause();
  });
}

export function ProjectMedia({ projectId, lang, inDialog = false }: { projectId: string; lang: Language; inDialog?: boolean }) {
  const clips = projectMedia[projectId] || [];
  const [active, setActive] = useState(0);
  const videoId = useId();
  const clip = clips[active] || clips[0];
  if (!clip) return null;
  const filePrefix = typeof window !== "undefined" && window.location.protocol === "file:" ? "." : "";
  const videoSrc = filePrefix + clip.src;
  const posterSrc = filePrefix + clip.poster;

  return <figure className={`project-media${inDialog ? " project-media--dialog" : ""}`}>
    <div className="project-media__frame">
      <video
        key={clip.id}
        id={videoId}
        controls
        playsInline
        preload="none"
        poster={posterSrc}
        aria-label={clip.title[lang]}
        onPlay={event => pauseProjectVideos(event.currentTarget)}
      >
        <source src={videoSrc} type="video/mp4" />
        <a href={videoSrc}>{lang === "zh" ? "打开项目视频" : "Open project video"}</a>
      </video>
    </div>
    <figcaption className="project-media__caption">
      <span>{clip.title[lang]}</span>
      <span className="mono">{clip.duration}</span>
    </figcaption>
    {clips.length > 1 && <div className="project-media__selector" role="group" aria-label={lang === "zh" ? "切换无人机演示视频" : "Select a drone demonstration"}>
      {clips.map((item, index) => <button
        type="button"
        key={item.id}
        aria-pressed={active === index}
        aria-controls={videoId}
        onClick={() => { if (active !== index) { pauseProjectVideos(); setActive(index); } }}
      >{item.title[lang]}</button>)}
    </div>}
  </figure>;
}
