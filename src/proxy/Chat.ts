import { Enums } from "./Enums.js";

export namespace Chat {
  export type ChatExtra = {
    text?: unknown;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    color?: string;
    extra?: ChatExtra[];
  };

  export type Chat = string | ChatExtra | ChatExtra[];

  export function chatToPlainString(chat: unknown): string {
    if (typeof chat === "string") return chat;
    if (Array.isArray(chat)) return chat.map(chatToPlainString).join("");
    if (chat == null || typeof chat !== "object") return "";

    const component = chat as Record<string, unknown>;
    const text = typeof component.text === "string" ? component.text : "";
    const formatting = resolveFormatting(component);
    const extra = Array.isArray(component.extra)
      ? component.extra.map(chatToPlainString).join("")
      : "";

    return formatting + text + extra;
  }

  const colorCodes: Record<string, string> = {
    black: Enums.ChatColor.BLACK,
    dark_blue: Enums.ChatColor.DARK_BLUE,
    dark_green: Enums.ChatColor.DARK_GREEN,
    dark_aqua: Enums.ChatColor.DARK_CYAN,
    dark_cyan: Enums.ChatColor.DARK_CYAN,
    dark_red: Enums.ChatColor.DARK_RED,
    dark_purple: Enums.ChatColor.PURPLE,
    purple: Enums.ChatColor.PURPLE,
    gold: Enums.ChatColor.GOLD,
    gray: Enums.ChatColor.GRAY,
    dark_gray: Enums.ChatColor.DARK_GRAY,
    blue: Enums.ChatColor.BLUE,
    green: Enums.ChatColor.GREEN,
    aqua: Enums.ChatColor.AQUA,
    cyan: Enums.ChatColor.AQUA,
    red: Enums.ChatColor.RED,
    light_purple: Enums.ChatColor.LIGHT_PURPLE,
    pink: Enums.ChatColor.LIGHT_PURPLE,
    yellow: Enums.ChatColor.YELLOW,
    white: Enums.ChatColor.WHITE,
    reset: Enums.ChatColor.RESET,
  };

  function resolveFormatting(component: Record<string, unknown>): string {
    let formatting = "";
    if (typeof component.color === "string") {
      const color = component.color.toLowerCase().replace(/[\s-]+/g, "_");
      formatting += colorCodes[color] ?? "";
    }
    if (component.obfuscated === true) formatting += Enums.ChatColor.OBFUSCATED;
    if (component.bold === true) formatting += Enums.ChatColor.BOLD;
    if (component.strikethrough === true) formatting += Enums.ChatColor.STRIKETHROUGH;
    if (component.underlined === true) formatting += Enums.ChatColor.UNDERLINED;
    if (component.italic === true) formatting += Enums.ChatColor.ITALIC;
    return formatting;
  }
}
