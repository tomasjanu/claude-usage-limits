import { execFile, exec } from "child_process";
import * as os from "os";

export type SoundType = "taskComplete" | "question";

export function playSound(type: SoundType): void {
  const platform = os.platform();

  if (platform === "win32") {
    const sound =
      type === "taskComplete"
        ? "[System.Media.SystemSounds]::Asterisk.Play()"
        : "[System.Media.SystemSounds]::Exclamation.Play()";
    execFile("powershell", ["-NoProfile", "-Command", sound], () => {});
  } else if (platform === "darwin") {
    const file =
      type === "taskComplete"
        ? "/System/Library/Sounds/Glass.aiff"
        : "/System/Library/Sounds/Ping.aiff";
    execFile("afplay", [file], () => {});
  } else {
    const sound =
      type === "taskComplete" ? "complete" : "dialog-question";
    exec(
      `canberra-gtk-play -i ${sound} 2>/dev/null || paplay /usr/share/sounds/freedesktop/stereo/${sound}.oga 2>/dev/null || echo -e '\\a'`,
      () => {}
    );
  }
}
