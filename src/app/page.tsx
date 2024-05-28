import PostsList from "@/components/Posts-Recent";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";

interface HomeProps {
  searchParams: {
    page: string;
  };
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  return (
    <main className=" container mx-auto max-w-7xl  ">
      <Hero />
      <section className="flex py-12  gap-10 mx-auto px-4">
        <PostsList page={page} />
        <SideMenu />
      </section>
    </main>
  );
};
export default Home;
