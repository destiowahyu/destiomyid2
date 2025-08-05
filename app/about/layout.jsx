import Footer from "@/components/Footer";

export const metadata = {
  title: "Destio Wahyu | About"
};
export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
