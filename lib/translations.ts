import type { LocaleId } from "./locale";

export type MessageKey =
  | "header.appName"
  | "nav.wheel"
  | "nav.history"
  | "nav.myMeals"
  | "home.prompt"
  | "home.mealTypeTag"
  | "home.wheelTag"
  | "home.spin"
  | "home.spinning"
  | "home.emptyMessage"
  | "home.goToMyMeals"
  | "home.resultTag"
  | "home.resultMealLabel"
  | "mealCard.mealName"
  | "mealCard.tags"
  | "mealCard.notes"
  | "mealCard.addToMyMeals"
  | "tabs.breakfast"
  | "tabs.lunch"
  | "tabs.dinner"
  | "history.title"
  | "history.clear"
  | "history.empty"
  | "history.time"
  | "history.result"
  | "myMeals.title"
  | "myMeals.resetDefault"
  | "myMeals.mealTypeTag"
  | "myMeals.addMeal"
  | "myMeals.editMeal"
  | "myMeals.nameLabel"
  | "myMeals.namePlaceholder"
  | "myMeals.mealTypeLabel"
  | "myMeals.tagsLabel"
  | "myMeals.tagsPlaceholder"
  | "myMeals.notesLabel"
  | "myMeals.notesPlaceholder"
  | "myMeals.save"
  | "myMeals.add"
  | "myMeals.cancel"
  | "myMeals.optionsCount"
  | "myMeals.searchPlaceholder"
  | "myMeals.emptyByType"
  | "myMeals.emptySearch"
  | "myMeals.defaultTag"
  | "myMeals.edit"
  | "myMeals.delete"
  | "wheel.noOptions"
  | "theme.light"
  | "theme.dark"
  | "settings.ariaLabel"
  | "ad.ariaLabel"
  | "nav.ariaLabel"
  | "tabs.ariaLabel"
  | "greeting.morning"
  | "greeting.noon"
  | "greeting.evening"
  | "greeting.night"
  | "share.button"
  | "share.adHint"
  | "share.generating"
  | "share.todayEat"
  | "share.ratioPost"
  | "share.ratioStory"
  | "share.close"
  | "share.done";

