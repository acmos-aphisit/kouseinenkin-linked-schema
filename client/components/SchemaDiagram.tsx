"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TABLES, CONNECTIONS, ConnectionKind } from "@/data/schema";
import { fieldKey, isClickable, connectedComponent } from "@/data/graph";

const COLORS: Record<ConnectionKind, string> = {
  ref: "#157a76",
  link: "#1f6fb2",
  pay: "#b5651d",
};

interface PathInfo {
  key: string;
  d: string;
  kind: ConnectionKind;
  dashed: boolean;
  t1: string;
  f1: string;
  t2: string;
  f2: string;
}

export default function SchemaDiagram() {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const fieldRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const noteRef = useRef<HTMLDivElement | null>(null);

  const [paths, setPaths] = useState<PathInfo[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [notePos, setNotePos] = useState({ left: 0, top: 0 });

  const componentSet = activeKey ? connectedComponent(activeKey) : null;

  const registerField = useCallback((key: string, el: HTMLDivElement | null) => {
    if (el) fieldRefs.current.set(key, el);
    else fieldRefs.current.delete(key);
  }, []);

  const recomputeGeometry = useCallback(() => {
    const innerEl = innerRef.current;
    if (!innerEl) return;
    const ir = innerEl.getBoundingClientRect();

    const nextPaths: PathInfo[] = [];
    CONNECTIONS.forEach((c) => {
      const k1 = fieldKey(c.t1, c.f1);
      const k2 = fieldKey(c.t2, c.f2);
      const e1 = fieldRefs.current.get(k1);
      const e2 = fieldRefs.current.get(k2);
      if (!e1 || !e2) return;

      const r1 = e1.getBoundingClientRect();
      const r2 = e2.getBoundingClientRect();
      const p1 = { x: r1.left - ir.left, right: r1.right - ir.left, y: r1.top - ir.top + r1.height / 2 };
      const p2 = { x: r2.left - ir.left, right: r2.right - ir.left, y: r2.top - ir.top + r2.height / 2 };

      const leftToRight = p1.x < p2.x;
      const x1 = leftToRight ? p1.right : p1.x;
      const x2 = leftToRight ? p2.x : p2.right;
      const mx = (x1 + x2) / 2;
      const d = `M ${x1} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${x2} ${p2.y}`;

      nextPaths.push({
        key: `${k1}__${k2}`,
        d,
        kind: c.kind,
        dashed: !!c.dashed,
        t1: c.t1,
        f1: c.f1,
        t2: c.t2,
        f2: c.f2,
      });
    });

    setPaths(nextPaths);
    setSvgSize({ width: innerEl.scrollWidth, height: innerEl.scrollHeight });

    const anchor = fieldRefs.current.get(fieldKey("ninyo", "seventy_nenkin_no"));
    if (anchor) {
      const r = anchor.getBoundingClientRect();
      setNotePos({ left: r.left - ir.left + 40, top: r.top - ir.top + 40 });
    }
  }, []);

  useEffect(() => {
    recomputeGeometry();
    const onResize = () => recomputeGeometry();
    window.addEventListener("resize", onResize);
    // fonts can finish loading a tick after mount; recompute once more
    const t = setTimeout(recomputeGeometry, 80);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, [recomputeGeometry]);

  const handleFieldClick = (key: string) => {
    if (!isClickable(key)) return;
    setQuery("");
    setActiveKey((prev) => (prev === key ? null : key));
  };

  const q = query.trim().toLowerCase();

  return (
    <>
      <header className="dg-header">
        <h1>厚生年金サポートシステム_連動更新処理図解</h1>
        <p className="dg-subtitle">
          資格所得 → 基本マスタ → 資格喪失／任用期間変更／随時改定／定時決定／賞与支払 の厚生年金事務サポートシステムにて基本マスタ検索画面での連動更新処理の図解。
        </p>
        <div className="dg-toolbar">
          <div className="dg-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="項目名で検索（例: kisonenkin_no）"
              value={query}
              onChange={(e) => {
                setActiveKey(null);
                setQuery(e.target.value);
              }}
            />
          </div>
          <button
            className={"dg-note-toggle" + (showNote ? " on" : "")}
            onClick={() => setShowNote((v) => !v)}
          >
            2026-08-26 改修メモを表示
          </button>
          <div className="dg-legend">
            <span><i style={{ background: "#a5322b" }} />基準キー (base_no)</span>
            <span><i style={{ background: "#157a76" }} />マスタ参照項目</span>
            <span><i style={{ background: "#1f6fb2" }} />連動項目</span>
            <span><i style={{ background: "#b5651d" }} />標準報酬・年金番号系</span>
            <span><i style={{ background: "#a3aeb2" }} />未使用/参照なし</span>
          </div>
        </div>
        <p className="dg-hint">
          下線付きの項目をクリックすると、テーブルをまたいだ連動先が線でハイライトされます。もう一度クリックで解除。
        </p>
      </header>

      <div className="dg-scroll-wrap">
        <div className="dg-inner" ref={innerRef}>
          <svg
            className="dg-lines"
            width={svgSize.width}
            height={svgSize.height}
            viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          >
            {paths.map((p) => {
              const k1 = fieldKey(p.t1, p.f1);
              const k2 = fieldKey(p.t2, p.f2);
              const inSelected = !!(componentSet && componentSet.has(k1) && componentSet.has(k2));
              return (
                <path
                  key={p.key}
                  d={p.d}
                  fill="none"
                  stroke={inSelected ? "#b97c0a" : COLORS[p.kind]}
                  strokeWidth={inSelected ? 2.4 : 1.2}
                  strokeDasharray={p.dashed ? "5,4" : undefined}
                  opacity={activeKey ? (inSelected ? 0.95 : 0.08) : 0.55}
                />
              );
            })}
          </svg>

          {TABLES.map((t) => (
            <div className="dg-tcard" key={t.id}>
              <div className="dg-thead">{t.title}</div>
              {t.annot && (
                <div className="dg-annot">
                  {t.annot[0]}
                  <small>{t.annot[1]}</small>
                </div>
              )}
              {t.fields.map((f) => {
                const key = fieldKey(t.id, f.name);
                const clickable = isClickable(key);
                const isActive = !!(componentSet && componentSet.has(key));
                const isDim = activeKey ? !isActive : q ? !f.name.toLowerCase().includes(q) : false;
                const isMatch = !activeKey && q && f.name.toLowerCase().includes(q);
                const classes = [
                  "dg-frow",
                  clickable ? "clickable" : "",
                  isActive && activeKey ? "active" : "",
                  isDim ? "dim" : "",
                  isMatch ? "match" : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <div
                    key={key}
                    ref={(el) => registerField(key, el)}
                    className={classes}
                    data-cat={f.cat}
                    onClick={() => handleFieldClick(key)}
                  >
                    <span className="dg-dot" />
                    <span>{f.name}</span>
                  </div>
                );
              })}
            </div>
          ))}

          <div
            ref={noteRef}
            className={"dg-note-card" + (showNote ? " show" : "")}
            style={{ left: notePos.left, top: notePos.top }}
          >
            <span className="date">2026-08-26　改修</span>
            資格取得 → 基本マスタ・各業務
            <ul>
              <li>「0:決裁中」の場合のみ</li>
              <li>変更した項目のみ連動させること</li>
              <li>
                「確定」以外から「確定」に変更した時は、<u>以前指定</u>した内容
                <br />
                （標準報酬や決定月など）連動すること
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="dg-footer">
        <b>①資格取得で「確定ステータス」を「確定」にした際の動き</b> ―
        資格取得 → 基本マスタ・各業務が「0:決裁中」の場合のみ、変更した項目だけを連動させます。
        「確定」以外から「確定」に変更した場合は、以前指定した内容（標準報酬・決定月など）のみ連動します。
      </footer>
    </>
  );
}
