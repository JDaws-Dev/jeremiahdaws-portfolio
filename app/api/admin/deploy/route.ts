import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

export async function POST(req: Request) {
  // Local-only: this shells out to git in the project root.
  // Vercel serverless can't push to GitHub (read-only fs, no creds).
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_DEPLOY) {
    return NextResponse.json(
      {
        ok: false,
        error: "Deploy is local-only. Run dev server, then click Deploy.",
      },
      { status: 403 }
    );
  }

  const body = (await req.json().catch(() => null)) as { message?: string } | null;
  const cwd = process.cwd();
  const env = { ...process.env, GIT_TERMINAL_PROMPT: "0" };

  try {
    // Stage all changes (overrides.json, uploaded thumbnails, anything else)
    await exec("git", ["add", "-A"], { cwd, env });

    // Check if there's anything to commit
    const { stdout: status } = await exec(
      "git",
      ["status", "--porcelain"],
      { cwd, env }
    );
    if (!status.trim()) {
      return NextResponse.json({
        ok: true,
        nothing: true,
        message: "Nothing to push — working tree clean.",
      });
    }

    // Build a default commit message summarizing what changed
    const lines = status.trim().split("\n");
    const overrideChanged = lines.some((l) => l.includes("overrides.json"));
    const uploaded = lines.filter((l) => l.includes("public/portfolio/uploaded/")).length;
    const fallbackMsg =
      body?.message ||
      [
        overrideChanged ? "Admin overrides updated" : null,
        uploaded ? `${uploaded} thumbnail${uploaded === 1 ? "" : "s"} uploaded` : null,
      ]
        .filter(Boolean)
        .join(" · ") ||
      "Admin updates";

    const commitMessage = `${fallbackMsg}\n\nVia /admin Deploy button.`;

    await exec("git", ["commit", "-m", commitMessage], { cwd, env });
    const { stdout: rev } = await exec("git", ["rev-parse", "HEAD"], { cwd, env });
    await exec("git", ["push"], { cwd, env });

    return NextResponse.json({
      ok: true,
      commit: rev.trim().slice(0, 7),
      changed: lines.length,
      message: commitMessage.split("\n")[0],
    });
  } catch (err) {
    const e = err as { stderr?: string; stdout?: string; message?: string };
    return NextResponse.json(
      {
        ok: false,
        error: e.stderr || e.message || "Deploy failed",
        stdout: e.stdout,
      },
      { status: 500 }
    );
  }
}
