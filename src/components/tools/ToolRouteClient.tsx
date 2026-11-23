"use client";

import { TOOL_PANELS } from "@/components/tools/registry";
import { ToolShell } from "@/components/tools/ToolShell";
import { getToolIcon } from "@/lib/tools/icons";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";

export function ToolRouteClient({
  routeId,
  categoryId,
}: {
  routeId: ToolRouteId;
  categoryId: CategoryId;
}) {
  const Panel = TOOL_PANELS[routeId];
  const Icon = getToolIcon(routeId);

  return (
    <ToolShell routeId={routeId} categoryId={categoryId} icon={Icon}>
      <Panel />
    </ToolShell>
  );
}