import { exec } from "child_process";
import * as os from "os";

export type SoundType = "taskComplete" | "question";

export function playSound(type: SoundType): void {
  const platform = os.platform();
  let cmd: string;

  if (platform === "win32") {
    // Windows: use PowerShell to play system sounds
    const sound =
      type === "taskComplete"
        ? "[System.Media.SystemSounds]::Asterisk.Play()"
        : "[System.Media.SystemSounds]::Exclamation.Play()";
    cmd = `powershell -NoProfile -Command "${sound}"`;
  } else if (platform === "darwin") {
    // macOS: use afplay with system sounds
    const file =
      type === "taskComplete"
        ? "/System/Library/Sounds/Glass.aiff"
        : "/System/Library/Sounds/Ping.aiff";
    cmd = `afplay "${file}"`;
  } else {
    // Linux: try paplay, then canberra, then fallback to bell
    const sound =
      type === "taskComplete" ? "complete" : "dialog-question";
    cmd = `canberra-gtk-play -i ${sound} 2>/dev/null || paplay /usr/share/sounds/freedesktop/stereo/${sound}.oga 2>/dev/null || echo -e '\\a'`;
  }

  exec(cmd, () => {
    // ignore errors - sound is best-effort
  });
}
