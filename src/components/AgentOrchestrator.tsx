import clsx from "clsx";
import { Bot, CheckCircle2, ChevronDown, RadioTower } from "lucide-react";
import { motion } from "motion/react";
import { agents, agentStateForSlide } from "../data/agents";
import type { Slide } from "../data/slides";

type AgentOrchestratorProps = {
  slide: Slide;
  compact?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
};

export default function AgentOrchestrator({ slide, compact = false, collapsed = false, onToggle }: AgentOrchestratorProps) {
  const activeAgents = agents.filter((agent) => slide.agents.includes(agent.name));
  const shownAgents = compact ? activeAgents.slice(0, 5) : activeAgents;

  return (
    <aside className={clsx("glass-card rounded-[24px] p-4", compact ? "w-full" : "w-[340px] shrink-0")}>
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-3 text-left">
        <div>
          <div className="flex items-center gap-2">
            <RadioTower className="h-5 w-5 text-violet-600" />
            <p className="font-black text-slate-900">AI 에이전트 오케스트레이터</p>
          </div>
          <p className="mt-1 text-xs text-slate-500">{slide.number} 장면에 맞춰 상태가 바뀝니다</p>
        </div>
        {onToggle ? <ChevronDown className={clsx("h-5 w-5 transition", collapsed && "rotate-180")} /> : null}
      </button>
      {!collapsed ? (
        <div className="mt-4 grid gap-3">
          {shownAgents.length === 0 ? (
            <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-500">현재 대기 중입니다.</div>
          ) : null}
          {shownAgents.map((agent, index) => {
            const { state, progress } = agentStateForSlide(agent.name, slide, index);
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[20px] border border-slate-200/80 bg-white/82 p-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className={clsx("grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-card", agent.color)}>
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-black text-slate-900">{agent.shortName}</p>
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-black text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        {state}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{agent.role}</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: agent.accent }}
                        initial={{ width: "8%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : null}
    </aside>
  );
}
