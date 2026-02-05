import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
    BsPlayFill,
    BsPauseFill,
    BsVolumeUpFill,
    BsVolumeMuteFill,
    BsFullscreen,
    BsFullscreenExit
} from 'react-icons/bs';
import styles from '../css/CustomPlayer.module.scss';
import type { CustomPlayerProps } from '../types/MovieTypes';



const CustomPlayer = ({ url, isLocal }: CustomPlayerProps) => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<number | null>(null);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setMuted(newVolume === 0);
    };

    const handleToggleMute = () => {
        setMuted(!muted);
    };

    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        setSeeking(false);
        const target = e.target as HTMLInputElement;
        const newTime = parseFloat(target.value) * duration;
        if (playerRef.current) {
            playerRef.current.currentTime = newTime;
        }
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setFullscreen(true);
        } else {
            document.exitFullscreen();
            setFullscreen(false);
        }
    };

    const formatTime = (seconds: number) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (playing) {
                setShowControls(false);
            }
        }, 3000);
    };

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={styles.playerWrapper}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => playing && setShowControls(false)}
            onClick={handlePlayPause}
        >
            <ReactPlayer
                ref={playerRef}
                src={isLocal ? url : `https://www.youtube.com/watch?v=${url}`}
                playing={playing}
                volume={volume}
                muted={muted}
                controls={false}
                onTimeUpdate={(e) => {
                    const video = e.target as HTMLVideoElement;
                    if (!seeking && video.duration) {
                        setPlayed(video.currentTime / video.duration);
                    }
                }}
                onLoadedMetadata={(e) => {
                    const video = e.target as HTMLVideoElement;
                    setDuration(video.duration);
                }}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
            />

            <div className={`${styles.controls} ${showControls ? styles.show : ''}`} onClick={(e) => e.stopPropagation()}>
                <div
                    className={styles.progressBar}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pos = (e.clientX - rect.left) / rect.width;
                        const newTime = pos * duration;
                        setPlayed(pos);
                        if (playerRef.current) {
                            playerRef.current.currentTime = newTime;
                        }
                    }}
                >
                    <input
                        type="range"
                        min={0}
                        max={0.999999}
                        step="any"
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                    />
                    <div
                        className={styles.progressFilled}
                        style={{ width: `${played * 100}%` }}
                    />
                </div>

                <div className={styles.controlsBottom}>
                    <div className={styles.leftControls}>
                        <button onClick={handlePlayPause} className={styles.playButton}>
                            {playing ? <BsPauseFill /> : <BsPlayFill />}
                        </button>

                        <div className={styles.volumeControl}>
                            <button onClick={handleToggleMute} className={styles.volumeButton}>
                                {muted || volume === 0 ? <BsVolumeMuteFill /> : <BsVolumeUpFill />}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={muted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className={styles.volumeSlider}
                            />
                        </div>

                        <div className={styles.time}>
                            {formatTime(duration * played)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className={styles.rightControls}>
                        <button onClick={handleFullscreen} className={styles.fullscreenButton}>
                            {fullscreen ? <BsFullscreenExit /> : <BsFullscreen />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPlayer;
