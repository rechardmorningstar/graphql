import { graphUrl } from "./const.js";

export async function fetchData(token, query) {
    try {
      const resp = await fetch(graphUrl, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });
  
      const data = await resp.json();
      if (!resp.ok) {
        return { success: false, err: data.error };
      }
  
      return { success: true, data };
    } catch (err) {
      return { success: false, err };
    }
  }