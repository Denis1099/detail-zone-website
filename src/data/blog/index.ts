
import { BlogPost } from "@/types/blog";
import { coatingPosts } from "./coating-posts";
import { detailingPosts } from "./detailing-posts";
import { maintenancePosts } from "./maintenance-posts";

export const blogPosts: BlogPost[] = [
  ...coatingPosts,
  ...detailingPosts,
  ...maintenancePosts
];
