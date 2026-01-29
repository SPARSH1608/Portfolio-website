import HomeWrapper from "@/components/layout/HomeWrapper";
import { getProjects, getSocialPosts, getGithubStats } from "./actions";
import { Tweet } from 'react-tweet';
import { BookOpen, ArrowRight } from 'lucide-react';

export default async function Home() {
  const projects = await getProjects();
  const socialPosts = await getSocialPosts();
  const githubData = await getGithubStats();


  const twitterPosts = socialPosts.filter(p => p.platform === 'twitter');


  const tweetNodes: Record<string, React.ReactNode> = {};

  twitterPosts.forEach(post => {
    const match = post.url.match(/status\/(\d+)/);
    const tweetId = match ? match[1] : null;

    if (tweetId) {
      tweetNodes[post.id] = (
        <div key={post.id} className="light-theme-wrapper [&_.react-tweet-theme]:dark w-full flex justify-center">
          <Tweet id={tweetId} />
        </div>
      );
    }
  });

  return <HomeWrapper projects={projects} socialPosts={socialPosts} tweetNodes={tweetNodes} githubData={githubData} />;
}
