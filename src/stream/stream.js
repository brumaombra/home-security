import Stream from 'node-rtsp-stream';
import ffmpeg from 'fluent-ffmpeg';

let stream;
let motionProcess;

const rtspUrl = 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4';

// Initialize the stream
export const initStream = () => {
    stream = new Stream({
        name: 'ipcam',
        streamUrl: rtspUrl,
        wsPort: 9999,
        ffmpegOptions: {
            '-stats': '',
            '-r': 30
        }
    });

    console.log('RTSP stream started on ws://localhost:9999');
};

// Initialize motion detection
export const initMotionDetection = () => {
    motionProcess = ffmpeg(rtspUrl)
        .inputOptions('-rtsp_transport tcp')
        .videoFilters('select=gt(scene\\,0.1),metadata=print:file=-')
        .output(process.platform === 'win32' ? 'NUL' : '/dev/null')
        .format('null')
        .on('stderr', (line) => {
            if (line.includes('scene_score')) {
                console.log('🚨 Motion detected!', line);
            }
        })
        .on('error', (err) => {
            console.error('Motion detection error:', err);
        })
        .run();

    console.log('Motion detection started');
};

// Stop the stream
export const stopStream = () => {
    if (stream) {
        stream.stop();
        stream = null;
        console.log('RTSP stream stopped');
    }
};

// Stop the motion detection
export const stopMotionDetection = () => {
    if (motionProcess) {
        motionProcess.kill('SIGINT');
        motionProcess = null;
        console.log('Motion detection stopped');
    }
};