const messages: Record<LocaleId, Record<MessageKey, string>> = {
  "zh-TW": {
    "header.appName": "轉轉．吃什麼 SpinMeal",
    "nav.wheel": "轉盤",
    "nav.history": "紀錄",
    "nav.myMeals": "我的餐點",
    "home.prompt": "不知道吃什麼？轉轉就知道！",
    "home.mealTypeTag": "餐別",
    "home.wheelTag": "轉盤",
    "home.spin": "SPIN",
    "home.spinning": "轉動中…",
    "home.emptyMessage": "你還沒有加入任何選項，去「我的餐點」新增吧",
    "home.goToMyMeals": "前往我的餐點",
    "home.resultTag": "本次結果",
    "home.resultMealLabel": "就決定吃",
    "mealCard.mealName": "餐點名稱",
    "mealCard.tags": "標籤",
    "mealCard.notes": "備註",
    "mealCard.addToMyMeals": "加入我的餐點",
    "tabs.breakfast": "早餐",
    "tabs.lunch": "午餐",
    "tabs.dinner": "晚餐",
    "history.title": "轉盤紀錄",
    "history.clear": "清除紀錄",
    "history.empty": "尚無轉盤紀錄。到首頁轉一次吧！",
    "history.time": "時間",
    "history.result": "結果",
    "myMeals.title": "我的餐點",
    "myMeals.resetDefault": "還原預設",
    "myMeals.mealTypeTag": "餐別",
    "myMeals.addMeal": "新增餐點",
    "myMeals.editMeal": "編輯餐點",
    "myMeals.nameLabel": "名稱 *",
    "myMeals.namePlaceholder": "例如：番茄炒蛋、XX 餐廳",
    "myMeals.mealTypeLabel": "餐別",
    "myMeals.tagsLabel": "標籤（選填，逗號分隔）",
    "myMeals.tagsPlaceholder": "例如：美式、速食",
    "myMeals.notesLabel": "備註（選填）",
    "myMeals.notesPlaceholder": "例如：要加辣",
    "myMeals.save": "儲存",
    "myMeals.add": "新增",
    "myMeals.cancel": "取消",
    "myMeals.optionsCount": "{type}：{count} 個選項",
    "myMeals.searchPlaceholder": "搜尋餐點或餐廳…",
    "myMeals.emptyByType": "此餐別尚無餐點。上方表單可新增，或點「還原為預設選項」載入預設清單。",
    "myMeals.emptySearch": "沒有符合搜尋的項目。",
    "myMeals.defaultTag": "預設",
    "myMeals.edit": "編輯",
    "myMeals.delete": "刪除",
    "wheel.noOptions": "無選項",
    "theme.light": "淺色模式",
    "theme.dark": "深色模式",
    "settings.ariaLabel": "語言設定",
    "ad.ariaLabel": "廣告",
    "nav.ariaLabel": "主選單",
    "tabs.ariaLabel": "餐點類型",
    "greeting.morning": "早安",
    "greeting.noon": "午安",
    "greeting.evening": "晚安",
    "greeting.night": "夜深了",
    "share.button": "生成分享圖",
    "share.adHint": "廣告播放結束後，圖片將保存到裝置",
    "share.generating": "生成中…",
    "share.todayEat": "今天吃這個",
    "share.ratioPost": "貼文 4:5",
    "share.ratioStory": "現實動態 9:16",
    "share.close": "關閉",
    "share.done": "已下載，可關閉",
  },
  "zh-CN": {
    "header.appName": "转转．吃什么 SpinMeal",
    "nav.wheel": "转盘",
    "nav.history": "记录",
    "nav.myMeals": "我的餐点",
    "home.prompt": "不知道吃什么？转转就知道！",
    "home.mealTypeTag": "餐别",
    "home.wheelTag": "转盘",
    "home.spin": "SPIN",
    "home.spinning": "转动中…",
    "home.emptyMessage": "你还没有加入任何选项，去「我的餐点」新增吧",
    "home.goToMyMeals": "前往我的餐点",
    "home.resultTag": "本次结果",
    "home.resultMealLabel": "就决定吃",
    "mealCard.mealName": "餐点名称",
    "mealCard.tags": "标签",
    "mealCard.notes": "备注",
    "mealCard.addToMyMeals": "加入我的餐点",
    "tabs.breakfast": "早餐",
    "tabs.lunch": "午餐",
    "tabs.dinner": "晚餐",
    "history.title": "转盘记录",
    "history.clear": "清除记录",
    "history.empty": "尚无转盘记录。到首页转一次吧！",
    "history.time": "时间",
    "history.result": "结果",
    "myMeals.title": "我的餐点",
    "myMeals.resetDefault": "还原预设",
    "myMeals.mealTypeTag": "餐别",
    "myMeals.addMeal": "新增餐点",
    "myMeals.editMeal": "编辑餐点",
    "myMeals.nameLabel": "名称 *",
    "myMeals.namePlaceholder": "例如：番茄炒蛋、XX 餐厅",
    "myMeals.mealTypeLabel": "餐别",
    "myMeals.tagsLabel": "标签（选填，逗号分隔）",
    "myMeals.tagsPlaceholder": "例如：美式、速食",
    "myMeals.notesLabel": "备注（选填）",
    "myMeals.notesPlaceholder": "例如：要加辣",
    "myMeals.save": "保存",
    "myMeals.add": "新增",
    "myMeals.cancel": "取消",
    "myMeals.optionsCount": "{type}：{count} 个选项",
    "myMeals.searchPlaceholder": "搜寻餐点或餐厅…",
    "myMeals.emptyByType": "此餐别尚无餐点。上方表单可新增，或点「还原为预设选项」载入预设清单。",
    "myMeals.emptySearch": "没有符合搜寻的项目。",
    "myMeals.defaultTag": "预设",
    "myMeals.edit": "编辑",
    "myMeals.delete": "删除",
    "wheel.noOptions": "无选项",
    "theme.light": "浅色模式",
    "theme.dark": "深色模式",
    "settings.ariaLabel": "语言设置",
    "ad.ariaLabel": "广告",
    "nav.ariaLabel": "主选单",
    "tabs.ariaLabel": "餐点类型",
    "greeting.morning": "早安",
    "greeting.noon": "午安",
    "greeting.evening": "晚安",
    "greeting.night": "夜深了",
    "share.button": "生成分享图",
    "share.adHint": "广告播放结束后，图片将保存到设备",
    "share.generating": "生成中…",
    "share.todayEat": "今天吃这个",
    "share.ratioPost": "贴文 4:5",
    "share.ratioStory": "现实动态 9:16",
    "share.close": "关闭",
    "share.done": "已下载，可关闭",
  },
  en: {
    "header.appName": "SpinMeal",
    "nav.wheel": "Wheel",
    "nav.history": "History",
    "nav.myMeals": "My Meals",
    "home.prompt": "Guess what's for today? Give it a spin!",
    "home.mealTypeTag": "Meal type",
    "home.wheelTag": "Wheel",
    "home.spin": "SPIN",
    "home.spinning": "Spinning…",
    "home.emptyMessage": "No options yet. Add some in My Meals.",
    "home.goToMyMeals": "Go to My Meals",
    "home.resultTag": "Result",
    "home.resultMealLabel": "Let's eat",
    "mealCard.mealName": "Meal name",
    "mealCard.tags": "Tags",
    "mealCard.notes": "Notes",
    "mealCard.addToMyMeals": "Add to My Meals",
    "tabs.breakfast": "Breakfast",
    "tabs.lunch": "Lunch",
    "tabs.dinner": "Dinner",
    "history.title": "History",
    "history.clear": "Clear",
    "history.empty": "No history yet. Spin on the home page!",
    "history.time": "Time",
    "history.result": "Result",
    "myMeals.title": "My Meals",
    "myMeals.resetDefault": "Reset to default",
    "myMeals.mealTypeTag": "Meal type",
    "myMeals.addMeal": "Add meal",
    "myMeals.editMeal": "Edit meal",
    "myMeals.nameLabel": "Name *",
    "myMeals.namePlaceholder": "e.g. Scrambled eggs, Restaurant name",
    "myMeals.mealTypeLabel": "Meal type",
    "myMeals.tagsLabel": "Tags (optional, comma-separated)",
    "myMeals.tagsPlaceholder": "e.g. American, Fast food",
    "myMeals.notesLabel": "Notes (optional)",
    "myMeals.notesPlaceholder": "e.g. Extra spicy",
    "myMeals.save": "Save",
    "myMeals.add": "Add",
    "myMeals.cancel": "Cancel",
    "myMeals.optionsCount": "{type}: {count} options",
    "myMeals.searchPlaceholder": "Search meals…",
    "myMeals.emptyByType": "No meals for this type. Add above or reset to default.",
    "myMeals.emptySearch": "No matches.",
    "myMeals.defaultTag": "Default",
    "myMeals.edit": "Edit",
    "myMeals.delete": "Delete",
    "wheel.noOptions": "No options",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "settings.ariaLabel": "Language",
    "ad.ariaLabel": "Ad",
    "nav.ariaLabel": "Main menu",
    "tabs.ariaLabel": "Meal type",
    "greeting.morning": "Good morning",
    "greeting.noon": "Good afternoon",
    "greeting.evening": "Good evening",
    "greeting.night": "Good night",
    "share.button": "Share as image",
    "share.adHint": "After the ad, the image will be saved to your device",
    "share.generating": "Generating…",
    "share.todayEat": "Today's pick",
    "share.ratioPost": "Post 4:5",
    "share.ratioStory": "Story 9:16",
    "share.close": "Close",
    "share.done": "Downloaded. You can close.",
  },
};

export function getMessage(locale: LocaleId, key: MessageKey, params?: { type?: string; count?: number }): string {
  let s = messages[locale][key] ?? messages["en"][key] ?? key;
  if (params?.type !== undefined) s = s.replace("{type}", params.type);
  if (params?.count !== undefined) s = s.replace("{count}", String(params.count));
  return s;
}

export function getGreetingMessage(locale: LocaleId): string {
  const h = new Date().getHours();
  let key: MessageKey;
  if (h >= 5 && h < 11) key = "greeting.morning";
  else if (h >= 11 && h < 17) key = "greeting.noon";
  else if (h >= 17 && h < 24) key = "greeting.evening";
  else key = "greeting.night";
  return getMessage(locale, key);
}
