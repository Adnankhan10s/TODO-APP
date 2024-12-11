import Header from "@/components/Header";
import TopicList from "@/components/TopicList";

export default function Home() {
  return (
   <div className="bg-gradient-to-tl bg-orange-400 via-orange-300 from-orange-200 min-h-screen h-full">
   <Header />
   <TopicList/>
   </div>
  );
}
