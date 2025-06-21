export function formatTitle(topic: string): string {
    if (topic === "common_app") return "Common App Essay";
    if (topic.startsWith("supplementary_"))
      return `Supplementary Essay ${topic.split("_")[1]}`;
    return topic;
  }