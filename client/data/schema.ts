// ---------------------------------------------------------------------------
// このファイルが図のもとデータです。テーブル・項目・連動関係を直接編集すれば
// 画面側の表示とハイライトは自動的に更新されます。
// ---------------------------------------------------------------------------

export type Category = "base" | "ref" | "link" | "pay" | "inactive" | "normal";

export interface FieldDef {
  name: string;
  cat: Category;
}

export interface TableDef {
  id: string;
  title: string;
  /** 表の下に添える小さな注記（任意） */
  annot?: [string, string];
  fields: FieldDef[];
}

export type ConnectionKind = "ref" | "link" | "pay";

export interface ConnectionDef {
  t1: string;
  f1: string;
  t2: string;
  f2: string;
  kind: ConnectionKind;
  dashed?: boolean;
}

export const TABLES: TableDef[] = [
    {
    id: "kihon",
    title: "基本マスタ",
    fields: [
      { name: "No", cat: "normal" },
      { name: "group_cd", cat: "normal" },
      { name: "syokuin_no", cat: "ref" },
      { name: "syokuin_name", cat: "ref" },
      { name: "syokuin_name_kana", cat: "normal" },
      { name: "hihokensya_no", cat: "ref" },
      { name: "senin_flg", cat: "normal" },
      { name: "seibetsu", cat: "normal" },
      { name: "housyu_toukyu ※", cat: "ref" },
      { name: "taisyoku_yotei_date", cat: "normal" },
      { name: "housyu_getsugaku", cat: "link" },
      { name: "birth_nengo", cat: "normal" },
      { name: "birth_year", cat: "normal" },
      { name: "birth_month", cat: "normal" },
      { name: "birth_date", cat: "normal" },
      { name: "kisonenkin_no", cat: "link" },
      { name: "jigyohi_name", cat: "ref" },
      { name: "yubin_no", cat: "normal" },
      { name: "jyusyo", cat: "normal" },
      { name: "haigusya", cat: "ref" },
      { name: "shorttime_flg", cat: "ref" },
      { name: "seventy_over_flg", cat: "normal" },
      { name: "shikaku_syutoku_date", cat: "ref" },
      { name: "decide_gengou", cat: "pay" },
      { name: "decide_year", cat: "pay" },
      { name: "decide_month", cat: "pay" },
      { name: "update_date", cat: "normal" },
    ],
  },
  {
    id: "shutoku",
    title: "資格所得",
    annot: ["「確定」に変更", "詳しくみる →"],
    fields: [
      { name: "No", cat: "normal" },
      { name: "base_no", cat: "base" },
      { name: "group_cd", cat: "ref" },
      { name: "group_name", cat: "ref" },
      { name: "syokuin_no", cat: "ref" },
      { name: "syokuin_name", cat: "ref" },
      { name: "syokuin_name_kana", cat: "normal" },
      { name: "senin_flg", cat: "normal" },
      { name: "hihokensya_no", cat: "ref" },
      { name: "birth_nengo", cat: "normal" },
      { name: "birth_year", cat: "normal" },
      { name: "birth_month", cat: "normal" },
      { name: "birth_date", cat: "normal" },
      { name: "seibetsu", cat: "normal" },
      { name: "housyu_getsugaku", cat: "link" },
      { name: "kisonenkin_no", cat: "link" },
      { name: "taisyoku_yotei_date", cat: "normal" },
      { name: "huyou_state", cat: "normal" },
      { name: "yubin_no", cat: "normal" },
      { name: "jyusyo", cat: "normal" },
      { name: "gaito_syubetsu", cat: "ref" },
      { name: "shikaku_syutoku_date", cat: "ref" },
    ],
  },
  {
    id: "soshitsu",
    title: "資格喪失",
    fields: [
      { name: "No", cat: "normal" },
      { name: "base_no", cat: "base" },
      { name: "group_cd", cat: "normal" },
      { name: "group_name", cat: "ref" },
      { name: "syokuin_no", cat: "inactive" },
      { name: "syokuin_name", cat: "inactive" },
      { name: "hihokensya_no", cat: "ref" },
    ],
  },
  {
    id: "ninyo",
    title: "任用期間変更",
    fields: [
      { name: "No", cat: "normal" },
      { name: "base_no", cat: "base" },
      { name: "group_cd", cat: "inactive" },
      { name: "group_name", cat: "ref" },
      { name: "syokuin_no", cat: "inactive" },
      { name: "syokuin_name", cat: "normal" },
      { name: "hihokensya_no", cat: "ref" },
      { name: "getsugaku_current", cat: "link" },
      { name: "seventy_nenkin_no", cat: "pay" },
    ],
  },
  {
    id: "zuiji",
    title: "随時改定",
    fields: [
      { name: "No", cat: "normal" },
      { name: "base_no", cat: "base" },
      { name: "group_cd", cat: "normal" },
      { name: "group_name", cat: "ref" },
      { name: "syokuin_no", cat: "ref" },
      { name: "syokuin_name", cat: "ref" },
      { name: "hihokensya_no", cat: "ref" },
      { name: "seventy_nenkin_no", cat: "pay" },
      { name: "date_count1", cat: "normal" },
      { name: "hiwari_code1", cat: "inactive" },
      { name: "ketsugaku1", cat: "inactive" },
      { name: "date_count2", cat: "normal" },
      { name: "hiwari_code2", cat: "inactive" },
      { name: "ketsugaku2", cat: "inactive" },
      { name: "date_count3", cat: "pay" },
      { name: "hiwari_code3", cat: "inactive" },
      { name: "ketsugaku3", cat: "inactive" },
    ],
  },
  {
    id: "teiji",
    title: "定時決定",
    fields: [
      { name: "No", cat: "normal" },
      { name: "base_no", cat: "base" },
      { name: "group_cd", cat: "normal" },
      { name: "group_name", cat: "ref" },
      { name: "syokuin_no", cat: "ref" },
      { name: "syokuin_name", cat: "ref" },
      { name: "hihokensya_no", cat: "ref" },
      { name: "seventy_nenkin_no", cat: "pay" },
      { name: "date_count1", cat: "normal" },
      { name: "hiwari_code1", cat: "inactive" },
      { name: "ketsugaku1", cat: "inactive" },
      { name: "date_count2", cat: "normal" },
      { name: "hiwari_code2", cat: "inactive" },
      { name: "ketsugaku2", cat: "inactive" },
      { name: "date_count3", cat: "pay" },
      { name: "hiwari_code3", cat: "inactive" },
      { name: "ketsugaku3", cat: "inactive" },
    ],
  },
  {
    id: "shoyo",
    title: "賞与支払",
    fields: [
      { name: "No", cat: "normal" },
      { name: "base_no", cat: "base" },
      { name: "group_cd", cat: "normal" },
      { name: "group_name", cat: "ref" },
      { name: "syokuin_no", cat: "normal" },
      { name: "syokuin_name", cat: "normal" },
      { name: "hihokensya_no", cat: "ref" },
      { name: "seventy_nenkin_no", cat: "pay" },
    ],
  },
];

