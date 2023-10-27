import { useRef, FC } from 'react';

interface IVideoPlayer {
  videoUrl: string;
  previewImageUrl: string;
  isPlaying: boolean;
}
export const VideoPlayer: FC<IVideoPlayer> = ({ videoUrl, previewImageUrl, isPlaying }) => {
  const videoRef = useRef(null);

  return (
    <div>
      {isPlaying ? (
        <video ref={videoRef} src={videoUrl} autoPlay loop muted width="280" height="175" />
      ) : (
        <img src={previewImageUrl} alt="Preview" width="280" height="175" />
      )}
    </div>
  );
};
