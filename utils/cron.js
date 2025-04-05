import cron from "node-cron";
import fetch from "node-fetch";

const API_URL = process.env.BASE_URL || "http://localhost:3000";

cron.schedule("*/5 * * * *", async () => {
  console.log("🔄 Running scheduled post publishing job...");

  try {
    const response = await fetch(`${API_URL}/api/schedule/publish`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Failed to publish posts: ${data.message}`);
      return;
    }

    console.log(
      `Published ${data.publishedCount} scheduled post(s):`,
      data.publishedPosts
    );
  } catch (error) {
    console.error("❌ Error running scheduled job:", error.message);
  }
});