export const CONNECTIONS: ConnectionDef[] = [
  { t1: "shutoku", f1: "group_cd", t2: "kihon", f2: "group_cd", kind: "ref" },
  { t1: "shutoku", f1: "syokuin_no", t2: "kihon", f2: "housyu_toukyu ※", kind: "ref", dashed: true },
  { t1: "shutoku", f1: "housyu_getsugaku", t2: "kihon", f2: "housyu_getsugaku", kind: "link" },
  { t1: "shutoku", f1: "kisonenkin_no", t2: "kihon", f2: "kisonenkin_no", kind: "link" },
  { t1: "shutoku", f1: "hihokensya_no", t2: "kihon", f2: "haigusya", kind: "ref" },
  { t1: "shutoku", f1: "gaito_syubetsu", t2: "kihon", f2: "shorttime_flg", kind: "ref" },
  { t1: "shutoku", f1: "shikaku_syutoku_date", t2: "kihon", f2: "shikaku_syutoku_date", kind: "ref" },
  { t1: "kihon", f1: "housyu_getsugaku", t2: "ninyo", f2: "getsugaku_current", kind: "link" },
  { t1: "kihon", f1: "kisonenkin_no", t2: "ninyo", f2: "seventy_nenkin_no", kind: "pay" },
  { t1: "ninyo", f1: "seventy_nenkin_no", t2: "teiji", f2: "seventy_nenkin_no", kind: "pay" },
  { t1: "zuiji", f1: "seventy_nenkin_no", t2: "teiji", f2: "seventy_nenkin_no", kind: "pay" },
  { t1: "teiji", f1: "seventy_nenkin_no", t2: "shoyo", f2: "seventy_nenkin_no", kind: "pay" },
  { t1: "kihon", f1: "decide_month", t2: "teiji", f2: "date_count3", kind: "pay", dashed: true },
];
