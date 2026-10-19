"use client";

import type { Demo } from "@/lib/solutions";
import { BookingDemo } from "./BookingDemo";
import { LaunchDemo } from "./LaunchDemo";
import { MatchDemo } from "./MatchDemo";
import { VoiceDemo } from "./VoiceDemo";

export function DemoFor({ demo }: { demo: Demo }) {
  if (demo === "voice") return <VoiceDemo />;
  if (demo === "booking") return <BookingDemo />;
  if (demo === "matching") return <MatchDemo />;
  if (demo === "launch") return <LaunchDemo />;
  return null;
}
