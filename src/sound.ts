import { execFile, exec } from "child_process";
import * as os from "os";
import * as path from "path";

export type SoundType = "taskComplete" | "question";

function getPowerShellPath(): string {
  const sysRoot = process.env.SystemRoot || "C:\\Windows";
  return path.join(sysRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
}

export function playSound(type: SoundType): void {
  const platform = os.platform();

  if (platform === "win32") {
    const freq = type === "taskComplete" ? 600 : 800;
    const duration = type === "taskComplete" ? 300 : 200;
    execFile(
      getPowerShellPath(),
      ["-NoProfile", "-Command", `[console]::beep(${freq},${duration})`],
      () => {}
    );
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
